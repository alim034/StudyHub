import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { 
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

const rooms = new Map(); // roomId -> Map(socketId => { id, name })

io.on('connection', (socket) => {
  console.log(' User connected:', socket.id);

  socket.on('join-room', ({ roomId, name }) => {
    console.log(` ${name} joining room ${roomId}`);
    
    if (!rooms.has(roomId)) rooms.set(roomId, new Map());
    const r = rooms.get(roomId);
    r.set(socket.id, { id: socket.id, name });
    socket.join(roomId);

    // tell new user about existing peers
    const existingUsers = [...r.values()].filter(u => u.id !== socket.id);
    socket.emit('users-in-room', existingUsers);

    // notify others
    socket.to(roomId).emit('user-joined', { id: socket.id, name });
    console.log(`✅ ${name} joined room ${roomId}. Total users: ${r.size}`);
  });

  socket.on('offer', ({ to, sdp, name }) => {
    console.log(` Relaying offer from ${name} to ${to}`);
    io.to(to).emit('offer', { from: socket.id, sdp, name });
  });

  socket.on('answer', ({ to, sdp }) => {
    console.log(`📞 Relaying answer to ${to}`);
    io.to(to).emit('answer', { from: socket.id, sdp });
  });

  socket.on('ice-candidate', ({ to, candidate }) => {
    if (candidate) {
      io.to(to).emit('ice-candidate', { from: socket.id, candidate });
    }
  });

  socket.on('peer-state', ({ roomId, muted, videoOff, hand }) => {
    socket.to(roomId).emit('peer-state', { id: socket.id, muted, videoOff, hand });
  });

  socket.on('chat-message', (msg) => {
    console.log(` Chat message in room ${msg.roomId}: ${msg.text}`);
    socket.to(msg.roomId).emit('chat-message', msg);
  });

  socket.on('leave-room', ({ roomId }) => {
    console.log(`🚪 User ${socket.id} leaving room ${roomId}`);
    handleUserLeave(socket, roomId);
  });

  socket.on('disconnect', () => {
    console.log(' User disconnected:', socket.id);
    // Handle disconnect from all rooms
    for (const [roomId, r] of rooms) {
      if (r.has(socket.id)) {
        handleUserLeave(socket, roomId);
      }
    }
  });

  function handleUserLeave(socket, roomId) {
    const r = rooms.get(roomId);
    if (r && r.has(socket.id)) {
      const left = r.get(socket.id);
      r.delete(socket.id);
      socket.leave(roomId);
      socket.to(roomId).emit('user-left', { id: socket.id, name: left?.name });
      
      if (r.size === 0) {
        rooms.delete(roomId);
        console.log(` Room ${roomId} deleted (empty)`);
      } else {
        console.log(` ${left?.name} left room ${roomId}. Remaining users: ${r.size}`);
      }
    }
  }
});

app.get('/', (_, res) => res.send('StudyHub Signaling Server running'));
app.get('/health', (_, res) => res.json({ 
  status: 'ok', 
  rooms: rooms.size,
  timestamp: new Date().toISOString()
}));

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 StudyHub Signaling Server running on http://localhost:${PORT}`);
  console.log(` Socket.io ready for WebRTC connections`);
  console.log(` CORS enabled for localhost:5173 and localhost:3000`);
});
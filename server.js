const http = require('http').createServer();
const io = require('socket.io')(http);
const port = 5000;

io.on('connection', socket => {
  console.log('new connection');
  socket.on('message', event => {
    // socket.broadcast.emit('message', event);
    io.emit('message', event);
  })
});

io.on('disconnect', event => {
  console.log('disconnect', event);
});

io.listen(port, () => {
  console.log(`Listening port ${port}`)
});

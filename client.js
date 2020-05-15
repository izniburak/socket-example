const io = require('socket.io-client')('http://localhost:5000');
const repl = require('repl');

if (!process.argv[2]) {
  console.log('Username required!');
  process.exit();
}

const username = process.argv[2];

io.on('disconnect', e => {
  io.emit('disconnect', e)
});

io.on('connect', () => {
  console.log('## Welcome to Chat App ##');
  repl.start({
    prompt: '',
    eval: data => {
      io.send({ data, username });
    }
  });
});

io.on('message', message => {
  const { data, username } = message;
  console.info(`${username}: ${data}`);
});

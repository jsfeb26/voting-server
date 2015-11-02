import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach(8090);

  // subscribe a listener to the store that reads the current state,
  // turns it into a plain JavaScript object, and emits it as a 'state' event
  // on the Socket.io server
  store.subscribe(
    // JSON-serialized snapshot of the state is ent over all active Socket.io connections
    () => io.emit('state', store.getState().toJS())
  );

  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
  });
}

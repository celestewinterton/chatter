from flask_socketio import emit, join_room, leave_room, send, SocketIO

socketio = SocketIO()

socketio = SocketIO(cors_allowed_origins="*")

@socketio.on("chat")
def handle_chat(data):
    room = data['room']
    emit("chat", data, broadcast=True, to=room)



@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    send(username + ' has entered the room.', to=room)



@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)



@socketio.on('login')
def on_active(data):
    emit('login', data, broadcast=True)



@socketio.on('logout')
def on_inactive(data):
    emit('logout', data, broadcast=True)


@socketio.on('join_room')
def on_join_room(data):
    emit('join_room', data, broadcast=True)

@socketio.on('leave_room')
def on_leave_room(data):
    emit('leave_room', data, broadcast=True)
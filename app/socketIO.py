from flask_socketio import emit, join_room, leave_room, send, SocketIO

socketio = SocketIO()

socketio = SocketIO(cors_allowed_origins="*")

@socketio.on("chat")
def handle_chat(data):
    room = data['room']
    emit("chat", data, broadcast=True, to=room)



@socketio.on('join')
def on_join(data):
    room = data['room']
    join_room(room)



@socketio.on('leave')
def on_leave(data):
    room = data['room']
    leave_room(room)


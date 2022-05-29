from flask_socketio import emit, join_room, leave_room, send, SocketIO
from .models import Message, db



socketio = SocketIO()

socketio = SocketIO(cors_allowed_origins="*")

@socketio.on("chat")
def handle_chat(data):
    room = data['room']
    params = {
        'owner_id': int(data['userId']),
        'body': data['msg']
    }
    if room[0] == 'c':
        params['channel_id'] = int(room[1:])
    else:
        params['group_id'] = int(room[1:])
    message = Message(**params)
    db.session.add(message)
    db.session.commit()
    emit("chat", data, broadcast=True, to=room)



@socketio.on('join')
def on_join(data):
    room = data['room']
    join_room(room)
    emit('chat','poopmonster' ,to=room)



@socketio.on('leave')
def on_leave(data):
    room = data['room']
    print(data)
    leave_room(room)
    emit('chat','poopmonster' ,to=room)


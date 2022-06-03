from flask_socketio import emit, join_room, leave_room, send, SocketIO
from .models import Message, db



socketio = SocketIO()

socketio = SocketIO(cors_allowed_origins="*")

@socketio.on("chat")
def handle_chat(data):
    room = data['room']
    message = data['msg']
    if len(message) > 255:
        emit('error', data)
    else :
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

@socketio.on("edit")
def edit_chat(data):
    room = data['room']
    message = data['msg']
    if len(message) > 255:
        emit('edit-error', data)
    else:
        message = Message.query.get(data['msgId'])
        message.body = data['msg']
        db.session.commit()
        emit("edit", data, broadcast=True, to=room)

@socketio.on("delete")
def edit_chat(data):
    room = data['room']
    message = Message.query.get(data['msgId'])
    db.session.delete(message)
    db.session.commit()
    emit("delete", data, broadcast=True, to=room)



@socketio.on('join')
def on_join(data):
    room = data['room']
    join_room(room)



@socketio.on('join-channel')
def on_join(data):
    room = data['room']
    params = {
        'owner_id': 8,
        'body': data['username'] + ' has joined the channel.'
    }
    if room[0] == 'c':
        params['channel_id'] = int(room[1:])
    else:
        params['group_id'] = int(room[1:])
    message = Message(**params)
    db.session.add(message)
    db.session.commit()
    emit("chat", data, broadcast=True, to=room)


@socketio.on('update-channel')
def update(data):
    emit('update-channel', data, broadcast=True)



@socketio.on('leave')
def on_leave(data):
    room = data['room']
    leave_room(room)

@socketio.on('sign-in')
def on_sign_in(data):
    emit('sign-in', data, broadcast=True)

@socketio.on('log-out')
def on_sign_in(data):
    emit('log-out', data, broadcast=True)

@socketio.on('delete-channel')
def delete_channel(data):
    emit('delete-channel', data, broadcast=True, to=data['roomId'])

@socketio.on('create-channel')
def create_channel(data):
    emit('create-channel', data, broadcast=True)

@socketio.on('delete-group')
def delete_group(data):
    emit('delete-group', data, broadcast=True)

@socketio.on('create-group')
def create_group(data):
    emit('create-group', data, broadcast=True)

@socketio.on('leave-channel')
def on_join(data):
    room = data['room']
    params = {
        'owner_id': 8,
        'body': data['username'] + ' has left the channel.'
    }
    if room[0] == 'c':
        params['channel_id'] = int(room[1:])
    else:
        params['group_id'] = int(room[1:])
    message = Message(**params)
    db.session.add(message)
    db.session.commit()
    emit("chat", data, broadcast=True, to=room)


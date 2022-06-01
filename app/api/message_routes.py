from flask import Blueprint, request
from datetime import datetime
from ..utils import form_validation_errors
from ..models import Message

message_routes = Blueprint('messages', __name__)

@message_routes.route('/groups', methods=['POST'])
def create_group_chat():
    pass


@message_routes.route('/channels/<int:id>')
def get_channel_message(id):
    messages = Message.query.filter(Message.channel_id == id)
    return {'messages' : [message.to_dict() for message in messages]}

@message_routes.route('/groups/<int:id>')
def get_group_message(id):
    messages = Message.query.filter(Message.group_id == id)
    return {'messages' : [message.to_dict() for message in messages]}




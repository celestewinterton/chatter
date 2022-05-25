from flask import Blueprint, request
from datetime import datetime
from ..forms import GroupMessageForm, ChannelMessageForm
from ..utils import form_validation_errors

message_routes = Blueprint('messages', __name__)

@message_routes.route('/groups', methods=['POST'])
def create_group_chat():
    form = GroupMessageForm()
    if form.validate_on_submit():
        #create message object here
    return {'errors': form_validation_errors(form.errors)}, 401


@message_routes.route('/channels', methods=['POST'])
def create_channel_chat():
    form = ChannelMessageForm()
    if form.validate_on_submit():
        #create message object here
    return {'errors': form_validation_errors(form.errors)}, 401




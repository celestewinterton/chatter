from copyreg import remove_extension
from flask import Blueprint, jsonify, render_template, request
from datetime import datetime
from ..forms.channel_form import ChannelForm
from ..utils import form_validation_errors
from ..models.user import Channel
from ..models.db import db
channel_routes = Blueprint('channels', __name__)


@channel_routes.route('')
def get_all_channels():
  all_channels = Channel.query.all()
  return {'channels': [channel.to_dict() for channel in all_channels]}


@channel_routes.route('/<int:id>')
def get_specific_channel(id):
  channel = Channel.query.get(id)
  return channel



@channel_routes.route('' , methods=['POST'])
def create_new_channel():
  form = ChannelForm()
  params = {
    'name': form.data['name'],
    'topic': form.data['topic'],
    'description': form.data['description'],
    'owner_id' : form.data['owner_id']
  }
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    new_channel = Channel(**params)
    db.session.add(new_channel)
    db.session.commit()
    return new_channel.to_dict()
  return {'errors': form_validation_errors(form.errors)}, 401



@channel_routes.route('/<int:id>',methods=['PUT'])
def edit_channel(id):
  form = ChannelForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    editable_channel = Channel.query.get(id)
    editable_channel.name = form.data['name']
    editable_channel.topic = form.data['topic']
    editable_channel.description = form.data['description']
    db.session.commit()
    return editable_channel.to_dict()
  return {'errors': form_validation_errors(form.errors)}, 401



@channel_routes.route('/<int:id>',methods=['DELETE'])
def delete_channel(id):
  remove_channel = Channel.query.get(id)
  db.session.delete(remove_channel)
  db.session.commit()
  return remove_channel
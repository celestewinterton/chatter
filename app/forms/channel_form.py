from pydoc import describe
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import Channel
from sqlalchemy import func


def channel_exists(form, field):
    # Checking if username is already in use
    name = field.data
    channel = Channel.query.filter(func.lower(Channel.name) == func.lower(name)).first()
    if channel:
        raise ValidationError('Channel already exists')




class ChannelForm(FlaskForm):
  name = StringField('Name', validators=[DataRequired(), Length(min=5, max=50, message="Channel Room name must be between 5-50 characters."), channel_exists])
  topic = StringField('Topic', validators=[DataRequired(), Length(min=5, max=50, message="Channel topic must be between 5-50 characters.")])
  description = TextAreaField('Description')
  owner_id = IntegerField('Owner', validators=[DataRequired()])
  submit = SubmitField('Submit')


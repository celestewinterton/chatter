from pydoc import describe
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length

class ChannelForm(FlaskForm):
  name = StringField('Name', validators=[DataRequired(), Length(min=5, max=50, message="Channel Room name must be between 5-50 characters.")])
  topic = StringField('Topic', validators=[DataRequired(), Length(min=5, max=50, message="Channel topic must be between 5-50 characters.")])
  description = TextAreaField('Description')
  owner_id = IntegerField('Owner', validators=[DataRequired()])
  submit = SubmitField('Submit')


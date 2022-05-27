from pydoc import describe
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired
v = [DataRequired()]
class ChannelForm(FlaskForm):
  name = StringField('Name', v)
  topic = StringField('Topic')
  description = TextAreaField('Description')
  submit = SubmitField('Submit')


from pydoc import describe
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField, IntegerField
from wtforms.validators import DataRequired
v = [DataRequired()]
class ChannelForm(FlaskForm):
  name = StringField('Name', v)
  topic = StringField('Topic', v)
  description = TextAreaField('Description')
  owner_id = IntegerField('Owner', v)
  submit = SubmitField('Submit')


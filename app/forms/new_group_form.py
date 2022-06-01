from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
from app.models import User


class NewGroupForm(FlaskForm):
    members = StringField('To: ', validators=[DataRequired()])
    submit = SubmitField("Start DM")

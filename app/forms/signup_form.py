from xxlimited import Str
from flask_wtf import FlaskForm
from wtforms import StringField, FileField
from wtforms.validators import DataRequired,ValidationError,Email, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), Length(min=5, max=40, message="Username must be between 5 and 40 characters long."), username_exists])
    email = StringField('email', validators=[DataRequired(message='Please provide a valid e-mail'), user_exists, Email(message='Please provide a valid e-mail')])
    password = StringField('password', validators=[DataRequired(), Length(min=6, max=20, message='Password must be between 6 and 20 characters')])
    image = FileField('image')

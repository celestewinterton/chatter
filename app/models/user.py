from models.db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from app.models.subscriptions import channel_subcriptions as cs
from app.models.subscriptions import group_subscriptions as gs


class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(40), nullable=False, unique=True)
  email = db.Column(db.String(255), nullable=False, unique=True)
  hashed_password = db.Column(db.String(255), nullable=False)
  title = db.Column(db.String(50))
  status = db.Column(db.String(50))
  photo = db.Column(db.String(50))
  channels = db.relationship("Channel", back_populates='owner')
  subscribed_channels = db.relationship("Channel", back_populates='users', secondary=cs)
  subscribed_groups = db.relationship("Group", back_populates='users', secondary=gs)

  @property
  def password(self):
    return self.hashed_password

  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)

  def check_password(self, password):
    return check_password_hash(self.password, password)

  def to_dict(self):
    return {
      'id': self.id,
      'username': self.username,
      'email': self.email,
      'title': self.title,
      'status': self.status,
      'photo': self.photo,
      'subcribed_channels':[channel.todict() for channel in self.subscribed_channels],
      'subscribed_groups':[group.todict() for group in self.subscribed_groups]
    }

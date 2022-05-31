from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

channel_subcriptions = db.Table(
   "channel_subcriptions",
   db.Column(
      "channel_id", db.Integer, db.ForeignKey("channels.id"), primary_key=True
   ),
   db.Column(
      "user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True
   ),
   db.UniqueConstraint('channel_id', 'user_id', name='uix_1')
)

group_subscriptions = db.Table(
   "group_subscriptions",
   db.Column(
      "group_id", db.Integer, db.ForeignKey("groups.id"), primary_key=True
   ),
   db.Column(
      "user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True
   ),
   db.UniqueConstraint('group_id', 'user_id', name='uix_2')
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(50))
    status = db.Column(db.String(50))
    photo = db.Column(db.String(255))
    online = db.Column(db.Boolean, nullable=False, default=False)

    messages = db.relationship("Message", back_populates='owner')
    channels = db.relationship("Channel", back_populates='owner')
    subscribed_channels = db.relationship("Channel", back_populates='users', secondary=channel_subcriptions)
    subscribed_groups = db.relationship("Group", back_populates='users', secondary=group_subscriptions)
    owned_groups = db.relationship('Group', back_populates='owner')

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
        'subscribed_channels':[channel.to_dict() for channel in self.subscribed_channels],
        'subscribed_groups':[group.to_dict() for group in self.subscribed_groups],
        }
    def to_username(self):
       return {
          'id' : self.id,
          'username' : self.username,
          'photo' : self.photo
       }


class Group(db.Model):
   __tablename__ = "groups"

   id = db.Column(db.Integer, primary_key=True)
   owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))


   owner = db.relationship("User", back_populates="owned_groups")
   message = db.relationship("Message", back_populates="group", cascade="all, delete")
   users = db.relationship("User", back_populates='subscribed_groups', secondary=group_subscriptions)

   def to_dict(self):
      return {
         'id': self.id,
         'owner': self.owner_id,
         'users': [user.to_username() for user in self.users]
      }
   def compare_dict(self):
      return {
         'id': self.id,
         'user_id': [user.id for user in self.users]
      }


class Channel(db.Model):
  __tablename__ = "channels"

  id = db.Column(db.Integer, primary_key=True)
  messages = db.relationship("Message", back_populates='channel')

  name = db.Column(db.String(50), nullable=False)
  topic = db.Column(db.String(50))
  description = db.Column(db.String(255))
  owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  owner = db.relationship("User", back_populates="channels")


  users = db.relationship("User", back_populates='subscribed_channels', secondary=channel_subcriptions)

  def to_dict(self):
   return {
      'id': self.id,
      'name': self.name,
      'topic': self.topic,
      'description': self.description,
      'owner_id': self.owner_id,
      'users': [user.to_username() for user in self.users]
   }

from models.db import db
from models.subscriptions import channel_subscriptions as cs

class Channel(db.Model):
  __tablename__ = "channels"

  id = db.Column(db.Integer, primary_key=True)
  messages = db.relationships("Message", back_populates='channel')

  name = db.Column(db.String(50), nullable=False)
  topic = db.Column(db.String(50))
  description = db.Column(db.String(255))

  owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  owner = db.relationship("User", back_populates="channels")

  users = db.relationships("User", back_populates='subscribed_channels', secondary=cs)

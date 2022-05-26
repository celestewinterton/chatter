from .db import db

class Message(db.Model):
  __tablename__ = "messages"

  id = db.Column(db.Integer, primary_key=True)
  body = db.Column(db.String(255), nullable=False)
  child = db.relationship("Message", back_populates='parent')

  owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  owner = db.relationship("User", back_populates='messages')

  channel_id = db.Column(db.Integer, db.ForeignKey("channels.id"))
  channel = db.relationship("Channel", back_populates='messages')

  group_id = db.Column(db.Integer, db.ForeignKey("groups.id"))
  group = db.relationship("Group", back_populates='message')

  parent_id = db.Column(db.Integer, db.ForeignKey("messages.id"))
  parent = db.relationship("Message", back_populates='child')

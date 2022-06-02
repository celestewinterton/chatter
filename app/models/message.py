from .db import db
from datetime import datetime


class Message(db.Model):
  __tablename__ = "messages"

  id = db.Column(db.Integer, primary_key=True)
  
  body = db.Column(db.String(255), nullable=False)

  owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  owner = db.relationship("User", back_populates='messages')

  channel_id = db.Column(db.Integer, db.ForeignKey("channels.id"))
  channel = db.relationship("Channel", back_populates='messages')

  group_id = db.Column(db.Integer, db.ForeignKey("groups.id"))
  group = db.relationship("Group", back_populates='message')
  created_at = db.Column(db.DateTime(timezone=True), default=datetime.now())

  def to_dict(self):
    return {
      'id': self.id,
      'message': self.body,
      'owner_id': self.owner_id,
      'user': self.owner.to_username(),
      'created_at': self.created_at
    }


from models.db import db

class Message(db.Model):
  __tablename__ = "messages"

  id = db.Column(db.Integer, primary_key=True)
  body = db.Column(db.String(255), nullable=False)

  owner_id = db.Column(db.Integer, db.ForeignKey("owners.id"))

  channel_id = db.Column(db.Integer, db.ForeignKey("channels.id"))
  channel = db.relationships("Channel", back_populates='messages')
  
  group_id = db.Column(db.Integer, db.ForeignKey("groups.id"))
  parent_id = db.Column(db.Integer, db.ForeignKey("messages.id"))

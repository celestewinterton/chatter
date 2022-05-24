from models.db import db

class Reaction(db.Model):
  __tablename__ = "reactions"

  id = db.Column(db.Integer, primary_key=True)

  message_id = db.Column(db.Integer, db.ForeignKey("messages.id"))
  emoji_id = db.Column(db.Integer, db.ForeignKey("emojis.id"))

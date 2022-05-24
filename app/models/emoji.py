from models.db import db

class Emoji(db.Model):
  __tablename__ = "emojis"

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(50), nullable=False)
  emoji = db.Column(db.String(255), nullable=False)

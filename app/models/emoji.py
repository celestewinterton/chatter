from models.db import db

class Emoji(db.Model):
  __tablename__ = "emojis"

  id = db.Column(db.Integer, primary_key=True)

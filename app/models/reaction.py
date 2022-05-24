from models.db import db

class Reaction(db.Model):
  __tablename__ = "reactions"

  id = db.Column(db.Integer, primary_key=True)

from models.db import db

class Group(db.Model):
  __tablename__ = "groups"

  id = db.Column(db.Integer, primary_key=True)
  hidden = db.Column(db.Boolean, nullable=False)

from models.db import db
from models.subscriptions import group_subscriptions as gs

class Group(db.Model):
  __tablename__ = "groups"

  id = db.Column(db.Integer, primary_key=True)
  hidden = db.Column(db.Boolean, nullable=False)

  users = db.relationships("User", back_populates='subscribed_groups', secondary=gs)
from models.db import db
from models.subscription import group_subscriptions as gs

class Group(db.Model):
  __tablename__ = "groups"

  id = db.Column(db.Integer, primary_key=True)
  message = db.realtionship("Message", back_populates='group')

  hidden = db.Column(db.Boolean, nullable=False)

  users = db.relationship("User", back_populates='subscribed_groups', secondary=gs)

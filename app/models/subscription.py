from models.db import db

class Subscription(db.Model):
  __tablename__ = "subscriptions"

  id = db.Column(db.Integer, primary_key=True)

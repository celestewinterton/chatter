# from models.db import db

# class Subscription(db.Model):
#   __tablename__ = "subscriptions"

#   id = db.Column(db.Integer, primary_key=True)

#   channel_id = db.Column(db.Integer, db.ForeignKey("channels.id"))
#   group_id = db.Column(db.Integer, db.ForeignKey("groups.id"))
#   user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

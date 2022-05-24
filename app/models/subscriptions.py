from app.models.db import db

channel_subcriptions = db.Table(
   "channel_subcriptions",
   db.Column(
      "channel_id", db.Integer, db.ForeignKey("channels.id"), primary_key=True
   ),
   db.Column(
      "user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True
   )
)

group_subscriptions = db.Table(
   "group_subscriptions",
   db.Column(
      "group_id", db.Integer, db.ForeignKey("groups.id"), primary_key=True
   ),
   db.Column(
      "user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True
   )
)
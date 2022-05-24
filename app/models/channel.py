from models.db import db

class Channel(db.Model):
  __tablename__ = "channels"

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50), nullable=False)
  topic = db.Column(db.String(50))
  description = db.Column(db.String(255))

  owner_id = db.Column(db.Integer, db.ForeignKey("owners.id"))
  # owner = db.relationship("Owner", back_populates="channels")

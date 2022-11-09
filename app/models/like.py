from flask_login import user_logged_in
from .db import db

class Like(db.Model):
  __tablename_ = 'likes'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  buzz_id = db.Column(db.Integer, db.ForeignKey('chirps.id'), nullable=True)
  comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'), nullable=True)

  user = db.relationship('User', back_populates='likes')
  buzzes = db.relationship('Chirp', back_populates='like_list')
  comments = db.relationship('Comment', back_populates='like_list')

  def to_dict(self):
    return {
      'id': self.id,
      'content': self.content,
      'user_id': self.user_id,
      'image_url': self.image_url,
      }
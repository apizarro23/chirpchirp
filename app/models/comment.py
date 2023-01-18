from .db import db

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    chirp_id = db.Column(db.Integer, db.ForeignKey('chirps.id'), nullable=False)
    comment_content = db.Column(db.String(280), nullable=False)
    # likes = db.Column(db.Integer, default=0)

    user = db.relationship('User', back_populates='comments')
    chirps = db.relationship('Chirp', back_populates='comments')
    # like_list = db.relationship("Like", back_populates="comment", cascade="all, delete-orphan")

    def to_dict(self):
        return{
            'id': self.id,
            'user_id': self.user_id,
            'chirp_id': self.chirp_id,
            'comment_content': self.comment_content,
            'likes': self.likes
        }
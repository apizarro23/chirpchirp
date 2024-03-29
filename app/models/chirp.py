from .db import db


class Chirp(db.Model):
    __tablename__ = 'chirps'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    chirp_content = db.Column(db.String(280), nullable=False)
    image_url = db.Column(db.String(500), nullable=True)
    likes = db.Column(db.Integer, default=0)
    # created_at = db.Column(db.DateTime(timezone=True), db.func.now())

    user = db.relationship('User', back_populates='chirps')
    comments = db.relationship('Comment', back_populates='chirps', cascade="all, delete-orphan")
    likes = db.relationship('Like', back_populates='chirps', cascade="all, delete-orphan")



    def to_dict(self):
        return{
            'id': self.id,
            'user_id': self.user_id,
            'chirp_content': self.chirp_content,
            'image_url': self.image_url,
            'likes': [like.to_dict() for like in self.likes],
        }
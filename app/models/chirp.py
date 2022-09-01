from .db import db


class Chirp(db.Model):
    __tablename__ = 'chirps'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    chirp_content = db.Column(db.String(280), nullable=False)
    image_url = db.Column(db.String(500), nullable=True)
    # created_at = db.Column(db.DateTime(timezone=True), db.func.now())

    user = db.relationship('User', back_populates='chirps')
    comments = db.relationship('Comment', back_populates='chirps')

    def to_dict(self):
        return{
            'id': self.id,
            'user_id': self.user_id,
            'chirps': self.chirp_content,
            'image_url': self.image_url,
            'created_at': self.created_at
        }
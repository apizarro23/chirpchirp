from time import timezone
from .db import db


class Chirp(db.Model):
    __tablename__ = 'chirps'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    chirps = db.Column(db.Varchar(280), nullable=False)
    image_url = db.Column(db.Varchar, nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), db.func.now())

    
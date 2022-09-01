from app.models import db
from app.models.chirp import Chirp

def seed_chirps():
    chirp01 = Chirp(
        chirp ='Glad to be writing my first chirp!!!',
        user_id = 1,
        image_url = ''
    )
    chirp02 = Chirp(
        chirp ='Glad to be writing my first chirp with a picture!!!',
        user_id = 2,
        image_url = 'https://static.displate.com/857x1200/displate/2021-12-28/3795ad19a914a25131b1a0b04971f854_fd0a525fd8775134e8185e06372e13bd.jpg'
    )
    chirp03 = Chirp(
        chirp ='Look at my new kicks I just picked up',
        user_id = 3,
        image_url = 'https://www.inxxofficial.com/pub/media/catalog/product/cache/31041782a5f16e8cd5c51b7384553e4d/n/i/nike-dunk-low-lottery-pale-ivory-malachite-dr9654-100-1_1.jpeg'
    )
    chirp04 = Chirp(
        chirp = "The best pizza in the world is at DeLucia's in Raritan, NJ",
        user_id = 4,
        image_url = 'https://10619-2.s.cdn12.com/rests/original/403_503394107.jpg'
    )
    chirp05 = Chirp(
        chirp ='Today is the day!',
        user_id = 5,
        image_url = ''
    )
    chirp06 = Chirp(
        chirp ='Stopped to get dim sum in Chinatown and it was amazing!!',
        user_id = 6,
        image_url = ''
    )

    db.session.add(chirp01)
    db.session.add(chirp02)
    db.session.add(chirp03)
    db.session.add(chirp04)
    db.session.add(chirp05)
    db.session.add(chirp06)

    db.session.commit()

def undo_chirps():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
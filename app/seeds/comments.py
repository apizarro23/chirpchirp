from app.models import db
from app.models.comment import Comment

def seed_comments():
    comment01 = Comment(
        comment_content = 'Welcome to chirpchirp!!',
        user_id = 6,
        buzz_id = 1
    )
    comment02 = Comment(
        comment_content = 'Awesome pic!',
        user_id = 5,
        buzz_id = 2
    )
    comment03 = Comment(
        comment_content = 'Nice kicks!!',
        user_id = 4,
        buzz_id = 3
    )
    comment04 = Comment(
        comment_content = 'Save me a slice!',
        user_id = 3,
        buzz_id = 4
    )
    comment05 = Comment(
        comment_content = 'I hope you get everything accomplished!!',
        user_id = 2,
        buzz_id = 5
    )
    comment06 = Comment(
        comment_content = 'Whats the name of the place? Would love to try it out!',
        user_id = 1,
        buzz_id = 6
    )

    db.session.add(comment01)
    db.session.add(comment02)
    db.session.add(comment03)
    db.session.add(comment04)
    db.session.add(comment05)
    db.session.add(comment06)

    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit() 
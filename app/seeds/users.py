from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', 
        email='demo@aa.io', 
        password='password',
        profile_pic= 'test01.url',
        bio= 'BIO 01'
    )
    tonyp = User(
        username='tonyp', 
        email='tonyp@aa.io', 
        password='password',
        profile_pic= 'test02.url',
        bio= 'BIO 02'
    )
    whit = User(
        username='whit', 
        email='whitm@aa.io', 
        password='password',
        profile_pic= 'test03.url',
        bio= 'BIO 03'
    )
    cesar = User(
        username='cez', 
        email='cesars@aa.io', 
        password='password',
        profile_pic= 'test04.url',
        bio= 'BIO 04'
    )
    vlad = User(
        username='vlad', 
        email='vladr@aa.io', 
        password='password',
        profile_pic= 'test05.url',
        bio= 'BIO 05'
    )
    david = User(
        username='david', 
        email='davidh@aa.io', 
        password='password',
        profile_pic= 'test06.url',
        bio= 'BIO 06'
    )

    db.session.add(demo)
    db.session.add(tonyp)
    db.session.add(whit)
    db.session.add(cesar)
    db.session.add(vlad)
    db.session.add(david)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

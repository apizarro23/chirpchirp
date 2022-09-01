from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', 
        email='demo@aa.io', 
        password='password'
    )
    tonyp = User(
        username='tonyp', 
        email='tonyp@aa.io', 
        password='password'
    )
    whit = User(
        username='whit', 
        email='whitm@aa.io', 
        password='password'
    )
    cesar = User(
        username='cez', 
        email='cesars@aa.io', 
        password='password'
    )
    vlad = User(
        username='vlad', 
        email='vladr@aa.io', 
        password='password'
    )
    david = User(
        username='david', 
        email='davidh@aa.io', 
        password='password'
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

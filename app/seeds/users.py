from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', 
        email='demo@aa.io', 
        password='password',
        profile_pic= 'https://joomisp.de/images/blog/joomisp-demo.jpg',
        bio= 'BIO 01'
    )
    tonyp = User(
        username='tonyp', 
        email='tonyp@aa.io', 
        password='password',
        profile_pic= 'https://www.oberlo.com/media/1603970279-pexels-photo-3.jpg?fit=max&fm=webp&w=1824',
        bio= 'BIO 02'
    )
    whit = User(
        username='whit', 
        email='whitm@aa.io', 
        password='password',
        profile_pic= 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        bio= 'BIO 03'
    )
    cesar = User(
        username='cez', 
        email='cesars@aa.io', 
        password='password',
        profile_pic= 'https://media.istockphoto.com/photos/in-the-photo-studio-with-professional-equipment-portrait-of-the-picture-id1196172395?b=1&k=20&m=1196172395&s=612x612&w=0&h=-rNKtM76VZuRXdK2gvJTOHiLzXkviIUk0IY_Fk5ca1s=',
        bio= 'BIO 04'
    )
    vlad = User(
        username='vlad', 
        email='vladr@aa.io', 
        password='password',
        profile_pic= 'https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2016/10/camera-photo-lens-stock-images.jpg',
        bio= 'BIO 05'
    )
    david = User(
        username='david', 
        email='davidh@aa.io', 
        password='password',
        profile_pic= 'https://media.istockphoto.com/id/843408508/photo/photography-camera-lens-concept.jpg?s=612x612&w=0&k=20&c=-tm5TKrPDMakrT1vcOE-4Rlyj-iBVdzKuX4viFkd7Vo=',
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

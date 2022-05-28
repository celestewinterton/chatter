from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', photo='https://chatrapp.s3.amazonaws.com/T03GU501J-U02QBM38FC2-g2b8bfde2116-512.png')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', photo='https://chatrapp.s3.amazonaws.com/T03GU501J-U02QBM38FC2-g2b8bfde2116-512.png')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', photo='https://chatrapp.s3.amazonaws.com/T03GU501J-U02QBM38FC2-g2b8bfde2116-512.png')
    austin = User(
        username='austin', email='austin@aa.io', password='password', photo='https://chatrapp.s3.amazonaws.com/T03GU501J-U02QBM38FC2-g2b8bfde2116-512.png')
    brendan = User(
        username='brendan', email='brendan@aa.io', password='password', photo='https://chatrapp.s3.amazonaws.com/T03GU501J-U02QBM38FC2-g2b8bfde2116-512.png')
    celeste = User(
        username='celeste', email='celeste@aa.io', password='password', photo='https://chatrapp.s3.amazonaws.com/T03GU501J-U02QBM38FC2-g2b8bfde2116-512.png')
    jingling = User(
        username='jingling', email='jingling@aa.io', password='password', photo='https://chatrapp.s3.amazonaws.com/T03GU501J-U02QBM38FC2-g2b8bfde2116-512.png')


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(austin)
    db.session.add(brendan)
    db.session.add(celeste)
    db.session.add(jingling)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

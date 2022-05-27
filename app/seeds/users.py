from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', firstname='Demo', lastname='Lition', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io',firstname='Marnie', lastname='Simpson', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', firstname='Bobbie', lastname='Simpson',password='password')
    austin = User(
        username='austin', email='austin@aa.io', firstname='Austin', lastname='Dang',password='password')
    brendan = User(
        username='brendan', email='brendan@aa.io', firstname='Brendan', lastname='Downing',password='password')
    celeste = User(
        username='celeste', email='celeste@aa.io', firstname='Celeste', lastname='Winterton',password='password')
    jingling = User(
        username='jingling', email='jingling@aa.io', firstname='Jingling', lastname='Jin',password='password')


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

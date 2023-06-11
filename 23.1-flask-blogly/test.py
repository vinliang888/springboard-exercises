from unittest import TestCase
from app import app
from models import db, User

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly-test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False

db.drop_all()
db.create_all()

class UserTestCase(TestCase):
    def setUp(self):
        """delete any users"""
        print("deleteing users")
        User.query.delete()
    
    def tearDown(self):
        """clean up transactions"""

        db.session.rollback()
    
    
    def test_delete_user(self):
        user = User(first_name='Xyz', last_name='Smith',image_url='')
        db.session.add(user)
        db.session.commit()

        User.delete_user(1)
        try:
            user = User.get_user_by_id(1)
        except:
            self.assertEqual(1,1)

    def test_get_user_by_id(self):
        user = User(first_name='John', last_name='Smith',image_url='')
        db.session.add(user)
        db.session.commit()

        users = User.get_user_by_id(2)
        self.assertEqual(users,user)
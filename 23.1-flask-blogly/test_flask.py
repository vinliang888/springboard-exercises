from unittest import TestCase
import unittest
from app import app
from models import db, User, connect_db

unittest.TestLoader.sortTestMethodsUsing = None

class UserTestCase(TestCase):
    def setUp(self):
        """delete any users"""
        print("deleteing users")
        db.drop_all()
        db.create_all()
        User.query.delete()
        user = User(first_name='John', last_name='Smith',image_url='')
        db.session.add(user)
        db.session.commit()
    
    def tearDown(self):
        """clean up transactions"""

        db.session.rollback()
    
    
    def test_delete_user(self):
        with app.test_client() as client:
            resp = client.post("/users/1/delete", follow_redirects=True)
            html = resp.get_data(as_text = True)
            self.assertIn("User John Smith deleted", html)
            self.assertEqual(resp.status_code, 200)

    def test_load_root(self):
        with app.test_client() as client:
            resp = client.get("/users")
            html = resp.get_data(as_text = True)
            self.assertIn("John Smith", html)
            self.assertEqual(resp.status_code, 200)

    def test_add_user(self):
        with app.test_client() as client:
            d = {"first-name":"Jan", "last-name": "Connors", "image-url":"www.google.com"}
            resp = client.post("/users/new", data=d, follow_redirects=True)
            html = resp.get_data(as_text = True)
            self.assertIn("Jan Connors", html)
            self.assertEqual(resp.status_code, 200)
            
    def test_edit_user(self):
        with app.test_client() as client:
            d = {"first-name":"Jan", "last-name": "Connors", "image-url":"www.google.com"}
            resp = client.post("/users/1/edit", data=d, follow_redirects=True)
            html = resp.get_data(as_text = True)
            self.assertIn("Jan Connors", html)
            self.assertEqual(resp.status_code, 200)
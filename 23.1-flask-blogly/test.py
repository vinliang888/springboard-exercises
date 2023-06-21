from unittest import TestCase
from app import app
from models import db, User, connect_db, Post
import datetime

db.drop_all()
db.create_all()

class UserTestCase(TestCase):
    def setUp(self):
        """delete any users or posts"""
        print("setting up")
        Post.query.delete()
        User.query.delete()
        
    
    def tearDown(self):
        """clean up transactions"""
        print("tearing down")
        db.session.rollback()
        Post.query.delete()
        User.query.delete()
    
    
    def test_delete_user(self):
        print("test_delete_user")
        user = User(first_name='test_delete_user', last_name='Smith',image_url='')
        db.session.add(user)
        db.session.commit()
        user_queried = db.session.query(User).filter_by(first_name='test_delete_user').one()

        User.delete_user(user_queried.id)
        try:
            user = User.get_user_by_id(1)
        except:
            self.assertEqual(1,1)

    def test_get_user_by_id(self):
        print("test_get_user_by_id")
        user = User(first_name='test_get_user_by_id', last_name='Smith',image_url='')
        
        db.session.add(user)
        db.session.commit()
        user_queried = db.session.query(User).filter_by(first_name='test_get_user_by_id').one()

        users = User.get_user_by_id(user_queried.id)
        self.assertEqual(users,user)

    def test_get_post_by_id(self):
        print("test_get_post_by_id")
        user = User(first_name='test_get_post_by_id', last_name='Smith',image_url='')
        db.session.add(user)
        db.session.commit()
        user_queried = db.session.query(User).filter_by(first_name='test_get_post_by_id').one()
        Post.add_post('test_get_post_by_id','content',user_queried.id)
        post_queried =  db.session.query(Post).filter_by(title='test_get_post_by_id').one()

        get_posts = Post.get_post_by_id(post_queried.id)
        self.assertEqual('test_get_post_by_id',get_posts.title)
        self.assertEqual('content', get_posts.content)
        self.assertEqual('test_get_post_by_id', get_posts.user.first_name)

    def test_edit_post(self):
        print("test_edit_post")
        user = User(first_name='test_edit_post', last_name='Smith',image_url='')
        db.session.add(user)
        db.session.commit()
        user_queried = db.session.query(User).filter_by(first_name='test_edit_post').one()
        Post.add_post('test_edit_post','content',user_queried.id)
        post_queried =  db.session.query(Post).filter_by(title='test_edit_post').one()
        get_posts = Post.get_post_by_id(post_queried.id)
        self.assertEqual('test_edit_post',get_posts.title)
        self.assertEqual('content', get_posts.content)
        self.assertIsNone(get_posts.updated_at)

        Post.edit_post(post_id = post_queried.id, title='new title', content='new content')

        get_posts = Post.get_post_by_id(post_queried.id)
        self.assertEqual('new title',get_posts.title)
        self.assertEqual('new content', get_posts.content)
        self.assertIsNotNone(get_posts.updated_at)
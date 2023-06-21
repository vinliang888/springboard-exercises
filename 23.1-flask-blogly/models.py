"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

def connect_db(app):
    with app.app_context():
        db.app = app
        db.init_app(app)

class User(db.Model):
    """User Model"""

    __tablename__ = "users"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    
    first_name = db.Column(db.String,
                           nullable=False)

    last_name = db.Column(db.String,
                          nullable=False)
    
    image_url = db.Column(db.String,
                          nullable=True)

    @classmethod
    def get_all_users(clss):
        return db.session.execute(db.select(clss).order_by(clss.last_name, clss.first_name)).scalars()

    @classmethod
    def get_user_by_id(clss, user_id):
        return db.get_or_404(clss,user_id)
    
    @classmethod
    def add_user(clss, first_name,last_name,image_url):
        db.session.add(clss(first_name=first_name, last_name=last_name, image_url=image_url))
        db.session.commit()
    
    @classmethod
    def delete_user(clss, user_id):
        user = clss.get_user_by_id(user_id)
        for post in user.posts:
            Post.delete_post_by_id(post.id)
        db.session.delete(clss.get_user_by_id(user_id))
        db.session.commit()
    
    @classmethod
    def edit_user(clss, user_id, first_name,last_name,image_url):
        user = clss.get_user_by_id(user_id)
        user.first_name = first_name
        user.last_name = last_name
        user.image_url = image_url
        db.session.commit()
    
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
    
    posts = db.relationship('Post')

    def __repr__(self):
        return f"User(id: {self.id}, name:{self.get_full_name()})"

class Post(db.Model):
    """Post Model"""

    __tablename__ = "posts"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    
    title = db.Column(db.String,
                           nullable=False)

    content = db.Column(db.String,
                          nullable=False)
    
    created_at = db.Column(db.String,
                          nullable=False)
    
    updated_at = db.Column(db.String,
                           nullable=True)
    
    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.id'),
                        nullable=False)

    def display_created_at(self):
        dt = datetime.datetime.strptime(self.created_at,"%Y-%m-%d %H:%M:%S.%f")
        return dt.strftime("%B %-d, %Y %I:%M %p")
    
    def display_updated_at(self):
        dt = datetime.datetime.strptime(self.updated_at,"%Y-%m-%d %H:%M:%S.%f")
        return dt.strftime("%B %-d, %Y %I:%M %p")

    @classmethod
    def add_post(clss, title,content,user_id):
        d = datetime.datetime.now()
        db.session.add(clss(title=title, content=content, created_at=d, user_id=user_id))
        db.session.commit()
    
    @classmethod
    def get_post_by_id(clss,post_id):
        return db.get_or_404(clss,post_id)
    
    @classmethod
    def get_all_posts_by_user_id(clss,user_id):
        posts = db.session.execute(db.select(clss).filter_by(user_id=user_id).order_by(clss.created_at)).scalars()
        return posts

    @classmethod
    def delete_post_by_id(clss,post_id):
        db.session.delete(clss.get_post_by_id(post_id))
        db.session.commit()

    


    
    @classmethod
    def edit_post(clss, post_id, title,content):
        d = datetime.datetime.now()
        post = clss.get_post_by_id(post_id)
        post.title = title
        post.content = content
        post.updated_at = d
        db.session.commit()

    def __repr__(self):
        return f"Post(id: {self.id}, title:{self.title}, created at: {self.created_at})"

    user = db.relationship('User')

"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

def connect_db(app):
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
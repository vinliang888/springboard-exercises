from models import db, User
from app import app

db.drop_all()
db.create_all()

User.query.delete()

user_js = User(first_name='Jan', last_name='Smith', image_url='https://shelleefisher.com/site/wp-content/uploads/2020/07/KLMinor03.jpg')
user_vl = User(first_name='Vincent', last_name='Lane', image_url='https://images.squarespace-cdn.com/content/v1/631ba8eed2196a6795698665/3690ca61-6a9d-4c93-a2a5-83a5f2aa1648/2022-08-16-Trinet-0540-Martinez-Juan.jpg?format=750w')

db.session.add(user_js)
db.session.add(user_vl)

db.session.commit()
"""Blogly application."""

from flask import Flask, request, render_template, jsonify, redirect, flash, session
from models import db, connect_db, User, Post
import os
import sys 

def get_database_uri():
    if "python3 -m unittest" in sys.argv:
        return 'postgresql:///blogly-test'
    return 'postgresql:///blogly'

app = Flask(__name__)
app.app_context().push()

app.config['SQLALCHEMY_DATABASE_URI'] = get_database_uri()
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "oh-so-secret"

connect_db(app)


@app.route('/')
def open_root():
    return redirect('/users')

@app.route('/users')
def list_users():
    all_users = User.get_all_users()
    return render_template('all-users.html', users = all_users)

@app.route('/users/<user_id>')
def display_user(user_id):
    user = User.get_user_by_id(user_id)
    return render_template('user.html', user = user)

@app.route('/users/<user_id>/edit')
def edit_user_form(user_id):
    user = User.get_user_by_id(user_id)
    return render_template('edit-user.html', user = user)

@app.route('/users/<user_id>/delete', methods = ['POST'])
def delete_user(user_id):
    user = User.get_user_by_id(user_id)
    full_name = user.get_full_name()
    User.delete_user(user_id)
    flash(f"User {full_name} deleted.", 'success')
    return redirect('/users')

@app.route('/users/new')
def display_new_user_page():
    return render_template('add-user.html')

@app.route('/users/new', methods = ['POST'])
def add_new_user():
    first_name = request.form.get("first-name")
    last_name = request.form.get("last-name")
    image_url = request.form.get("image-url")
    User.add_user(first_name, last_name, image_url)
    flash(f"User {first_name} {last_name} added.", 'success')
    return redirect('/users')

@app.route('/users/<user_id>/edit', methods = ['POST'])
def edit_user(user_id):
    first_name = request.form.get("first-name")
    last_name = request.form.get("last-name")
    image_url = request.form.get("image-url")
    User.edit_user(user_id, first_name, last_name, image_url)
    flash(f"User {first_name} {last_name} edited.", 'success')
    return redirect('/users')

@app.route('/posts/<post_id>')
def display_post(post_id):
    post = Post.get_post_by_id(post_id)
    return render_template('post.html', post = post)

@app.route('/users/<user_id>/posts/new')
def display_add_post_page(user_id):
    user = User.get_user_by_id(user_id)
    return render_template('add-post.html', user = user)

@app.route('/users/<user_id>/posts/new', methods = ['POST'])
def add_post(user_id):
    user = User.get_user_by_id(user_id)
    title = request.form.get("title")
    content = request.form.get("content")
    Post.add_post(title, content, user.id)
    flash(f"Post {title} added.", 'success')
    return redirect(f'/users/{user_id}')

@app.route('/posts/<post_id>/edit')
def display_edit_post_page(post_id):
    post = Post.get_post_by_id(post_id)
    return render_template('edit-post.html', post = post)

@app.route('/posts/<post_id>/edit', methods=['POST'])
def edit_post(post_id):
    title = request.form.get("title")
    content = request.form.get("content")
    Post.edit_post(post_id, title, content)
    flash(f"Post {title} edited.", 'success')
    return redirect(f'/posts/{post_id}')

@app.route('/posts/<post_id>/delete', methods = ['POST'])
def delete_post(post_id):
    post = Post.get_post_by_id(post_id)
    title = post.title
    user = post.user
    Post.delete_post_by_id(post_id)
    flash(f"Post {title} deleted.", 'success')
    return redirect(f'/users/{user.id}')
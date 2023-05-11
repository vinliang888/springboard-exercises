from boggle import Boggle
from flask import Flask, request, render_template, jsonify, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

app.config['SECRET_KEY'] = "oh-so-secret"
debug = DebugToolbarExtension(app)


boggle_game = Boggle()

app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

@app.route('/')
def new_game():
    """Show root page with new board"""   
    new_board = boggle_game.make_board() 
    session['board'] = new_board
    return render_template('board.html')

@app.route('/check-word', methods = ['POST'])
def check_word():
    """handle POST request from front-end to check validity of word and return result"""
    word_to_find = request.form['wordToFind']    
    result = boggle_game.check_valid_word(session['board'],word_to_find)
    result_dict = {"result": result}
    return jsonify(result_dict)

@app.route('/end-game', methods = ['POST'])
def end_game():
    """increment number of times the game has been played and return to the front-end to update the page"""
    num_times_played = session.get('num_times_played', 0)
    num_times_played += 1
    session['num_times_played'] = num_times_played
    num_times_played_dict = {'num_times_played': num_times_played}
    return jsonify(num_times_played_dict)
from flask import Flask, request, render_template, jsonify, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from surveys import Survey, Question, satisfaction_survey, personality_quiz, surveys
app = Flask(__name__)

app.config['SECRET_KEY'] = "oh-so-secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)



@app.route('/')
def open_root():
    session['responses'] = []
    return render_template("survey_title.html", survey_title=satisfaction_survey.title, survey_instructions=satisfaction_survey.instructions)

@app.route('/questions/<question_index>')
def display_question(question_index):
    questions_answered = len(session['responses'])
    try:
        question_index = int(question_index)
        if question_index != questions_answered:
            flash("Invalid link! Redirected to where you left off.", 'warning')
            return redirect(f"/questions/{questions_answered}")
    except:
        flash("Invalid link! Redirected to where you left off.", 'warning')
        return redirect(f"/questions/{questions_answered}")
    
    if len(satisfaction_survey.questions) > question_index:
        curr_question = satisfaction_survey.questions[question_index]
        return render_template("survey_question.html", question = curr_question.question, choices=curr_question.choices)
    else:
        return redirect('/thank-you-page')
    
@app.route('/answer', methods = ['POST'])
def redirect_answer():
    responses = session['responses']
    question_index = len(responses)
    curr_question = satisfaction_survey.questions[question_index]
    if len(request.form) == 0:
        flash("No response selected! Please select a response.", 'error')
    else:
        ans_dict = {'question' : curr_question.question, 'answer': request.form['radio']}        
        responses.append(ans_dict)
        session['responses'] = responses
    return redirect(f'/questions/{len(responses)}')

@app.route('/thank-you-page')
def open_thank_you():
    responses = session['responses']
    if len(satisfaction_survey.questions) > len(responses):
        flash("Survey incomplete! Redirected to where you left off.", 'error')
        return redirect(f'/questions/{len(responses)}')
    else:
        return render_template("thank-you-page.html")
from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
from stories import Story

app = Flask(__name__)

app.config['SECRET_KEY'] = "oh-so-secret"

debug = DebugToolbarExtension(app)

STORY = Story(
    ["place", "noun", "verb", "adjective", "plural_noun"],
    """Once upon a time in a long-ago {place}, there lived a
       large {adjective} {noun}. It loved to {verb} {plural_noun}."""
)


@app.route('/')
def generate_story_prompts():
    return render_template("story-generator.html", prompts = STORY.prompts)

@app.route('/story')
def create_story():
    story_text = STORY.generate(request.args.to_dict())
    return render_template("story-display.html", story=story_text)
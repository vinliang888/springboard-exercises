from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    def test_new_game(self):
        with app.test_client() as client:
            res = client.get('/')
            html = res.get_data(as_text=True)
            html = "".join(html.split())
            board_generated = session['board']
            board_html = ''
            for row in board_generated:
                board_html += '<tr>'
                for letter in row:
                    board_html += f'<td>{letter}</td>'
                board_html += '</tr>'
            self.assertIn(board_html,html)

    def test_check_word(self):
            with app.test_client() as client:
                with client.session_transaction() as change_session:
                    change_session['board'] = ['c,a,t,g,h'.upper().split(','), 
                                               'a,n,o,e,h'.upper().split(','),
                                               't,t,o,e,q'.upper().split(','),
                                               't,t,o,e,q'.upper().split(','),
                                               't,t,o,e,q'.upper().split(',')]
                res = client.post('/check-word', data={'wordToFind' : 'cat'})
                self.assertEqual(res.json['result'],"ok")
                res2 = client.post('/check-word', data={'wordToFind' : 'cat'}) 
                self.assertEqual(res2.json['result'],"already-found")
                result3 = client.post('/check-word', data={'wordToFind' : 'dog'})
                self.assertEqual(result3.json['result'],"not-on-board")
                result4 = client.post('/check-word', data={'wordToFind' : 'doasdg'})
                self.assertEqual(result4.json['result'],"not-word")

    def test_end_game(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['num_times_played'] = 90
            res = client.post('/end-game', data={'finalScore' : 20})
            self.assertEqual(res.json['num_times_played'],91)
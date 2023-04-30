# Put your app in here.
from operations import add, sub, mult, div

from flask import Flask,request

app = Flask(__name__)




@app.route('/<operation>')
def run_operation(operation):
    a = float(request.args['a'])
    b = float(request.args['b'])
    operation_dict = {
        'add': add(a,b),
        'sub': sub(a,b),
        'mult': mult(a,b),
        'div': div(a,b)
    }

    # if operation =='add':
    #     return str(add(a,b))
    # elif operation == 'sub':
    #     return str(sub(a,b))
    # elif operation =='mult':
    #     return str(mult(a,b))
    # elif operation =='div':
    #     return str(div(a,b))
    # else:
    #     return f"Operation {operation} doesn't exist"
    return str(operation_dict.get(operation, f"Operation {operation} doesn't exist"))

from models.todo import Todo
from routes import *

import json

main = Blueprint('api', __name__)


@main.route('/')
def index():
    ts = Todo.query.all()
    return render_template('todo_index.html', todo_list=ts)


@main.route('/add', methods=['POST'])
def add():
    form = request.form
    t = Todo(form)
    r = {
        'data': []
    }
    if t.valid():
        t.save()
        r['success'] = True
        r['data'] = t.json()
    else:
        r['success'] = False
        r['message'] = 'Todo 不能为空'
    return json.dumps(r, ensure_ascii=False)



@main.route('/edit/<int:id>', methods=['POST'])
def edit(id):
    t = Todo.query.filter_by(id=id).first()
    log('task1', t.task)
    form = request.form
    nt = Todo(form)
    r = {
        'data': []
    }
    if nt.valid():
        t.task = form.get('task')
        t.save()
        log('task2', t.task)
        r = {
            'success': True,
            'data': t.json(),
        }
    else:
        r['success'] = False
        r['message'] = 'Todo 不能为空'
    return json.dumps(r, ensure_ascii=False)


@main.route('/delete/<int:id>')
def delete(id):
    t = Todo.query.filter_by(id=id).first()
    t.delete()
    r = {
        'success': True,
        'data': t.json(),
    }
    return json.dumps(r, ensure_ascii=False)


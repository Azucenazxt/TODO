import time

from . import ModelMixin
from . import db
from . import timestamp


class Todo(db.Model, ModelMixin):
    __tablename__ = 'todos'
    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String())
    created_time = db.Column(db.Integer, default=0)
    user_id = db.Column(db.Integer)

    def __init__(self, form):
        self.task = form.get('task', '')
        self.created_time = timestamp()

    # def update(self, form):
    #     self.task = form.get('task', '')
    #     self.save()

    def valid(self):
        return len(self.task) > 0

    def json(self):
        d = {
            'id': self.id,
            'task': self.task,
            'created_time': self.created_time,
        }
        return d
from functools import wraps

from flask import Blueprint
from flask import jsonify
from flask import redirect
from flask import render_template
from flask import request
from flask import send_from_directory
from flask import session
from flask import url_for
from flask import abort

# from models.board import Board
# from models.user import User

# 不加这一行会导致 mapper exception
#
# main = Blueprint('main', __name__)
#
#
# @main.route('/')
# def index_view():
#     return redirect(url_for('todo.index'))

import time


def timestamp():
    format = '%Y/%m/%d %H:%M:%S'
    value = time.localtime(int(time.time()))
    dt = time.strftime(format, value)
    return dt

def log(*args, **kwargs):
    # 中文 windows 平台默认打开的文件编码是 gbk 所以需要指定一下
    with open('log.txt', 'a', encoding='utf-8') as f:
        # 通过 file 参数可以把输出写入到文件 f 中
        # 需要注意的是 **kwargs 必须是最后一个参数
        print(timestamp(), *args, file=f, **kwargs)
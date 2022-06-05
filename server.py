from flask import Flask, render_template, request, redirect, url_for, abort, flash, send_file
from flask_sqlalchemy import SQLAlchemy
from flask_ckeditor import CKEditor
import datetime as dt
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin, login_user, LoginManager, login_required, current_user, logout_user
from functools import wraps
from forms import LoginForm, PostForm
import itertools

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blogs.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'thisissecret'
app.config['CKEDITOR_ENABLE_CODESNIPPET'] = True

db = SQLAlchemy(app)
CKEditor(app)
login_manager = LoginManager(app)


class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(250), nullable=False)
    password = db.Column(db.String(250), nullable=False)
    name = db.Column(db.String(250), nullable=False)
    role = db.Column(db.String, nullable=False)
    posts = db.relationship('BlogPost', back_populates='author')


class BlogPost(db.Model):
    __tablename__ = 'blog_post'
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.String(250), db.ForeignKey('users.id'))
    author = db.relationship('User', back_populates='posts')
    title = db.Column(db.String(250), nullable=False)
    subtitle = db.Column(db.String(250), nullable=False)
    body = db.Column(db.String(250), nullable=False)
    date = db.Column(db.String(250), nullable=False)
    image = db.Column(db.String(250), nullable=False)
    tags = db.Column(db.String(250), nullable=True)


# def create_admin():
#     new_user = User(
#         email='gujie713@gmail.com',
#         name='Li Tao',
#         role='Admin',
#         password=generate_password_hash('password', method="pbkdf2:sha256", salt_length=8)
#     )
#     db.session.add(new_user)
#     db.session.commit()
#
#
# create_admin()


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


# admin-only decorator
def admin_only(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        if current_user.is_authenticated:
            if current_user.id == 1:
                return function(*args, **kwargs)
            else:
                return abort(403)
        else:
            return abort(403)

    return wrapper


@app.route('/', methods=['POST', 'GET'])
def home():
    if request.method == 'GET':
        return render_template('index.html')
    else:
        # contact function
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')

        # todo: implement send message function using smtplib
        print(name, email, message)

        return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    login_form = LoginForm()
    if login_form.validate_on_submit():
        email = login_form.email.data
        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, login_form.password.data):
                login_user(user)
                return redirect(url_for('home'))
            else:
                flash("Incorrect password")
                return render_template('login.html', form=login_form)
        else:
            flash("Email address you've entered does not exist in our database.")
            return render_template('login.html', form=login_form)
    return render_template('login.html', form=login_form)


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))


@app.route('/make_post', methods=['GET', 'POST'])
@admin_only
def make_post():
    form = PostForm()
    if form.validate_on_submit():
        kwargs = dict(itertools.islice(form.data.items(), 5))
        kwargs['date'] = dt.datetime.now().strftime('%m/%d/%Y')
        kwargs['author_id'] = current_user.id
        new_post = BlogPost(**kwargs)
        db.session.add(new_post)
        db.session.commit()
        return redirect(url_for('all_posts'))
    return render_template('make_post.html', form=form)


@app.route('/all_posts')
def all_posts():
    page = request.args.get('page', 1, type=int)
    posts = BlogPost.query.order_by(BlogPost.id.desc()).paginate(page=page, per_page=4)

    return render_template('posts.html', posts=posts)


@app.route('/posts/<int:post_id>', methods=['POST', 'GET'])
def view_post(post_id):
    post = BlogPost.query.get(post_id)

    return render_template('view_post.html', post=post)


@app.route('/delete/<int:post_id>')
@admin_only
def delete(post_id):
    post = BlogPost.query.get(post_id)

    db.session.delete(post)
    db.session.commit()

    return redirect(url_for('all_posts'))


@app.route('/tag')
def tag_articles():
    page = request.args.get('page', 1, type=int)
    tag = request.args.get('tag')
    posts = BlogPost.query.where(BlogPost.tags.like(f"%{tag}%")).order_by(BlogPost.id.desc()).paginate(page=page,
                                                                                                       per_page=4)

    return render_template('posts.html', posts=posts, tag=tag)


@app.route('/download')
def download_file():
    path = './static/files/Li_resume.pdf'
    return send_file(path, as_attachment=True)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

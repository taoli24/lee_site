from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField
from wtforms.validators import DataRequired, URL, Email, Length
from flask_ckeditor import CKEditorField


class PostForm(FlaskForm):
    title = StringField(label='Blog Post Title', validators=[DataRequired()], render_kw={'class': 'form-input', 'placeholder': 'title'})
    subtitle = StringField(label='Subtitle', validators=[DataRequired()], render_kw={'class': 'form-input', 'placeholder': 'subtitle'})
    tags = StringField(label='Tags', validators=[DataRequired()], render_kw={'class': 'form-input', 'placeholder': 'tags separate by space'})
    image = StringField(label='Blog Image URL', validators=[DataRequired(), URL()], render_kw={'class': 'form-input', 'placeholder': 'image URL'})
    body = CKEditorField(label='Blog Content', validators=[DataRequired()], render_kw={'class': 'form-input ck-text', 'placeholder': 'write stuff here'})
    submit = SubmitField(label='Submit Post', render_kw={'class': 'btn btn-glow'})


class LoginForm(FlaskForm):
    email = StringField(label='Email', validators=[DataRequired(), Email()],
                        render_kw={'placeholder': 'email', 'class': 'form-input'})
    password = PasswordField(label='Password', validators=[DataRequired()],
                             render_kw={'placeholder': 'password', 'class': 'form-input'})
    submit = SubmitField(label='LOGIN', render_kw={'class': 'btn btn-glow'})

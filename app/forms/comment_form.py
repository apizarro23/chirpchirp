from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    user_id = IntegerField("User_id", validators=[DataRequired()])
    chirp_id = IntegerField("Chirp_id", validators=[DataRequired()])
    comment_content = StringField("Comment_content", validators=[DataRequired()])
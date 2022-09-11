from xml.dom import ValidationErr
from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired


class ChirpForm(FlaskForm):
    user_id = IntegerField("User_id", validators=[DataRequired()])
    chirp_content = StringField("Chirp", validators=[DataRequired(message="Chirp content required!")])
    image_url = StringField("Image_url")
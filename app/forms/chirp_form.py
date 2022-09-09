from xml.dom import ValidationErr
from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

# def empty_chirp(form, field):
#     chirp_content = field.data
#     if chirp_content == "":
#         raise ValidationError("Cannot send empty chirp!!!")


class ChirpForm(FlaskForm):
    user_id = IntegerField("User_id", validators=[DataRequired()])
    chirp_content = StringField("Chirp", validators=[DataRequired()])
    image_url = StringField("Image_url")
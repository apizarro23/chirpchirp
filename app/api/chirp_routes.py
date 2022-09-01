from crypt import methods
from email.mime import image
import json
from flask import Blueprint, request, jsonify
from app.models import chirp, db, Chirp, Comment
from app.forms import chirp_form, comment_form
from flask_login import login_required
from .auth_routes import validation_errors_to_error_messages

chirp_routes = Blueprint("chirps", __name__)

@chirp_routes.route("/")
@login_required
# list all chirps
def all_chirps():
  chirps = [chirp.to_dict() for chirp in Chirp.query.all()]
  return jsonify(chirps)


@chirp_routes.route("/<int:chirp_id>")
@login_required
# get chirp by id
def chirp_by_id(chirp_id):
  chirp = Chirp.query.get(chirp_id)

  if not chirp:
    return "404: Chirp Non-Existent"
    
  return jsonify(chirp.to_dict())


@chirp_routes.route("/", methods=["POST"])
@login_required
# create a chirp
def create_chirp():
    new_chirp = chirp_form.ChirpForm()

    new_chirp["csrf_token"].data = request.cookies["csrf_token"]
    
    user_id = new_chirp.data["user_id"]
    chirp_content = new_chirp.data["chirp_content"]
    image_url = new_chirp.data["image_url"]

    if new_chirp.validate_on_submit():
        chirp = Chirp(
            user_id = user_id,
            chirp_content = chirp_content,
            image_url = image_url
        )
    
        db.session.add(chirp)
        db.session.commit()
        return jsonify[chirp.to_dict()], 201

    else:
        return {"errors": validation_errors_to_error_messages(new_chirp.errors)}, 400


@chirp_routes.route("/<chirp_id>", methods=["PUT"])
@login_required
# edit a chirp
def edit_chirp(chirp_id):
    chirp = Chirp.query.get(chirp_id)
    update = request.json

    if not chirp:
        return "404: This buzz does not exist."

    if "chirp_content" in update.keys():
        chirp.chirp_content = update["chirp_content"]
    
    if "image_url" in update.keys():
        chirp.image_url = update["image_url"]

    db.session.commit()
    
    return jsonify(chirp.to_dict()), 200


@chirp_routes.route("<chirp_id>", methods=["DELETE"])
@login_required
# delete a chirp
def delete_chirp(chirp_id):
    chirp = Chirp.query.get(chirp_id)

    db.session.delete(chirp)

    db.session.commit()

    return jsonify({
        "message": "Chirp deleted",
        "status_code": 200
    }), 200
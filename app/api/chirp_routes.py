from urllib import response
from flask import Blueprint, request, jsonify
from app.models import chirp, comment, db, Chirp, Comment
from app.forms import chirp_form, comment_form, ChirpForm, CommentForm
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages

chirp_routes = Blueprint("chirps", __name__)

@chirp_routes.route("/")
# @login_required
# list all chirps
def all_chirps():
  chirps = [chirp.to_dict() for chirp in Chirp.query.all()]
  return jsonify(chirps)


@chirp_routes.route("/<int:chirp_id>")
# @login_required
# get chirp by id
def chirp_by_id(chirp_id):
  chirp = Chirp.query.get(chirp_id)

  if not chirp:
    return "404: Chirp Non-Existent"
    
  return jsonify(chirp.to_dict())


@chirp_routes.route("/user/<int:user_id>", methods=["GET"])
# @login_required
# get chirp by user_id
def chirp_by_user_id(user_id):
    chirps = Chirp.query.filter(Chirp.user_id == user_id).all()

    # chirps = [chirp.to_dict() for chirp in Chirp.query.get(user_id)]
    response = [chirp.to_dict() for chirp in chirps]
    res = {"chirps": response}
    return res


@chirp_routes.route("/", methods=["POST"])
# @login_required
# create a chirp
def create_chirp():
    new_chirp = ChirpForm()

    new_chirp["csrf_token"].data = request.cookies["csrf_token"]
    
    user_id = new_chirp.data["user_id"]
    chirp_content = new_chirp.data["chirp_content"]
    image_url = new_chirp.data["image_url"]

    if new_chirp.validate_on_submit() and current_user.id == user_id:
        chirp = Chirp(
            user_id = user_id,
            chirp_content = chirp_content,
            image_url = image_url
        )
    
        db.session.add(chirp)
        db.session.commit()
        return jsonify(chirp.to_dict()), 201

    else:
        return {"errors": validation_errors_to_error_messages(new_chirp.errors)}, 400


# @chirp_routes.route("/<chirp_id>/", methods=["PUT"])
# # @login_required
# # edit a chirp
# def edit_chirp(chirp_id):
#     chirp = Chirp.query.get(chirp_id)
#     update = request.json

#     if not chirp:
#         return "404: This Chirp does not exist."

#     if "chirp_content" in update.keys():
#         chirp.chirp_content = update["chirp_content"]
    
#     if "image_url" in update.keys():
#         chirp.image_url = update["image_url"]

#     db.session.commit()
    
#     return jsonify(chirp.to_dict()), 200

@chirp_routes.route("/<chirp_id>", methods=["PUT"])
def update_chirp(chirp_id):
    chirp = Chirp.query.get(chirp_id)

    if not chirp:
        return "Error 404: This Chirp does not exist"
    
    updated_chirp = ChirpForm()

    updated_chirp['csrf_token'].data = request.cookies['csrf_token']
    if updated_chirp.validate_on_submit():
        chirp_content = updated_chirp.data['chirp_content']
        image_url = updated_chirp.data['image_url']
        # display_comments = updated_chirp.data['display_comments']

        chirp.chirp_content = chirp_content
        chirp.image_url = image_url
        # chirp.display_comments = display_comments

        db.session.commit()
        return chirp.to_dict()
    return {'errors': validation_errors_to_error_messages(updated_chirp.errors)}, 401


@chirp_routes.route("/<chirp_id>/", methods=["DELETE"])
# @login_required
# delete a chirp
def delete_chirp(chirp_id):
    chirp = Chirp.query.get(chirp_id)

    db.session.delete(chirp)

    db.session.commit()

    return jsonify({
        "message": "Chirp deleted",
        "status_code": 200
    }), 200


@chirp_routes.route("/<chirp_id>/comments", methods=["GET"])
# get comments by chirp_id
def get_comments_by_chirp_id(chirp_id):
    comments = Comment.query.filter(Comment.chirp_id == chirp_id).all()

    if not comments:
        return "404: Comments do not exist for this chirp"

    response = [comment.to_dict() for comment in comments]
    res = {"comments": response}
    return res


@chirp_routes.route("/<chirp_id>/comments", methods=["POST"])
# @login_required
# create a comment
def create_comment(chirp_id):
    new_comment = comment_form.CommentForm()

    new_comment["csrf_token"].data = request.cookies["csrf_token"]
    
    user_id = new_comment.data["user_id"]
    comment_content = new_comment.data["comment_content"]
    chirp_id = new_comment.data["chirp_id"]

    if new_comment.validate_on_submit():
        comment = Comment(
            user_id = user_id,
            comment_content = comment_content,
            chirp_id = chirp_id
        )
    
        db.session.add(comment)
        db.session.commit()
        return jsonify(comment.to_dict()), 201

    else:
        return {"errors": validation_errors_to_error_messages(new_comment.errors)}, 400


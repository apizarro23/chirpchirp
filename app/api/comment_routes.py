from crypt import methods
from turtle import update
from flask import Blueprint, request, jsonify
from app.models import db, Comment
from app.forms import comment_form
from  flask_login import current_user
from .auth_routes import validation_errors_to_error_messages


comment_routes = Blueprint("comments", __name__)


@comment_routes.route("</comment_id>", methods=["PUT"])
# edit a comment
def edit_comment(comment_id):
    form = comment_form.CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    comment = Comment.query.get(comment_id)
    update = request.json

    if "comment_content" in update.keys():
        comment.comment_content = update["comment_content"]

        db.session.commit()
        return jsonify(comment.to_dict()), 200


@comment_routes.route("</comment_id>", methods=["PUT"])
# delete a comment
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)

    db.session.delete(comment)
    
    db.session.commit()

    return jsonify({
        "message": "Comment deleted",
        "status_code": 200
    }), 200
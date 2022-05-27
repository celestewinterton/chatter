from flask import Blueprint, jsonify, session, request
from app.models import User, Group, db
from ..utils import form_validation_errors
from flask_login import current_user


group_routes = Blueprint("groups", __name__)


# get all group threads by user
@group_routes.route("/")
def all_groups():
    user = User.query.get(current_user.get_id)
    return user.to_dict().subscribed_groups


# view group thread by group ID
@group_routes.route("/<int:groupId>")
def get_group(groupId):
    groups = Group.query.all()
    return [group.to_dict() for group in groups if group.id == groupId]


# create new group message thread
@group_routes.route("/", methods=["POST"])
def create_group():
    pass


# delete group/hide group??
@group_routes.route("/<int:groupId>", methods=["PUT"])
def hide_group(groupId):
    pass

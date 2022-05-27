from flask import Blueprint, jsonify, session, request
from app.models import User, Group, db
from ..utils import form_validation_errors
from flask_login import current_user
from ..forms import NewGroupForm


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
    form = NewGroupForm()

    if form.validate_on_submit():
        # create new group with userId as owner_id
        user = User.query.get(current_user.get_id())
        group = Group({"owner_id": user})
        db.session.add(group)
        db.session.commit()
        # create group_subscriptions with group_id and user_id
        # for member in form.data["members"]:
        #     new_member = User.query.filter(User.username == member)


# delete group/hide group??
@group_routes.route("/<int:groupId>", methods=["PUT"])
def hide_group(groupId):
    pass

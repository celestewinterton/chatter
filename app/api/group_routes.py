from tabnanny import check
from flask import Blueprint, jsonify, redirect, session, request
from app.models import User, Group, db
from ..utils import form_validation_errors
from ..forms import NewGroupForm
from flask_login import current_user

group_routes = Blueprint("groups", __name__)


# get all group threads by user
@group_routes.route("")
def all_groups():
    all_groups = Group.query.all()
    return {'groups': [Group.to_dict() for group in all_groups]}


# view group thread by group ID
@group_routes.route("/<int:groupId>")
def get_group(groupId):
    groups = Group.query.all()
    return [group.to_dict() for group in groups if group.id == groupId]


# create new group message thread
@group_routes.route("", methods=["POST"])
def create_group():
    form = NewGroupForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    params = {
        'owner_id': current_user.id
    }
    members = form.data["members"]
    members_list = members.split(',')
    strippedMembers = [member.strip() for member in members_list]

    # groups = Group.query.all()
    # groups_as_dicts = [{index: [user['username'] for user in (groups[index].to_dict())['users']]}
    #                    for index, group in enumerate(groups)]
    # for index, group in enumerate(groups_as_dicts):
    #     if group[index].sort() == [*strippedMembers, current_user.username].sort():
    #         return redirect("/")

    # print("C U R R E N T   U S E R  ======> ")

    if form.validate_on_submit():
        new_group = Group(**params)
        new_group.users.append(current_user)
        for member in strippedMembers:
            user = User.query.filter(User.username == member).first()
            print(user)
            new_group.users.append(user)

        db.session.add(new_group)
        db.session.commit()
        return new_group.to_dict()
    return {'errors': form_validation_errors(form.errors)}, 401
#

# delete group/hide group??


@group_routes.route("/<int:groupId>", methods=["PUT"])
def hide_group(groupId):
    pass

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
    return {'groups': [group.to_dict() for group in all_groups]}


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
    strippedMembers = [int(member.strip()) for member in members_list]


    def validate_group(input):
        groups = Group.query.all()
        groups_as_dicts = [group.compare_dict() for group in groups]
        for group in groups_as_dicts:
            print('GROUP     ', group['user_id'] == input)
            print('INPUT      ', input)
            if group['user_id'] == input:
                return True




    if form.validate_on_submit():
        if validate_group(strippedMembers):
            return {'errors': 'group already exists'}, 401
        else:
            new_group = Group(**params)
            new_group.users.append(current_user)
            for member in strippedMembers:
                user = User.query.filter(User.id == member).first()
                new_group.users.append(user)

            db.session.add(new_group)
            db.session.commit()
            return new_group.to_dict()
    return {'errors': form_validation_errors(form.errors)}, 401


@group_routes.route("/<int:groupId>", methods=["PUT"])
def edit_group(groupId):
    # pass
    form = NewGroupForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # user_id = form.data["user_id"]
    members = form.data["members"]
    print(">>>>>>>", members)
    members_list = members.split(',')
    strippedMembers = [int(member.strip()) for member in members_list]

    def validate_group(input):
        groups = Group.query.all()
        groups_as_dicts = [group.compare_dict() for group in groups]
        for group in groups_as_dicts:
            print('GROUP     ', group['user_id'] == input)
            print('INPUT      ', input)
            if group['user_id'] == input:
                return True

    if form.validate_on_submit():
        if validate_group(strippedMembers):
            return {'errors': 'group already exists'}, 401
        else:
            edit_group = Group.query.get(groupId)
            # edit_group.users.append(current_user)
            for member in strippedMembers:
                user = User.query.filter(User.username == member).first()
                edit_group.users.append(user.id)

            db.session.add(edit_group)
            db.session.commit()
            return edit_group.to_dict()
    return {'errors': form_validation_errors(form.errors)}, 401


@group_routes.route("/<int:groupId>", methods=["DELETE"])
def delete_group(groupId):
    remove_group = Group.query.get(groupId)
    db.session.delete(remove_group)
    db.session.commit()
    return {'id': groupId}

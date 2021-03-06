from tabnanny import check
import collections
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
    strippedMembers = [member.strip() for member in members_list]
    print('---------------------', strippedMembers)
    intMembers = [int(member) for member in strippedMembers]
    intMembers.append(current_user.id)

    def validate_group(input):
        groups = Group.query.all()
        groups_as_dicts = [group.compare_dict() for group in groups]
        for group in groups_as_dicts:
            if collections.Counter(group['user_id']) == collections.Counter(input):
                return True




    if form.validate_on_submit():
        if validate_group(intMembers):
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
    form = NewGroupForm()
    group = Group.query.get(groupId)
    form['csrf_token'].data = request.cookies['csrf_token']
    members = form.data["members"]
    members_list = members.split(',')
    strippedMembers = [int(member.strip()) for member in members_list]
    intMembers = [int(member) for member in strippedMembers]
    group_dicty = group.compare_dict()
    group_list = group_dicty['user_id']
    group_list.append(int(members))

    def validate_group(input):
        groups = Group.query.all()
        groups_as_dicts = [group.compare_dict() for group in groups]
        for group in groups_as_dicts:
            print('lssldsakgnhdfjnbdf', group['user_id'])
            print('memeebebvfhsajdgkskhjgsfbjkgfhs', members)
            print('likdhgsfakjgfhkjdfsgbkljnfgd', input)
            print(collections.Counter(group['user_id']) == collections.Counter(input))
            if collections.Counter(group['user_id']) == collections.Counter(input):
                return True

    if form.validate_on_submit():
        if validate_group(group_list):
            return {'errors': 'group already exists'}, 401
        else:
            edit_group = Group.query.get(groupId)
            for member in strippedMembers:
                user = User.query.filter(User.id == member).first()
                edit_group.users.append(user)

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

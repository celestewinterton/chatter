# from flask import Blueprint
# from app.models.user import User

# search_routes = Blueprint('search', __name__)

# @search_routes.route('/users', methods=['GET'])
# def search_users():

#    users = User.query.filter(User.firstname.ilike(f'') | User.lastname.ilike(f'')).all()
#    return {"users": [user.to_dict() for user in users]}
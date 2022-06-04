from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
from app.models import Group

# def validate_group(input):
#     groups = Group.query.all()
#     groups_as_dicts = [group.compare_dict() for group in groups]
#     for group in groups_as_dicts:
#         print('group      ', group)
#         print('GROUP     ', group['user_id'] == input)
#         print('INPUT      ', input)
#         if group['user_id'] == input:
#             return True
#     return False


# def doesnt_exist(form, field):
#     members = field.data
#     print('--------------------', members)
#     print(validate_group(members))


class NewGroupForm(FlaskForm):
    members = StringField('To: ', validators=[DataRequired()])
    submit = SubmitField("Start DM")

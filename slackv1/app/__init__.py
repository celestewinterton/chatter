import os
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from .models import db
from .config import Config

app = Flask(__name__)

# Setup login manager

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://slackcess:password@localhost/slackcess_db'
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)
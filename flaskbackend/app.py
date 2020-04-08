from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api, reqparse
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import UserModel, FileModel, ProjectModel
from flask_cors import CORS
import os
import json

app = Flask(__name__)
CORS(app)
api = Api(app)

POSTGRES_URL="127.0.0.1:5432"
POSTGRES_USER="postgres"
POSTGRES_PW="sqladmin"
POSTGRES_DB="test"

DB_URL = 'postgresql+psycopg2://{user}:{pw}@{url}/{db}'.format(user=POSTGRES_USER,pw=POSTGRES_PW,url=POSTGRES_URL,db=POSTGRES_DB)

app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Create engine
engine = create_engine(DB_URL, echo=True)

# Create session
Session = sessionmaker(bind=engine)
s = Session()

from models import UserModel, FileModel, ProjectModel

class Projects(Resource):
    def get(self):
        projects = []
        for item in s.query(ProjectModel).all():
            projects.append({'id': item.id, 'name': item.name, 'startdate': item.startdate.strftime('%Y-%m-%d')})
        return {'projects': projects}

class ProjectDetail(Resource):
    def get(self, pid):
        users = []
        files = []
        for item in s.query(ProjectModel).filter(ProjectModel.id == pid).first().users:
            users.append({'id': item.id, 'name': item.name, 'email': item.email})
        for item in s.query(ProjectModel).filter(ProjectModel.id == pid).first().files:
            files.append({'id': item.id, 'name': item.name, 'typename': item.typename})
        return {'users': users, 'files': files}

api.add_resource(Projects, '/projects')
api.add_resource(ProjectDetail, '/project_detail/<pid>')

if __name__ == '__main__':
    app.run(debug=True)
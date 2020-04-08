from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Date, ForeignKey, Table

Base = declarative_base()

association_table = Table('association', Base.metadata,
    Column('user_id', Integer, ForeignKey('tbl_users.id')),
    Column('project_id', Integer, ForeignKey('tbl_projects.id'))    
)

class UserModel(Base):
    __tablename__ = 'tbl_users'
    # __table_args__ = {"schema": "test"}
    
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)
    
    projects = relationship("ProjectModel",
                         secondary=association_table,
                         backref="users")

    def __repr__(self):
        return '<User model {}>'.format(self.id)

class FileModel(Base):
    __tablename__ = 'tbl_files'
    # __table_args__ = {"schema": "test"}

    id = Column(Integer, primary_key=True)
    project_id = Column(Integer,
                     ForeignKey('tbl_projects.id'),
                     nullable=False)
    name = Column(String)
    typename = Column(String)
    
    def __repr__(self):
        return '<File model {}>'.format(self.id)

class ProjectModel(Base):
    __tablename__ = 'tbl_projects'
    # __table_args__ = {"schema": "test"}

    id = Column(Integer, primary_key=True)
    name = Column(String)
    startdate = Column(Date)

    files = relationship("FileModel", backref="project")
    
    
    def __repr__(self):
        return '<Project model {}>'.format(self.id)
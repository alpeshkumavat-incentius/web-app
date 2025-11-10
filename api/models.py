from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class RegisterUser(db.Model):
    __tablename__ = "register_users"
    id = db.Column(db.Integer, primary_key=True )
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True)
    mobile_no = db.Column(db.String(20))
    user_type = db.Column(db.String(20))
    password = db.Column(db.String(200))
    isLogin = db.Column(db.Boolean, default=False)
    

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "mobile_no": self.mobile_no,
            "user_type": self.user_type,
            "password" : self.password,
            "isLogin": self.isLogin
        }
   
        
class Students(db.Model):
    __tablename__ = "students"
    id = db.Column(db.Integer, primary_key=True )
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    enrollement_number = db.Column(db.String(100), unique=True)

    

    def to_dict(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "enrollement_number": self.enrollement_number,

        }
     




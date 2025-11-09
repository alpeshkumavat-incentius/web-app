from flask import Flask, request, jsonify, session
from flask_cors import CORS
from models import db, RegisterUser

app = Flask(__name__)
CORS(app,
     supports_credentials=True,
     origins=["http://localhost:9000"])

app.secret_key = 'my-session'

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:MyP%40ssw0rd123@127.0.0.1:3306/User'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

with app.app_context():
    db.create_all()
    
@app.route('/register', methods = ['POST'])
def register():
    data = request.json
    
    newUser = RegisterUser(
    name = data['name'],
    email = data['email'],
    mobile_no = data['mobileNo'],
    user_type = data['userType'],
    password = data['password']
    )
    
    db.session.add(newUser)
    db.session.commit()
    
    return jsonify({
        'ok':True,
        'msg':"User Register Successfully!"
    })
    
    
    
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    
   
    
    
    entry = RegisterUser.query.filter_by(email=data['email'], password=data['password'],user_type=data['userType']).first()
    
    
    if entry:
        
        session['email'] = data['email']
        session['userType'] = data['userType']
        
        user = entry.to_dict()
        
        entry.isLogin = True
        db.session.commit()
        
        
        return jsonify({
            'ok' : True,
            'msg' : "Welcome! you Login Successfully!!",
            'user' : user
        })
    
    
    return jsonify({
        'ok' : False,
        'msg' : "Enter Valid Credentials!!"
    })





@app.route('/logout', methods=['POST'])
def logout():
    
    session.pop("email", None)
    session.pop("userType", None)
    
    return jsonify({
        'ok' : True,
        'msg' : "Logged out"
    })



@app.route('/check-session', methods=['GET'])
def check_session():
    if 'email' in session and 'userType' in session:
        return jsonify({
            'ok' : True,
            'msg' : "Logged In",
            'userType' : session['userType']
        })
    
    return jsonify({
            'ok' : False,
            'msg' : "Logged Out"
        })

        

app.run(debug=True)
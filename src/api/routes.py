"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, send_file, send_from_directory
from api.models import db, User, Manager, Teacher, Course, Category, Orders, Trolley, Payment, Modules, Quizzes, AccessCourse
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash

import requests
import base64
import json
from sqlalchemy.exc import SQLAlchemyError
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, decode_token
from datetime import timedelta
from datetime import datetime
from flask_mail import Message
from app import mail
import os
import cloudinary
import cloudinary.uploader

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

#-----------------------CREACION DE USERS------------------------#
@api.route('/signup/user', methods=['POST'])
def create_signup_user():
    try:
        #Obtenermos los datos de los campos del body
        email =  request.json.get('email')
        password = request.json.get('password')
        is_user = request.json.get('isUser')
        name = request.json.get('name') 
        last_name = request.json.get('lastName')
        username = request.json.get('username')
        number_document = request.json.get('numberDocument')
        phone = request.json.get('phone')
        age = request.json.get('age')
        gender = request.json.get('gender')
        
        #Verificacion de campos vacios
        if not email or not password or not is_user or not name or not last_name or not username or not number_document or not phone or not age or not gender:
            return({"Error":"Email, password, is_user, name, last_name, username, number_document, phone, age and gender are required"}), 400
        
        #Verificacion de existencia de email en la base de datos
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"Error":"Email already exists."}), 409
        
        #Password encriptada
        password_hash = generate_password_hash(password)

        #User con password encriptada
        new_user = User(
            email=email,
            password=password_hash,
            is_user=is_user,
            name=name,
            last_name=last_name,
            username=username,
            number_document=number_document,
            phone=phone,
            age=age,
            gender=gender
        )
        db.session.add(new_user)
        db.session.commit()

        # Enviar correo de bienvenida
        msg = Message('Welcome to Our Platform', recipients=[email])
        msg.body = f"Hello {name},\n\nThank you for signing up on our platform. We're excited to have you on board!"
        mail.send(msg)

        return jsonify({"message":"Student has been Created Successfully", "access_to_user": new_user.serialize()}), 201

    except Exception as err:
        return jsonify({"Error":"Error in User Creation", "Msg": str(err)}), 500

@api.route('/signup/teacher', methods=['POST'])
def create_signup_teacher():
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        is_teacher = request.json.get('isTeacher')
        name = request.json.get('name')
        last_name = request.json.get('lastName')
        username = request.json.get('username')
        number_document = request.json.get('numberDocument')
        phone = request.json.get('phone')
        age = request.json.get('age')
        gender = request.json.get('gender')
        certificate_teacher = request.json.get('certificateTeacher')
        user_id = request.json.get('userId')

    
        # Check if any required field is None or empty
        if email is None or password is None or is_teacher is None or name is None or last_name is None or username is None or number_document is None or phone is None or age is None or gender is None:
            return jsonify({"Error": "email, password, is_teacher, name, last_name, username, number_document, phone, age, gender, certificate_teacher, user_id are required"}), 400
        
        existing_teacher = Teacher.query.filter_by(email=email).first()
        if existing_teacher:
            return jsonify({"Error": "Email already exists"}), 409
        
        password_hash = generate_password_hash(password)

        new_teacher = Teacher(
            email=email,
            password=password_hash,
            is_teacher=is_teacher,
            name=name,
            last_name=last_name,
            username=username,
            number_document=number_document,
            phone=phone,
            age=age,
            gender=gender,
            certificate_teacher=certificate_teacher,
            user_id=user_id
        )
        db.session.add(new_teacher)
        db.session.commit()

        # Enviar correo de bienvenida
        msg = Message('Welcome to Our Platform, TEACHER', recipients=[email])
        msg.body = f"Hello {name},\n\nThank you for signing up on our platform. We're excited to have you on board!"
        mail.send(msg)

        return jsonify({"message": "Teacher has been Created Successfully", "access_to_teacher": new_teacher.serialize()}), 201
    except Exception as e:
        return jsonify({"Error": "Error in Teacher Creation", "error code": str(e)}), 500

@api.route('/signup/manager', methods=['POST'])
def create_signup_manager():
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        is_manager = request.json.get('isManager')  
        name = request.json.get('name')
        last_name = request.json.get('lastName') 
        phone = request.json.get('phone')
        number_document = request.json.get('numberDocument')
        user_id = request.json.get('userId')  
        teacher_id = request.json.get('teacherId')  

        # Validar la longitud del correo electrónico
        if len(email) > 80:
            return jsonify({"Error": "Email too long"}), 400

        if not email or not password or not is_manager or not name or not last_name or not phone:
            return jsonify({"msg": "email, password, is_manager, name, last_name, phone, user_id and teacher_id are required"})
        
        existing_manager = Manager.query.filter_by(email=email).first()
        if existing_manager:
            return jsonify({"msg": "Email already exists"}), 409
        
        password_hash = generate_password_hash(password)

        new_manager = Manager(
            email=email,
            password=password_hash,
            is_manager=is_manager,
            name=name,
            last_name=last_name,
            phone=phone,
            number_document=number_document,
            user_id=user_id,
            teacher_id=teacher_id
        )
        db.session.add(new_manager)
        db.session.commit()

        # Enviar correo de bienvenida
        msg = Message('Welcome to Our Platform, MANAGER', recipients=[email])
        msg.body = f"Hello {name},\n\nThank you for signing up on our platform. We're excited to have you on board!"
        mail.send(msg)
        
        return jsonify({"message": "Manager has been Created Successfully", "access_to_manager": new_manager.serialize()}), 201
    except Exception as e: 
        return jsonify({"Error": "Error in Manager Creation", "Msg": str(e)}), 500



#-----------------------LOGIN DE USERS------------------------#
@api.route('/login/user', methods=['POST'])
def get_token_login_user():
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        if not email or not password:
            return jsonify({"Error": "Email and Password are required"}), 400
        
        # Buscar el usuario con ese correo
        login_user = User.query.filter_by(email=email).first()
        if not login_user:
            return jsonify({'Error': 'Invalid Email'}), 400

        # Obtener la contraseña desde la base de datos
        password_from_db = login_user.password

        # Verificar la contraseña
        true_or_false = check_password_hash(password_from_db, password)

        if true_or_false:
            expires = timedelta(days=1)
            user_id = login_user.id
            access_token = create_access_token(identity=user_id, expires_delta=expires)
            return jsonify({"access_token": access_token, "message": "Log In Successfully"}), 200
        else:
            return jsonify({"Error":"Invalid Password"}), 400
        
    except Exception as e:
        return jsonify({"Error": "User not exists in Data Base", "message": str(e)}), 500

@api.route('/login/teacher', methods=['POST'])
def get_token_login_teacher():
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        if not email or not password:
            return jsonify({"Error": "Invalid Email or Password"}), 400

        # Buscar el usuario con ese correo
        login_teacher = Teacher.query.filter_by(email=email).first()
        
        if not login_teacher:
            return jsonify({'Error': 'Invalid Email or Password'}), 400

        # Obtener la contraseña desde la base de datos
        password_from_db = login_teacher.password

        # Verificar la contraseña
        password_valid = check_password_hash(password_from_db, password)

        if password_valid:
            expires = timedelta(days=1)
            teacher_id = login_teacher.id
            access_token = create_access_token(identity=teacher_id, expires_delta=expires)
            return jsonify({"access_token": access_token, "message": "Log In Successfully"}), 200
        else:
            return jsonify({"Error": "Invalid Email or Password"}), 400
        
    except sqlalchemy.exc.SQLAlchemyError as e:
        # Manejar errores de la base de datos de manera específica
        return jsonify({"Error": "Database error", "message": str(e)}), 500
    except Exception as e:
        # Manejar otros errores internos del servidor
        return jsonify({"Error": "Internal Server Error", "message": str(e)}), 500


@api.route('/login/manager', methods=['POST'])
def get_token_login_manager():
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        if not email or not password:
            return jsonify({"Error": "Email and Password are required"}), 400

       # Buscar el usuario con ese correo
        login_manager = Manager.query.filter_by(email=email).first()
        if not login_manager:
            return jsonify({'Error': 'Invalid Email'}), 400

        # Obtener la contraseña desde la base de datos
        password_from_db = login_manager.password

        # Verificar la contraseña
        true_or_false = check_password_hash(password_from_db, password)

        if true_or_false:
            expires = timedelta(days=1)
            manager_id = login_manager.id
            access_token = create_access_token(identity=manager_id, expires_delta=expires)
            return jsonify({"access_token": access_token, "message": "Log In Successfully"}), 200
        else:
            return jsonify({"Error":"Invalid Password"}), 400
        
    except Exception as e:
        return jsonify({"Error": "Manager not exists in Data Base" , "Msg": str(e)}), 500



#-----------------------RESET PASSWORD DE USERS------------------------#
@api.route('/forgot-password/user', methods=['POST'])
def forgot_password_user():
    email = request.json.get('email')
    if not email:
        return jsonify({"Error": "Email is required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"Error": "User not found"}), 404

    reset_token = create_access_token(identity=user.id, expires_delta=timedelta(hours=1))
    frontend_url = os.getenv('FRONTEND_URL')  
    reset_link = f"{frontend_url}/ResetPassword/token"  # Construir el enlace completo

    msg = Message('Password Reset Request', recipients=[email])
    msg.body = f"To reset your password, click the following link: {reset_link}"
    mail.send(msg)

    return jsonify({"message": "Password reset link sent", "access_token": reset_token}), 200

# Ruta para resetear la contraseña
@api.route('/reset-password/user/<token>', methods=['POST'])
def reset_password_user(token):
    try:
        decoded_token = decode_token(token)
        user_id = decoded_token['sub']
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({"Error": "Invalid or expired token"}), 400

        new_password = request.json.get('password')
        if not new_password:
            return jsonify({"Error": "Password is required"}), 400

        user.password = generate_password_hash(new_password)
        db.session.commit()

        msg = Message('Password Reset Successful', recipients=[user.email])
        msg.body = "Your password has been successfully reset."
        mail.send(msg)

        return jsonify({"message": "Password reset successful"}), 200
    except Exception as e:
        return jsonify({"Error": f"An error occurred: {str(e)}"}), 500


@api.route('/forgot-password/teacher', methods=['POST'])
def forgot_password_teacher():
    email = request.json.get('email')
    if not email:
        return jsonify({"Error": "Email is required"}), 400

    teacher = Teacher.query.filter_by(email=email).first()
    if not teacher:
        return jsonify({"Error": "User not found"}), 404

    reset_token = create_access_token(identity=teacher.id, expires_delta = timedelta(hours=1))
    frontend_url = os.getenv('FRONTEND_URL')  
    reset_link = f"{frontend_url}/ResetPassword/token/"  # Construir el enlace completo

    msg = Message('Password Reset Request', recipients=[email])
    msg.body = f"To reset your password, click the following link: {reset_link}"
    mail.send(msg)

    print(frontend_url)

    return jsonify({"message": "Password reset link sent", "access_token": reset_token}), 200

# Ruta para resetear la contraseña
@api.route('/reset-password/teacher/<token>', methods=['POST'])
def reset_password_teacher(token):
    try:
        decoded_token = decode_token(token)
        teacher_id = decoded_token['sub']
        teacher = Teacher.query.get(teacher_id)
        
        if not teacher:
            return jsonify({"Error": "Invalid or expired token"}), 400

        new_password = request.json.get('password')
        if not new_password:
            return jsonify({"Error": "Password is required"}), 400

        teacher.password = generate_password_hash(new_password)
        db.session.commit()

        msg = Message('Password Reset Successful', recipients=[teacher.email])
        msg.body = "Your password has been successfully reset."
        mail.send(msg)

        return jsonify({"message": "Password reset successful"}), 200
    except Exception as e:
        return jsonify({"Error": f"An error occurred: {str(e)}"}), 500


@api.route('/forgot-password/manager', methods=['POST'])
def forgot_password_manager():
    email = request.json.get('email')
    if not email:
        return jsonify({"Error": "Email is required"}), 400

    manager = Manager.query.filter_by(email=email).first()
    if not manager:
        return jsonify({"Error": "User not found"}), 404

    reset_token = create_access_token(identity=manager.id, expires_delta=timedelta(hours=1))
    frontend_url = os.getenv('FRONTEND_URL')  
    reset_link = f"{frontend_url}/ResetPassword/token/"  # Construir el enlace completo

    msg = Message('Password Reset Request', recipients=[email])
    msg.body = f"To reset your password, click the following link: {reset_link}"
    mail.send(msg)

    return jsonify({"message": "Password reset link sent", "access_token": reset_token}), 200

# Ruta para resetear la contraseña
@api.route('/reset-password/manager/<token>', methods=['POST'])
def reset_password_manager(token):
    try:
        decoded_token = decode_token(token)
        manager_id = decoded_token['sub']

        manager = Manager.query.get(manager_id)
        
        if not manager:
            return jsonify({"Error": "Invalid or expired token"}), 400

        new_password = request.json.get('password')
        if not new_password:
            return jsonify({"Error": "Password is required"}), 400

        manager.password = generate_password_hash(new_password)
        db.session.commit()

        msg = Message('Password Reset Successful', recipients=[manager.email])
        msg.body = "Your password has been successfully reset."
        mail.send(msg)

        return jsonify({"message": "Password reset successful"}), 200
    except Exception as e:
        return jsonify({"Error": f"An error occurred: {str(e)}"}), 500



#-----------------------GET USERS------------------------#
@api.route('/view/user')
@jwt_required() #Decorador para requerir autenticacion con jwt
def show_view_user():
    current_token = get_jwt_identity() #obtiene la id del user del token
    if current_token:
        
        users = User.query.all()
        user_list = []
        for user in users:
            user_dict = {
                "id": user.id,
                "email": user.email,
                "isUser": user.is_user,
                "name": user.name,
                "lastName": user.last_name,
                "username": user.username,
                "numberDocument": user.number_document,
                "phone": user.phone,
                "age": user.age,
                "gender": user.gender
            }
            user_list.append(user_dict)

        teachers = Teacher.query.all()
        teacher_list = []
        for teacher in teachers:
            teacher_dict = {
                "id": teacher.id,
                "email": teacher.email,
                "is_teacher": teacher.is_teacher,
                "name": teacher.name,
                "lastName": teacher.last_name,
                "username": teacher.username,
                "numberDocument": teacher.number_document,
                "phone": teacher.phone,
                "age": teacher.age,
                "gender": teacher.gender,
                "certificateTeacher": teacher.certificate_teacher,
                "userId": teacher.user_id
            }
            teacher_list.append(teacher_dict)

        return jsonify({"access_to_user": user_list, "access_to_teacher": teacher_list, "message": "Welcome to Student"}), 200
        
    else:
        return jsonify({"Error": "Token invalid or not exits"}), 401

        
@api.route('/view/teacher')
@jwt_required() #Decorador para requerir autenticacion con jwt
def show_view_teacher():
    current_token = get_jwt_identity() #obtiene la id del user del token
    if current_token:
        
        users = User.query.all()
        user_list = []
        for user in users:
            user_dict = {
                "id": user.id,
                "email": user.email,
                "isUser": user.is_user,
                "name": user.name,
                "lastName": user.last_name,
                "username": user.username,
                "numberDocument": user.number_document,
                "phone": user.phone,
                "age": user.age,
                "gender": user.gender
            }
            user_list.append(user_dict)

        teachers = Teacher.query.all()
        teacher_list = []
        for teacher in teachers:
            teacher_dict = {
                "id": teacher.id,
                "email": teacher.email,
                "is_teacher": teacher.is_teacher,
                "name": teacher.name,
                "lastName": teacher.last_name,
                "username": teacher.username,
                "numberDocument": teacher.number_document,
                "phone": teacher.phone,
                "age": teacher.age,
                "gender": teacher.gender,
                "certificateTeacher": teacher.certificate_teacher,
                "userId": teacher.user_id
            }
            teacher_list.append(teacher_dict)

        return jsonify({"access_to_user": user_list, "access_to_teacher": teacher_list, "message": "Welcome to Teacher"}), 200
        
    else:
        return jsonify({"Error": "Token invalid or not exits"}), 401

@api.route('/view/manager')
@jwt_required()  # Decorador para requerir autenticación con jwt
def show_view_manager():
    current_token = get_jwt_identity()  # obtiene la id del user del token
    if current_token:
        
        users = User.query.all()
        user_list = []
        for user in users:
            user_dict = {
                "id": user.id,
                "email": user.email,
                "isUser": user.is_user,
                "name": user.name,
                "lastName": user.last_name,
                "username": user.username,
                "numberDocument": user.number_document,
                "phone": user.phone,
                "age": user.age,
                "gender": user.gender
            }
            user_list.append(user_dict)

        teachers = Teacher.query.all()
        teacher_list = []
        for teacher in teachers:
            teacher_dict = {
                "id": teacher.id,
                "email": teacher.email,
                "is_teacher": teacher.is_teacher,
                "name": teacher.name,
                "lastName": teacher.last_name,
                "username": teacher.username,
                "numberDocument": teacher.number_document,
                "phone": teacher.phone,
                "age": teacher.age,
                "gender": teacher.gender,
                "certificateTeacher": teacher.certificate_teacher,
                "userId": teacher.user_id
            }
            teacher_list.append(teacher_dict)

        managers = Manager.query.all()
        manager_list = []
        for manager in managers:
            manager_dict = {
                "id": manager.id,
                "email": manager.email,
                "isManager": manager.is_manager,
                "name": manager.name,
                "lastName": manager.last_name,
                "phone": manager.phone,
                "numberDocument": manager.number_document,
                "userId": manager.user_id,
                "teacherId": manager.teacher_id
            }
            manager_list.append(manager_dict)

        return jsonify({
            "access_to_user": user_list,
            "access_to_teacher": teacher_list,
            "access_to_manager": manager_list,
            "message": "Welcome to Manager"
        }), 200
        
    else:
        return jsonify({"Error": "Token invalid or not exits"}), 401


#-------------------DELETE USER--------------------#
@api.route('/view/manager/user/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    current_token = get_jwt_identity()
    if not current_token:
        return jsonify({"Error": "Token invalid or not no exists"}), 401
    
    user = User.query.get(user_id)
    if not user:
        return jsonify({"Error": "User not found"}), 404
    
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": f"User with ID {user.id} deleted succesfully"}), 200


#---------------------UPDATE USER----------------------#
@api.route('/view/manager/user/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    current_token = get_jwt_identity()
    if not current_token:
        return jsonify({"Error": "Token invalid or not exists"}), 401

    user = User.query.get(user_id)
    if not user:
        return jsonify({"Error": "User not found"}), 404

    data = request.get_json()
    user.email = data.get('email', user.email)
    user.is_user = data.get('isUser', user.is_user)
    user.name = data.get('name', user.name)
    user.last_name = data.get('lastName', user.last_name)
    user.username = data.get('username', user.username)
    user.number_document = data.get('numberDocument', user.number_document)
    user.phone = data.get('phone', user.phone)
    user.age = data.get('age', user.age)
    user.gender = data.get('gender', user.gender)

    db.session.commit()
    return jsonify({"message": f"User with ID {user.id} updated successfully"}), 200

#------------------DELETE TEACHER------------------#
@api.route('/view/manager/teacher/<int:teacher_id>', methods=['DELETE'])
@jwt_required()
def delete_teacher(teacher_id):
    current_token = get_jwt_identity()  # Obtiene ID del usuario del Token
    if not current_token:
        return jsonify({"Error": "Token invalid or not exists"}), 401

    teacher = Teacher.query.get(teacher_id)
    if not teacher:
        return jsonify({"Error": "Teacher not found"}), 404

    db.session.delete(teacher)
    db.session.commit()
    return jsonify({"message": f"Teacher with ID {teacher.id} deleted successfully"}), 200


#--------------------UPDATE TEACHER--------------------#
@api.route('/view/manager/teacher/<int:teacher_id>', methods=['PUT'])
@jwt_required()
def update_teacher(teacher_id):
    current_token = get_jwt_identity()
    if not current_token:
        return jsonify({"Error": "Token invalid or not exists"}), 401

    teacher = Teacher.query.get(teacher_id)
    if not teacher:
        return jsonify({"Error": "Teacher not found"}), 404

    data = request.get_json()
    teacher.email = data.get('email', teacher.email)
    teacher.is_teacher = data.get('isTeacher', teacher.is_teacher)
    teacher.name = data.get('name', teacher.name)
    teacher.last_name = data.get('lastName', teacher.last_name)
    teacher.username = data.get('username', teacher.username)
    teacher.number_document = data.get('numberDocument', teacher.number_document)
    teacher.phone = data.get('phone', teacher.phone)
    teacher.age = data.get('age', teacher.age)
    teacher.gender = data.get('gender', teacher.gender)
    teacher.certificate_teacher = data.get('certificateTeacher', teacher.certificate_teacher)
    teacher.user_id = data.get('userId', teacher.user_id)

    db.session.commit()
    return jsonify({"message": f"Teacher with ID {teacher.id} updated successfully"}), 200

#------------------DELETE MANAGER------------------#
@api.route('/view/manager/manager/<int:manager_id>', methods=['DELETE'])
@jwt_required()
def delete_manager(manager_id):
    current_token = get_jwt_identity()  # Obtiene ID del usuario del Token
    if not current_token:
        return jsonify({"Error": "Token invalid or not exists"}), 401

    manager = Manager.query.get(manager_id)
    if not manager:
        return jsonify({"Error": "Teacher not found"}), 404

    db.session.delete(manager)
    db.session.commit()
    return jsonify({"message": f"Teacher with ID {manager.id} deleted successfully"}), 200


#--------------------UPDATE MANAGER--------------------#
@api.route('/view/manager/manager/<int:manager_id>', methods=['PUT'])
@jwt_required()
def update_manager(manager_id):
    current_token = get_jwt_identity()
    if not current_token:
        return jsonify({"Error": "Token invalid or not exists"}), 401

    manager = Manager.query.get(manager_id)
    if not manager:
        return jsonify({"Error": "Manager not found"}), 404

    data = request.get_json()
    manager.email = data.get('email', manager.email)
    manager.is_manager = data.get('isManager', manager.is_manager)
    manager.name = data.get('name', manager.name)
    manager.last_name = data.get('lastName', manager.last_name)
    manager.number_document = data.get('numberDocument', manager.number_document)
    manager.phone = data.get('phone', manager.phone)
    manager.teacher_id = data.get('teacherId', manager.teacher_id)
    manager.user_id = data.get('userId', manager.user_id)

    db.session.commit()
    return jsonify({"message": f"Manager with ID {manager.id} updated successfully"}), 200


#-----------------------COURSES------------------------#
@api.route('/create/courses', methods=['POST'])
def post_courses():
    try:
        title =  request.json.get('title')
        category_title = request.json.get('categoryTitle')
        modules_length = request.json.get('modulesLength')
        title_certificate_to_get = request.json.get('titleCertificateToGet')
        price = request.json.get('price')
        description = request.json.get('description')
        assessment = request.json.get('assessment')
        title_Teacher = request.json.get('titleTeacher')
        date_expiration = request.json.get('dateExpiration')
        title_url_media = request.json.get('titleUrlMedia')

        #Verificacion de campos vacios
        if not title or not category_title or not modules_length or not title_certificate_to_get or not price or not description or not assessment or not title_Teacher or not date_expiration or not title_url_media:
            return({"Error":"title, category_title, modules_length, title_certificate_to_get, price, description, assessment, title_Teacher, date_expiration and title_url_media are required"}), 400
        
        #Verificacion de existencia de titulo en la base de datos
        existing_course = Course.query.filter_by(title=title).first()
        if existing_course:
            return jsonify({"Error":"Title already exists."}), 409

       
        current_date_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        course = Course(title=title, category_title=category_title,modules_length=modules_length, title_certificate_to_get=title_certificate_to_get, price=price,  description=description, assessment=assessment, create_date=current_date_time, title_Teacher=title_Teacher, date_expiration=date_expiration, title_url_media=title_url_media)
        db.session.add(course)
        db.session.commit()

        return jsonify({"message":"Course has been Create Successfully", "Course": course.serialize()}), 200
    
    except Exception as err:
        return jsonify({"Error":"Error in Course Creation:" + str(err)}), 500
    

@api.route('/view/courses')
def get_courses():
    try:
        courses = Course.query.all()
        course_list = [course.serialize() for course in courses]
        return jsonify({"access_to_courses": course_list, "message": "Access to Course List Successfully"}), 200
    
    except Exception as err:
        return jsonify({"Error": "Error fetching courses", "errorFetching": str(err)}), 500
      

@api.route('/view/courses/<int:course_id>', methods=['PUT'])
@jwt_required()
def put_courses(course_id):
    current_token = get_jwt_identity()

    if not current_token:
        return jsonify({"Error": "Token invalid or not exists"}), 401

    course = Course.query.get(course_id)
    if not course:
        return jsonify({"Error": "Course not found"}), 404

    data = request.get_json()
    course.title = data.get('title', course.title)
    course.category_title = data.get('category_title', course.category_title)
    course.modules_length = data.get('modules_length', course.modules_length)
    course.title_certificate_to_get = data.get('title_certificate_to_get', course.title_certificate_to_get)
    course.price = data.get('price', course.price)
    course.description = data.get('description', course.description)
    course.assessment = data.get('assessment', course.assessment)
    course.create_date = data.get('create_date', course.create_date)
    course.title_Teacher = data.get('title_Teacher', course.title_Teacher)

    db.session.commit()
    return jsonify({"message": f"Course with ID {course.id} updated successfully"}), 200
    

@api.route('/view/courses/<int:course_id>', methods=['DELETE'])
@jwt_required()
def delete_courses(course_id):
    try:
        course = Course.query.get(course_id)

        if not course:
            return jsonify({"Error": "Course not found"}), 404
        
        db.session.delete(course)
        db.session.commit()

        return jsonify({"message": "Course delete succesfully."}), 200
    
    except Exception as err:
        return jsonify({"Error": "Error in deleting course: " + str(err)}), 500


#-----------------------MODULES------------------------#
@api.route('/module/course', methods=['POST'])
def post_module():
    try:
        course_id = request.json.get('courseId')  
        description_content = request.json.get('descriptionContent')
        title = request.json.get('title')
        video_id = request.json.get('videoId')
        url_video = request.json.get('urlVideo')
        video_id = request.json.get('videoId')
        image_id = request.json.get('imageId')
        total_video = request.json.get('totalVideo')
        token_module = request.json.get('tokenModule')
        

        if not description_content or not url_video or not title or not video_id or not total_video:
            return {"Error": "descriptionContent,title, videoId, imageId, and totalVideo are required"}, 400

        
        existing_module = Modules.query.filter_by(title=title).first()
        if existing_module:
            return jsonify({"Error": "Modules already exists."}), 404

        current_date_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        module = Modules(course_id=course_id, description_content=description_content, url_video=url_video, title=title, video_id=video_id, image_id=image_id, date_create=current_date_time, total_video=total_video, token_module=token_module )
        db.session.add(module)
        db.session.commit()
        return jsonify({"message": "Module created successfully", "Module": module.serialize()}), 201

    except Exception as err:
        return jsonify({"Error": "Error in module Creation: " + str(err)}), 500

@api.route('/module/course/', methods=['GET'])
def get_modules():
    try:
        modules = Modules.query.all()
        if not modules:
            return jsonify({"Error": "No modules found"}), 404
        
        serialized_modules = [module.serialize() for module in modules]
        return jsonify({"message": "Module created successfully", "Modules": serialized_modules}), 200
    
    except Exception as err:
        return jsonify({"Error": "Error in fetching modules: " + str(err)})

@api.route('/module/course/<int:module_id>', methods=['DELETE'])
def delete_module(module_id):
    try:
        module = Modules.query.get(module_id)
        if not module:
            return jsonify({"Error": "Module does no exist"}), 404
        
        db.session.delete(module)
        db.session.commit()

        return jsonify({"message": "Module deleted successfully"}), 200
    
    except Exception as err:
        return jsonify({"Error": "Error in module deletion: " + str(err)}), 500


#-----------------------QUIZZES------------------------#
@api.route('/module/quizzes', methods=['POST'])
def post_quizzes():
    try:
        question_title = request.json.get('questionTitle')
        answer_teacher = request.json.get('answerTeacher')
        answer_user = request.json.get('answerUser')  # Debe ser booleano
        approved = request.json.get('approved')  # Debe ser booleano
        approval_percentage_user = request.json.get('approvalPercentageUser')
        approval_percentage_number = request.json.get('approvalPercentageNumber')
        approval_percentage = request.json.get('approvalPercentage')  # Debe ser booleano
        module_id = request.json.get('moduleId')

        if not question_title or not answer_teacher or answer_user is None or approved is None or not approval_percentage_user or not approval_percentage_number or approval_percentage is None or not module_id:
            return {"Error": "questionTitle, answerTeacher, answerUser, approved, approvalPercentageUser, approvalPercentageNumber, approvalPercentage and moduleId are required"}, 400
        
        existing_module = Modules.query.filter_by(id=module_id).first()

        if not existing_module:
            return jsonify({"Error": "Module does not exist."}), 404
        
        quiz = Quizzes(
            question_title=question_title,
            answer_teacher=answer_teacher,
            answer_user=answer_user,
            approved=approved,
            approval_percentage_user=approval_percentage_user,
            approval_percentage_number=approval_percentage_number,
            approval_percentage=approval_percentage,
            module_id=module_id
        )
        db.session.add(quiz)
        db.session.commit()

        return jsonify({"message": "Quiz created successfully", "Quiz": quiz.serialize()}), 201
    
    except Exception as err:
        return jsonify({"Error": "Error in quiz creation: ", "fetching error": str(err)}), 500
    

@api.route('/module/quizzes')
def get_quizzes():
    try:
        quizzes = Quizzes.query.all()
        if not quizzes:
            return jsonify({"message": "No quiz found"}), 404
        
        serialized_quizzes = [quiz.serialize() for quiz in quizzes]
        return jsonify({"Quiz": serialized_quizzes}), 200
    
    except Exception as err:
        return jsonify({"Error": "Error in fetching quizzes: " + str(err)})
    
@api.route('/module/quizzes/<int:quiz_id>', methods=['PUT'])
def put_quizzes(quiz_id):
    try:
        question_title = request.json.get('questionTitle')
        answer_teacher = request.json.get('answerTeacher')
        answer_user = request.json.get('answerUser')
        approved = request.json.get('approved')
        approval_percentage_user = request.json.get('approvalPercentageUser')
        approval_percentage_number = request.json.get('approvalPercentageNumber')
        approval_percentage = request.json.get('approvalPercentage')
        module_id = request.json.get('moduleId')
        if not quiz_id:
            return jsonify({"Error": "quizId is required"}), 400
        quiz = Quizzes.query.get(quiz_id)
        if not quiz:
            return jsonify({"Error": "Quiz not found"}), 404
        quiz.question_title = question_title
        quiz.answer_teacher = answer_teacher
        quiz.answer_user = answer_user
        quiz.approved = approved
        quiz.approval_percentage_user = approval_percentage_user
        quiz.approval_percentage_number = approval_percentage_number
        quiz.approval_percentage = approval_percentage
        quiz.module_id = module_id
        db.session.commit()
        return jsonify({"message": "Quiz updated successfully", "Quiz": quiz.serialize()}), 200
    except Exception as err:
        return jsonify({"Error": "Error in quiz update: " + str(err)}), 500 

@api.route('/module/quizzes/<int:quiz_id>', methods=['DELETE'])
def delete_quiz(quiz_id):
    try:
        quiz = Quizzes.query.get(quiz_id)
        if not quiz:
            return jsonify({"Error": "Quiz not found"}), 404
        db.session.delete(quiz)
        db.session.commit()
        return jsonify({"message": "Quiz deleted successfully"}), 200
    except Exception as err:
        return jsonify({"Error": "Error deleting quiz", "details": str(err)}), 500
        
        
#----------------------TROLLEY------------------------#
@api.route('/trolley/courses', methods=['POST'])
def add_course_to_trolley():
    try:
        if not request.is_json:
            return jsonify({"Error": "Request must be JSON"}), 400
    
        data = request.json

        # Extract data from the request
        title_course = data.get('titleCourse')
        price = data.get('price')
        course_id = data.get('courseId')
        user_id = data.get('userId')

        # Check for missing required fields
        if not title_course or not price or not course_id :
            return jsonify({"Error": "titleCourse, price, courseId, and userId are required"}), 400
        
        # Validate the course ID
        #course = Course.query.filter_by(id=course_id).first()
        #if not course:
            #return jsonify({"Error": "Course ID does not exist"}), 404

        # Check if the course is already in the trolley
        trolley = Trolley.query.filter_by(title_course=title_course).first()
        if trolley:
            return jsonify({"Error": "Course already exists in the trolley"}), 409
        
       # Create a new trolley entry
        current_date_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        new_trolley = Trolley(
            title_course=title_course,
            price=price,
            date=current_date_time,
            course_id=course_id,
            user_id=user_id
        )
        db.session.add(new_trolley)
        db.session.commit()

        return jsonify({"message": "Course added to trolley successfully", "order": new_trolley.serialize()}), 201

    except Exception as e:
        return jsonify({"Error": "An error occurred", "details": str(e)}), 500
    
@api.route('/trolley/courses')
def get_trolley():
    try:
        trolleys = Trolley.query.all()
        serialized_trolley = [trolley.serialize() for trolley in trolleys]
        return jsonify(serialized_trolley), 200
    
    except Exception as e:
        return jsonify({"Error": "An error occurred while fetching trolleys", "error_details": str(e)}), 500
    
@api.route('/view/trolley/<int:trolley_id>', methods=['DELETE'])
def delete_trolley(trolley_id):
    try:
        trolley = Trolley.query.get(trolley_id)

        if not trolley:
            return jsonify({"Error": "Trolley not found"}), 404
        
        db.session.delete(trolley)
        db.session.commit()

        return jsonify({"message": "Trolley delete succesfully."}), 200
    
    except Exception as err:
        return jsonify({"Error": "Error in deleting trolley: " + str(err)}), 500

    

#----------------------ORDER------------------------#
@api.route('/order/courses', methods=['POST'])
def add_order_to_trolley():
    try:
        data = request.json
        title_order = data.get('titleOrder')
        price = data.get('price')
        total = data.get('total')
        user_id = data.get('userId')
        course_id = data.get('courseId')
        teacher_id = data.get('teacherId')
        course_name = data.get('courseName')
        teacher_name = data.get('teacherName')
        teacher_last_name = data.get('teacherLastName')
        user_name = data.get('userName')
        user_last_name = data.get('userLastName')


        if not title_order or not price or not total:
            return jsonify({"Error": "titleOrder, price, total and userId are required"}), 400
        
     
            
        # Verificación de existencia del título de la orden en la base de datos
        existing_order = Orders.query.filter_by(title_order=title_order).first()

        if existing_order:
            return jsonify({"Error": "Order already exists."}), 409

        current_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        new_order = Orders(
            user_id=user_id,
            title_order=title_order,
            price=price,
            total=total,
            date=current_date,
            course_id=course_id,
            teacher_id=teacher_id,
            course_name=course_name,
            teacher_name=teacher_name,
            teacher_last_name=teacher_last_name,
            user_name=user_name,
            user_last_name=user_last_name
        )
    
        
        db.session.add(new_order)
        db.session.commit()

        return jsonify({"message": "It has been to create an Order successfully", "order": new_order.serialize()}), 201
    
    except Exception as e:
        return jsonify({"Error": "An error occurred", "error_fetching": str(e)}), 500

@api.route('/order/courses', methods=[ 'GET' ])        
def get_order():
    try:
        orders = Orders.query.all()
        serialized_orders = [order.serialize() for order in orders]
        return jsonify(serialized_orders), 200
    except Exception as e:
        return jsonify({"Error": "An error occurred while fetching orders", "error_details": str(e)}), 500



#----------------------CARGA DE DOCUMENTO------------------------# 
# Definir la ruta de la carpeta de carga
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
# Asegúrate de que la carpeta 'uploads' exista
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


@api.route('/upload', methods=['POST'])
def upload_file():
    try:
        if 'file' not in request.files:
            return jsonify({'Error': 'No file part'}), 400
        
        file = request.files['file'] 
        if file.filename == '':
            return jsonify({'Error': 'No selected file'}), 400
        
        if file:
            file_path = os.path.join(UPLOAD_FOLDER, file.filename)
            file.save(file_path)
            file_info = {
                'filename': file.filename,
                'content_type': file.content_type,
                'size': os.path.getsize(file_path),
                'path': file_path
            }
            return jsonify({'message': 'File uploaded successfully', 'file': file_info}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/uploads/<path:filename>')
def show_file(filename):
    try:
        return send_from_directory(UPLOAD_FOLDER, filename), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@api.route('/uploads', methods=['GET'])
def list_files():
    try:
        files = os.listdir(UPLOAD_FOLDER)
        return jsonify(files), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
        
#----------------------Category------------------------#
@api.route('/courses/categories', methods=['POST'])
def post_category():
    try:
        data = request.json
        title_category = data.get('titleCategory')
        sub_category = data.get('subCategory')
        category_length = data.get('categoryLength')
        course_more_current = data.get('courseMoreCurrent')
        course_more_sold = data.get('courseMoreSold')
        user_id = data.get('userId')
        manager_id = data.get('managerId')
        teacher_id = data.get('teacherId')

        if not title_category or not sub_category:
            return jsonify({"Error": "titleCategory and subCategory are required"}), 400
        
        current_date_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        new_category = Category(
            title_category=title_category,
            sub_category=sub_category,
            category_length=category_length,
            course_more_current=course_more_current,
            course_more_sold=course_more_sold,
            user_id=user_id,
            manager_id=manager_id,
            teacher_id=teacher_id,
            create_date=current_date_time
        )

        db.session.add(new_category)
        db.session.commit()

        return jsonify({"message": "Category created successfully", "category": new_category.serialize()}), 201
    
    except Exception as e:

        return jsonify({"Error": "An error occurred", "error_details": str(e)}), 500


@api.route('/courses/categories')
def get_categories():
    try:

        category = Category.query.all()
        if not category:
            return jsonify({"message": "No category found"}), 404
        
        serialized_quizzes = [category.serialize() for category in category]

        return jsonify({"Category": serialized_quizzes}), 200
    
    except Exception as err:

        return jsonify({"Error": "Error in fetching category: " + str(err)})


#----------------------CLOUDINARY ENDPOINT------------------------#
atlas = Flask(__name__)
cloudinary.config(
    cloud_name=os.getenv('dfoegvmld'),
    api_key=os.getenv('979734725363914'),
    api_secret=os.getenv('EdILqI1LeRpZAjEw5MnNMHX_Ppo')
)

@api.route('/upload/media', methods=['POST'])
def upload_image():

    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if file:
        upload_result = cloudinary.uploader.upload(file)
        return jsonify(upload_result), 200
    
    return jsonify({"error": "Upload failed"}), 500


#-----------------------PAYMENT------------------------#
    
@api.route('/payment/courses', methods=['POST'])
def create_payment_course():
    try:
        data = request.get_json()
        
        # Validate the data
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        # Create new payment record
        new_payment = Payment(
            date=data.get('date'),
            id_paypal=data.get('idPaypal'),
            currency_code=data.get('currencyCode'),
            status=data.get('status'),
            type_payment=data.get('typePayment'),
            value=data.get('value'),
            user_id=data.get('userId'),
            course_id=data.get('courseId'),
            manager_id=1
        )
        db.session.add(new_payment)
        db.session.commit()
        
        # Retrieve the course
        course_id = data.get('courseId')
        course = Course.query.get(course_id)

        if not course:
            return jsonify({"error": "Course not found"}), 404
        
        # Generate access token with a 30-day expiration
        token = create_access_token(identity=course.id, expires_delta=timedelta(days=30))

        return jsonify({"message": "Payment for course created successfully", "payment": new_payment.serialize(), "token": token}), 201
    
    except Exception as err:
        db.session.rollback()
        return jsonify({"error": "Error creating payment for course", "msg": str(err)}), 500



@api.route('/payment/courses', methods=['GET'])
def get_all_payments_courses():
    try:
        payments = Payment.query.all()
        serialized_payments = [payment.serialize() for payment in payments]
        return jsonify({"payments": serialized_payments}), 200
    
    except Exception as err:
        return jsonify({"Error": f"Error fetching payments for courses: {str(err)}"}), 500 


@api.route('/payment/courses/<int:pay_id>', methods=['PUT'])
def put_payment(pay_id):
    try:

        value = request.get('value'),
        type_payment = request.json.get('typePayment')
        
        user_id = request.json.get('userId')
        course_id = request.json.get('courseId')
        manager_id = request.json.get('managerId')

        if not pay_id:
            return jsonify({"Error": "Payment is required"}), 400
        
        payment = Payment.query.get(pay_id)
        if not payment:
            return jsonify({"Error": "Payment not found"}), 404
        
        
        payment.value = value
        payment.type_payment = type_payment
        payment.user_id = user_id
        payment.course_id = course_id
        payment.manager_id = manager_id
        
        db.session.commit()

        return jsonify({"message":  f"User with ID {payment.id} updated successfully", "Payment": payment.serialize()}), 200
    
    except Exception as err:
        return jsonify({"Error": "Error in payment update: " + str(err)}), 500 


@api.route('/payment/courses/<int:pay_id>', methods=['DELETE'])
def delete_payment(pay_id):
    try:
        payment = Payment.query.get(pay_id)
        if not payment:
            return jsonify({"Error": "Payment not found"}), 404
        db.session.delete(payment)
        db.session.commit()
        return jsonify({"message": "Payment deleted successfully"}), 200
    except Exception as err:
        return jsonify({"Error": "Error deleting payment", "details": str(err)}), 500



#-------------------------------ACCESS TO COURSE-------------------------------#
@api.route('/view/course/accessAll', methods=['GET'])
@jwt_required()
def show_view_accessAllCourse():
    try:
        current_token = get_jwt_identity()
        if current_token:
            user_list = [user.serialize() for user in User.query.all()]
            course_list = [course.serialize() for course in Course.query.all()]
            module_list = [module.serialize() for module in Modules.query.all()]
            quiz_list = [quiz.serialize() for quiz in Quizzes.query.all()]
            
            return jsonify({"access_to_course": course_list, "access_to_module": module_list, "access_to_quiz": quiz_list, "user": user_list, "message": "Courses fetched successfully"}), 200
        else:
            return jsonify({"error": "Token invalid or not exists"}), 401
    
    except Exception as err:
        return jsonify({"error": "Error fetching courses or user", "msg": str(err)}), 500


@api.route('/accessCourse', methods=['POST'])
def create_accessCourse():
    data = request.get_json()
    user = data.get('user')
    details = data.get('details')

    if not user:
        return jsonify({"error": "user is required"}), 400

    new_accessCourse = AccessCourse(user=user, details=json.dumps(details))
    db.session.add(new_accessCourse)
    db.session.commit()

    return jsonify(new_accessCourse.serialize()), 201


@api.route('/view/course/<int:course_id>/user/<int:user_id>/module/<int:module_id>/quiz/<int:quiz_id>', methods=['GET'])
@jwt_required()
def show_view_curso(user_id, course_id, module_id, quiz_id):
    try:
        current_token = get_jwt_identity()  # Obtiene la identidad del usuario del token
        print("Current token identity:", current_token)
        
        if current_token:
            user = User.query.get(user_id)
            if not user:
                return jsonify({"Error": "User not found"}), 404

            course = Course.query.filter_by(id=course_id).all()  # Filtra por course_id
            if not course:
                return jsonify({"Error": "Course not found"}), 404

            course_list = [c.serialize() for c in course]

            module = Modules.query.filter_by(id=module_id).all()  # Filtra por module_id
            if not module:
                return jsonify({"Error": "module not found"}), 404

            module_list = [mod.serialize() for mod in module]

            quiz = Quizzes.query.filter_by(id=quiz_id).all()  # Filtra por quiz_id
            if not quiz:
                return jsonify({"Error": "quiz not found"}), 404

            quiz_list = [mod.serialize() for mod in quiz]

            return jsonify({"access_to_course": course_list, "access_to_module": module_list, "access_to_quiz": quiz_list, "user": user.serialize(), "message": "Courses fetched successfully"}), 200
        
        else:
            return jsonify({"Error": "Token invalid or not exists"}), 401
    
    except Exception as err:
        return jsonify({"Error": "Error fetching courses or user", "errorFetching": str(err)}), 500
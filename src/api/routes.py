"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Lista, Gastos
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import desc, func
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/lista', methods=['POST'])
def create_lista():
    data = request.json
    print(data)
    list_name = Lista.query.filter_by(list_name=data['list_name']).first()
    if list_name : 
        return jsonify({
            "msg": "El nombre esta en uso" 
        }), 420
    
    first_available_id = db.session.query(func.max(Lista.id)).scalar()
    new_user_id = (first_available_id or 0) + 1
    
    new_lista = Lista(id=new_user_id, list_name=data["list_name"],password=data["password"])
    db.session.add(new_lista)
    db.session.commit()
    # token = create_access_token(identity = new_user.id)
    response_body = {
        "msg": "All working",
        # "token": token,
        "user": new_lista.serialize()
        # "query result": query_result
    }

    return jsonify(response_body), 200

# A enviar en el fetch
# {
#     "list_name":"",
#     "password":""
# }


@api.route('/lista-login', methods=['POST'])
def list_login():
    # query_result = Characters.query.filter_by(id=characters_id).first()
    data = request.json
    print(data)
    list_name = Lista.query.filter_by(list_name=data["list_name"]).first()
    if not list_name: 
        return jsonify({
            "msg": "name not found, sorry"
        }), 404
    if list_name.password != data["password"]: 
        return jsonify({
            "msg": "wrong name and password, too bad"
        }), 401
    token = create_access_token(identity = list_name.list_name)
    response_body = {
        "msg": "All working",
        "token": token,
        "lista": list_name.serialize()
        # "query result": query_result
    }    

    return jsonify(response_body), 200


# Añadir un nuevo gasto 
# {
#   "list_name":"",
#   "cantidad":"",
#   "categoria":""
# }


@api.route('/gastos', methods=['POST'])
def create_gasto():
    data = request.json
    print(data)
    list_name = Lista.query.filter_by(list_name=data["list_name"]).first()
    if not list_name: 
        return jsonify({
            "msg": "name not found, sorry"
        }), 404
    
    first_available_id = db.session.query(func.max(Gastos.id)).scalar()
    new_gasto_id = (first_available_id or 0) + 1
    
    new_gasto = Gastos(id=new_gasto_id, list_name=data["list_name"],cantidad=data["cantidad"],categoria=data["categoria"])
    db.session.add(new_gasto)
    db.session.commit()
    # token = create_access_token(identity = new_user.id)
    response_body = {
        "msg": "All working",
        # "token": token,
        "user": new_gasto.serialize()
        # "query result": query_result
    }

    return jsonify(response_body), 200

# Eliminar Gasto

@api.route('/gastos/<int:gasto_id>', methods=['DELETE'])
def delete_one_gasto(gasto_id):

    # this is how you can use the Family datastructure by calling its methods
    remove_gasto = Gastos.query.filter_by(id=gasto_id).first()
    if not remove_gasto: 
        return jsonify({
            "msg": "id not found, sorry"
        }), 404
    db.session.delete(remove_gasto)
    db.session.commit()
    gasto_response= {
        "msg": "Gasto eliminado correctamente",
        # "user": new_gasto.serialize()
    }


    return jsonify(gasto_response), 200

@api.route('/gastos/<string:lista_name>', methods=['GET'])
def get_all_gatos_one_list(lista_name):

    all_gastos_one_list = Gastos.query.filter_by(list_name=lista_name).all()
    if not all_gastos_one_list: 
        return jsonify({
            "msg": "list name not found, sorry"
        }), 404
    # Aplica serialize a cada elemento de la lista
    serialized_gastos = [gasto.serialize() for gasto in all_gastos_one_list]
    response_body = {
        "gastos": serialized_gastos
    }


    return jsonify(response_body), 200
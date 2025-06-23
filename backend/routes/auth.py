import os
import json
from flask import Blueprint, request, jsonify

auth_bp = Blueprint('auth', __name__)

def carregar_usuarios():
    caminho_absoluto = os.path.join(os.path.dirname(__file__), '..', 'data', 'users.json')
    with open(caminho_absoluto, 'r', encoding='utf-8') as f:
        return json.load(f)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    usuarios = carregar_usuarios()
    for usuario in usuarios:
        if usuario['username'] == username and usuario['password'] == password:
            return jsonify({"success": True, "message": "Login realizado com sucesso!"}), 200

    return jsonify({"success": False, "message": "Usuário ou senha inválidos."}), 401

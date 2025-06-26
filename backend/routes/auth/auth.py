import os
import json
import bcrypt
from flask import Blueprint, request, jsonify

auth_bp = Blueprint('auth', __name__)

def carregar_usuarios():
    caminho_absoluto = os.path.join(os.path.dirname(__file__), '.', 'user_data', 'users.json')
    with open(caminho_absoluto, 'r', encoding='utf-8') as f:
        return json.load(f)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    identificador = data.get('username')  # pode ser username OU email
    password = data.get('password')

    if not identificador or not password:
        return jsonify({"success": False, "message": "Usuário/email e senha são obrigatórios."}), 400

    usuarios = carregar_usuarios()
    for usuario in usuarios:
        if identificador == usuario.get('username') or identificador == usuario.get('email'):
            hash_salvo = usuario.get('passwordHash', '')
            if bcrypt.checkpw(password.encode('utf-8'), hash_salvo.encode('utf-8')):
                return jsonify({
                    "success": True,
                    "message": "Login realizado com sucesso!",
                    "usuario": {
                        "id": usuario["id"],
                        "nome": usuario["nome"],
                        "username": usuario["username"],
                        "email": usuario["email"],
                        "role": usuario["role"]
                    }
                }), 200
            else:
                break  # identificador bateu, mas senha está incorreta

    return jsonify({"success": False, "message": "Usuário ou senha inválidos."}), 401

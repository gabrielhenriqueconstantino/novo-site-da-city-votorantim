from flask import Blueprint, jsonify
import os
import json

horarios_bp = Blueprint('horarios', __name__)

DATA_PATH = os.path.join(os.path.dirname(__file__), 'json', 'horarios.json')

@horarios_bp.route('/api/horarios', methods=['GET'])
def obter_horarios():
    try:
        with open(DATA_PATH, 'r', encoding='utf-8') as f:
            dados = json.load(f)
        return jsonify(dados), 200
    except Exception as e:
        return jsonify({'erro': str(e)}), 500

from flask import Blueprint, jsonify
import os
import json

itinerarios_bp = Blueprint('itinerarios', __name__)

# Caminho para o arquivo itinerarios.json (mesmo diretório de horarios.json)
DATA_PATH = os.path.join(os.path.dirname(__file__), 'json', 'itinerarios.json')

@itinerarios_bp.route('/api/itinerarios', methods=['GET'])
def get_itinerarios():
    try:
        with open(DATA_PATH, 'r', encoding='utf-8') as file:
            dados = json.load(file)
        return jsonify(dados), 200
    except FileNotFoundError:
        return jsonify({"erro": "Arquivo itinerarios.json não encontrado."}), 404
    except json.JSONDecodeError:
        return jsonify({"erro": "Erro ao decodificar o JSON."}), 500
    except Exception as e:
        return jsonify({"erro": f"Erro inesperado: {str(e)}"}), 500

from flask import Blueprint, request, jsonify
import json
import os

editor_bp = Blueprint('editor', __name__)

DATA_PATH = os.path.join(os.path.dirname(__file__), 'json', 'horarios.json')

@editor_bp.route('/editar-horarios', methods=['POST'])
def editar_horarios():
    try:
        dados = request.get_json()
        linha_id = dados['linha_id']
        periodo = dados['periodo']
        sentido = dados['sentido']
        novos_horarios = dados['horarios']

        with open(DATA_PATH, 'r', encoding='utf-8') as f:
            data = json.load(f)

        if linha_id in data['linhas']:
            data['linhas'][linha_id][periodo][sentido] = novos_horarios

            with open(DATA_PATH, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)

            return jsonify({"mensagem": "Horários atualizados com sucesso!"}), 200
        else:
            return jsonify({"erro": "Linha não encontrada"}), 404

    except Exception as e:
        return jsonify({"erro": str(e)}), 500

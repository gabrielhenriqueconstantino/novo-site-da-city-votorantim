from flask import Flask
from flask_cors import CORS
from routes.auth.auth import auth_bp
from routes.data.editor import editor_bp  # <-- novo import

from routes.data.horarios import horarios_bp

app = Flask(__name__)
CORS(app)

# Registro das rotas
app.register_blueprint(auth_bp)
app.register_blueprint(editor_bp)  # <-- novo blueprint
app.register_blueprint(horarios_bp)

if __name__ == '__main__':
    app.run(debug=True)

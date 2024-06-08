import os
from flask import Flask, jsonify, send_from_directory
from flask_migrate import Migrate
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager

# Inicializa la aplicación Flask
app = Flask(__name__)

# Configura la base de datos y JWT
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///yourdatabase.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Cambia esto por una clave segura

# Inicializa las extensiones
db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# Registra el blueprint
app.register_blueprint(api, url_prefix='/api')

# Añade el administrador
setup_admin(app)

# Añade los comandos
setup_commands(app)

# Maneja errores como un objeto JSON
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Genera el sitemap con todos tus endpoints
@app.route('/')
def sitemap():
    return generate_sitemap(app)

# Cualquier otro endpoint tratará de servirlo como un archivo estático
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # Evita la memoria caché
    return response

# Este código solo se ejecuta si se ejecuta `$ python src/main.py`
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
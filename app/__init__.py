from flask import Flask


def create_app():
    app = Flask(__name__)

    app.config.from_object("app.config.Config")

    from app.controllers.financas_controller import financas_bp
    from app.controllers.pages_controller import pages_bp
    app.register_blueprint(pages_bp)
    app.register_blueprint(financas_bp)

    return app
from flask import Blueprint, render_template


pages_bp = Blueprint("paginas", __name__)


@pages_bp.route("/", methods=["GET"])
def home():
    return render_template('index.html')
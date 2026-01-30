from flask import Blueprint, request, jsonify
from app.services.financas_service import FinancasService


financas_bp = Blueprint("financas", __name__, url_prefix="/financas")


@financas_bp.route("", methods=["GET"])
def listar_financas():
    return jsonify(FinancasService.exibir())


@financas_bp.route("/tipo/<tipo>", methods=["GET"])
def listar_por_tipo(tipo):
    try:
        return jsonify(FinancasService.exibir_por_tipo(tipo))
    except ValueError as e:
        return jsonify({"erro": str(e)}), 400


@financas_bp.route("", methods=["POST"])
def criar_financa():
    try:
        dados = request.get_json()
        return jsonify(FinancasService.adicionar(dados)), 201
    except ValueError as e:
        return jsonify({"erro": str(e)}), 400
    except TypeError:
        return jsonify({"erro": "JSON inválido ou ausente"}), 400


@financas_bp.route("/<int:id>", methods=["PUT"])
def atualizar_financa(id):
    try:
        dados = request.get_json()
        item = FinancasService.editar(id, dados)
        if not item:
            return jsonify({"erro": "Item não encontrado"}), 404
        return jsonify(item)
    except ValueError as e:
        return jsonify({"erro": str(e)}), 400
    except TypeError:
        return jsonify({"erro": "JSON inválido ou ausente"}), 400


@financas_bp.route("/<int:id>", methods=["DELETE"])
def deletar_financa(id):
    if not FinancasService.remover(id):
        return jsonify({"erro": "Item não encontrado"}), 404
    return jsonify({"ok": True})
# Simula banco de dados
lista_financas = []
TIPOS_VALIDOS = {"GASTO", "RECEITA"}
contador_id = 1


class FinancasService:

    @staticmethod
    def exibir():
        """
        Exibe todos os gastos e receitas
        """
        return lista_financas


    @staticmethod
    def exibir_por_tipo(tipo: str):
        """
        Exibe pelo tipo? GASTO or RECEITA
        """

        tipo = tipo.upper()
        if tipo not in TIPOS_VALIDOS:
            raise ValueError("Tipo inválido")
        return [i for i in lista_financas if i["tipo"] == tipo]


    @staticmethod
    def adicionar(dados: dict):
        """
        Adiciona um novo gasto ou receita a sua lista

        dados = {
            "valor":1,
            "data":"",
            "descricao":"",
            "tipo":"",
        }
        """
        global contador_id

        for campo in ("valor", "data", "descricao", "tipo"):
            if campo not in dados:
                raise ValueError(f"Campo obrigatório ausente: {campo}")

        tipo = dados["tipo"].upper()
        if tipo not in TIPOS_VALIDOS:
            raise ValueError("Tipo inválido. Use GASTO ou RECEITA")
        
        if not isinstance(dados["valor"], (int, float)):
            raise ValueError("Valor deve ser numérico")

        novo = {
            "id":contador_id,
            "valor":dados["valor"],
            "data":dados["data"],
            "descricao":dados["descricao"],
            "tipo":tipo
        }
        lista_financas.append(novo)
        contador_id += 1

        return novo


    @staticmethod
    def editar(id: int, dados: dict):
        """
        Edita os campos: valor, data, descricao.

        dados = {
            "valor":1,
            "data":"",
            "descricao":""
        }

        AVISO: pode alterar um de cada vez
        """
        if "tipo" in dados:
            raise ValueError("Tipo não pode ser alterado")

        if "valor" in dados and not isinstance(dados["valor"], (int, float)):
            raise ValueError("Valor deve ser numérico")

        for item in lista_financas:
            if item["id"] == id:
                if "valor" in dados:
                    item["valor"] = dados.get("valor", item["valor"])

                if "data" in dados:
                    item["data"] = dados.get("data", item["data"])

                if "descricao" in dados:
                    item["descricao"] = dados.get("descricao", item["descricao"])

                return item
        return None


    @staticmethod
    def remover(id: int):
        """
        Remove um item 
        """

        for i, item in enumerate(lista_financas):
            if item["id"] == id:
                del lista_financas[i]
                return True
        return False
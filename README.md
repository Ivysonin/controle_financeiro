# 💰 Controle Financeiro

Aplicação **full stack simples e objetiva** para controle de receitas e gastos.

Frontend em **HTML, CSS e JavaScript puro (ES Modules)** consumindo uma **API REST em Flask (Python)**.

---

## 🎯 Objetivo

Permitir que o usuário:

* Cadastre **receitas** e **gastos**
* Liste todos os lançamentos
* Filtre por tipo (RECEITA ou GASTO)
* Edite lançamentos
* Exclua lançamentos

Tudo em uma interface limpa, responsiva e direta ao ponto.

---

## ▶️ Como rodar o projeto

### 1. Clonar o repositório
```bash
git clone ...
cd controle_financeiro
```

### 2. Criar ambiente virtual
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Instalar dependências
```bash
pip install -r requirements.txt
```

### 3. Variáveis de Ambiente
```bash
SECRET_KEY='chave_secreta_aqui'
```

### 4. Executar a Aplicação
```bash
python3 run.py
```

Servidor local:
```bash
http://127.0.0.1:5000
```

---

## 📌 Observações importantes

* Dados **não persistem** ao reiniciar o backend
* Projeto ideal para:

  * Estudos de integração frontend + backend
  * Conceitos de API REST

---

## 🚀 Próximos passos (ideias)

* Persistência com banco de dados
* Autenticação
* Dashboard com saldo total
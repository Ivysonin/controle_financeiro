const API_BASE_URL = "http://127.0.0.1:5000/financas";

const defaultHeaders = {
  "Content-Type": "application/json",
};


export async function listarFinancas() {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    throw new Error("Erro ao listar finanças");
  }

  return response.json();
}


export async function listarFinancasPorTipo(tipo) {
  const response = await fetch(`${API_BASE_URL}/tipo/${tipo}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro || "Erro ao filtrar por tipo");
  }

  return data;
}


export async function criarFinanca(dados) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(dados),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro || "Erro ao criar finança");
  }

  return data;
}


export async function atualizarFinanca(id, dados) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: defaultHeaders,
    body: JSON.stringify(dados),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro || "Erro ao atualizar finança");
  }

  return data;
}


export async function deletarFinanca(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro || "Erro ao deletar finança");
  }

  return data; // { ok: true }
}
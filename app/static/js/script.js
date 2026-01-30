import {
  listarFinancas,
  listarFinancasPorTipo,
  criarFinanca,
  atualizarFinanca,
  deletarFinanca
} from "./financasApi.js";

/* =====================
   ELEMENTOS
===================== */
const lista = document.getElementById("listaFinancas");
const filtroTipo = document.getElementById("filtroTipo");

const btnBuscar = document.getElementById("btnBuscar");
const btnNovo = document.getElementById("btnNovo");
const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");

const modal = document.getElementById("modal");

let idEmEdicao = null;

/* =====================
   MODAL
===================== */
function abrirModal() {
  modal.classList.add("active");
}

function fecharModal() {
  modal.classList.remove("active");
  limparFormulario();
  idEmEdicao = null;
  document.getElementById("tipo").disabled = false;
}

/* =====================
   FORMULÁRIO
===================== */
function limparFormulario() {
  document.getElementById("descricao").value = "";
  document.getElementById("valor").value = "";
  document.getElementById("data").value = "";
  document.getElementById("tipo").value = "RECEITA";
}

async function salvarLancamento() {
  const descricao = document.getElementById("descricao").value.trim();
  const valor = Number(document.getElementById("valor").value);
  const data = document.getElementById("data").value;
  const tipo = document.getElementById("tipo").value;

  if (!descricao || !valor || !data) return;

  if (idEmEdicao) {
    // PUT → NÃO envia tipo
    await atualizarFinanca(idEmEdicao, {
      descricao,
      valor,
      data
    });
  } else {
    // POST → envia tudo
    await criarFinanca({
      descricao,
      valor,
      data,
      tipo
    });
  }

  fecharModal();
  carregarFinancas();
}

/* =====================
   CARDS
===================== */
function criarCard(item) {
  const card = document.createElement("div");
  card.classList.add("financa-card", item.tipo.toLowerCase());

  card.innerHTML = `
    <div class="financa-header">
      <span class="financa-descricao">${item.descricao}</span>
      <span class="financa-valor">
        ${item.tipo === "GASTO" ? "-" : "+"} R$ ${item.valor.toFixed(2)}
      </span>
    </div>

    <div class="financa-meta">
      <span>${item.data}</span>
      <span class="financa-tipo">${item.tipo}</span>
    </div>

    <div class="card-actions">
      <button class="btn-edit">Editar</button>
      <button class="btn-delete">Excluir</button>
    </div>
  `;

  card.querySelector(".btn-delete").addEventListener("click", async () => {
    await deletarFinanca(item.id);
    carregarFinancas();
  });

  card.querySelector(".btn-edit").addEventListener("click", () => {
    editarLancamento(item);
  });

  return card;
}

function renderizarFinancas(dados) {
  lista.innerHTML = "";

  if (!dados.length) {
    lista.innerHTML = `<p class="empty">Nenhum lançamento encontrado</p>`;
    return;
  }

  dados.forEach(item => lista.appendChild(criarCard(item)));
}

async function carregarFinancas() {
  const tipo = filtroTipo.value;

  const dados = tipo
    ? await listarFinancasPorTipo(tipo)
    : await listarFinancas();

  renderizarFinancas(dados);
}

function editarLancamento(item) {
  idEmEdicao = item.id;

  document.getElementById("descricao").value = item.descricao;
  document.getElementById("valor").value = item.valor;
  document.getElementById("data").value = item.data;
  document.getElementById("tipo").value = item.tipo;

  document.getElementById("tipo").disabled = true;

  abrirModal();
}

/* =====================
   EVENTOS
===================== */
btnNovo.addEventListener("click", abrirModal);
btnCancelar.addEventListener("click", fecharModal);
btnSalvar.addEventListener("click", salvarLancamento);
btnBuscar.addEventListener("click", carregarFinancas);

/* =====================
   INIT
===================== */
carregarFinancas();
import {
  listarFinancas,
  listarFinancasPorTipo,
  criarFinanca,
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

/* =====================
   MODAL
===================== */
function abrirModal() {
  modal.classList.add("active");
}

function fecharModal() {
  modal.classList.remove("active");
  limparFormulario();
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

  await criarFinanca({ descricao, valor, data, tipo });

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

    <button class="btn-delete">Excluir</button>
  `;

  card.querySelector(".btn-delete").addEventListener("click", async () => {
    await deletarFinanca(item.id);
    carregarFinancas();
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
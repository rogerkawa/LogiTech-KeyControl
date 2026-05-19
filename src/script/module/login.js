import mostrarToast from "./toast.js";
export default function acesso() {
  const setor = document.querySelector("#setor");
  const sala = document.querySelector("#sala");
  const responsavel = document.querySelector("#nome");
  const hrsRetirada = document.querySelector("#horasRetirada");
  const hrsEntrega = document.querySelector("#horasEntrega");
  const buttonRegistro = document.querySelector("#liveToastBtn");
  const form = document.querySelector(".was-validated");
  const modal = document.querySelector(".modal");
  const closeModal = document.querySelector(".closeModal");

  // pega registros já existentes ou um array vazio
  let chaves = JSON.parse(localStorage.getItem("chaves")) || [];

  buttonRegistro.addEventListener("click", (event) => {
    event.preventDefault();

    const turno = document.querySelector('[name="turno"]:checked');

    if (
      setor.value.length == 0 ||
      sala.value.length == 0 ||
      responsavel.value.trimStart() == 0 ||
      hrsEntrega.value.length == 0 ||
      hrsRetirada.value.length == 0
    ) {
      modal.style.display = "flex";
    } else {
      let stats = {
        setor: setor.value,
        sala: sala.value,
        turno: turno.value,
        pessoa: responsavel.value,
        retirada: hrsRetirada.value,
        entrega: hrsEntrega.value,
      };

      chaves.push(stats);
      console.log(stats);

      localStorage.setItem("chaves", JSON.stringify(chaves));

      //atualiza os dados
      const novosDados = contarSetores();

      grafico.data.datasets[0].data = novosDados;

      grafico.update();
      renderizarAtividades();
      mostrarToast();

      //limpando o form
      responsavel.value = "";
      setor.value = "";
      sala.value = "";
      hrsEntrega.value = "";
      hrsRetirada.value = "";
      modal.style.display = "none";
    }
  });

  /* Botão de Verificar registros */
  const verif = document.querySelector(".btn-outline-primary");

  verif.addEventListener("click", () => {
    if (chaves.length == 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Registros Vazios",
      });
    } else {
      window.location.href = "stats.html";
    }
  });

  /* fechar modal */
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  //gráfico
  const ctx = document.getElementById("myChart");

  function contarSetores() {
    let ti = 0;
    let rh = 0;
    let gestao = 0;
    let producao = 0;
    let total = 0;
    chaves.forEach((item) => {
      if (item.setor == "TI") {
        ti++;
      } else if (item.setor == "RH") {
        rh++;
      } else if (item.setor == "Financeiro") {
        gestao++;
      } else if (item.setor == "Produção") {
        producao++;
      }

      total = ti + rh + gestao + producao;

      const totalSetor = document.querySelector("#totalSetor");
      totalSetor.innerHTML = `
   <span class="numero">Total de Retiradas: ${total}</span>
`;
    });

    return [ti, rh, gestao, producao];
  }

  const dados = contarSetores();

  const grafico = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["TI", "RH", "Gestão", "Produção"],
      datasets: [
        {
          label: "Setores com mais retirada de chaves",
          data: dados,
          borderWidth: 1,
          backgroundColor: ["#2563eb", "#16a34a", "#f59e0b", "#9333ea"],
          height: 0.5,

          borderRadius: 8,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  });

  //mostrar retiradas
  const atividade = document.querySelector("#atividade");
  function renderizarAtividades() {
    atividade.innerHTML = "";

    // cria uma copia do array e pega os 3 ultimos elementos
    const ultimos = chaves.slice(-3).reverse();

    ultimos.forEach((item) => {
      atividade.innerHTML += `

        <div class="atividade-item">

            <div>

                <div class="atividade-nome">
                    <i class="bi bi-person-fill"></i> ${item.pessoa}
                </div>

                <div class="atividade-info">
                    ${item.sala} • ${item.retirada}
                </div>

            </div>

        </div>
        `;
    });
  }

  renderizarAtividades();
}

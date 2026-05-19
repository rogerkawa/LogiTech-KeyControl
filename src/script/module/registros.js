export default function registro(){
    let chaves = JSON.parse(localStorage.getItem('chaves')) || []

    let tableRow = document.querySelector('#table')
    const exit = document.querySelector('.btn-outline-light')

    exit.addEventListener('click', ()=>{
        window.location.href = 'index.html'
    })

    function renderizarTabela() {

    tableRow.innerHTML = ''

    chaves.forEach((chaves, indice) => {

        tableRow.innerHTML += `
            <tr>
                <td>${indice + 1}</td>
                <td>${chaves.setor}</td>
                <td>${chaves.sala}</td>
                <td>${chaves.pessoa}</td>
                <td>${chaves.turno}</td>
                <td>${chaves.retirada}</td>
                <td>${chaves.entrega}</td>
                <td>
                <button class="btn btn-danger remover" data-id="${indice}">
                            Remover
                </button>
                </td>
            </tr>
        `
    })

    const botoesRemover = document.querySelectorAll('.remover')

        botoesRemover.forEach(botao => {

            botao.addEventListener('click', () => {

                const id = botao.dataset.id

                chaves.splice(id, 1)

                localStorage.setItem('chaves', JSON.stringify(chaves)) || []

                renderizarTabela()
            })
        })
}

const clear = document.querySelector('.clear')
clear.addEventListener('click', ()=>{

    chaves = []
    localStorage.removeItem('chaves')
    
    renderizarTabela()
})
let dados = document.querySelector('#admin')


renderizarTabela()
 
}

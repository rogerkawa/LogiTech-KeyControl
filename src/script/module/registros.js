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
                <td>${chaves.data}</td>
                <td>${chaves.pessoa}</td>
                <td>${chaves.turno}</td>
                <td>${chaves.retirada}</td>
                <td>${chaves.entrega || '--:--'}</td>
                <td>
                <button class="btn btn-primary editar" data-id="${indice}">
                            Editar
                </button>
                </td>
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

/* Editar */
const botoesEditar =
document.querySelectorAll('.editar')

const modalEditar =
document.getElementById('modalEditar')

const editarNome =
document.getElementById('editarNome')

const editarSala =
document.getElementById('editarSala')

const editarEntrega =
document.getElementById('editarEntrega')
let idAtual = null

botoesEditar.forEach((botao)=>{

    botao.addEventListener('click', ()=>{

        const id = botao.dataset.id
        idAtual = id

        const registro = chaves[id]

        editarNome.value = registro.pessoa

        editarSala.value = registro.sala

        editarEntrega.value = registro.entrega || ''

        modalEditar.classList.remove('escondido')

    })

})

const salvarEdicao =
document.getElementById('salvarEdicao')

salvarEdicao.addEventListener('click', ()=>{
    chaves[idAtual].pessoa = editarNome.value
    chaves[idAtual].sala = editarSala.value
    chaves[idAtual].entrega = editarEntrega.value
    
    localStorage.setItem('chaves', JSON.stringify(chaves))

    modalEditar.classList.add('escondido')

    location.reload()

})


/* Fechar modal Editar */
const fecharEditar = document.getElementById('fecharEditar')
const cancelarEditar = document.getElementById('cancelarEditar')

fecharEditar.addEventListener('click', ()=>{
    modalEditar.classList.add('escondido')
})

cancelarEditar.addEventListener('click', ()=>{
    modalEditar.classList.add('escondido')
})

/* DarkMode */

const toggleTema = document.getElementById('toggleTema')

toggleTema.addEventListener('click', ()=>{

    document.body.classList.toggle('dark')

    if(document.body.classList.contains('dark')){
        localStorage.setItem('tema', 'dark')
    }else{
        localStorage.setItem('tema', 'light')
    }

})

if(localStorage.getItem('tema') === 'dark'){
    document.body.classList.add('dark')
}
 
}

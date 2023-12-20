class Despesa{
	constructor(ano, mes, dia, tipo, descricao, valor){
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

	validarDados(){
		for(let i in this){
			if (this[i] === undefined || this[i] === '' || this[i] == null){
				return false
			} 
		}
		return true
	}
}

class Bd{
	constructor(){
		let id = localStorage.getItem('id')
		if (id === null){
			localStorage.setItem('id', 0)
		}
	}

	getProximoId(){
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	gravar(d){
		
		//Salvar no browser o que está sendo registrado para JSON (String), convertendo de objeto literal para string
		let id = this.getProximoId()
		localStorage.setItem(id, JSON.stringify(d))
		localStorage.setItem('id', id)
	}

	recuperarTodosRegistros(){
		//array de despesas
		let despesas = []

		let id = localStorage.getItem('id')
		//recuperar todas as despesas cadastradas em localStorage
		for(let i = 1; i <= id; i++){
			//recuperar a despesa
			let despesa = JSON.parse(localStorage.getItem(i))
			//verificar se existe a possibilidade de haver índices que foram pulados/removidos, pulando-os
			if(despesa === null){
				continue
			}

			despesa.id = i
			despesas.push(despesa)
		}

		return despesas
	}

	pesquisar(despesa){
		let despesasFiltradas = []
		despesasFiltradas = this.recuperarTodosRegistros()

		//
		console.log(despesa)
		console.log(despesasFiltradas)

		//ano
		if(despesa.ano != ''){
			console.log('ano')
			despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
		}

		//mes
		if(despesa.mes != ''){
			console.log('mes')
			despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
		}

		//dia
		if(despesa.dia != ''){
			console.log('dia')
			despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
		}

		//tipo
		if(despesa.tipo != ''){
			console.log('tipo')
			despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
		}

		//descricao
		if(despesa.descricao != ''){
			console.log('descricao')
			despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
		}

		//valor
		if(despesa.valor != ''){
			console.log('valor')
			despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
		}

		return despesasFiltradas
	}

	remover(id){
		localStorage.removeItem(id)
	}
}

let bd = new Bd()


function cadastrarDespesa(){
	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let tipo = document.getElementById('tipo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value

	let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)


	if(despesa.validarDados()){
		bd.gravar(despesa)

		//Dialog de sucesso
		document.getElementById('modal_titulo_div').innerHTML = 'Sucesso na Gravação'
		document.getElementById('modal_titulo_div').className = 'modal-header text-success'
		document.getElementById('modal_conteudo').innerHTML = 'Despesa foi registrada com sucesso!'
		document.getElementById('modal_btn').innerHTML = 'Voltar'
		document.getElementById('modal_btn').className = 'btn btn-success'

		$('#modalRegistraDespesa').modal('show')

		document.getElementById('ano').value = ''
		document.getElementById('mes').value = ''
		document.getElementById('dia').value = ''
		document.getElementById('tipo').value = ''
		document.getElementById('descricao').value = ''
		document.getElementById('valor').value = ''

	} else{
		//Dialog de erro
		document.getElementById('modal_titulo_div').innerHTML = 'Erro na gravação'
		document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
		document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação. Verifique se existem campos obrigatórios que não foram preenchidos!'
		document.getElementById('modal_btn').innerHTML = 'Voltar e Corrigir'
		document.getElementById('modal_btn').className = 'btn btn-danger'
		$('#modalRegistraDespesa').modal('show')
	}
}


function carregaListasDespesas(despesas = [], filtro = false){
	if(despesas == 0 && filtro == false){
		despesas = bd.recuperarTodosRegistros()
	}
	//selecionando o arquivo tbody da tabela
	let listaDespesas = document.getElementById('listaDespesas')
	listaDespesas.innerHTML = ''
	//percorrer o array despesas, listando de forma dinámica
	despesas.forEach(function (d) {
		
		//criar o tr
		let linha = listaDespesas.insertRow()
		//criar colunas (td)
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
		
		//ajustar tipo
		switch(d.tipo){
			case '1': d.tipo = 'Alimentação'
				break
			case '2': d.tipo = 'Educação'
				break
			case '3': d.tipo = 'Lazer'
				break
			case '4': d.tipo = 'Saúde'
				break
			case '5': d.tipo = 'Transporte'
				break
		}
		linha.insertCell(1).innerHTML = d.tipo
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor

		//criar botão de exclusão
		let btn = document.createElement("button")
		btn.className = 'btn btn-danger'
		btn.innerHTML = '<i class="fas fa-times"</i>'
		btn.id = `id_despesa_${d.id}`
		btn.onclick = function(){//remover a despesa
			let id = this.id.replace('id_despesa_', '')
			bd.remover(id)
			openExcluirDespesaModal(); // Chamando a função para abrir o modal
			//window.location.reload()
		}
		linha.insertCell(4).append(btn)

		console.log(d)
	})
}

function pesquisarDespesa(){
	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let tipo = document.getElementById('tipo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value

	let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
	let despesas = bd.pesquisar(despesa)

	this.carregaListasDespesas(despesas, true)
	

}


/// Função para abrir o modal de exclusão
function openExcluirDespesaModal() {
    const modalTitulo = document.getElementById('modal_titulo');
    const modalConteudo = document.getElementById('modal_conteudoE');
    const modalBotao = document.getElementById('modal_btnE');

    modalTitulo.innerHTML = 'Excluir Despesa';
    modalConteudo.innerHTML = 'Tem certeza que deseja excluir esta despesa?';
    modalBotao.innerHTML = 'Excluir';
    modalTitulo.className = 'modal-header text-danger';
    modalBotao.className = 'btn btn-danger';


    $('#modalExcluiDespesa').modal('show'); // Abre o modal
    
    // Após abrir o modal, você pode adicionar um evento para recarregar a página
    modalBotao.addEventListener('click', function () {
        window.location.reload();
    });
}
import React from 'react'
import menu from './menu'
import Producto from './Producto'
import Pedido from './Pedido'
import {db} from './burguerBase'


let pedidoTomado = [];
let pedidoEnviado = {};
let count = 0,
contadorDePedidos = 0;
class MostrarMenu extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			menu, 
			pedidoTomado, 
			pedidoEnviado,
			total: 0
		};
		this.handlePedidoClick = this.handlePedidoClick.bind(this)
	}

	componentDidMount() {
		document.getElementById('btnSubmit').setAttribute('disabled', 'true')
	}

	productos(product) {
		let titulo = 'spacing c-b zoom'
		if (product === 'Perros' || product === 'Wraps') {
			titulo = 'spacing c-y zoom'
		}else if (product === 'Maicitos' || product === 'Salchipapas') {
			titulo = 'spacing c-r zoom'
		}
		return(
			<div>
				
				<h1 onClick={() => {this.showItems(product)} } className={titulo}>
					<img src={this.state.menu.[product].img} 
						alt={product} 
						width='50px' /> {product}
				</h1>
				<div id={product} className='stock-de-productos' style={{display:'none'}}>
					{this.state.menu.[product].productos.map((p) => {
						return(
							<Producto
								key = {p.id}
								id = {p.id}
								name = {p.name}
								ingredientes = {p.ingredientes}
								pryce= {p.pryce}
								onClick= {this.handlePedidoClick}
								mouseOver = {this.showIng.bind(this)}
								mouseOut = {this.hideIng.bind(this)}
							/>						
						)	
					})}
				</div>
			</div>
		)
	}


	handlePedidoClick(e) {
		let pedido = document.getElementById('pedido')
		// document.getElementById('botonDePedido').innerText = 'Ocultar Pedido'
		const data = e.currentTarget.dataset
		pedidoTomado.push({
			name: data.name,
			ingredientes: data.ingredientes.split(','),
			pryce: data.pryce,
			key: count
			
		})
		count += 1;
		contadorDePedidos += 1;
		this.setState(pedidoTomado)
		this.setState({
			total: this.state.total + parseInt(e.currentTarget.dataset.pryce)
		})

		if(pedido.style.display === 'none') {
			document.getElementById('carrito').style.display = 'flex';
		}

		if (document.getElementById('notas-de-pedido').style.display !== 'none') {
			document.getElementById('notas-de-pedido').style.display = 'none'
		}
	}

	showItems(id){
		let elemento = document.getElementById(id);
		if(elemento.style.display !== 'none') {
			let o = 1
			let interval = setInterval(() => {
				o -= 0.2
				elemento.style.opacity = o;
				if(o <= 0) {
					o = 0;
					clearInterval(interval)
					elemento.style.display = 'none';
				}
			}, 50)
			
		} else {
			let o = 0;
			let interval = setInterval(() => {
				o += 0.2
				elemento.style.display = 'flex';
				elemento.style.opacity = o;
				if(o >= 1) {
					o = 1;
					clearInterval(interval)
				}
			}, 50)
		}
	}

	showIng(e) {
		e.currentTarget.children[1].style.display = 'block'
	}

	hideIng(e) {
		e.currentTarget.children[1].style.display = 'none'
	}

	handleEditarPedidoClick(e) {
		this.setState({
			total: this.state.total + parseInt(e.currentTarget.dataset.pryce)
		})
		for(let i in pedidoTomado) {
			let adiciones = document.getElementById('adicion-' + i);
			if(adiciones !== null && adiciones.textContent.length > 16) {
				pedidoTomado[i].adicion = adiciones;
				this.setState(pedidoTomado)	
			}
		}
	}

	eliminarIngrediente() {
		
		setTimeout(()=> {
			for(let i in pedidoTomado) {
				let sustracciones = document.getElementById('sustraccion-' + i);
				if (sustracciones !== null && sustracciones.textContent.length > 5) {
					pedidoTomado[i].sustraccion = sustracciones;	
				}
			}
		}, 1000)
	}
	
	handleDeleteClick(e){
		let pedido = e.currentTarget.parentNode;
		pedido.remove()
		let total = document.getElementById('total')
		this.setState({
			total: parseInt(total.dataset.total) - parseInt(pedido.dataset.total)
		})
		contadorDePedidos -= 1;
	}

	handleNotaChange(e) {
		let entrada = e.target.value
		let nota = e.target.value.match(/(?<=\*)[^]*(?=\*)/g),
		boton = document.getElementById('btnSubmit');
		if(entrada.length > 0) {
			boton.removeAttribute('disabled')
		} else {
			boton.setAttribute('disabled', true)
		}
		
		if(nota === null){
			let cliente = entrada
			pedidoEnviado.cliente = cliente
		}else{
			let cliente = entrada.split('*'+nota+'*').join('')
			pedidoEnviado.cliente = cliente;
			pedidoEnviado.nota = 'Nota: ' + nota[0];
		}
		this.setState(pedidoEnviado);	
	}

	handleEnviarPedidoClick() {
		pedidoEnviado['orden']= []
		for(let i in pedidoTomado) {
			let adiciones = document.getElementById('adicion-' + i);
			let sustracciones = document.getElementById('sustraccion-' + i);
			let pedido = document.getElementById(i);
			
			if(adiciones !== null && adiciones.textContent.length > 16) {
				pedidoTomado[i].adicion = adiciones.textContent;	
			}
			if (sustracciones !== null && sustracciones.textContent.length > 5) {
				pedidoTomado[i].sustraccion = sustracciones.textContent;	
			}
			if (pedido !== null && pedido.dataset.estado !== 'enviado') {
				let subTotal = parseInt(pedido.dataset.total)
				pedidoTomado[i].pryce = '$'+subTotal; 
				pedidoEnviado.orden.push(pedidoTomado[i])
				pedido.style.display = 'none'
				pedido.dataset.estado = 'enviado'
			}
		}
		

		if(this.state.total === 0) {
			document.getElementById('notas-de-pedido').style.display = 'block'
			document.getElementById('notas-de-pedido').textContent = 'No se puede enviar una orden vacia';
		} else {			
			pedidoEnviado.total = 'Total= $' + this.state.total;
			pedidoEnviado.status = 'Enviado';
			pedidoEnviado.btnCajero = 'Cancelar';
			pedidoEnviado.btnCocinero = 'Tomar';
			pedidoEnviado.name = this.props.cajeroName;
			pedidoEnviado.btnDisabled = false;
			pedidoEnviado.tiempoI = new Date().getTime();
			this.setState(pedidoEnviado)

			db.collection("pedido").add(this.state.pedidoEnviado)
			.then(function(docRef) {
				let aviso = document.getElementById('anotaciones')
			        aviso.style.display = 'flex'
			        aviso.children[0].textContent = 'Pedido enviado a cocina exitósamente'
			        setTimeout(() => {
			          aviso.style.display = 'none'
			        }, 5000)
			    db.collection('pedido').doc(docRef.id).update({
			    	firebaseId: docRef.id
			    })
			})
			.then(() => {
				pedidoEnviado = {};
				this.setState({total: 0, pedidoEnviado})
				document.getElementById('nota').value = '';
				contadorDePedidos = 0;
				document.getElementById('btnSubmit').setAttribute('disabled', 'true')
				document.getElementById('notas-de-pedido').style.display = 'block'
				document.getElementById('notas-de-pedido').textContent = 'Ya puede solicitar su siguiente pedido';
				document.getElementById('pedido').style.display = 'none';
				document.getElementById('carta').classList.remove('borroso')
				document.getElementById('botonDePedido').textContent = 'Mostrar Pedido'
			})
			.catch(function(error) {
			    console.error("Error adding document: ", error);
			});

			
		}			
	}

	

	render() {
		return (
			<div className='content'>
				<div className='carta' id='carta'>
					{this.productos('Hamburguesas')}
					<hr/>
					{this.productos('Sandwiches')}
					<hr/>
					{this.productos('Perros')}
					<hr/>
					{this.productos('Wraps')}
					<hr/>
					{this.productos('Maicitos')}
					<hr/>
					{this.productos('Salchipapas')}
					<hr/>
				</div>
				<div className='pedido' id='pedido' style={{display: 'none'}}>	
					{this.state.pedidoTomado.map((p) => {
							return(
								<Pedido
									id = {p.key}
									{...p}
									editar = {this.handleEditarPedidoClick.bind(this)}
									eliminarIngrediente = {this.eliminarIngrediente.bind(this)}
									eliminarPedido = {this.handleDeleteClick.bind(this)}
								/>						
							)	
						})}
					<h2 id='notas-de-pedido'
						style={{color: 'lightgray', margin: '10px'}}>
						Aún no has solicitado niguno de nuestros productos
					</h2>
					<aside id='total' data-total={this.state.total}>
						<input type='text' 
						name='nota'
						id='nota' 
						onChange={this.handleNotaChange.bind(this)}
						placeholder='Cliente *Esto es una nota*'
						required= 'required'/>
						<button
						id='btnSubmit'
						onClick={this.handleEnviarPedidoClick.bind(this)}
						className='btn-ppal s-2' 
						>Total: ${this.state.total}</button>
					</aside>
				</div>
				<h2 id='carrito'>Productos Pedidos   
					<span className='contador'>{contadorDePedidos}</span></h2>
			</div>			
		)
	}

}

export default MostrarMenu;
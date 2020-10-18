import React from 'react'
import Orden from './Orden'


export default class PedidosEnCola extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	
	

	componentDidMount(){
		let input = document.getElementById('inputF' + this.props.identificar),
			btnCajero= document.getElementById('btnCajero' + this.props.identificar);
		if(this.props.controlador === 'cocinero') {
			input.remove()
			btnCajero.remove()
			
			if(this.props.status === 'Enviado') {
				this.setState({
					status: 'Recibido'
				})
			}else {
				this.setState({
					status: 'Tomado'
				})
			}
		}
	}

	boton() {
		if(this.props.status === 'Listo' || this.props.status === 'Tomado') {
			return <button onClick={this.props.editarEstado.bind(this)}
				onMouseUp = {this.props.actualizarPedidos}
				id={'btnCajero' + this.props.identificar}
				disabled={this.props.btnDisabled}
				style={{display:this.props.display}}
				className='btn-ppal s-2'>{this.props.btnCajero}</button>
		}else if (this.props.status === 'Enviado') {
			return <button onClick={this.props.editarEstado.bind(this)}
				onMouseUp = {this.props.actualizarPedidos}
				id={'btnCajero' + this.props.identificar}
				disabled={this.props.btnDisabled}
				style={{display:this.props.display}}
				className='btn-3 s-2'>{this.props.btnCajero}</button>
		}
	}

	

	estado() {
		if(this.props.status === 'Enviado' || this.props.status === 'Cancelado') {
			return <p>Estado: 
						<span className='s-1 c-r'>
							{this.state.status ||  this.props.status}
						</span>
					</p>
		} else if (this.props.status === 'Tomado') {
			return <p>Estado:  
						<span className='s-1 c-b'>
							 {' ' + this.props.status}
						</span>
					</p>
		} else if (this.props.status === 'Entregado' || this.props.status === 'Listo') {
			return <p>Estado: 
						<span className='s-1 c-g'>
							 {' ' + this.props.status}
						</span>
					</p>
		} 
	}

	render() {

		return(
			<div className = 'pedidos'
				// id={this.props.identificar}
				onClick={this.props.editarEstado.bind(this)}
				onMouseUp = {this.props.actualizarPedidos}
				data-btncocinero = {this.props.btnCocinero}
			>
				<h2 className='spacing'><strong>{this.props.cliente}</strong></h2>
				<p>{this.props.tiempo}</p>
				<p>{this.props.notaF || this.props.nota}</p>
				<h3 className='precio-1'>{this.props.total}</h3>
				<hr/>
				<div style={{display:this.props.display}}>
					<Orden orden = {this.props.orden}/>
					{this.estado()}
					<input type='text' 
					id={'inputF' + this.props.identificar} 
					name= 'inputF'
					onBlur={this.props.input.bind(this)}
					placeholder='Notas finales'></input>
				</div>
				<p>
					Pedido por: <span> {this.props.name}</span></p>
				{this.boton()}
				<span className='contador'>{this.props.identificar + 1}</span>
				
			</div>
		)
	}
}
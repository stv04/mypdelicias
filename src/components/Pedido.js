import React from 'react'
import Adiciones from './Adiciones'

class Pedido extends React.Component{
	constructor(props){
		super(props);
		this.adicion = [];
		this.ingredienteEliminado = []
		this.state = {
			pryce: this.props.pryce,
			adicion: [],
			ingredienteEliminado: []
		};

	}

	handleShow(e){
		let elemento = e.currentTarget.children;
		if(elemento[4].style.display !== 'none' 
			&& e.target.tagName !== 'BUTTON') {
			elemento[4].style.display = 'none'
			elemento[5].style.display = 'none'
		} else if(elemento[4].style.display === 'none' 
			&& e.target.tagName !== 'BUTTON' 
			&& e.target.dataset.type !== 'adicion'){
			elemento[4].style.display = 'block'
			elemento[5].style.display = 'none'
			
		}

		if(e.target.getAttribute('id') === 'add-button' + this.props.id) {
			if(elemento[5].style.display === 'none') {
				elemento[5].style.display = 'block'
			} else {
				elemento[5].style.display = 'none'
			}
		}

		if(e.target.dataset.type === 'ingrediente') {
			elemento[2].style.display = 'block'
		}
	}


	handleAdicionarClick(e) {
		let data = e.currentTarget.dataset;

		if(data.pryce !== undefined) {
			this.setState({
				pryce: parseFloat(data.pryce) + parseFloat(this.state.pryce)
			})
		}
		if(data.adicion !== undefined) {
			this.adicion.push(data.adicion)
			this.setState({
				adicion: this.adicion
			})
			document.getElementById('adicion-' + this.props.id).style.display = 'block'
		}
		if(data.ing !== undefined) {
			this.ingredienteEliminado.push(data.ing)
			this.setState({
				ingredienteEliminado: this.ingredienteEliminado
			})
			e.currentTarget.parentNode.remove()
		}
	}


	render(){
		return(
			<div className='producto-selec btn-1'
			id={this.props.id} 
			data-total={this.state.pryce}
			onClick={this.handleShow.bind(this)}>

				<span onClick={this.props.eliminarPedido} className='contador'>&Chi;</span>
				<h2>{this.props.name}</h2>
				<p style={{display: 'none'}}
				id={'sustraccion-' + this.props.id}>
					Sin: {this.state.ingredienteEliminado.join(', ')}
				</p>			
				<p style={{display: 'none'}} 
				id={'adicion-' + this.props.id}
				data-adiciones={this.state.adicion.join(', ')}>

					Con adición de: {this.state.adicion.join(', ')}
				</p>
				<ul style={{display: 'none'}}>
					{this.props.ingredientes.map((ing, index) => {
						return (<li key={index}>
							<button 
							onClick = {this.handleAdicionarClick.bind(this)}
							onMouseUp = {this.props.eliminarIngrediente}
							data-ing={ing}
							data-type = 'ingrediente'
							className='btn-1'>
								{ing}
							</button>
							</li>)
					})}
				</ul>
				<Adiciones
					sumar = {this.props.editar} 
					adicionar = {this.handleAdicionarClick.bind(this)}
				/>
				<h4 className='pryce' id={'total-' + this.props.id}>${this.state.pryce}</h4>
				<button id={'add-button' + this.props.id} className='btn'>Adicionar</button>
			</div>
		)
	}
}

export default Pedido
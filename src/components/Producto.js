import React from 'react';


class Producto extends React.Component{
	constructor(props){
		super(props);
		this.state = {}
	}


	render(){
		const {name, ingredientes, pryce, onClick, mouseOver, mouseOut} = this.props
		return(
			<div  onClick = {onClick}
				onMouseOver = {mouseOver}
				onMouseOut = {mouseOut}
				data-name = {name}
				data-ingredientes = {ingredientes}
				data-pryce = {pryce}
				className = 'producto btn-ppal'
			>
				<h2>{name}</h2>
				<p className='ing'>{ingredientes.join(', ')}</p>
				<h4 className='precio'>${pryce}</h4>
			</div>
		)
	}
}

export default Producto
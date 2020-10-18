import React from 'react'

export default function Evaluacion(props) {
	
	return(
		<div id='evaluacion' className='oculto' 
              style={{margin: '10px'}}>
			<p>Total de pedidos Realizados = {props.pedidos}</p>
			<p>Total de pedidos Entregados = {props.entregados}</p>
			<p>Total de pedidos Cancelados = {props.cancelados}</p>
			<p>Tiempo promedio en entrega de Pedidos = {props.promedio}</p>
		</div>
	)
}
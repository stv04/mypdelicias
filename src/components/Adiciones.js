import React from 'react'
import menu from './menu'

export default function Adiciones(props) {
	return (
		<div className= 'adiciones' id='adiciones' style={{display:'none'}}>
			<h3>Adiciones</h3>
			<nav className= 'adiciones'>
				{
					menu.Adiciones.name.map((add, index) => {
						return (
							<button key={index} 
							className='adicion btn-ppal' 
							data-pryce = {menu.Adiciones.pryce[index]}
							data-adicion = {add}
							data-type = 'adicion'
							onMouseUp = {props.adicionar}
							onClick = {props.sumar}
							>
							<p data-type='adicion' className='m-0'>{add}
							</p>
							<p data-type='adicion' className='m-0'>${menu.Adiciones.pryce[index]}</p>
							</button>
						)
					})
				}
			</nav>
			<hr/>
			<h3>Bebidas</h3>
			<nav className= 'adiciones'>
				{
					menu.Bebidas.name.map((add, index) => {
						return (
							<button key={index} 
							className='adicion btn-ppal' 
							data-pryce = {menu.Bebidas.pryce[index]}
							data-adicion = {add}
							data-type = 'adicion'
							onMouseUp = {props.adicionar}
							onClick = {props.sumar}
							>
							<p data-type='adicion' className='m-0'>{add}
							</p>
							<p data-type='adicion' className='m-0'>${menu.Bebidas.pryce[index]}</p>
							</button>
						)
					})
				}
			</nav>
		</div>
	)
} 
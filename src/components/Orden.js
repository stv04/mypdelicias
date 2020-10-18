import React from 'react'

export default class Orden extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}


	render() {
		return(
			<div>
				{this.props.orden.map((o, index) => {
					return (
							<div key={index} >
								<h3>{o.name}</h3>
								<p>{o.adicion}</p>
								<p>{o.sustraccion}</p>
								<h5 className='precio'>{o.pryce}</h5>
							</div>
						)
				})
						
			}	
			</div>
		)
	}
}
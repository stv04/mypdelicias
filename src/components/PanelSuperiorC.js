import React from 'react';
import PedidosEnCola from './PedidosEnCola'
import {db} from './burguerBase'
import Evaluacion from './Evaluacion'

let pedidos = [];
let evaluacion = {
  pedidos: 0,
  entregados: 0,
  cancelados: 0,
  tiempos: [],
  calPromedio: 0,
  promedio: 0
}
class PanelSuperiorC extends React.Component {

	constructor(props){
		super(props);
		this.state = {pedidos, evaluacion};
		this.handleMostrarOrdenClick = this.handleMostrarOrdenClick.bind(this)
	}

controlarPanel(e){
	let panelSuperior = document.getElementById('panelSuperiorC'),
	boton = document.getElementById('botonPanelSuperior')
    let altura = parseInt(document.defaultView.getComputedStyle(e.target.parentNode).height)
    console.log(e.target.parentNode)
    console.log(e.target)
    if(altura > 0){
      let intervalo = setInterval(()=> {
        if(altura <= 0) {
          panelSuperior.style.height = 0+'px';
          boton.style.top = 0+'px'
          clearInterval(intervalo)
        }
        panelSuperior.style.height = altura +'px';
        boton.style.top = altura +'px'
        altura -= 50
        
      }, 50)
    }else{
      let pantalla = window.screen.height,
      alturaPanel = (7*pantalla) / 10;
      let intervalo = setInterval(()=> {
        altura += 50
        if(altura >= alturaPanel) {
          clearInterval(intervalo)
        }
        panelSuperior.style.height = altura +'px'
        boton.style.top = altura +'px'
      }, 50)
      this.handleMostrarOrdenClick('Enviado', 'Tomado')    
    }
}

	
  async componentDidMount(){
  	// pedidos = []
  	// await this.handleMostrarOrdenClick('listo')
    document.getElementById('selector-de-pedidos').style.display = 'none'
  }

  

  handleMostrarOrdenClick(status1, status2) {
    evaluacion.entregados = 0;
    evaluacion.cancelados = 0;
    evaluacion.tiempos = [];
    evaluacion.calPromedio = 0;
    evaluacion.pedidos = 0;
  	if(status1 === 'Entregado') {
      document.getElementById('evaluacion').style.display = 'block'
  		// document.getElementById('pedidos-enviados').style.flexDirection = 'column'
  	}else {
  		// document.getElementById('pedidos-enviados').style.flexflow = 'row'
       document.getElementById('evaluacion').style.display = 'none'
  	}

  	db.collection("pedido").orderBy('tiempoI', 'desc')
  	.get().then((querySnapshot) => {
	    querySnapshot.forEach((doc) => {
	    	if(doc.data().status === status1 || doc.data().status === status2) {
	    		pedidos.push(doc.data());
	    	}

        if(doc.data().status === 'Entregado') {
          evaluacion.entregados += 1
          evaluacion.pedidos += 1
          let tiempoT = doc.data().tiempoF - doc.data().tiempoI;
          evaluacion.tiempos.push(tiempoT) 
        }else if(doc.data().status === 'Cancelado') {
          evaluacion.cancelados += 1
          evaluacion.pedidos += 1
          let tiempoT = doc.data().tiempoF - doc.data().tiempoI;
          evaluacion.tiempos.push(tiempoT)
        }             
	    });
	})
	.then(() => {
    evaluacion.tiempos.map((t, i) => {
      evaluacion.calPromedio += t
      return evaluacion.promedio = this.calcularTiempo(evaluacion.calPromedio / (i+1))
    })
		this.setState({pedidos});
    this.setState({evaluacion})
		pedidos=[];
	});
  }

  handleNotaChage(e){
  	console.log(e.target.value)
  	console.log(this.state)
  	db.collection('pedido').doc(this.props.firebaseId)
  		.update({
  			notaF: 'Nota: ' + e.target.value 
  		})
  }


  calcularTiempo(tiempoT) {
        let segundos = Math.round(tiempoT / 1000),
        minutos = Math.round(segundos / 60),
        resMin = Math.round(segundos % 60),
        horas = Math.round(minutos / 60),
        resHor = Math.round(minutos % 60)
        if(segundos <= 59){
          return (`${segundos} Segundos`)
        } else if(segundos > 59 && minutos <=59){
          return (`${minutos} Minutos, con ${resMin} Segundos`)
        } else if(minutos > 59 && horas < 23){
          let hora = 'Horas';
          if (horas === 1 ) {
            hora = 'Hora'
          }
          return (`${horas} ${hora} con, ${resHor} Minutos y ${resMin} Segundos`)
        }
      }




	render() {
		return (
			<div id='panelSuperiorC'>
		        <nav id='selector-de-pedidos'> 
		         <a href='#pedidos-enviados' 
		         onClick={() => {this.handleMostrarOrdenClick('Enviado')}}>Pedidos En Cola</a>
		         <a href='#pedidos-enviados' 
		          onClick={() => {this.handleMostrarOrdenClick('Tomado', 'Listo')}}>Pedidos Tomados</a>
		         <a href='#pedidos-enviados'
		         onClick={() => {this.handleMostrarOrdenClick('Entregado', 'Cancelado')}}>Historial de Pedidos</a>
		        </nav>
            <Evaluacion
              {...this.state.evaluacion}
            />
		        <div className = 'pedidosEnviados' id='pedidos-enviados'>
		       	{
		        	this.state.pedidos.map((p, index) => {
		        		return(
		        			<PedidosEnCola
		        				key = {index}
		        				identificar = {index}
			        			{...p}
		        			/>
		        		)
		        		
		        	})
		        }
		        </div>
		        <button id="botonPanelSuperior" onClick={this.controlarPanel.bind(this)}>^^</button>
        	</div>
		)
	}
}

export default PanelSuperiorC;
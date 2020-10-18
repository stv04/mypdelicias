import React from 'react';
import PedidosEnCola from './PedidosEnCola'
import {db} from './burguerBase'
import Evaluacion from './Evaluacion'
import './loader.css'

let pedidos = [];
let evaluacion = {
  pedidos: 0,
  entregados: 0,
  cancelados: 0,
  tiempos: [],
  calPromedio: 0,
  promedio: 0
}
let observador = 0;
class PanelSuperior extends React.Component {

	constructor(props){
		super(props);
		this.state = {pedidos, evaluacion};
		this.handleMostrarOrdenClick = this.handleMostrarOrdenClick.bind(this)
	}

controlarPanel(e){
	let panelSuperior = document.getElementById('panelSuperior'),
	boton = document.getElementById('botonPanelSuperior');
    let altura = parseInt(document.defaultView.getComputedStyle(e.target.parentNode).height)
    if(altura > 0){
      let intervalo = setInterval(()=> {
        if(altura <= 0) {
          panelSuperior.style.height = 0+'px';
          boton.style.top = 0+'px'
          clearInterval(intervalo)
          boton.style.transform = 'rotate(180deg)'
          boton.classList.remove('btn-3')
          boton.textContent = '^'
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
          boton.style.transform = 'rotate(0deg)'
          document.getElementById('nav-1').classList.remove('btn-nav')
          document.getElementById('nav-2').classList.remove('btn-nav')
          document.getElementById('nav-3').classList.remove('btn-nav')
        }
        panelSuperior.style.height = altura +'px'
        boton.style.top = altura +'px'
      }, 50)
      
    
    }

    if(this.props.controlador === 'cocinero') {
      this.handleMostrarOrdenClick('Entregado', 'Cancelado')
    } else {
      this.handleMostrarOrdenClick('Listo')
    }
}

  observarCambios() {
    let boton = document.getElementById('botonPanelSuperior')
    db.collection("pedido").where('status', '==', 'Listo')
    .get().then((querySnapshot) => {
        if(querySnapshot.size !== 0 && querySnapshot.size > observador) {
          boton.classList.add('btn-3')
          boton.textContent = 'Pedidos listos: ' + querySnapshot.size
          boton.style.transform = 'rotate(0deg)'
          document.getElementById('audio').play()
        } 
      observador = querySnapshot.size
    });
  }

  async componentDidMount(){
  	// pedidos = []
  	// await this.handleMostrarOrdenClick('listo')
    if(this.props.controlador === 'cocinero') {
      document.getElementById('selector-de-pedidos').style.display = 'none'
    } else {
      setInterval(() => {
        this.observarCambios()
      }, 10000)
    }
  }

  componentWillUnmount() {
    clearInterval()
  }

  handleMostrarOrdenClick(status1, status2) {
    document.getElementById('loader').classList.remove('oculto');
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
    document.getElementById('loader').classList.add('oculto')
    if(this.state.pedidos.length === 0) {
      let notaDePedido = document.getElementById('notas-de-pedido3');
      notaDePedido.style.display = 'block'
      if(status1 === 'Enviado') {
        notaDePedido.textContent = 'No hay ninguna orden pendiente por preparar.'
      } else if(status1 === 'Tomado') {
        notaDePedido.textContent = 'El cocinero no ha Tomado aún ningun pedido.'
      } else if(status1 === 'Entregado'){
        notaDePedido.textContent = 'No ha pedidos cancelados o entregasdos para mostar en el historial.'
      } else {
        notaDePedido.textContent = 'No tienes pedidos pendientes por entregar.'
      }
    } else {
      document.getElementById('notas-de-pedido3').style.display = 'none'
    }
	});
  }

  handleNotaChage(e){
  	db.collection('pedido').doc(this.props.firebaseId)
  		.update({
  			notaF: 'Nota: ' + e.target.value 
  		})
  }

  HandleEditarStatusClick(e) {
  	let tiempoF = new Date().getTime(),
  	tiempoI = this.props.tiempoI;
  	if(this.props.btnCajero === 'Cancelar' && e.target.tagName === 'BUTTON') {
  		db.collection('pedido').doc(this.props.firebaseId)
  		.update({
  			status: 'Cancelado',
  			tiempo: calcularTiempo(),
        tiempoF: new Date().getTime(),
  			btnCajero: 'Detalles',
  			btnCocinero: 'Detalles',
  			display: 'none' 
  		})
  	}else if (this.props.btnCajero === 'Entregar' && e.target.tagName === 'BUTTON') {
  		db.collection('pedido').doc(this.props.firebaseId)
  		.update({
  			status: 'Entregado',
  			tiempo: calcularTiempo(),
        tiempoF: new Date().getTime(),
  			btnCajero: 'Detalles',
  			btnCocinero: 'Detalles',
  			display: 'none'
  		}).then(()=> {
  			
  		})
  	}else if (this.props.btnCajero === 'Detalles') {
  		let pedidos = e.currentTarget.children[5],
  		input = pedidos.children[2];

  		if(pedidos.style.display === 'none') {
  			pedidos.style.display = 'block';
  		} else {
  			pedidos.style.display = 'none';
  		}
  		
  		input.style.display = 'none'
  	} 

  		function calcularTiempo() {
  			let tiempoT = tiempoF - tiempoI,
  			segundos = Math.round(tiempoT / 1000),
  			minutos = Math.round(segundos / 60),
  			resMin = Math.round(segundos % 60),
  			horas = Math.round(minutos / 60),
  			resHor = Math.round(minutos % 60)
  			if(segundos <= 59){
  				return (`${segundos} Segundos`)
  			} else if(segundos > 59 && minutos <=59){
  				return (`${minutos} Minutos, con ${resMin} Segundos`)
  			} else if(minutos > 59){
  				let hora = 'Horas';
  				if (horas === 1 ) {
  					hora = 'Hora'
  				}
  				return (`${horas} ${hora} con, ${resHor} Minutos y ${resMin} Segundos`)
  			}
  		}

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
        } else if(minutos > 59){
          let hora = 'Horas';
          if (horas === 1 ) {
            hora = 'Hora'
          }
          return (`${horas} ${hora} con, ${resHor} Minutos y ${resMin} Segundos`)
        }
      }


  handleActualizarClick(e) {
    if(e.currentTarget.textContent === 'Cancelar') {
      this.notas('Has cancelado un pedido')
    } else if( e.currentTarget.textContent === 'Entregar') {
      this.notas('¡Felicidades! Has entregado un pedido con éxito')
    }
      for(let i in this.state.pedidos){
        let boton = document.getElementById('btnCajero' + i)
        if(boton !== null && boton.textContent === 'Cancelar' && e.target.tagName === 'BUTTON') {
          this.handleMostrarOrdenClick('Enviado')
        }
        else if(boton !== null && boton.textContent === 'Entregar' && e.target.tagName === 'BUTTON') {
          this.handleMostrarOrdenClick('Tomado', 'Listo') 

        }
      }
  }

  notas(mensaje) {
      let aviso = document.getElementById('anotaciones')
        aviso.style.display = 'flex'
        aviso.children[0].textContent = mensaje
        setTimeout(() => {
          aviso.style.display = 'none'
        }, 5000) 
  }

  ventana(mark, uno, dos) {
    let ppal = document.getElementById(mark),
        sec = document.getElementById(uno),
        terc = document.getElementById(dos);

    sec.classList.remove('btn-nav')
    terc.classList.remove('btn-nav')
    ppal.classList.add('btn-nav')
  }

	render() {
		return (
			<div id='panelSuperior'>
		        <nav id='selector-de-pedidos'> 
		         <a href='#pedidos-enviados' id='nav-1'
		         onClick={() => {this.handleMostrarOrdenClick('Enviado')}}
             onMouseUp = {() => {this.ventana('nav-1', 'nav-2', 'nav-3')}}>Pedidos En Cola</a>
		         <a href='#pedidos-enviados' id='nav-2'
		          onClick={() => {this.handleMostrarOrdenClick('Tomado', 'Listo')}}
             onMouseUp = {() => {this.ventana('nav-2', 'nav-1', 'nav-3')}}>Pedidos Tomados</a>
		         <a href='#pedidos-enviados' id='nav-3'
		         onClick={() => {this.handleMostrarOrdenClick('Entregado', 'Cancelado')}}
             onMouseUp = {() => {this.ventana('nav-3', 'nav-2', 'nav-1')}}>Historial de Pedidos</a>
		        </nav>
            <Evaluacion
              {...this.state.evaluacion}
            />
            <h2 id='notas-de-pedido3'
            style={{color: 'lightgray', margin: '10px'}}>
            </h2>
            <div id='loader' className='loader oculto'></div>
		        <div className = 'pedidosEnviados' id='pedidos-enviados'>
		       	{
		        	this.state.pedidos.map((p, index) => {
		        		return(
		        			<PedidosEnCola
		        				key = {index}
		        				identificar = {index}
			        			{...p}
			        			editarEstado = {this.HandleEditarStatusClick}
			        			actualizarPedidos = {this.handleActualizarClick.bind(this)}
			        			input = {this.handleNotaChage}
		        			/>
		        		)
		        		
		        	})
		        }

		        </div>
		        <button id="botonPanelSuperior" 
            className='btn' onClick={this.controlarPanel.bind(this)}>
            ^</button>
        	</div>
		)
	}
}

export default PanelSuperior;
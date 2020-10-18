import React from 'react';
import PedidosEnCola from './PedidosEnCola'
import {db} from './burguerBase'
import './loader.css'

let pedidos = [];
let observador = 0,
  contadorDePedidos = 0;
class PanelSuperior extends React.Component {

	constructor(props){
		super(props);
		this.state = {pedidos};
    this.handleMostrarOrdenClick = this.handleMostrarOrdenClick.bind(this)
	}
	
  componentDidMount() {
    this.handleMostrarOrdenClick('Enviado', 'Tomado')
    setInterval(() => {
      this.observarCambios()
    }, 10000)
  }

  componentWillUnmount() {
    clearInterval()
  }

  observarCambios() {
    db.collection("pedido").where('status', '==', 'Enviado')
    .get().then((querySnapshot) => {
        if(querySnapshot.size !== observador) {
          document.getElementById('audio').play()
          this.handleMostrarOrdenClick('Enviado', 'Tomado')

          if(querySnapshot.size > 0) {
            document.getElementById('carrito').style.display = 'block'
          } else {
            document.getElementById('carrito').style.display = 'none'
          }
        }
        observador = querySnapshot.size;
        contadorDePedidos = querySnapshot.size;
      });
  }


  handleMostrarOrdenClick(status1, status2) {
    document.getElementById('loader1').classList.remove('oculto')
  	db.collection("pedido").orderBy('tiempoI')
  	.get().then((querySnapshot) => {
	    querySnapshot.forEach((doc) => {
	    	if(doc.data().status === status1 || doc.data().status === status2) {
	    		pedidos.push(doc.data());
	    	}	             
	    });
  	})
  	.then(() => {
  		this.setState({pedidos});
  		pedidos=[];
      if(this.state.pedidos.length === 0) {
        document.getElementById('notas-de-pedido2').style.display = 'block'
      } else {
        document.getElementById('notas-de-pedido2').style.display = 'none'
      }
      document.getElementById('loader1').classList.add('oculto')
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

  

  HandleEditarStatusClick(e) {
  	if(this.props.btnCocinero === 'Tomar') {
  		db.collection('pedido').doc(this.props.firebaseId)
  		.update({
  			status: 'Tomado',
  			btnCajero: 'Entregar',
  			btnCocinero: 'Listo',
        btnDisabled: true 
  		}).then(() => {
        let aviso = document.getElementById('anotaciones')
        aviso.style.display = 'flex'
        aviso.children[0].textContent = 'Acabas de tomar el Pedido de ' +this.props.cliente+ ' exitósamente'
        setTimeout(() => {
          aviso.style.display = 'none'
          console.log('ocultandose')
        }, 5000)
        this.props.actualizarPedidos()
      })
  	}else if (this.props.btnCocinero === 'Listo') {
  		db.collection('pedido').doc(this.props.firebaseId)
  		.update({
  			status: 'Listo',
  			btnCajero: 'Entregar',
  			btnDisabled: false
  		}).then(() => {
        let aviso = document.getElementById('anotaciones')
        aviso.style.display = 'flex'
        aviso.children[0].textContent = 'Pedido de: ' +this.props.cliente+ ' ya está listo para ser entregado'
        setTimeout(() => {
          aviso.style.display = 'none'
          console.log('ocultandose')
        }, 5000)
        this.props.actualizarPedidos()
      })
  	} 
  }

  


	render() {
		return (
			<div>
	        <div className = 'pedidosEnviados' 
          id='pedidos-enviados'>
	       	{
	        	this.state.pedidos.map((p, index) => {
	        		return(
	        			<PedidosEnCola
	        				key = {index}
	        				identificar = {index}
                  controlador = 'cocinero'
		        			{...p}
		        			editarEstado = {this.HandleEditarStatusClick}
                  actualizarPedidos = {() => {this.handleMostrarOrdenClick('Enviado', 'Tomado')}}
		        			input = {this.handleNotaChage}
	        			/>
	        		)
	        		
	        	})
	        }
	      </div>
        <h2 id='notas-de-pedido2'
            style={{color: 'lightgray', margin: '10px'}}>
            Aún no tienes productos por preparar
        </h2>
            <div id='loader1' className='loader oculto'></div>

        <h2 id='carrito'>Productos Recibidos   
          <span className='contador'>{contadorDePedidos}</span></h2>
		  </div>
		)
	}
}

export default PanelSuperior;
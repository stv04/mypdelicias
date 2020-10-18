import React from 'react';
import './App.css';
import MostrarMenu from './components/MostrarMenu'
import PanelSuperior from './components/PanelSuperior'
import perfil from './components/imagenes/logos.png'

function App(props) {  
  let pedido = function(e) {
    let orden = document.getElementById('pedido');
    let carrito = document.getElementById('carrito'),
        carta = document.getElementById('carta');
    if (orden.style.display !== 'none') {
      orden.style.display = 'none'
      carta.classList.remove('borroso')
      e.currentTarget.innerText = 'Mostrar Pedido'
    } else {
      orden.style.display = 'flex'
      carrito.style.display = 'none'
      e.currentTarget.innerText = 'Ocultar Pedido'
      carta.classList.add('borroso')
    }
  }

  
 
  return (

    <div id='cajero'>
        <img src={perfil} alt='logo principal' width='200px'/>
        <header style={{justifyContent: 'flex-start'}}>
          <img src={props.perfil || perfil} alt='Perfil del Cajero' width='80px'/>
          <h1 className='s-0' style={{margin: '5px'}}>Bienvenido(a) {props.cajeroName}</h1>
        </header>
        
        <MostrarMenu 
          cajeroName = {props.cajeroName}
        />
        <PanelSuperior />
        <button id='btn-salir' className='btn-1 s-1'>Salir</button>
        <button onClick= {pedido} id='botonDePedido' className='btn-3 s-1'>Mostrar Pedido</button>
    </div>
  );
}

export default App;

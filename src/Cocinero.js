import React from 'react';
import './App.css';
import MostrarPedidos from './components/MostrarPedidos'
import PanelSuperior from './components/PanelSuperior'



function App(props) {  


  return (

    <div id='cocinero'>
        <h1>Ordenes Pendientes</h1>
        <MostrarPedidos/>
        <PanelSuperior  controlador = 'cocinero'/>
        <button id='btn-salir' className='btn-1 s-1'>Salir</button>
    </div>
  );
}

export default App;

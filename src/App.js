import React from 'react';
import logo from './components/imagenes/logos.png'
import alerta from './components/imagenes/alerta.png'


function App() {  
  

  return (
    <div className='inicio'>
      <header>
        <img src={logo} float='lefts' alt='Logo' width='100px'/>
        <div>
          <h1>M&P Delicias Gourmet</h1>
          <h4>El Mejor Sabor!!</h4>
        </div>
      </header>
      <div className='elem-center'>
        <a href='#cajero'>
          <button id='iniciar-cajero' className='btn'>
            <h2>Cajero</h2>
          </button>
        </a>
        <a href='#cajero'>
          <button id='iniciar-cliente' className='btn'>
            <img height='30px' 
              alt='alerta' 
              src={alerta}
              className='img-alerta oculto'/>
            <input type='text' placeholder='Nombre' id='input-iniciar'/>
            <p className='c-r s-2 oculto'>Coloca tu Nombre</p>
            <h2>Cliente</h2>
          </button>
        </a>
        <a href='#cocinero'>
          <button id='iniciar-cocinero' className='btn'>
            <img height='30px' 
              alt='alerta' 
              src={alerta}
              className='img-alerta oculto'/>
            <input type='email' id='email' placeholder='Correo único de cocinero'/>
            <input type='password' id='password' placeholder='Contraseña'/>
            <p className='c-r s-2'></p>
            <h2>Cocinero</h2>
          </button>
        </a>
      </div>
    </div>
  );
}

export default App;



import { useEffect, useState } from 'react'
import './App.css'
import Menu from './components/Menu'
import Productos from './components/Productos'
import Modal from './components/Modal';

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import PaginaVacia from './components/PaginaVacia';

function App() {

  const [productos, setProductos] = useState([]);
  const [popa, setPopa] = useState(false);
  const [producto, setProducto] = useState(null)

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetch('http://localhost:3000/productos')
        if(!response.ok){
          throw new Error('La solicitud del servidor fallo.')
        }
        const data = await response.json()
        setProductos(data)
      } catch (error) {
        console.error('Error al obtener datos del servidor.')
      }
    }
    obtenerProductos();
  },[productos])

  const abrirPopa = () => {
    setPopa(!popa)
  }

 
  const editarProducto = async (id) => {
    const response = await fetch(`http://localhost:3000/productos/${id}`)
    const productoDB = await response.json()
    abrirPopa();
    setProducto(productoDB[0])
  }
 

  return (
    <>
    {
      popa ? <Modal setProducto={setProducto}  producto={producto} toast={toast} setPopa ={setPopa}abrirPopa={abrirPopa} />:'' 
    }
    <Menu abrirPopa={abrirPopa}/>
    {
      productos.length === 0 ? <PaginaVacia/>
      : <Productos abrirPopa={abrirPopa} toast={toast} productos={productos} editarProducto={editarProducto}/> 
    }
    
    <ToastContainer
    position="top-right"
    autoClose={2000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    transition: Bounce
    />
    </>
  )
}

export default App

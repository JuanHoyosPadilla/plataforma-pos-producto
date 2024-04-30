import './producto.css'
import PropTypes from 'prop-types';
import Producto from './Producto';
// eslint-disable-next-line react/prop-types
function Productos({productos,toast,editarProducto}){

  const eliminarProducto = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/productos/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(!response.ok){
        throw new Error('Error al eliminar Producto')
      }

      // eslint-disable-next-line react/prop-types
      toast.success('Producto Eliminado')
      
    } catch (error) {
      console.error(error)
    }
  }

  

    return <div className='container-producto'>
       {
        productos.map(producto => <Producto eliminarProducto={eliminarProducto} producto={producto} key={producto.id} editarProducto={editarProducto} />)
       }
    </div>
}

Productos.propTypes = {
    productos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        nombre: PropTypes.string.isRequired,
        precio: PropTypes.number.isRequired
      })
    ).isRequired
  };

export default Productos;
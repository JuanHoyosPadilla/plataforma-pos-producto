import './producto.css'
import { MdEdit,MdDelete   } from 'react-icons/md';
/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
function Producto({producto,eliminarProducto,editarProducto}){
    
    return <div className='card-producto'>
        <ul>
            <li><span>Nombre: </span>{producto.nombre}</li>
            <li><span>Precio: </span>{producto.precio}</li>
            <li><span>Cantidad: </span>{producto.cantidad}</li>
        </ul>
        <div className='container-actions'>
        <MdEdit className=' btn edit' onClick={() => editarProducto(producto.id)} />
        <MdDelete className='btn delete' onClick={() => eliminarProducto(producto.id)}/>
        </div>
    </div>
}

export default Producto;
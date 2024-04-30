import './menu.css'
function Menu({abrirPopa}){
    return <nav>
        <span>ProductoAdd</span>
        <ul>
            <li>
                <button onClick={abrirPopa}>Agregar</button>
            </li>
        </ul>
    </nav>
}

export default Menu;
import express  from  'express';
import {createPool} from 'mysql2/promise';
import cors from 'cors';


const app =  express();
app.use(express.json())
app.use(cors())

const pool = createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '1234567890',
  database: 'productos_db'
})

// Ruta de prueba
app.get('/test', async (req, res) => {
  const result = await pool.query('SELECT * FROM productos')
  console.log(result)
  res.json(result)
});

//RUTA PARA CREAR  PRODUCTOS

app.post('/productos', async (req,res) => {
  const {nombre,precio,cantidad} = req.body;
  console.log(req.body)
  // validar los datos
  if(!nombre || !precio || !cantidad){
    return res.status(400).json({error: 'Faltan datos del producto'})
  }

  const [result] = await pool.query(
    "INSERT  INTO productos (nombre, precio, cantidad) VALUES(?,?,?)",
    [nombre,precio,cantidad]
  )

  res.status(201).json({message: 'Producto agregado correctamente', productId: result.insertId})
  
})

// RUTA PARA OBTENER TODOS LOS PRODUCTOS
app.get('/productos', async (req,res) => {
  const [results] = await pool.query('SELECT * FROM productos')
  res.json(results)
})

// RUTA PARA OBTENER UN SOLO PRODUCTO

app.get('/productos/:id', async (req, res) => {
  const [result] = await pool.query('SELECT * FROM productos WHERE id = ?', [req.params.id])
  res.json(result)
})

// RUTA PARA ELIMINAR PRODUCTO
app.delete('/productos/:id', async (req, res) => {
  const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [req.params.id])
  res.json({
    message: 'Producto eliminado',
    productId: result.insertId
  })
})

// RUTA PARA EDITAR LOS PRODUCTOS
app.put('/productos/:id', async (req,res) => {
  const result = await pool.query('UPDATE productos SET ? WHERE id = ?', [
    req.body,
    req.params.id
  ])
  res.json(result)
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
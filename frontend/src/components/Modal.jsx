import { useEffect, useState } from "react";

import "./modal.css";

// eslint-disable-next-line react/prop-types
function Modal({ abrirPopa, toast, setPopa, producto, setProducto }) {
  const [formData, setFormData] = useState({
    nombre: "",
    precio: 0.0,
    cantidad: 0,
  });

  useEffect(() => {
    if (producto) {
      setFormData({
        // eslint-disable-next-line react/prop-types
        nombre: producto.nombre,
        // eslint-disable-next-line react/prop-types
        precio: producto.precio,
        // eslint-disable-next-line react/prop-types
        cantidad: producto.cantidad,
      });
    } else {
      setFormData({
        nombre: "",
        precio: 0.0,
        cantidad: 0,
      });
    }
  }, [producto]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //funcion para guardar a la base de datos
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Error al enviar los datos");
      }
      // eslint-disable-next-line react/prop-types
      toast.success("Producto Guardado correctamente");
      setPopa(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handelClosePopa = () => {
    setProducto(null);
    abrirPopa();
  };

  const handelUpdateProducto = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line react/prop-types
      const response = await fetch(
        // eslint-disable-next-line react/prop-types
        `http://localhost:3000/productos/${producto.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Error al editar el producto");
      }

      // eslint-disable-next-line react/prop-types
      toast.success("Producto Editado correctamente");
      abrirPopa();
      setProducto(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="modal">
        <header>
          <h3>{producto ? "Edit Product" : "Add Product"}</h3>
          <button onClick={handelClosePopa}>Cerrar</button>
        </header>

        <form onSubmit={producto ? handelUpdateProducto : handleSubmit}>
          <div className="container-input">
            <span>Nombre</span>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Agrega el nombre"
            />
          </div>
          <div className="container-input">
            <span>Precio</span>
            <input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              placeholder="Agrega precio"
            />
          </div>
          <div className="container-input">
            <span>cantidad</span>
            <input
              type="number"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleChange}
              placeholder="Agrega cantidad"
            />
          </div>
          <div>
            {producto ? (
              <button type="submit">Editar</button>
            ) : (
              <button type="submit">Guardar</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;

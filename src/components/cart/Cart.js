import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';


function Cart(props) {
  const [cart, setCart] = useState([]);
  let setCartProps = props.setCart;
  const regalo_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlZ2Fsb19hZG1pbiIsInN1YiI6NDcsInJvbGVzIjpbInJlZ2Fsb19hZG1pbiJdLCJpYXQiOjE2Njg5NzM5NjB9.DtoyxEFcj6Sow-b9awZKvp8UQNfUXCw8Kh7SWqdHP6M"

  useEffect(() => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNhcnJpdG9fcmVnYWxvX2FkbWluIiwic3ViIjo1LCJyb2xlcyI6WyJjYXJyaXRvX3JlZ2Fsb19hZG1pbiJdLCJpYXQiOjE2NjkzODUwNDZ9.UOdhY9O3n6RAGJACTUhvp2Qxm1ybN9zR6qLQfdJDRqc"
    const fetchData = async () => {
      try {
        if (!navigator.onLine) {
          if (localStorage.getItem("cart") === null) {
            setCart("Loading...");
            setCartProps("Loading...");
          } else {
            setCart(JSON.parse(localStorage.getItem("cart")));
            setCartProps(JSON.parse(localStorage.getItem("cart")));
          }
        } else {
          const response = await fetch(
            "http://localhost:3000/api/v1/carritos/6dba5211-95de-49dd-9acb-ad923f466679/regalos",
            {
              method: "GET",
              headers: { "Authorization": `Bearer ${token}` }
            }
          );
          if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
          }
          const data = await response.json();
          setCart(data);
          setCartProps(data);
          localStorage.setItem("cart", JSON.stringify(data));
        }
      }
      catch (error) {
        console.log(error.message);
      }
    };
    if (token) {
      fetchData();
    }
  }, [cart]);

  const getTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.precioPromedio * item.cantidad;
    });
    return total;
  };

  const aumentarCantidad = (pBody) => {
    const updateRegalo = async () => {
      try {
        var response = await fetch(
          "http://localhost:3000/api/v1/regalos/" + pBody.id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${regalo_token}`
            },
            body: JSON.stringify({
              nombre: pBody.nombre,
              descripcion: pBody.descripcion,
              precioPromedio: pBody.precioPromedio,
              imagen: pBody.imagen,
              genero: pBody.genero,
              calificacionPromedio: pBody.calificacionPromedio,
              cantidad: pBody.cantidad + 1,
            }),

          }
        );
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (regalo_token) {
      updateRegalo();
    }
  }


  const disminuirCantidad = (pBody) => {
    const updateRegalo = async () => {
      try {
        var response = await fetch(
          "http://localhost:3000/api/v1/regalos/" + pBody.id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${regalo_token}`
            },
            body: JSON.stringify({
              nombre: pBody.nombre,
              descripcion: pBody.descripcion,
              precioPromedio: pBody.precioPromedio,
              imagen: pBody.imagen,
              genero: pBody.genero,
              calificacionPromedio: pBody.calificacionPromedio,
              cantidad: pBody.cantidad === 1 ? 1 : pBody.cantidad - 1,
            }),

          }
        );
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (regalo_token) {
      updateRegalo();
    }
  }

  const eliminarRegalo = (pBody) => {
    const deleteRegalo = async () => {
      try {
        var response = await fetch(
          "http://localhost:3000/api/v1/regalos/" + pBody.id,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${regalo_token}`
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (regalo_token) {
      deleteRegalo();
    }
  }


  return (
    <section className="h-100">
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-normal mb-0 aqua fw-bold"><FormattedMessage id="Cart" /></h3>
            </div>
            <div className="card rounded-3 mb-4 ">
              <div className="card-body p-4">
                {cart.map((item) => (
                  <div className="row d-flex justify-content-between align-items-center mb-5">
                    <div className="col-md-2 col-lg-2 col-xl-2">
                      <img src={item.imagen} className="img-fluid rounded-3" alt="Cotton T-shirt" />
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-3">
                      <p className="lead fw-normal mb-2 rose">{item.nombre}</p>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                      <button
                        className="btn btn-link px-2"
                        onClick={() => disminuirCantidad(item)}
                      >
                        <i className="fas fa-minus" />
                      </button>
                      <input type="text" className="form-control text-center" value={item.cantidad} />
                      <button
                        className="btn btn-link px-2"
                        onClick={() => aumentarCantidad(item)}
                      >
                        <i className="fas fa-plus" />
                      </button>
                    </div>
                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                      <p className="mb-0">$ {item.precioPromedio}</p>
                    </div>
                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                      <a href="#!"
                        className="text-danger"
                        onClick={() => eliminarRegalo(item)}
                      ><i className="fas fa-trash fa-lg" /></a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="d-flex align-items-end flex-column bd-highlight mb-3">
              <div className="p-2 bd-highlight mb-3">
                <span className="p-2 bd-highlight fw-normal mb-0 aqua fw-bold fs-4">Subtotal: </span>
                <span className="p-2 bd-highlight fw-normal mb-0 aqua fw-bold fs-4">${getTotal()}</span>
                <span className="fw-normal mb-0 fs-5"></span>
              </div>
              <a href="#!" className="p-2 bd-highlight btn btn-rose btn-lg fw-bold"><FormattedMessage id="BtnGoPurchase" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;  
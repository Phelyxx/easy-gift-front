import Dropdown from 'react-bootstrap/Dropdown';
import { BsCart } from "react-icons/bs";
import React from 'react';
import "./DropdownCart.css";
import { FormattedMessage } from 'react-intl';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href="#/carrito"
        ref={ref}
        onClick={e => {
            e.preventDefault();
            onClick(e);
        }}
    >
        <div className="wrapper-icon">
            <BsCart
                color="rgb(234, 11, 63)"
                size="2em"
            />
            <span className="badge" id='lblCartCount'></span>
            {children}
        </div>
    </a>
));

function DropdownCart(props) {

    let cart = props.cart;

    const cartPage = () => {
        window.location.href = "/carrito";
    }
    
    // Traer los productos del carrito


    const getTotal = () => {
        let total = 0;
        cart.forEach((item) => {
            total += item.cantidad;
        });
        return total;
    };

    return (
        <div className="container">
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    <span className="badge" id='lblCartCount'>{getTotal()}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <h4 className="aqua fw-bold p-2"><FormattedMessage id="AddedProducts" /></h4>
                    <div className="align-items-center m-3">
                        {cart.map((item) => (
                            <>
                                <div className="p-2">
                                    <img src={item.imagen} alt="product" className="img-fluid" />
                                    <p className="lead fw-bold mb-2 rose">{item.nombre}</p>
                                    <p className="mb-0"><span className='fw-bold'><FormattedMessage id="Price" />: </span>${item.precioPromedio}</p>
                                    <p className="mb-0"><span className='fw-bold'><FormattedMessage id="Quantity" />: </span>{item.cantidad}</p>
                                </div>
                            </>
                        ))}
                    </div>
                    <div className="container text-center">
                        <div className="row justify-content-md-center">
                            <button className="btn btn-rose btn-lg fw-bold w-75 mb-3" onClick={cartPage}><FormattedMessage id="View cart" /></button>
                        </div>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </div >
    );
}

export default DropdownCart;
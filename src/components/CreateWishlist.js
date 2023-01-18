import React, { useState, useEffect } from 'react';
import { Container } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import {Button} from 'react-bootstrap';
import { GrPrevious } from 'react-icons/gr';
import './Wishlist.css';
import {BsPlusLg} from 'react-icons/bs';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from 'react-intl';

const wishlist_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Indpc2hsaXN0X2FkbWluIiwic3ViIjo0Mywicm9sZXMiOlsid2lzaGxpc3RfYWRtaW4iXSwiaWF0IjoxNjY5MjU5MTY1fQ.6D2gc9K1fd2DfuJfIbz1u2oG3fyUZhzb_Kb8hI1NR6k";
const usuario_wishlist_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzdWFyaW9fd2lzaGxpc3RfYWRtaW4iLCJzdWIiOjM5LCJyb2xlcyI6WyJ1c3VhcmlvX3dpc2hsaXN0X2FkbWluIl0sImlhdCI6MTY2OTM1MDgxN30.lex39y_DU4VxathDlyExVhG9O5N6q83eSA9I1Wzl25E"

function GetData (pURL, pToken){
    var [datos, setDatos] = useState([]);
    var [token, setToken] = useState(pToken);
    var [URL, setURL] = useState(pURL);
    useEffect(() => {
        setToken();
        setURL();
        const fetchData = async () => {
            try {
                var response = await fetch(
                    URL,
                    {
                        method: "GET",
                        headers: { "Authorization": `Bearer ${token}` }
                    }
                );
                if (!response.ok) {
                    throw new Error(`Request failed: ${response.status}`);
                }
                var data = await response.json();
                setDatos(data);
            } catch (error) {
                console.log(error.message);
            }
        };
        if (token) {
            fetchData();
        }
    }, [URL, token]);
    return datos;
}

async function crearWishlist(name, userId) {
    let result = await fetch("http://localhost:3000/api/v1/wishlists/",{
      method: "POST",  
      body: JSON.stringify({
        nombre: name,
        descripcion: name, 
        imagen: "/images/tienda-0.avif",
        usuarioId: userId
     }),
        headers:{
          "Authorization":  `Bearer ${wishlist_token}`,
          'Content-Type': 'application/json'
        }

      })
      result = await result.json()

    let result2 = await fetch("http://localhost:3000/api/v1/usuarios/" + userId + "/wishlists/" + result.id,{
        method: "POST",
          headers:{
            "Authorization":  `Bearer ${usuario_wishlist_token}`,
            'Content-Type': 'application/json'
          }
  
        })
        await result2.json();
        window.location.reload(false);
    }


function CreateWishlist() {
    const [showModalCreateWishlist, setShowModalCreateWishlist] = useState(false);
    const handleCloseModalCreateWishlist = () => {setShowModalCreateWishlist(false);};
    const handleShowModalCreateWishlist = () => {setShowModalCreateWishlist(true);};

    const [showModalConfirmWishlist, setShowModalConfirmWishlist] = useState(false);
    const goPreviousConfirmWishlist = () => setShowModalConfirmWishlist(false);
    const handleCloseModalConfirmWishlist = () => {setShowModalConfirmWishlist(false); handleCloseModalCreateWishlist()};
    const handleShowModalConfirmWishlist = () => setShowModalConfirmWishlist(true);

    const userId = localStorage.getItem("idUser");
    const URL_wishlists = "http://localhost:3000/api/v1/usuarios/" + userId + "/wishlists";
    var wishlists = GetData(URL_wishlists, usuario_wishlist_token);

    const placeholder = useIntl().formatMessage({ id: "TypeHere" });
    const [wishlistName, setWishlistName] = useState();

    return(
        <Container>
            <Row xs={1} md={1} lg={4} className="g-4">
                {wishlists.map((wishlist) => (
                    <Col key={wishlist.id}>
                        <Card className="text-white">
                            <Link to={"/wishlists/" + wishlist.id} className="plain">
                                <Card.Img src={wishlist.imagen} alt={wishlist.nombre}
                                    style={{filter: "brightness(70%)", width: "100%", height: "16vw", objectFit: "cover"}} />
                                    <Card.ImgOverlay>
                                        <Card.Title style={{textAlign: "center"}}><b>{wishlist.nombre}</b></Card.Title>
                                    </Card.ImgOverlay>
                            </Link>
                        </Card>
                    </Col>
                ))}
                <Col>
                    <Card className="text-white" variant="newWishlist">
                        <Button variant="newWishlist" style={{height: "17vw"}} onClick={handleShowModalCreateWishlist}>
                            <h1 className="icono"><BsPlusLg style={{"color": "#EA0B3F"}}/></h1><Card.Title><FormattedMessage id="CreateNewWishlist"/></Card.Title>
                            <Card.Title style={{"color": "#EA0B3F"}}><FormattedMessage id="wishlist"/></Card.Title>
                        </Button>
                    </Card>
                </Col>
            </Row>
            <Modal size="lg" show={showModalCreateWishlist} onHide={handleCloseModalCreateWishlist}>
                    <Modal.Header closeButton>
                            <Modal.Title><FormattedMessage id="CreateNewWishlist"/></Modal.Title>&nbsp;&nbsp;<Modal.Title style={{color: "#EA0B3F"}}><FormattedMessage id="wishlist"/></Modal.Title>
                    </Modal.Header>
                    <Modal.Body><h5 className="pl-2" style={{color: "#00B8A9"}}><FormattedMessage id="NewWishlist"/></h5>
                        <Row>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label><FormattedMessage id="NewWishlistName"/></Form.Label>
                                        <Form.Control
                                                type="text" placeholder={placeholder}
                                                autoFocus value={wishlistName}
                                                onChange={(e) => setWishlistName(e.target.value)}
                                            />
                                </Form.Group>
                            </Form>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer style={{justifyContent: "center"}}>
                        <Row>
                            <Col xs={1} md={1} lg={1}/>
                                <Col xs={10} md={10} lg={10}>
                                    <Button variant="wishlist" className="rounded-pill pull-left" onClick={handleShowModalConfirmWishlist}>
                                        <FormattedMessage id="BtnConfirmWishlistName"/>
                                    </Button>
                                </Col>
                            <Col xs={1} md={1} lg={1}/>
                        </Row>
                    </Modal.Footer>
            </Modal>
                                <Modal size="lg" show={showModalConfirmWishlist} onHide={handleCloseModalConfirmWishlist}>
                                    <Modal.Header closeButton>
                                        <Button variant="before" onClick={goPreviousConfirmWishlist}>
                                            <GrPrevious/>  
                                        </Button>
                                        <Modal.Title><FormattedMessage id="CreateNewWishlist"/></Modal.Title>&nbsp;&nbsp;<Modal.Title style={{color: "#EA0B3F"}}><FormattedMessage id="wishlist"/></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body><h5 className="pl-2" style={{color: "#00B8A9"}}><FormattedMessage id="NewWishlistCreated" values={{ wl : wishlistName }} /></h5>
                                        <Row xs={1} md={1} lg={3} className="g-4">
                                            <Col />
                                            {Array.from({ length: 1 }).map((_, idx) => (
                                                <Col key={idx}>
                                                    <Card className="text-white" variant="newWishlist">
                                                    <Card.Img src={"/images/tienda-0.avif"} alt={wishlistName}  style={{filter: "brightness(70%)", width: "100%", height: "16vw", objectFit: "cover"}} />
                                                        <Card.ImgOverlay>
                                                            <Card.Title style={{textAlign: "center"}}><b>{wishlistName}</b></Card.Title>
                                                        </Card.ImgOverlay>
                                                    </Card>
                                                </Col>
                                            ))}
                                            <Col />
                                        </Row>
                                    </Modal.Body>
                                    <Modal.Footer style={{justifyContent: "center"}}>
                                        <Row>
                                            <Col xs={1} md={1} lg={1}/>
                                            <Col xs={10} md={10} lg={10}>
                                                <Button variant="wishlist" className="rounded-pill pull-left" onClick={
                                                    () => {
                                                        crearWishlist(wishlistName, userId);
                                                        handleCloseModalConfirmWishlist();  
                                                        }}>
                                                    <FormattedMessage id="BtnAcceptWishlistCreation"/>
                                                </Button>
                                            </Col>
                                            <Col xs={1} md={1} lg={1}/>
                                        </Row>
                                    </Modal.Footer>
                                </Modal>
        </Container>
    );}

export default CreateWishlist;
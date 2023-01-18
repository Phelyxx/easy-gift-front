import React, { useState, useEffect } from 'react';
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import {Button} from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import { Link } from "react-router-dom";
import {FormattedMessage, FormattedNumber} from 'react-intl';
import Modal from 'react-bootstrap/Modal';

const wishlist_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Indpc2hsaXN0X2FkbWluIiwic3ViIjo0Mywicm9sZXMiOlsid2lzaGxpc3RfYWRtaW4iXSwiaWF0IjoxNjY5MjYwNzIyfQ.b0mgiR3Cflg2rQwd3fw1lVbN0lNHxbHHYdpoOn5E-Fk";
const regalos_wishlist_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Indpc2hsaXN0X3JlZ2Fsb19hZG1pbiIsInN1YiI6NTEsInJvbGVzIjpbIndpc2hsaXN0X3JlZ2Fsb19hZG1pbiJdLCJpYXQiOjE2NjkyNjA5MzF9.qkhpI5GbNr-b6e814wH0xrZjMWjeKoRXme4-E5gxM_I";
const regalos_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlZ2Fsb19hZG1pbiIsInN1YiI6NDcsInJvbGVzIjpbInJlZ2Fsb19hZG1pbiJdLCJpYXQiOjE2Njg5NzM5NjB9.DtoyxEFcj6Sow-b9awZKvp8UQNfUXCw8Kh7SWqdHP6M";


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
    }, [URL,token]);
    return datos;
}

async function deleteFromWishlist(wishlistId, regaloId) {
    let result = await fetch("http://localhost:3000/api/v1/wishlists/" + wishlistId + "/regalos/" + regaloId,{
      method: "DELETE",
        headers:{
          "Authorization":  `Bearer ${regalos_wishlist_token}`,
          'Content-Type': 'application/json'
        }
      })
      await result.json();
    }

function WishlistDetail(props) {
    const params = useParams();
    const URL_wishlist = "http://localhost:3000/api/v1/wishlists/" + params.wishlistId;
    const URL_regalos_wishlist = "http://localhost:3000/api/v1/wishlists/" + params.wishlistId + "/regalos";
    const URL_regalos = "http://localhost:3000/api/v1/regalos/";
    var wishlist = GetData(URL_wishlist, wishlist_token );
    var regalos = GetData(URL_regalos_wishlist, regalos_wishlist_token );
    var regalos_diferentes = GetData(URL_regalos, regalos_token);

    const [showModalDeleteGift, setShowDeleteGift] = useState(false);
    const handleCloseModalDeleteGift = () => setShowDeleteGift(false);
    const handleShowModalDeleteGift = () => setShowDeleteGift(true);

    const handleAcceptModalDeleteGift = () => {setShowDeleteGift(false); window.location.reload(false);};

    const textToShow= () => {
        if (regalos.length === 0) {
            return <h2 style={{textAlign: "left", color: "#EA0B3F"}}><FormattedMessage id="NoGifts"/></h2>
        }
        else {
            return <h2 style={{textAlign: "left", color: "#EA0B3F"}}><FormattedMessage id="GiftsOfWishlist" values={{ wl : wishlist.nombre }}/></h2>
        }
    }

    return(
    <Container>
        {textToShow()}
        <Row xs={1} md={1} lg={2} className="g-4">
            {regalos.map((regalo) => (
                    <Col key={regalo.id}>
                        <Card>
                        <Link to={"/regalos/" + regalo.id} className="plain">
                        <Card.Img style={{ width: "100%", height: "25vw", objectFit: "cover"}} variant="top" src={regalo.imagen} />
                        </Link>
                        <Card.Body>
                        <Row>
                            <Col xs={8} md={8} lg={8}>
                                <Card.Title style={{textAlign: "left", color: "#EA0B3F"}}>
                                    <b> {regalo.nombre}</b>
                                </Card.Title>
                             </Col>
                        <Col xs={4} md={4} lg={4}>
                            <Card.Title style={{textAlign: "right", color: "#00B8A9"}}>
                                <b> <FormattedNumber
                                    value={regalo.precioPromedio}
                                    style="currency"
                                    currency="USD" /></b>
                            </Card.Title>
                         </Col>
                     </Row>
                <Card.Text style={{textAlign: "left"}}>
                    <Button variant="wishlist" className="rounded-pill" onClick={handleShowModalDeleteGift}>
                        <FaHeart/> <FormattedMessage id="DeleteGift"/>
                    </Button>
                    <Modal size="lg" show={showModalDeleteGift} onHide={handleCloseModalDeleteGift}>
                                    <Modal.Header closeButton>
                                        <Modal.Title><FormattedMessage id="DoYouWantToDelete"/></Modal.Title>&nbsp;&nbsp;<Modal.Title style={{color: "#EA0B3F"}}><FormattedMessage id="ThisGift"/></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Row xs={1} md={1} lg={3} className="g-4">
                                            <Col />
                                            {Array.from({ length: 1 }).map((_, idx) => (
                                                <Col key={idx}>
                                                    <Card className="text-white">
                                                        <Card.Img src={regalo.imagen} alt={regalo.descripcion} variant="addToWishlist"
                                                            style={{filter: "brightness(70%)", width: "100%", objectFit: "cover"}} />

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
                                                    () => {handleAcceptModalDeleteGift(); deleteFromWishlist(params.wishlistId, regalo.id);}}>
                                                    <FormattedMessage id="Confirm"/>
                                                </Button>
                                            </Col>
                                            <Col xs={1} md={1} lg={1}/>
                                        </Row>
                                    </Modal.Footer>
                                </Modal>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
        <h2 style={{textAlign: "left", color: "#00B8A9", marginTop: "2vw"}}><FormattedMessage id="MaybeYouWouldLike"/></h2>
        <Row xs={1} md={1} lg={4} className="g-4">
            {regalos_diferentes.map((regalo) => (
                <Col key ={regalo.id}>
                        <Card>
                            <Link to={"/regalos/" + regalo.id} className="plain">
                            <Card.Img style={{ width: "100%", height: "25vw", objectFit: "cover"}} variant="top" src={regalo.imagen} />
                            </Link>
                            <Card.Body>
                        <Row>
                        <Col xs={7} md={7} lg={7}>
                            <Card.Title style={{textAlign: "left", color: "#EA0B3F"}}>
                                <b>{regalo.nombre}</b>
                            </Card.Title>
                        </Col>
                    <Col xs={5} md={5} lg={5}>
                        <Card.Title style={{textAlign: "right", color: "#00B8A9"}}>
                            <FormattedNumber
                                    value={regalo.precioPromedio}
                                    style="currency"
                                    currency="USD" />
                        </Card.Title>
                    </Col>
              </Row>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    </Container>);
}

export default WishlistDetail;
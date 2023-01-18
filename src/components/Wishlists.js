import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { GrPrevious } from 'react-icons/gr';


import { Container } from 'react-bootstrap';
import { BsPlusLg } from 'react-icons/bs';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

 function Wishlists(prop){

    
const wishlist_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Indpc2hsaXN0X2FkbWluIiwic3ViIjo0Mywicm9sZXMiOlsid2lzaGxpc3RfYWRtaW4iXSwiaWF0IjoxNjY5MjU5MTY1fQ.6D2gc9K1fd2DfuJfIbz1u2oG3fyUZhzb_Kb8hI1NR6k";
const usuario_wishlist_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzdWFyaW9fd2lzaGxpc3RfYWRtaW4iLCJzdWIiOjM5LCJyb2xlcyI6WyJ1c3VhcmlvX3dpc2hsaXN0X2FkbWluIl0sImlhdCI6MTY2OTM1MDgxN30.lex39y_DU4VxathDlyExVhG9O5N6q83eSA9I1Wzl25E"
var [datos, setDatos] = useState([]);


function GetData (pURL, pToken){
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
                console.log(data)
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

    var userId = localStorage.getItem("idUser");
    console.log("ID usuario", userId)
    if(userId == null)
        userId = "a0eebc99-9c0b-4ef8-bb6d-000000000001";
    const URL_wishlists = "http://localhost:3000/api/v1/usuarios/" + userId + "/wishlists";

    const wishlist = GetData(URL_wishlists,usuario_wishlist_token)
    console.log("wishhhhh", wishlist)

    var isData = true;

    if(wishlist.length == 0 || wishlist == null)
        var isData = false;





    const [showModalAddGift, setShowAddGift] = useState(false);
    const handleCloseModalAddGift = () => setShowAddGift(false);
    const handleShowModalAddGift = () => setShowAddGift(true);

    const [showModalCreateWishlist, setShowModalCreateWishlist] = useState(false);

    const [showModalConfirmGift, setShowModalConfirmGift] = useState(false);
    const [idWishlist, setIdWishlist] = useState();
    const handleShowModalConfirmGift = () => {setShowModalConfirmGift(true);};



    return (

        

    <Container>
        <Modal size="lg" show={showModalAddGift} onHide={handleCloseModalAddGift}>
                        <Modal.Header closeButton>
                            <Modal.Title>Tus </Modal.Title>&nbsp;&nbsp;<Modal.Title style={{color: "#EA0B3F"}}>regalos</Modal.Title>
                        </Modal.Header>
                    <Modal.Body><h5 className="pl-2"><FormattedMessage id ="YourGifts"></FormattedMessage></h5>
                        <Row xs={1} md={1} lg={3} className="g-4">
                            {Array.from({ length: 3 }).map((_, idx) => (
                                <Col key={idx}>
                                    <Card className="text-white">
                                        <Button variant="plain" onClick={() => {setIdWishlist(idx); handleShowModalConfirmGift()}}>
                                            <Card.Img src={"/images/wishlist-" + idx + ".avif"} alt="TODO: Card image" 
                                            style={{filter: "brightness(70%)", width: "100%", height: "15vw", objectFit: "cover"}} />
                                            <Card.ImgOverlay>
                                                <Card.Title style={{textAlign: "center"}}><b>{"regalo  " + idx}</b></Card.Title>
                                            </Card.ImgOverlay>
                                            </Button>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Modal.Body>
                    
                    </Modal>

                    

    <div style={{textAlign: "left", color: "#EA0B3F"}}>
    <b>WishLists</b>
    </div>
    <Row xs={1} md={1} lg={4} className="g-4" show = {!isData}>
    <Modal.Body><h5 className="pl-2"></h5>
    <Row xs={1} md={1} lg={4} className="g-4">
        {datos.map((wishlist) => (
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
    </Row>
    </Modal.Body>
    </Row>
    

    <Row xs={1} md={1} lg={4} className="g-4" show = {isData}>
        <Modal.Body><h5 className="pl-2"></h5>
            <Row xs={1} md={1} lg={4} className="g-4">

                {Array.from({ length: 3 }).map((_, idx) => (
                    <Col key={idx}>
                        
                        <Card className="text-white" onClick={handleShowModalAddGift}>
                            <Card.Img src={"/images/wishlist-" + idx + ".avif"} alt="TODO: Card image" 
                            style={{filter: "brightness(70%)", width: "100%", height: "15vw", objectFit: "cover"}}  />
                            <Card.ImgOverlay>
                                <Card.Title style={{textAlign: "center"}}><b >{"Wishlist " + idx}</b></Card.Title>
                            </Card.ImgOverlay> 
                        </Card>
                    </Col>
                ))}

            </Row>
        </Modal.Body>

    </Row>
    </Container>
    );
    


}

export default Wishlists;
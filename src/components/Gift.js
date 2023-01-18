import React, { useState, useEffect} from 'react';
import { Container } from "react-bootstrap";
import {Button} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { FaHeart } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import { GrPrevious } from 'react-icons/gr';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import {FormattedMessage, FormattedNumber, useIntl} from 'react-intl';
import './Gift.css';

//const wishlist_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Indpc2hsaXN0X2FkbWluIiwic3ViIjo0Mywicm9sZXMiOlsid2lzaGxpc3RfYWRtaW4iXSwiaWF0IjoxNjY5MjU5MTY1fQ.6D2gc9K1fd2DfuJfIbz1u2oG3fyUZhzb_Kb8hI1NR6k";
const usuario_wishlist_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzdWFyaW9fd2lzaGxpc3RfYWRtaW4iLCJzdWIiOjM5LCJyb2xlcyI6WyJ1c3VhcmlvX3dpc2hsaXN0X2FkbWluIl0sImlhdCI6MTY2OTM1MDgxN30.lex39y_DU4VxathDlyExVhG9O5N6q83eSA9I1Wzl25E"
const regalos_wishlist_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Indpc2hsaXN0X3JlZ2Fsb19hZG1pbiIsInN1YiI6NTEsInJvbGVzIjpbIndpc2hsaXN0X3JlZ2Fsb19hZG1pbiJdLCJpYXQiOjE2NjkyNjA5MzF9.qkhpI5GbNr-b6e814wH0xrZjMWjeKoRXme4-E5gxM_I";
const wishlist_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Indpc2hsaXN0X2FkbWluIiwic3ViIjo0Mywicm9sZXMiOlsid2lzaGxpc3RfYWRtaW4iXSwiaWF0IjoxNjY5MjU5MTY1fQ.6D2gc9K1fd2DfuJfIbz1u2oG3fyUZhzb_Kb8hI1NR6k";

function GiftHeader(props) {
    return(
    <Row>
        <Col xs={8} md={8} lg={8}>
            <Card.Title style={{textAlign: "left", color: "#EA0B3F"}}>
                <b> {props.nombre}</b>
            </Card.Title>
        </Col>
        <Col xs={4} md={4} lg={4}>
            <Card.Title style={{textAlign: "right", color: "#00B8A9"}}>
                <b> <FormattedNumber
                value={props.precio}
                style="currency"
                currency="USD" /></b>
            </Card.Title>
        </Col>
  </Row>);

}

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

async function addToWishlistCreate(wishlistId, regaloId) {
    let result = await fetch("http://localhost:3000/api/v1/wishlists/" + wishlistId + "/regalos/" + regaloId,{
      method: "POST",
        headers:{
          "Authorization":  `Bearer ${regalos_wishlist_token}`,
          'Content-Type': 'application/json'
        }
      })
      await result.json()

    }

    async function addToWishlist(wishlistId, regaloId, wishlistName, wishlistDescription, giftImage) {
        let result = await fetch("http://localhost:3000/api/v1/wishlists/" + wishlistId + "/regalos/" + regaloId,{
          method: "POST",
            headers:{
              "Authorization":  `Bearer ${regalos_wishlist_token}`,
              'Content-Type': 'application/json'
            }
          })
          await result.json()
    
          const URL_wishlists = "http://localhost:3000/api/v1/wishlists/" + wishlistId + "/regalos";
          let regalos_wishlist = await fetch(URL_wishlists,{
            method: "GET",
              headers:{
                "Authorization":  `Bearer ${regalos_wishlist_token}`,
                'Content-Type': 'application/json'
              }
            })
            regalos_wishlist = await regalos_wishlist.json();
            if (regalos_wishlist.length === 1 ) {
                await editWishlistImage(wishlistId,wishlistName, wishlistDescription, giftImage)
          }
        }

    async function editWishlistImage(wishlistId, wishlistName, wishlistDescription, newImage) {
        let result = await fetch("http://localhost:3000/api/v1/wishlists/" + wishlistId,{
            method: "PUT",  
            body: JSON.stringify({
            nombre: wishlistName,
            descripcion: wishlistDescription, 
            imagen: newImage
           }),
              headers:{
                "Authorization":  `Bearer ${wishlist_token}`,
                'Content-Type': 'application/json'
              }
      
            })
            await result.json()
    }



async function createWishlistAndAddGift(name, giftImage, userId, giftId) {
        let result = await fetch("http://localhost:3000/api/v1/wishlists/",{
          method: "POST",  
          body: JSON.stringify({
            nombre: name,
            descripcion: name, 
            imagen: giftImage,
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
        await result2.json()
        
        await addToWishlistCreate(result.id, giftId);
        }

function Gift(props) {

    const [showModalAddGift, setShowAddGift] = useState(false);
    const handleCloseModalAddGift = () => setShowAddGift(false);
    const handleShowModalAddGift = () => setShowAddGift(true);

    const [showModalCreateWishlist, setShowModalCreateWishlist] = useState(false);
    const goPreviousCreateWishlist = () => setShowModalCreateWishlist(false);
    const handleCloseModalCreateWishlist = () => {setShowModalCreateWishlist(false); handleCloseModalAddGift()};
    const handleShowModalCreateWishlist = () => {setShowModalCreateWishlist(true);};

    const [showModalConfirmGift, setShowModalConfirmGift] = useState(false);
    const [idWishlist, setIdWishlist] = useState();
    const goPreviousConfirmGift = () => setShowModalConfirmGift(false);
    const handleCloseModalConfirmGift = () => {setShowModalConfirmGift(false); handleCloseModalAddGift()};
    const handleAcceptModalConfirmGift = () => {handleCloseModalConfirmGift()};
    const handleShowModalConfirmGift = () => {setShowModalConfirmGift(true);};

    const [showModalConfirmWishlist, setShowModalConfirmWishlist] = useState(false);
    const goPreviousConfirmWishlist = () => setShowModalConfirmWishlist(false);
    const handleCloseModalConfirmWishlist = () => {setShowModalConfirmWishlist(false); handleCloseModalCreateWishlist()};
    const handleAcceptModalConfirmWishlist = () => {setShowModalConfirmWishlist(false); handleCloseModalCreateWishlist()};
    const handleShowModalConfirmWishlist = () => setShowModalConfirmWishlist(true);

    const userId = localStorage.getItem("idUser");
    const URL_wishlists = "http://localhost:3000/api/v1/usuarios/" + userId + "/wishlists";
    var wishlists = GetData(URL_wishlists, usuario_wishlist_token);

    const [wishlistGivenName, setWishlistGivenName] = useState();
    const [wishlistName, setWishlistName] = useState();
    const [wishlistImage, setWishlistImage] = useState();
    const [wishlistDescription, setWishlistDescription] = useState();

    const placeholder = useIntl().formatMessage({ id: "TypeHere" });

    const noWishlists = () => {
        if (wishlists.length === 0) {
            return <FormattedMessage id="NoWishlists"/>;
        }
        else return <FormattedMessage id="YourWishlists"/>
        
    }
     
    return (
        <Container>
        <Card style={{ marginBottom: "1em"}}>
            <Link to={"/regalos/" + props.id} className="plain">
            <Card.Img variant="top" src={props.imagen} />
            </Link>
            <Card.Body>
                <GiftHeader nombre={props.nombre} precio={props.precio}/>
                <Card.Text style={{textAlign: "left"}}>
                    <Button variant="wishlist" className="rounded-pill" onClick={handleShowModalAddGift}>
                        <FaHeart/>  <FormattedMessage id="BtnAddToWishlist"/>
                    </Button>
                    <Modal size="lg" show={showModalAddGift} onHide={handleCloseModalAddGift}>
                        <Modal.Header closeButton>
                            <Modal.Title><FormattedMessage id="AddToWishlist"/></Modal.Title>&nbsp;&nbsp;<Modal.Title style={{color: "#EA0B3F"}}><FormattedMessage id="wishlist"/></Modal.Title>
                        </Modal.Header>
                    <Modal.Body><h5 className="pl-2">{noWishlists()}</h5>
                        <Row xs={1} md={1} lg={3} className="g-4">
                            {wishlists.map((wishlist) => (
                                <Col key={wishlist.id}>
                                    <Card className="text-white">
                                        <Button variant="plain" onClick={() => {
                                            console.log()
                                            setIdWishlist(wishlist.id);
                                            setWishlistName(wishlist.nombre); 
                                            setWishlistImage(wishlist.imagen);
                                            setWishlistDescription(wishlist.descripcion);
                                            handleShowModalConfirmGift()}}>
                                            <Card.Img src={wishlist.imagen} alt={wishlist.descripcion}
                                            style={{filter: "brightness(70%)", width: "100%", height: "15vw", objectFit: "cover"}} />
                                            <Card.ImgOverlay>
                                                <Card.Title style={{textAlign: "center"}}><b>{wishlist.nombre}</b></Card.Title>
                                            </Card.ImgOverlay>
                                            </Button>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Modal.Body>
                    <Modal.Footer style={{justifyContent: "center"}}>
                        <Row>
                            <Col xs={1} md={1} lg={1}/>
                            <Col xs={10} md={10} lg={10}>
                                <Button variant="wishlist" className="rounded-pill pull-left" onClick={handleShowModalCreateWishlist}>
                                    <FormattedMessage id="BtnCreateNewWishlist"/>
                                </Button>
                            </Col>
                            <Col xs={1} md={1} lg={1}/>
                        </Row>
                    </Modal.Footer>
                    </Modal>
                    <Modal size="lg" show={showModalCreateWishlist} onHide={handleCloseModalCreateWishlist}>
                            <Modal.Header closeButton>
                                <Button variant="before" onClick={goPreviousCreateWishlist}>
                                            <GrPrevious/>  
                                        </Button>
                                        <Modal.Title><FormattedMessage id="CreateNewWishlist"/></Modal.Title>&nbsp;&nbsp;<Modal.Title style={{color: "#EA0B3F"}}><FormattedMessage id="wishlist"/></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body><h5 className="pl-2" style={{color: "#00B8A9"}}><FormattedMessage id="NewWishlist"/></h5>
                                        <Row xs={1} md={1} lg={3} className="g-4">
                                            <Col />
                                            {Array.from({ length: 1 }).map((_, idx) => (
                                                <Col key={idx}>
                                                    <Card className="text-white">
                                                        <Card.Img src={props.imagen} alt={props.descripcion} variant="creating"
                                                            style={{filter: "brightness(70%)", width: "100%", objectFit: "cover"}} />
                                                    </Card>
                                                </Col>
                                            ))}
                                            <Col />
                                        </Row>
                                        <Row>
                                            <Form>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label><FormattedMessage id="NewWishlistName"/></Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder={placeholder}
                                                        autoFocus
                                                        value={wishlistGivenName}
                                                        onChange={(e) => setWishlistGivenName(e.target.value)}
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
                                <Modal size="lg" show={showModalConfirmWishlist} onHide={() =>
                                        {handleCloseModalConfirmWishlist();}}>
                                    <Modal.Header closeButton>
                                        <Button variant="before" onClick={goPreviousConfirmWishlist}>
                                            <GrPrevious/>  
                                        </Button>
                                        <Modal.Title><FormattedMessage id="CreateNewWishlist"/></Modal.Title>&nbsp;&nbsp;<Modal.Title style={{color: "#EA0B3F"}}><FormattedMessage id="wishlist"/></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body><h5 className="pl-2" style={{color: "#00B8A9"}}><FormattedMessage id="NewWishlistCreated" values={{ wl : wishlistGivenName }} /></h5>
                                    <h5 style={{color: "#EA0B3F"}}><FormattedMessage id="GiftAdded" values={{ wl : wishlistGivenName }}/></h5><br/><br/>
                                        <Row xs={1} md={1} lg={3} className="g-4">
                                            <Col />
                                            {Array.from({ length: 1 }).map((_, idx) => (
                                                <Col key={idx}>
                                                    <Card className="text-white">
                                                        <Card.Img src={props.imagen} alt={props.descripcion} variant="creating"
                                                            style={{filter: "brightness(70%)", width: "100%", objectFit: "cover"}} />
                                                        <Card.ImgOverlay>
                                                            <Card.Title style={{textAlign: "center"}}><b>{wishlistGivenName}</b></Card.Title>
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
                                                <Button variant="wishlist" className="rounded-pill pull-left" onClick={() => 
                                                    {  
                                                        handleAcceptModalConfirmWishlist();
                                                        createWishlistAndAddGift(wishlistGivenName, props.imagen, userId, props.id)
                                                        }}>
                                                    <FormattedMessage id="BtnAcceptWishlistCreation"/>
                                                </Button>
                                            </Col>
                                            <Col xs={1} md={1} lg={1}/>
                                        </Row>
                                    </Modal.Footer>
                                </Modal>
                                <Modal size="lg" show={showModalConfirmGift} onHide={handleCloseModalConfirmGift}>
                                    <Modal.Header closeButton>
                                        <Button variant="before" onClick={goPreviousConfirmGift}>
                                            <GrPrevious/>  
                                        </Button>
                                        <Modal.Title><FormattedMessage id="AddToWishlist"/></Modal.Title>&nbsp;&nbsp;<Modal.Title style={{color: "#EA0B3F"}}><FormattedMessage id="wishlist"/></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body><h5 className="pl-2" style={{color: "#00B8A9"}}><FormattedMessage id="GiftAdded" values={{ wl : wishlistName }}/></h5>
                                        <Row xs={1} md={1} lg={3} className="g-4">
                                            <Col />
                                            {Array.from({ length: 1 }).map((_, idx) => (
                                                <Col key={idx}>
                                                    <Card className="text-white">
                                                        <Card.Img src={wishlistImage} alt={wishlistDescription} variant="addToWishlist"
                                                            style={{filter: "brightness(70%)", width: "100%", objectFit: "cover"}} />
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
                                                    () => {handleAcceptModalConfirmGift(); addToWishlist(idWishlist, props.id, wishlistName, wishlistDescription, props.imagen)}}>
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
                </Container>
                );
            }

export default Gift;

import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {Button} from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FaHeart } from 'react-icons/fa';
import { BsCartPlusFill } from 'react-icons/bs';
import Card from 'react-bootstrap/Card';
import { MdNavigateNext } from 'react-icons/md';
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { GrPrevious } from 'react-icons/gr';
import Form from 'react-bootstrap/Form';
import './GiftDetail.css';
import {FormattedMessage, FormattedNumber, useIntl} from 'react-intl';
import { toast, Toaster } from 'react-hot-toast';


const usuario_wishlist_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzdWFyaW9fd2lzaGxpc3RfYWRtaW4iLCJzdWIiOjM5LCJyb2xlcyI6WyJ1c3VhcmlvX3dpc2hsaXN0X2FkbWluIl0sImlhdCI6MTY2OTM1MDgxN30.lex39y_DU4VxathDlyExVhG9O5N6q83eSA9I1Wzl25E"
const regalos_wishlist_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Indpc2hsaXN0X3JlZ2Fsb19hZG1pbiIsInN1YiI6NTEsInJvbGVzIjpbIndpc2hsaXN0X3JlZ2Fsb19hZG1pbiJdLCJpYXQiOjE2NjkyNjA5MzF9.qkhpI5GbNr-b6e814wH0xrZjMWjeKoRXme4-E5gxM_I";
const wishlist_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Indpc2hsaXN0X2FkbWluIiwic3ViIjo0Mywicm9sZXMiOlsid2lzaGxpc3RfYWRtaW4iXSwiaWF0IjoxNjY5MjU5MTY1fQ.6D2gc9K1fd2DfuJfIbz1u2oG3fyUZhzb_Kb8hI1NR6k";

const regalo_categoria_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlZ2Fsb19jYXRlZ29yaWFfYWRtaW4iLCJzdWIiOjU1LCJyb2xlcyI6WyJyZWdhbG9fY2F0ZWdvcmlhX2FkbWluIl0sImlhdCI6MTY2OTI1ODQ0Mn0.673YxKSyLvANvxE_Lvsv-_PHm457B80I4atYwQnLBMY";
const regalo_tienda_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlZ2Fsb190aWVuZGFfYWRtaW4iLCJzdWIiOjU5LCJyb2xlcyI6WyJyZWdhbG9fdGllbmRhX2FkbWluIl0sImlhdCI6MTY2OTI1ODU2N30.TRN2NPsXHrDqQ4JNGVqkF-coQFtUcUBWK14Vg8S2O2E";
const regalo_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlZ2Fsb19hZG1pbiIsInN1YiI6NDcsInJvbGVzIjpbInJlZ2Fsb19hZG1pbiJdLCJpYXQiOjE2Njg5NzM5NjB9.DtoyxEFcj6Sow-b9awZKvp8UQNfUXCw8Kh7SWqdHP6M"
const { useEffect, useState } = require("react");


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

        async function PostData(pURL, pToken, pBody) {
            let regalos = await fetch("http://localhost:3000/api/v1/regalos/",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${regalo_token}`
                    },
                })
            var data = await regalos.json();
            var regalo = data.filter(regalo => regalo.id === pBody.regaloId);
            let cantidad = regalo[0].cantidad;
            const updateRegalo = async () => {
                try {
                    var response = await fetch(
                        "http://localhost:3000/api/v1/regalos/" + pBody.regaloId,
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
                                cantidad: cantidad ? cantidad + 1 : 1,
                            }),
                        }
                    );
                    if (!response.ok) {
                        throw new Error(`Request failed: ${response.status}`);
                    }
                } catch (error) {
                    console.log(error.message);
                    toast.error(<FormattedMessage id="CartFail"/>);
                }
            };
            if (pToken) {
                updateRegalo();
            }
            const fetchData = async () => {
                try {
                    var response = await fetch(
                        pURL,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${pToken}`
                            },
                        }
                    );
                    if (!response.ok) {
                        throw new Error(`Request failed: ${response.status}`);
                    }
                    await response.json();
                    toast.success(<FormattedMessage id="CartSuccess"/>);
                } catch (error) {
                    console.log(error.message);
                    toast.error(<FormattedMessage id="CartFail"/>);
                }
            };
            if (pToken) {
                fetchData();
            }
        }

function UpdateCart(setCart){
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNhcnJpdG9fYWRtaW4iLCJzdWIiOjMsInJvbGVzIjpbImNhcnJpdG9fYWRtaW4iXSwiaWF0IjoxNjY4OTgyODc3fQ.cWWuGfgrrnmIo5k9vHz4CIk6d2ARiOUEdl6W_JzgJrk"
    const fetchData = async () => {
      try {
        if (!navigator.onLine) {
          if (localStorage.getItem('cart') === null) {
            setCart("Loading...");
          }
          else {
            setCart(JSON.parse(localStorage.getItem('cart')));
          }
        } else {
          const URL =

            "http://localhost:3000/api/v1/carritos/6dba5211-95de-49dd-9acb-ad923f466679";
          const response = await fetch(
            URL,
            {
              method: "GET",
              headers: { "Authorization": `Bearer ${token}` }
            }
          );
          if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
          }
          const data = await response.json();
          setCart(data.regalos);
          localStorage.setItem('cart', JSON.stringify(data.regalos));

        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (token) {
      fetchData();
    }
}


function CategoryButton(props) {
    return(
        <Button variant="category" className="rounded-pill">
            {props.category}
        </Button>
    );
}

function StoreCard(props) {
    return(
        <Card>
            <Link to={"/tiendas/" + props.id}>
            <Card.Img variant="top" src={props.img} className="store" />
            </Link>
            <Card.Body>
                <Row>
                    <Col xs={8} md={8} lg={8}>
                        <Card.Title style={{textAlign: "left"}}>
                            <b>{props.name}</b>
                        </Card.Title>
                    </Col>
              </Row>
                <Card.Text style={{textAlign: "left"}}>
                    {props.description}
                </Card.Text>
        </Card.Body>
    </Card>
    );
}

function GiftDetail(props) {

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


    const params = useParams();
    const URL_regalo = "http://localhost:3000/api/v1/regalos/" + params.regaloId;
    const URL_regalo_categoria = "http://localhost:3000/api/v1/regalos/" + params.regaloId + "/categorias";
    const URL_regalo_tienda = "http://localhost:3000/api/v1/regalos/" + params.regaloId + "/tiendas";
    var regalo = GetData(URL_regalo, regalo_token );
    var categorias_regalo = GetData(URL_regalo_categoria, regalo_categoria_token );
    var tiendas_regalo = GetData(URL_regalo_tienda, regalo_tienda_token );
    const carrito_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNhcnJpdG9fcmVnYWxvX2FkbWluIiwic3ViIjo1LCJyb2xlcyI6WyJjYXJyaXRvX3JlZ2Fsb19hZG1pbiJdLCJpYXQiOjE2NjkzODUwNDZ9.UOdhY9O3n6RAGJACTUhvp2Qxm1ybN9zR6qLQfdJDRqc";


    const noWishlists = () => {
        if (wishlists.length === 0) {
            return <FormattedMessage id="NoWishlists"/>;
        }
        else return <FormattedMessage id="YourWishlists"/>   
    }

    const placeholder = useIntl().formatMessage({ id: "TypeHere" });

    return(<Container>
        <Row>
            <Col xs={0} md={1} lg={1}/>
            <Col xs={12} md={10} lg={10}>
                <Card>
                    <Card.Img variant="top" src={regalo.imagen} />
                        <Card.Body>
                            <Row style={{justifyContent: "left"}}>
                            {categorias_regalo.map( category => (
                                <Col key={category.id} xs={3} md={2} lg={2} className="colCategory">
                                    <Link to="/categorias">
                                    <CategoryButton category={category.nombre}/>
                                    </Link>
                                </Col>
                            ))}
                            </Row>
                            <Row style={{marginTop: "1vw", justifyContent: "left"}}>
                                <Col xs={12} md={9} lg={9} >
                                    <h1 style={{textAlign: "left", fontWeight: "600"}}>{regalo.nombre}</h1>
                                </Col>
                            </Row>
                            <Row style={{marginTop: "2vw", justifyContent: "left"}}>
                                <Col xs={12} md={9} lg={9} >
                                    <p style={{textAlign: "left"}}>{regalo.descripcion}</p>
                                </Col>
                            </Row>
                            <Row style={{justifyContent: "right"}}>
                                <Col xs={12} md={12} lg={6} >
                                    <a style={{textAlign: "right", color: "#EA0B3F"}} href={regalo.id}><b><FormattedMessage id="ViewFullDescription"/></b></a>
                                </Col>
                            </Row>
                            <Row style={{marginTop: "1vw", justifyContent: "left", marginBottom: "1vw"}}>
                                <Col xs={6} md={4} lg={3} xl={2} style={{justifyContent: "left"}} >
                                    <Button disabled variant="price" className="rounded-pill">
                                        <b> <FormattedNumber
                                    value={regalo.precioPromedio}
                                    style="currency"
                                    currency="USD" /></b>
                                    </Button>
                                </Col>
                            </Row>
                            <Row style={{justifyContent: "left"}}>
                            <Col xs={12} md={3} lg={3} >
                            <Button style={{marginBottom: "1vw"}} variant="wishlist" className="rounded-pill" onClick={handleShowModalAddGift}>
                                <FaHeart/> <FormattedMessage id="BtnAddToWishlist"/>
                            </Button>
                            </Col>
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
                                                        <Card.Img src={regalo.imagen} alt={regalo.descripcion} variant="creating"
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
                                                        <Card.Img src={regalo.imagen} alt={regalo.descripcion} variant="creating"
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
                                                        createWishlistAndAddGift(wishlistGivenName, regalo.imagen, userId, params.regaloId)
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
                                                    () => {handleAcceptModalConfirmGift(); addToWishlist(idWishlist, params.regaloId, wishlistName, wishlistDescription, regalo.imagen)}}>
                                                    <FormattedMessage id="Confirm"/>
                                                </Button>
                                            </Col>
                                            <Col xs={1} md={1} lg={1}/>
                                        </Row>
                                    </Modal.Footer>
                                </Modal>
                            <Row>
                            <Col xs={12} md={3} lg={3} xl={3} style={{ justifyContent: "left" }} >
                                <div>
                                    <Button
                                        variant="wishlist" className="rounded-pill pull-left"
                                        onClick={() => {
                                            PostData(`http://localhost:3000/api/v1/carritos/6dba5211-95de-49dd-9acb-ad923f466679/regalos/${regalo.id}`, carrito_token, {
                                                "regaloId": regalo.id,
                                                "nombre": regalo.nombre,
                                                "descripcion": regalo.descripcion,
                                                "precioPromedio": regalo.precioPromedio,
                                                "imagen": regalo.imagen,
                                                "genero": regalo.genero,
                                                "calificacionPromedio": regalo.calificacionPromedio,
                                                "cantidad": 1
                                            }
                                            
                                            );
                                            UpdateCart(props.setCart);
                                        }}>
                                        <BsCartPlusFill/> <FormattedMessage id="AddToCart"/>
                                    </Button>
                                    <Toaster />
                                </div>
                            </Col>
                            </Row>
                            </Row>
                            <Row style={{marginTop: "1vw", justifyContent: "left"}}>
                                <Col xs={12} md={9} lg={9} >
                                    <h2 style={{textAlign: "left", fontWeight: "600"}}><FormattedMessage id="StoresThatSellThisGift"/></h2>
                                </Col>
                            </Row>
                            <Row xs={1} md={1} lg={3} className="g-4">
                                {tiendas_regalo.map((tienda) => (
                                <Col key={tienda.id}>
                                    <StoreCard id={tienda.id} name={tienda.nombre} description={tienda.descripcion} img={tienda.imagen}/>
                                </Col>
                                ))}
                                <Col style={{justifyContent: "left"}}>
                                   <h1 className="icono" style={{marginTop: "4vw", marginLeft: "-15vw"}}><MdNavigateNext style={{"color": "#00B8A9"}}/></h1>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            <Col xs={0} md={1} lg={10}/>
        </Row>
    </Container>);
}

export default GiftDetail;
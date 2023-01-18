import Container from 'react-bootstrap/Container';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { Button, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRpZW5kYV9hZG1pbiIsInN1YiI6NjMsInJvbGVzIjpbInRpZW5kYV9hZG1pbiJdLCJpYXQiOjE2Njg3ODY1MDR9.USJP95B_oG3W3In9xlVEDlt-3ruW6Rmu3QQTrl-neYs";

function GetData(pURL, pToken){
    var [datos, setDatos] = useState([]);
    var [token, setToken] = useState(pToken);
    var [URL, setURL] = useState(pURL);

    useEffect(()=>{
        setToken();
        setURL();
        const fetchData = async () => {
            try{
                var response = await fetch(
                    URL,{
                        method:"GET",
                        headers: {"Authorization": `Bearer ${token}`}
                    }
                );
                if (!response.ok) {
                    throw new Error(`Request failed: ${response.status}`);
                }
                var data = await response.json();
                setDatos(data);
            } catch(error){

            }
        };
        if (token) {
            fetchData();
        }
    }, [URL,token]);
    return datos;




}

async function createResena(title, comentario, puntuacion, productoId, usuarioId) {
    let result = await fetch("http://localhost:3000/api/v1/wishlists/",{
      method: "POST",  
      body: JSON.stringify({
        titulo: title,
        descripcion: comentario, 
        fecha: Date.now(),
        regaloId: productoId,
        usuarioId: usuarioId,
        calificacion: puntuacion
     }),
        headers:{
          "Authorization":  `Bearer ${token}`,
          'Content-Type': 'application/json'
        }

      })
      result = await result.json()

      let result2 = await fetch("http://localhost:3000/api/v1/regalos/" + productoId + "/resenas/" + result.id,{
        method: "POST",
          headers:{
            "Authorization":  `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
  
        })
        await result2.json();
        window.location.reload(false);
}


function Resenaproducto() {
    let resenas = []

    var token_val = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRpZW5kYV9hZG1pbiIsInN1YiI6NjMsInJvbGVzIjpbInRpZW5kYV9hZG1pbiJdLCJpYXQiOjE2Njg3ODY1MDR9.USJP95B_oG3W3In9xlVEDlt-3ruW6Rmu3QQTrl-neYs";

    var id_regalo = localStorage.getItem("idRegalo");
    var url = "http://localhost:3000/api/v1/regalos/" + id_regalo + "/resenas"

    let isData = true;

    resenas = GetData(url , token_val);

    if(resenas == null || resenas.length === 0)
        isData = false;

        const [showModalConfirmGift, setShowModalConfirmGift] = useState(false);
        const [idWishlist, setIdWishlist] = useState();
        const handleShowModalConfirmGift = () => {setShowModalConfirmGift(true);};
        const [showModalAddGift, setShowAddGift] = useState(false);
    const handleCloseModalAddGift = () => setShowAddGift(false);
    const handleShowModalAddGift = () => setShowAddGift(true);

    const [showModalCreateWishlist, setShowModalCreateWishlist] = useState(false);


  
    return (


        <Container>
            <Row  show = {isData}>
                <Col xs={8} md={10} lg={12}>
                    {resenas.map((resena)=>(
                        <Card>
                            <Card.Header style={{backgroundColor: "#00B8A9"}}>{resena.fecha}</Card.Header>
                            <Card.Body>
                                <Card.Title style={{color: "#00B8A9"}}>{resena.titulo}</Card.Title>
                                <Card.Text>
                                    {resena.descripcion}
                                </Card.Text>
                                    {resena.calificacion}/10
                            </Card.Body>
                        </Card>
                    ))}
                    
                </Col>

                </Row>


            <Row  show = {!isData}>
            <Col xs={8} md={10} lg={12}>
                
                <Card>
                <Card.Header style={{backgroundColor: "#00B8A9"}}>Andres</Card.Header>
                <Card.Body>
                    <Card.Title style={{color: "#00B8A9"}}>Excelente tamaño</Card.Title>
                    <Card.Text>
                        Una excelente calidad del producto y el tamaño fue excelenet
                    </Card.Text>
                        9/10
                </Card.Body>
                </Card>
            </Col>
            </Row>
            <Row show = {!isData}>
            <Col xs={8} md={10} lg={12}>
            <Card>
                <Card.Header style={{backgroundColor: "#00B8A9"}}>Felipe</Card.Header>
                <Card.Body>
                    <Card.Title style={{color: "#00B8A9"}}>Pesimo servici</Card.Title>
                    <Card.Text>
                        El producto llego en pesimas condiciones
                    </Card.Text>
                        5/10
                </Card.Body>
                </Card>
                
            </Col>
            </Row>
            <Row show = {!isData}>
            <Col xs={8} md={10} lg={12}>
            <Card>
                <Card.Header style={{backgroundColor: "#00B8A9"}}>Ana Maria</Card.Header>
                <Card.Body>
                    <Card.Title style={{color: "#00B8A9"}}>Excelente producto</Card.Title>
                    <Card.Text>
                        Es justo lo que esperaba y lo que presentaba la pagina
                    </Card.Text>
                        7/10
                </Card.Body>
                </Card>
                
            </Col>
            </Row>

            <Button variant="wishlist" className="rounded-pill pull-left" onClick={handleShowModalAddGift}>
                <FormattedMessage id="addResena"></FormattedMessage>
            </Button>


            <Modal size="lg" show={showModalAddGift} onHide={handleCloseModalAddGift}>
                        <Modal.Header closeButton>
                            <Modal.Title>Tus </Modal.Title>&nbsp;&nbsp;<Modal.Title style={{color: "#EA0B3F"}}>regalos</Modal.Title>
                        </Modal.Header>
                    <Modal.Body><h5 className="pl-2">Tus regalos de la wishlist:</h5>
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

            
        </Container>


    )


}

export default Resenaproducto;
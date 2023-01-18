import { Card, Container, Row } from "react-bootstrap";
import Image from 'react-bootstrap/Image'
import "./profile.css";
import Col from 'react-bootstrap/Col';
import { FaHeart, FaPlus } from 'react-icons/fa';
import { FaUserFriends} from 'react-icons/fa';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateWishlist from "./CreateWishlist";
import Categoria from "./categoriaslist";
import { FormattedMessage} from 'react-intl';
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const token_usuario_amigos = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzdWFyaW9fdXN1YXJpb19hZG1pbiIsInN1YiI6MjMsInJvbGVzIjpbInVzdWFyaW9fdXN1YXJpb19hZG1pbiJdLCJpYXQiOjE2NzAyNTQzNzd9.oSPrejc7aZp5o7cH7mrx9oPVB5v-zwVs3KslgSo3a_U";

const token_usuario = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzdWFyaW9fbGVjdHVyYSIsInN1YiI6MjAsInJvbGVzIjpbInVzdWFyaW9fbGVjdHVyYSJdLCJpYXQiOjE2NjkyNDAwNDl9.9FKxsi-nVcl8IADm6tOv11u8ulJuM_joyHG7nEPTZSI"


async function AgregarAmigos(){
    let result = await fetch("http://localhost:3000/api/v1/usuarios/"+ localStorage.getItem("idUser")+"/amigos/"+ localStorage.getItem("amigo_id"),{
      method: "POST",  
        headers:{
          "Authorization":  `Bearer ${token_usuario_amigos}`,
        //   'Content-Type': 'application/json'
        }

      })
      result = await result.json()

      console.log(result.id);
      console.log(result.amigos.length);
      

    
}



export default function ProfileUser(){
    
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzdWFyaW9fbGVjdHVyYSIsInN1YiI6MjAsInJvbGVzIjpbInVzdWFyaW9fbGVjdHVyYSJdLCJpYXQiOjE2NjkyNDAwNDl9.9FKxsi-nVcl8IADm6tOv11u8ulJuM_joyHG7nEPTZSI"
    const[usuario, SetUsuarioAmigo] = useState([]);
    const params = useParams();
    const id_usuario = params.usuarioId
    localStorage.setItem("amigo_id", id_usuario)
    var URL_usuario = "http://localhost:3000/api/v1/usuarios/" + params.usuarioId;

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!navigator.onLine) {
                    if (localStorage.getItem("usuario_amigo") === null) {
                        SetUsuarioAmigo("Loading...");
                    } else {
                        SetUsuarioAmigo(JSON.parse(localStorage.getItem("usuario_amigo")));
                    }
                } else {
                var response = await fetch(
                    URL_usuario,
                    {
                        method: "GET",
                        headers: { "Authorization": `Bearer ${token}` }
                    }
                );
                if (!response.ok) {
                    throw new Error(`Request failed: ${response.status}`);
                }
                var data = await response.json();
                SetUsuarioAmigo(data);
                localStorage.setItem("usuario_amigo", JSON.stringify(data))
            }
            } catch (error) {
                console.log(error.message);
            }
        };
        if (token) {
            fetchData();
        }
    }, []);
    


    var amigos = 0;
    usuario.amigos != null ? amigos = Array.from(usuario.amigos).length : amigos = 0;
    


    return(
        <Container>
            <Card>

                <Row>
                    
                    <Card.Img variant = "top" src = {usuario.rutaFotoPortada} fluid style={{height: '500px'}}></Card.Img>

                    {/* <Card.ImgOverlay> */}
                        {/* <Image className =  style={{ width: '200px', borderRadius: '25px', marginTop: '5%', marginLeft: '6px' }} src = {usuario.rutaFotoPerfil} fluid></Image>
    */}
                    {/* </Card.ImgOverlay> */}
                    
                    
                </Row>
                <Card.Body>
                    <Row className={"col-8"}>
                    <Col>
                     <Image   style={{ width: '200px', borderRadius: '25px', marginTop: '5%', marginLeft: '6px' }} src = {usuario.rutaFotoPerfil} fluid></Image>
                     </Col>
                     <Col>
                     <Card.Text className = "font" >{usuario.nombre} </Card.Text>
                     <Card.Text style={{fontFamily: "Work Sans, sans-serif", fontStyle: 'normal',fontSize: '25px', color: '#000000' }}>  {usuario.bio}</Card.Text>
                     <Card.Text style={{fontFamily: "Work Sans, sans-serif", fontStyle: 'normal',fontSize: '25px', color: '#00B8A9' }}> <FaUserFriends size = {40}/> {amigos} <FormattedMessage id="amigos"/></Card.Text>
                     <Button className = 'mt-2' style={{ color: "white", background:'#F28F8F', width: '150px', height: '40px' }} onClick ={AgregarAmigos} > <FaPlus/> Agregar </Button>
                     </Col>
                    </Row>
                   

                    <Categoria/>
                    <CreateWishlist/>

                    <h2 style={{textAlign: "left", color: "#00B8A9", marginTop: "2vw"}}>Basado en tus gustos:</h2>
                    <Row >
                        <Col>
                        <Card>
                            <Card.Img style={{ width: "100%", height: "800px", objectFit: "cover"}} variant="top" src={"/images/regalo-" + 1 + ".avif"} />
                            <Card.ImgOverlay>
                                <FaHeart style={{color: 'white'}} size = {50}/> 
                            </Card.ImgOverlay>
                             
                        </Card>
                        </Col>

                        <Col>
                            <Row className= "p-3">
                                <Col>
                                <Card>
                                    <Card.Img style={{ width: "100%", height: "400px", objectFit: "cover"}} variant="top" src={"/images/regalo-" + 2 + ".avif"} />
                                    <Card.ImgOverlay>
                                        <FaHeart style={{color: 'white'}} size = {50}/> 
                                    </Card.ImgOverlay>
                             
                                </Card>
                                </Col>

                                <Col>
                                <Card>

                                    <Card.Img style={{ width: "100%", height: "400px", objectFit: "cover"}} variant="top" src={"/images/regalo-" + 3 + ".avif"} />
                                    <Card.ImgOverlay>
                                        <FaHeart style={{color: 'white'}} size = {40}/> 
                                    </Card.ImgOverlay>
                                </Card>
                                </Col>
                            </Row>
                            <Row className= "p-3">
                                <Col>
                                <Card>
                                    <Card.Img style={{ width: "100%", height: "400px", objectFit: "cover"}} variant="top" src={"/images/regalo-" + 4 + ".avif"} />
                                    <Card.ImgOverlay>
                                        <FaHeart style={{color: 'white'}} size = {40}/> 
                                    </Card.ImgOverlay>
                                </Card>
                                </Col>
                                
                                <Col>
                                <Card>
                                    <Card.Img style={{ width: "100%", height: "400px", objectFit: "cover"}} variant="top" src={"/images/regalo-" + 5 + ".avif"} />
                                    <Card.ImgOverlay>
                                        <FaHeart style={{color: 'white'}} size = {40}/> 
                                    </Card.ImgOverlay>
                                </Card>
                                </Col>
                            </Row>
                        </Col>
                        
                    

                    </Row>

                </Card.Body>
                </Card>

                


            





        </Container>






    );




}
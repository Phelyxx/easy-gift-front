import { Card, Container, Row } from "react-bootstrap";
import Image from 'react-bootstrap/Image'
import "./profile.css";
import Col from 'react-bootstrap/Col';
import { FaHeart } from 'react-icons/fa';
import { FaUserFriends} from 'react-icons/fa';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateWishlist from "./CreateWishlist";
import Categoria from "./categoriaslist";
import { FormattedMessage} from 'react-intl';

const token_usuario = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzdWFyaW9fbGVjdHVyYSIsInN1YiI6MjAsInJvbGVzIjpbInVzdWFyaW9fbGVjdHVyYSJdLCJpYXQiOjE2NjkyNDAwNDl9.9FKxsi-nVcl8IADm6tOv11u8ulJuM_joyHG7nEPTZSI";




export default function Profile(){
    const[usuario, SetUsuario] = useState([]);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzdWFyaW9fbGVjdHVyYSIsInN1YiI6MjAsInJvbGVzIjpbInVzdWFyaW9fbGVjdHVyYSJdLCJpYXQiOjE2NjkyNDAwNDl9.9FKxsi-nVcl8IADm6tOv11u8ulJuM_joyHG7nEPTZSI";
    var id_usuario = localStorage.getItem("idUser");
    var URL_usuario = "http://localhost:3000/api/v1/usuarios/" + id_usuario;

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!navigator.onLine) {
                    if (localStorage.getItem("usuario") === null) {
                        SetUsuario("Loading...");
                    } else {
                        SetUsuario(JSON.parse(localStorage.getItem("usuario")));
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
                SetUsuario(data);
                localStorage.setItem("usuario", JSON.stringify(data))
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
    
    localStorage.setItem("usuario_edit", JSON.stringify(usuario));
   
    

    localStorage.setItem("nombre_usuario", usuario.usuario)
    localStorage.setItem("perfil_usuario", usuario.rutaFotoPerfil)



    


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
                     <Link to={'/editProfile/'+ id_usuario} style={{fontFamily: "Work Sans, sans-serif", fontStyle: 'normal',fontSize: '25px', color: '#F28F8F' }} > <FormattedMessage id="EditProfile"/></Link> 
                     </Col>
                    </Row>
                    <Row>
                        
                        

                        {/* <Card.Text style= {{fontFamily: "Work Sans, sans-serif", fontStyle: 'normal',fontSize: '25px' }}><FaBook /> Estudiante de la Universidad de los Andes</Card.Text>
                        <Card.Text style={{fontFamily: "Work Sans, sans-serif", fontStyle: 'normal',fontSize: '25px' }}> <FaLocationArrow/> Vive en Bogotá, Colombia</Card.Text> */}
                        {/* <Card.Text style={{fontFamily: "Work Sans, sans-serif", fontStyle: 'normal',fontSize: '25px', color: '#00B8A9' }}> <FaUserFriends size = {40}/> {usuario.amigos.lenght} amigos</Card.Text>
                          */}
                    </Row>

                    <Categoria/>
                    <div style={{textAlign: "left", color: "#EA0B3F", marginBottom: "1vw", marginLeft: "1vw"}}>
        <b><FormattedMessage id = "YW"/></b>
        </div>
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
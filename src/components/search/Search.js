import React from 'react';
import './Search.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
//import { PanoramaSharp, PropaneSharp } from '@mui/icons-material';



const tiendas_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRpZW5kYV9hZG1pbiIsInN1YiI6NjMsInJvbGVzIjpbInRpZW5kYV9hZG1pbiJdLCJpYXQiOjE2Njg3ODY1MDR9.USJP95B_oG3W3In9xlVEDlt-3ruW6Rmu3QQTrl-neYs"
const regalos_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlZ2Fsb19hZG1pbiIsInN1YiI6NDcsInJvbGVzIjpbInJlZ2Fsb19hZG1pbiJdLCJpYXQiOjE2Njg5OTUzODh9.LGLidJFTtripI43mad2xNxS6LUbe3EtkmpMqFMwWswQ"
const wishlists_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Indpc2hsaXN0X2FkbWluIiwic3ViIjo0Mywicm9sZXMiOlsid2lzaGxpc3RfYWRtaW4iXSwiaWF0IjoxNjY4OTk1MzY5fQ.OVEE6e3VCvEc2dAJKNxkOZXna7sFWs8sxGlcskZNqMg"
const usuarios_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzdWFyaW9fYWRtaW4iLCJzdWIiOjE5LCJyb2xlcyI6WyJ1c3VhcmlvX2FkbWluIl0sImlhdCI6MTY2ODk5NTQwOH0.-YwHEgZDf6PsqksSZRyrdsK8bF1QgXd_kXI2AKckM8M"

const URL_tienda = "http://localhost:3000/api/v1/tiendas";
const URL_regalos = "http://localhost:3000/api/v1/regalos";
const URL_wishlists = "http://localhost:3000/api/v1/wishlists";
const URL_usuarios = "http://localhost:3000/api/v1/usuarios";


const { useEffect, useState } = require("react");

function GetData(pURL, pToken) {
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

function CardSearch(props) {
    var sinFiltro = true;
    for (var key in props.pTipos) {
        if (props.pTipos[key]) {
            sinFiltro = false;
            break;
        }
    }
    if (sinFiltro || props.pTipos[props.tipo] === true) {
        return (
            <Col key={props.id} className="cards_container_search">
                <Card className="card_search">
                    <a href='/'>
                        <Card.Img variant="top" src={props.imagen}
                            className="card_img_store" style={{
                                borderRadius:
                                    "2%", filter: "brightness(80%)"
                            }} />
                    </a>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Card.Title style={{ textAlign: "center" }}>
                                    <a href={props.link}><b className='cyan_format'><FormattedMessage id={"Search"+ props.tipo}/>{": " + props.nombre}</b></a>
                                </Card.Title>
                            </Col>
                        </Row>
                        <Card.Text style={{ textAlign: "center" }}>
                            <div className='normal_format_search'> {props.descripcion} </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        );
    }
    else {
        return (false);
    }


}


function Search() {

    const params = useParams();
    var tiendas = GetData(URL_tienda, tiendas_token);
    var regalos = GetData(URL_regalos, regalos_token);
    var wishlists = GetData(URL_wishlists, wishlists_token);
    var usuarios = GetData(URL_usuarios, usuarios_token);
    const [tipos, setTipos] = useState({ "Tienda": false, "Regalo": false, "Wishlist": false, "Usuario": false });


    function onChangeExplora(e) {
        setTipos({
            ...tipos,
            [e.target.name]: e.target.value,
        });
    }
    return (
        <div className="Search">
            <Container>
                <Row>
                    <Col>
                    </Col>
                    <Col xs={12} md={12} lg={12} className="body_container">

                        <Container>

                            <Row>

                                <Col className='filter_container_search' xs={3} md={3} lg={3}>
                                    <Container >
                                        <Col  >
                                            <Row style={{ paddingTop: "10%" }}>
                                                <b className="filter_text_color_cyan"><FormattedMessage id='SearchExplore'/></b>
                                                <Form className='form_categories_search' style={{ paddingTop: "10%" }}>
                                                    {['Usuario', 'Tienda', 'Regalo', 'Wishlist'].map((name) => (
                                                        <div key={`check-box-${name}`} className="mb-3" style={{ fontSize: "18px", fontWeight: "400" }}>
                                                            <Form.Check
                                                                type={'checkbox'}
                                                                id={"form-check"}
                                                                label={<FormattedMessage id={"Search"+name}/>}
                                                                bsPrefix="form-check"
                                                                name={name}
                                                                onChange={(e) => {
                                                                    onChangeExplora({
                                                                        target: {
                                                                            name: e.target.name,
                                                                            value: e.target.checked,
                                                                        },
                                                                    });
                                                                }}
                                                            >
                                                            </Form.Check>
                                                        </div>
                                                    ))}
                                                </Form>
                                            </Row>
                                        </Col>
                                    </Container>
                                </Col>
                                <Col xs={9} md={9} lg={9} className='search_container'>
                                    <Container>
                                        <Row>
                                            <Col>
                                                <Row>
                                                    <h3 className='text_color_cyan'><FormattedMessage id='SearchResults'/></h3>
                                                </Row>
                                                <Row xs={1} md={1} lg={2} className="g-8" style={{ paddingTop: "5%" }}>
                                                    {tiendas.filter((elemento) => {
                                                        return elemento.nombre.includes(params.searchWord);
                                                    }).map((tienda) => (
                                                        <CardSearch id={tienda.id} tipo="Tienda" nombre={tienda.nombre} imagen={tienda.imagen} link={"/tiendas/" + tienda.id} descripcion={tienda.descripcion} pTipos={tipos} />
                                                    ))}

                                                    {regalos.filter((elemento) => {
                                                        return elemento.nombre.includes(params.searchWord);
                                                    })
                                                        .map((elemento) => (
                                                            <CardSearch id={elemento.id} tipo="Regalo" nombre={elemento.nombre} imagen={elemento.imagen} link={"/regalos/" + elemento.id} descripcion={elemento.descripcion} pTipos={tipos} />
                                                        ))}
                                                    {wishlists.filter((elemento) => {
                                                        return elemento.nombre.includes(params.searchWord);
                                                    })
                                                        .map((elemento) => (
                                                            <CardSearch id={elemento.id} tipo="Wishlist" nombre={elemento.nombre} imagen={elemento.imagen} link={"/wishlists/" + elemento.id} descripcion={elemento.descripcion} pTipos={tipos} />
                                                        ))}
                                                    
                                                    {usuarios.filter((elemento) => {
                                                        return elemento.nombre.includes(params.searchWord);
                                                    })
                                                        .map((elemento) => (
                                                            <CardSearch id={elemento.id} tipo="Usuario" nombre={elemento.nombre} imagen={elemento.rutaFotoPerfil} link={"/usuarios/" + elemento.id} descripcion={elemento.bio} pTipos={tipos}>
                                                            </CardSearch>
                                                            
                                                            
                                                        ))}

                                                </Row>

                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col className='pagination_container'>
                                                <nav aria-label="Page navigation example">
                                                    <ul className="pagination justify-content-center">
                                                        <li className="page-item"><a className="page-link" href="/">{<FormattedMessage id="SearchPrevious"/>}</a></li>
                                                        <li className="page-item"><a className="page-link" href="/">1</a></li>
                                                        <li className="page-item active" aria-current="page"><a className="page-link" href="/">2</a></li>
                                                        <li className="page-item"><a className="page-link" href="/">3</a></li>
                                                        <li className="page-item"><a className="page-link" href="/"><FormattedMessage id="SearchNext"/></a></li>
                                                    </ul>
                                                </nav>
                                            </Col>
                                        </Row>

                                    </Container>

                                </Col>

                            </Row>

                        </Container>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </Container>
        </div>

    );
}

export default Search;

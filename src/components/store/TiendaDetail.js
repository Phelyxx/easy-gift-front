import { useParams } from "react-router-dom";
import React from 'react';
import './Store.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { FormattedMessage, FormattedNumber } from 'react-intl';


const tienda_regalo_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRpZW5kYV9yZWdhbG9fYWRtaW4iLCJzdWIiOjc5LCJyb2xlcyI6WyJ0aWVuZGFfcmVnYWxvX2FkbWluIl0sImlhdCI6MTY2ODg5ODMyOX0.f1IHW-kdlbRjilFqRPCkysMlzBoAs49mg5LQCBeQId0";
const tienda_localizacion_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRpZW5kYV9sb2NhbGl6YWNpb25fYWRtaW4iLCJzdWIiOjcxLCJyb2xlcyI6WyJ0aWVuZGFfbG9jYWxpemFjaW9uX2FkbWluIl0sImlhdCI6MTY2ODkxMjcwNX0.NtoIkilt4P8ArzfwXK-E3UMr-i5FI8rTIdbNR0JsCSM";
const tienda_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRpZW5kYV9hZG1pbiIsInN1YiI6NjMsInJvbGVzIjpbInRpZW5kYV9hZG1pbiJdLCJpYXQiOjE2Njg3ODY1MDR9.USJP95B_oG3W3In9xlVEDlt-3ruW6Rmu3QQTrl-neYs"
const regalo_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlZ2Fsb19hZG1pbiIsInN1YiI6NDcsInJvbGVzIjpbInJlZ2Fsb19hZG1pbiJdLCJpYXQiOjE2Njg5NzM5NjB9.DtoyxEFcj6Sow-b9awZKvp8UQNfUXCw8Kh7SWqdHP6M";
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

function TiendaDetail() {

    const params = useParams();
    const URL_tienda = "http://localhost:3000/api/v1/tiendas/" + params.tiendaId;
    const URL_regalo = "http://localhost:3000/api/v1/regalos";
    const URL_regalos_tienda = "http://localhost:3000/api/v1/tiendas/" + params.tiendaId + "/regalos";
    const URL_ubicacion_tienda = "http://localhost:3000/api/v1/tiendas/" + params.tiendaId + "/localizacion";

    var tienda = GetData(URL_tienda, tienda_token);
    var regalos_total = GetData(URL_regalo, regalo_token);
    var regalos_tienda = GetData(URL_regalos_tienda, tienda_regalo_token);
    var ubicacion_tienda = GetData(URL_ubicacion_tienda, tienda_localizacion_token);

    const [categorias, setCategorias] = useState({});
    const [minimo, setMinimo] = useState(0);
    const [maximo, setMaximo] = useState("");

    function onChangeMinimo(e) {
        console.log(e.target.value);
        setMinimo(e.target.value);
    }

    function onChangeMaximo(e) {
        console.log(e.target.value);
        setMaximo(e.target.value);
    }

    function onChangeCategorias(e) {
        setCategorias({
            ...categorias,
            [e.target.name]: e.target.value,
        });
    }

    const regalos = regalos_total.filter((regalo)=>{
        let coincidencia = false;
        regalos_tienda.forEach((regalo_tienda)=>{
            //console.log(regalo.id + "       :D   "+regalo_tienda.id);
            if(regalo_tienda.id === regalo.id){
                coincidencia = true;
            }
            
        })
        return coincidencia;
    });

    console.log(regalos);

    //console.log(regalos_tienda);
    //console.log(tienda.ubicacion);
    //console.log(ubicacion_tienda.direccion);
    return (
        <div className="TiendaDetail">
            <Container>
                <Row className='detail_container'>
                    <Container>

                        <Row>
                            <Col xs={3} md={3} lg={3}>
                                <Row className='left_container'>
                                    <img src={tienda.imagen} className="store_img" alt={tienda.id} style={{
                                        borderRadius: "30px 30px 30px 30px ", filter: "brightness(100%)"
                                    }} />
                                </Row>
                                <Row style={{ textAlign: "center", fontSize: "20px" }}>
                                    <a href={tienda.paginaWeb} ><FormattedMessage id="ViewWebPage"/></a>
                                </Row>
                            </Col>
                            <Col xs={9} md={9} lg={9} >
                                <Row className='right_container'>
                                    <Row>
                                        <b className='cyan_format' style={{ fontSize: "45px" }} > <FormattedMessage id="SearchTienda"/>: <b className='pink_format' style={{ fontSize: "45px" }}>{tienda.nombre}</b></b>

                                    </Row>
                                    <Row >
                                        <Col className='description_container'>
                                            <b className='description_format'>{tienda.descripcion}... <a href="/tiendas"><FormattedMessage id="ViewMore"/></a></b>
                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col className='description_container'>
                                            <b className='description_format'><FormattedMessage id="FindUs_0"/> {ubicacion_tienda.direccion}! <a href="/tiendas"><FormattedMessage id="FindUs_1"/></a></b>
                                        </Col>
                                    </Row>
                                </Row>
                                <Row>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Row>
                <Row>
                    <Col>
                    </Col>
                    <Col xs={12} md={12} lg={12} className="body_container">

                        <Container >

                            <Row>

                                <Col className='filter_container' xs={3} md={3} lg={3} style={{ paddingLeft: "2.5%" }} >
                                    <Container >
                                        <Col  >
                                            <Row style={{ paddingTop: "8%" }}>
                                                <b className="filter_text_color_cyan"><FormattedMessage id="Category"/></b>
                                                <Form className='form_categories_tienda'>
                                                    {['Technology', 'Home', 'Fashion', 'VideoGames', 'Furniture', 'Kitchen', 'Food', 'Wines', 'Jewelry', 'Accessories'].map((name) => (
                                                        <div key={`check-box-${name}`} className="mb-3">
                                                            <Form.Check
                                                                type={'checkbox'}
                                                                id={"form-check"}
                                                                label={<FormattedMessage id={name} />}
                                                                bsPrefix="form-check"
                                                                name={<FormattedMessage id={name} />}
                                                                onChange={(e) => {
                                                                    onChangeCategorias({
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
                                            <Row style={{ paddingTop: "10%" }}>
                                                <b className="filter_text_color_cyan"><FormattedMessage id="Price" /></b>

                                                <Form style={{ paddingTop: "6%", paddingLeft: "10%" }}>
                                                    {/* Create a maximum and minimum input */}
                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label><FormattedMessage id="Minimum" /></Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            as="input"
                                                            value={minimo}
                                                            onChange={onChangeMinimo}
                                                            placeholder="0" />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label><FormattedMessage id="Maximum" /></Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            as="input"
                                                            value={maximo}
                                                            onChange={onChangeMaximo}
                                                            placeholder="..."
                                                        />
                                                    </Form.Group>
                                                </Form>

                                                <Form className='form_sort_tienda'>

                                                    <Form.Check
                                                        className='subform_tienda'
                                                        type={'radio'}
                                                        name='precio_group'
                                                        id={"form-radio"}
                                                        label={<FormattedMessage id="Min2Max"/>}
                                                        bsPrefix="form-radio"
                                                    >
                                                    </Form.Check>
                                                    <Form.Check
                                                        className='subform'
                                                        name='precio_group'
                                                        type={'radio'}
                                                        id={"form-check"}
                                                        label={<FormattedMessage id="Max2Min"/>}
                                                        bsPrefix="form-radio"
                                                    >
                                                    </Form.Check>
                                                </Form>
                                            </Row>
                                        </Col>
                                    </Container>
                                </Col>
                                <Col xs={9} md={9} lg={9} className='tiendas_container'>
                                    <Container>
                                        <Row>
                                            <Col>
                                                <Row>
                                                    <h1 className='text_color_cyan'><FormattedMessage id="GiftsList" /></h1>
                                                </Row>
                                                <Row xs={4} md={4} lg={4} className="g-4" style={{ paddingTop: "5%", paddingBottom: "10%" }}>
                                                    {regalos.filter((regalo) => {
                                                        if (Object.keys(categorias).length === 0 || Object.values(categorias).every((value) => value === false)) {
                                                            return true;
                                                        }
                                                        let coincidencia = false;
                                                        regalo.categorias.forEach((categoria) => {
                                                            if (categorias[categoria.nombre] === true) {
                                                                coincidencia = true;
                                                            }
                                                        });
                                                        return coincidencia;
                                                    }
                                                    )
                                                        // Filtrar por precio, si el maximo es ... entonces solo filtrar por minimo
                                                        .filter((regalo) => {
                                                            if (maximo === "") {
                                                                return regalo.precioPromedio >= minimo;
                                                            }
                                                            return regalo.precioPromedio >= minimo && regalo.precioPromedio <= maximo;
                                                        })
                                                        .map((regalo) => (

                                                            <Col key={regalo.id}>
                                                                <Card>
                                                                    <Link to={"/regalos/" + regalo.id}>
                                                                        <Card.Img style={{ width: "100%", height: "25vw", objectFit: "cover" }} variant="top" src={regalo.imagen} />
                                                                    </Link>
                                                                    <Card.Body>
                                                                        <Row>
                                                                            <Col xs={7} md={7} lg={7}>
                                                                                <Card.Title style={{ textAlign: "left", color: "#EA0B3F", fontSize: "1vw" }}>
                                                                                    <b> {regalo.nombre}</b>
                                                                                </Card.Title>
                                                                            </Col>
                                                                            <Col xs={5} md={5} lg={5}>
                                                                                <Card.Title style={{ textAlign: "right", color: "#00B8A9", fontSize: "1vw" }}>
                                                                                    <b><FormattedNumber
                                                                                        value={regalo.precioPromedio}
                                                                                        style="currency"
                                                                                        currency="USD" /></b>
                                                                                </Card.Title>
                                                                            </Col>
                                                                        </Row>
                                                                        <Card.Text style={{ textAlign: "left" }}>
                                                                        </Card.Text>
                                                                    </Card.Body>
                                                                </Card>
                                                            </Col>
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
                                                        <li className="page-item"><a className="page-link" href="/">{<FormattedMessage id="SearchNext"/>}</a></li>
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
                </Row >
            </Container >


        </div >

    );
}

export default TiendaDetail;

import Form from 'react-bootstrap/Form';
import "./Category.css";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { FormattedMessage, FormattedNumber } from 'react-intl';

function Category() {

  const [regalos, setRegalos] = useState([]);
  const [categorias, setCategorias] = useState([]);
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
    if (e.target.value === false) {
      setCategorias(categorias.filter((categoria) => categoria !== e.target.name));
    } else {
      setCategorias([...categorias, e.target.name]);
    }
  }

  useEffect(() => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlZ2Fsb19hZG1pbiIsInN1YiI6NDcsInJvbGVzIjpbInJlZ2Fsb19hZG1pbiJdLCJpYXQiOjE2Njg5NzM5NjB9.DtoyxEFcj6Sow-b9awZKvp8UQNfUXCw8Kh7SWqdHP6M"
    const fetchData = async () => {
      try {
        if (!navigator.onLine) {
          if (localStorage.getItem("regalos") === null) {
            setRegalos("Loading...");
          } else {
            setRegalos(JSON.parse(localStorage.getItem("regalos")));
          }
        } else {
          const URL =
            "http://localhost:3000/api/v1/regalos";
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
          setRegalos(data);
          localStorage.setItem("regalos", JSON.stringify(data));
        }
      }
      catch (error) {
        console.log(error.message);
      }
    };
    if (token) {
      fetchData();
    }
  }, []);



  return (
    // Center elements
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col">
          <div className="container align-items-center">
            <p className="fs-3 fw-bold aqua"><FormattedMessage id="Category" /></p>
            <Form>
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
                          name: name,
                          value: e.target.checked,
                        },
                      });
                    }}
                  >
                  </Form.Check>
                </div>
              ))}
            </Form>
            <p className="fs-3 fw-bold aqua"><FormattedMessage id="Price" /></p>
            <Form>
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
          </div>
        </div>
        <div className="col-10">
          <Row xs={1} md={1} lg={4} className="g-4">
            {/* Las categorias de un regalo son un arreglo de diccionarios, comparar si en el diccionario de categorias hay una categoria que coincida */}
            {regalos.filter((regalo) => {
              if (categorias.length === 0) {
                return true;
              }
              let coincidencia = false;
              regalo.categorias.forEach((categoria) => {
                // Loop through the categories and check if the category is in the array of categories
                if (categorias.includes(categoria.nombre)) {
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
                    <Link to={"/regalos/" + regalo.id} className="plain">
                      <Card.Img style={{ width: "100%", height: "25vw", objectFit: "cover" }} variant="top" src={regalo.imagen} />
                    </Link>
                    <Card.Body>
                      <Row>
                        <Col xs={7} md={7} lg={7}>
                          <Card.Title style={{ textAlign: "left", color: "#EA0B3F" }}>
                            <b> {regalo.nombre} </b>
                          </Card.Title>
                        </Col>
                        <Col xs={5} md={5} lg={5}>
                          <Card.Title style={{ textAlign: "right", color: "#00B8A9" }}>
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
        </div>
      </div>
    </div>
  );
}

export default Category;
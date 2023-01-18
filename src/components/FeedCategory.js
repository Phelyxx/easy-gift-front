import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Gift from './Gift'
import "./FeedCategory.css";
import { useState, useEffect } from "react";
import { FormattedMessage } from 'react-intl';

function FeedCategory() {

  const [regalos, setRegalos] = useState([]);
  const [currentRegalos, setCurrentRegalos] = useState([]);


  function onCategoryChange(e) {
    setCurrentRegalos(regalos.filter((regalo) => {
      let coincidencia = false;
      regalo.categorias.forEach((categoria) => {
        if (categoria.nombre.toLowerCase() === e.target.value.toLowerCase()) {
          coincidencia = true;
        }
      })
      return coincidencia;
    }));

  }

  useEffect(() => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlZ2Fsb19hZG1pbiIsInN1YiI6NDcsInJvbGVzIjpbInJlZ2Fsb19hZG1pbiJdLCJpYXQiOjE2Njg5NzM5NjB9.DtoyxEFcj6Sow-b9awZKvp8UQNfUXCw8Kh7SWqdHP6M"
    const fetchData = async () => {
      try {
        if (!navigator.onLine) {
          if (localStorage.getItem("regalos") === null) {
            setRegalos("Loading...");
            setCurrentRegalos("Loading...");
          } else {
            setRegalos(JSON.parse(localStorage.getItem("regalos")));
            setCurrentRegalos(JSON.parse(localStorage.getItem("regalos")));
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
          setCurrentRegalos(data);
          localStorage.setItem("regalos", JSON.stringify(data));
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (token) {
      fetchData();
    }
  }, []);

  return (
    <>
      <Container className="mb-4">
        <Row>
          <Col xs={0} md={2} lg={3}>
            <p className="mt-3"><FormattedMessage id="ExploreBy" /><span className="rose"> <FormattedMessage id="Categories" /></span></p>
            <div className="container-image">
              <button className="bg-transparent border-0" onClick={(e) => {
                onCategoryChange({
                  target: {
                    value: "Juguetes",
                  },
                });
              }}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/x8c23jsh41o-21%3A298?alt=media&token=fbb7e5cb-4606-413e-b9d1-f1f3ce74f9fa"
                  className="mt-1"
                  alt="Juguetes"
                  style={{ "width": "100%" }}
                />
                <p className="centered fs-4 fw-bold text-white"><FormattedMessage id="Toys" /></p>
              </button>
            </div>
            <div className="container-image">
              <button className="bg-transparent border-0" onClick={(e) => {
                onCategoryChange({
                  target: {
                    value: "Maquillaje",
                  },
                });
              }}>
                <img
                  src="/images/maquillaje.png"
                  className="mt-1 rounded-3"
                  alt="Maquillaje"
                  style={{ "width": "100%" }}
                />
                <p className="centered fs-4 fw-bold text-white"><FormattedMessage id="Makeup" /></p>
              </button>
            </div>
            <div className="container-image">
              <button className="bg-transparent border-0" onClick={(e) => {
                onCategoryChange({
                  target: {
                    value: "Hogar",
                  },
                });
              }}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/x8c23jsh41o-21%3A309?alt=media&token=939c93e1-8601-4648-ac03-3bace8c770f0"
                  className="mt-3"
                  alt="Hogar"
                  style={{ "width": "100%" }}
                />
                <p className="centered fs-4 fw-bold text-white"><FormattedMessage id="Home" /></p>
              </button>
            </div>
            <div className="container-image">
              <button className="bg-transparent border-0" onClick={(e) => {
                onCategoryChange({
                  target: {
                    value: "Instrumentos musicales",
                  },
                });
              }}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/x8c23jsh41o-21%3A312?alt=media&token=327a8dc3-080b-4903-a716-d136784ccbd1"
                  className="mt-3"
                  alt="Electrónica"
                  style={{ "width": "100%" }}
                />
                <p className="centered fs-4 fw-bold text-white"><FormattedMessage id="MusicalInstruments" /></p>
              </button>
            </div>
          </Col>
          <Col xs={12} md={8} lg={6} >
            {currentRegalos.map((regalo) => (
              <Gift key={regalo.id} id={regalo.id} nombre={regalo.nombre} imagen={regalo.imagen} precio={regalo.precioPromedio} />
            ))}
          </Col>
          <Col xs={0} md={2} lg={3} />
        </Row>
      </Container>
    </>
  );
}

export default FeedCategory;
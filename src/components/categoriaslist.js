import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FormattedMessage } from 'react-intl';
import { Button, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';




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


function Categoria(prop){

    var id_usuario = localStorage.getItem("idUser")
    var url = "http://localhost:3000/api/v1/usuarios/" + id_usuario + "/categorias"
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlZ2Fsb19hZG1pbiIsInN1YiI6NDcsInJvbGVzIjpbInJlZ2Fsb19hZG1pbiJdLCJpYXQiOjE2Njg5NzM5NjB9.DtoyxEFcj6Sow-b9awZKvp8UQNfUXCw8Kh7SWqdHP6M"

    var datos = GetData(url, token)

    var isData = true;

    console.log(" cat", datos)

    if (datos.length === 0 || datos == null)
        isData = false;


    return(
    <Container>
            
            <div style={{textAlign: "left", color: "#EA0B3F"}}>
        <b><FormattedMessage id = "interests"/></b>
        </div>

        <Row xs={1} md={1} lg={4} className="g-4" show = {isData}>
            {datos.map((categoria) => (
                <Col>             <Button variant="wishlist" className="rounded-pill pull-left" style={{marginTop: "30px"}}>
                    {categoria.nombre}
            </Button>
            </Col>
            ))}
            
        </Row>
        <Row xs={1} md={1} lg={4} className="g-4" show = {!isData}>
            <Col>
            <Button variant="wishlist" className="rounded-pill pull-left" style={{marginTop: "2vw", marginBottom: "1vw"}}>
            <FormattedMessage id="NoCateg"/>
</Button></Col>

        </Row>
        <div></div>
       
    </Container>
    );
}

export default Categoria;
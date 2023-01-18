import React, { useState } from 'react';
import './CarouselComp.css';
import Carousel from 'react-bootstrap/Carousel';
import categoria4 from '../../assets/hogar.png';


function CarouselItem(props) {   
    return (
      <div>
      <a href={props.link}>
      <img
        className="d-block w-100"
        src={props.img}
        alt="slide"
        style={{borderRadius:
          " 55px 55px 55px 55px", filter:"brightness(65%)" }}
      />
      </a>
      <Carousel.Caption style={{margin:"auto"}}>
        <h3 className='text_caption'>{props.categoria}</h3>
        <p style={{visibility:"hidden"}}>.</p>
        <p style={{visibility:"hidden"}}>.</p>
      </Carousel.Caption>
      </div>
    );
   }
   

function Carousel_comp() {  

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
 
      <Carousel.Item>
        <CarouselItem link="tienda1" img="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(15).webp" categoria = "Categoria 1" />
      </Carousel.Item>  
      <Carousel.Item>
        <CarouselItem link="tienda2" img="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp" categoria = "Categoria 2" />
      </Carousel.Item>  
      <Carousel.Item>
        <CarouselItem link="tienda3" img="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(23).webp" categoria = "Categoria 3" />
      </Carousel.Item>
      <Carousel.Item>
        <CarouselItem link="tienda4" img={categoria4} categoria = "Categoria 4" />
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousel_comp;
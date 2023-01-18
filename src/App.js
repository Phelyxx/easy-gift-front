import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Category from './components/category/Category';
import GiftDetail from './components/GiftDetail';
import WishlistDetail from './components/WishlistDetail';
import Cart from './components/cart/Cart';
import Tiendas from './components/store/Tiendas';
import SignIn from './components/signIn'
import SignUp from './components/signUp'
import Profile from './components/Profile';
import Landingpage from './components/landingpage/Landingpage';
import EditProfile from './components/editProfile';
import FeedCategory from './components/FeedCategory';
import TiendaDetail from './components/store/TiendaDetail';
import Search from './components/search/Search';
import Page_end from './components/Page_end';
import Header from './components/Header';
import ProfileUser from './components/ProfileUser';
import { useState } from "react";


function App() {

  var user = localStorage.getItem("nombre_usuario")
  var picture = localStorage.getItem("perfil_usuario")
  var usuario = JSON.parse(localStorage.getItem("usuario_edit"));

  const [cart, setCart] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header username={user} profile_photo={picture} cart={cart} setCart={setCart} />

        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/:searchWord" element={<Search />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/profile/:usuarioId' element={<Profile />} />
          <Route path='/usuarios/:usuarioId' element={<ProfileUser />} />
          <Route path="/tiendas" element={<Tiendas />} />
          <Route path="/tiendas/:tiendaId" element={<TiendaDetail />} />
          <Route path="/editProfile/:usuarioId" element={<EditProfile {...usuario} />} />
          <Route path="/categorias" element={<Category />} />
          <Route path="/feed" element={<FeedCategory />} />
          <Route path="/wishlists/:wishlistId" element={<WishlistDetail />} />
          <Route path="/tiendas" element={<Tiendas />} />
          <Route path="/tiendas/:tiendaId" element={<TiendaDetail />} />
          <Route path="/regalos/:regaloId" element={<GiftDetail setCart={setCart}/>} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/categorias" element={<Category />} />
          <Route path="/carrito" element={<Cart setCart={setCart}/>} />
          <Route path="/feed" element={<FeedCategory />} />
        </Routes>
        <Page_end />
      </BrowserRouter>


    </div>

  );
  // return (
  //   <div className="App">
  //       <Tiendas />
  //       <TiendaDetail/>
  //       <Search/>
  //       <Feed/>
  //       <CreateWishlist />
  //       <GiftDetail/>
  //       <WishlistDetail name="Navidad"/>
  //       <Category/>
  //       <Cart />
  //       <DropdownCart/>
  //       <FeedCategory/>
  //       <Wishlists/>
  //       <Resenaproducto/>
  //       <SignIn/>
  //       <SignUp/>
  //       <Profile/>
  //       <EditProfile/> */}

  //       <Routes>
  //         <Route path='/' element= {<Landingpage/>}/>
  //         <Route path='/signin' element= {<SignIn/>}/>
  //         <Route path='/signup' element= {<SignUp/>}/>
  //       </Routes>


  //   </div>

  // );  

}

export default App;

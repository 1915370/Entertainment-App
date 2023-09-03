import React from "react";
import './App.css';
import Header from './Components/Header/Header.js';
import  SimpleBottomNavigation from "./Components/MainNav";
 import {BrowserRouter, Route,Routes} from "react-router-dom";
import { Container} from "@mui/material";
import Trending from "./Pages/Trending/Trending";
import Movies from "./Pages/Movies/Movies";
import Series from "./Pages/Series/Series";
import Search from "./Pages/Search/Search";
function App() {
  return (
    <BrowserRouter>
    <Header/>
    <div className="app">
      
      <Container>
        <Routes>
          <Route exact path='/' element={<Trending/>}></Route>
          <Route path='/movies' element={<Movies/>}></Route>
          <Route path='/series' element={<Series/>}></Route>
           <Route path='/search' element={<Search/>}></Route>
        </Routes>

      </Container>

      
  
    </div>
    <SimpleBottomNavigation/>
  
    </BrowserRouter>
   
  );
}

export default App;

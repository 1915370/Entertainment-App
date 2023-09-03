import { Button, Tab, Tabs, TextField, ThemeProvider, createMuiTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'
import SearchIcon from "@mui/icons-material/Search";
import axios from 'axios';
import CustomPagination from '../../Components/Pagination/CustomPagination';
import SingleContent from '../../SingleContent/SingleContent';

const Search = () => {

  const[type,setType]=useState(0);
  const[page,setPage]=useState(1);
  const[searchText,setSearchText]=useState("");
  const[content,setContent]=useState();
  const [numOfPages,setnumOfPages]=useState();

   const darkTheme=createMuiTheme({
    palette:{
      type:"dark",
      primary:{
        main:"#fff",
      },
    },
   });

   const fetchSearch=async()=>{
    const {data}= await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=8206491576d533e52a043cafbec5879c&language=en-US&query=${searchText}&page=${page}&include_adult=false`);
    
    setContent(data.results);
    setnumOfPages(data.total_pages);
 };

 useEffect(()=>{
  window.scroll(0,0);
  fetchSearch();

 },[type,page]);



  
  return (
    
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{display:"flex",margin:"15px 0" }}>  
         <TextField
      style={{flex:1}}
      className='searchBox'
      label="Search"
      variant="filled"
       onChange={(e)=> setSearchText(e.target.value)}
       />
       <Button variant="contained" style={{marginLeft:10}}
       onClick={fetchSearch}>
        <SearchIcon />
         </Button>
         </div>
       

       <Tabs
        value={type}
         indicateorColor="primary" 
         textColor="primary"
         onChange={(event,newValue)=>{
          setType(newValue);
          setPage(1);


         }} >
        <Tab style={{width:"50%"}} label="Search Movies" />
        <Tab style={{width:"50%"}} label="Search TV Series"/>

       </Tabs>
       </ThemeProvider>
       <div className='trending'>
        {content && content.map((e)=> <SingleContent 
        key={e.id}
        id={e.id}
        poster={e.poster_path} 
        title={e.title||e.name}
        date={e.first_air_date || e.release_date}
        media_type={type ? "tv" : "movie"}
        vote_average={e.vote_average}
        /> 
        )}
        {searchText && !content && (type? <h2> No Series Found</h2>:
        <h2> No Movies Found</h2>)}

      </div>
      {numOfPages >1 && (
      <CustomPagination setPage={setPage}/>
      )}
      
    </div>

       
     
      
    
  )
}

export default Search;


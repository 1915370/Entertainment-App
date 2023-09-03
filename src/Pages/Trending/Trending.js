import React, { useEffect, useState } from 'react'
import axios from "axios";
import SingleContent from '../../SingleContent/SingleContent';
import "./Trending.css";
import CustomPagination from '../../Components/Pagination/CustomPagination';
const Trending =() => {
  const[content,setContent]= useState([]);
  const[page,setPage]=useState(1);
  const fetchTrending=async()=>{
   const {data}= await axios(`https://api.themoviedb.org/3/movie/popular?api_key=8206491576d533e52a043cafbec5879c&page=${page}`);
    
      //  console.log(data);
     setContent(data.results);

  };
  useEffect(()=>{
    fetchTrending();

  },[ page]);

  return (
    <div>
      <span className='movietitle'> Trending </span>
      <div className='trending'>
        {content && content.map((e)=> <SingleContent 
        key={e.id}
        id={e.id}
        poster={e.poster_path} 
        title={e.title||e.name}
        date={e.first_air_date || e.release_date}
        media_type="movie"
        vote_average={e.vote_average}
        /> 
        )}

      </div>
      <CustomPagination setPage={setPage}/>
      
    </div>
  )
}

export default Trending;

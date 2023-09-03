import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CustomPagination from '../../Components/Pagination/CustomPagination';
import SingleContent from '../../SingleContent/SingleContent';
import "./Movies.css";
import Genres from '../../SingleContent/Genres';
import useGenre from '../../hooks/useGenre';
const Movies = () => {
    const[page,setPage]=useState(1);
    const[content,setContent]=useState([]);
    const[numOfPages,setnumOfPages]=useState();
    const[selectedGenres,setSelectedGenres]=useState([]);
    const[genres,setGenres]= useState([]);
    const genreforURL=useGenre(selectedGenres)



  const fetchMovies=async ()=>{
    const {data}= await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=8206491576d533e52a043cafbec5879c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`);
    // console.log(data);
    setContent(data.results);
    setnumOfPages(data.total_pages);
  }

  useEffect(()=>{
    fetchMovies();
  },[ page,genreforURL])
  return (
    <div>
      <span className='movieTitle'> Movies </span>
      <Genres type="movie"
       selectedGenres={selectedGenres}
       setSelectedGenres={setSelectedGenres}
       genres={genres}
       setGenres={setGenres}
       setPage={setPage}
       />
      <div className='movie'>
        {content && content.map((e)=> <SingleContent 
        key={e.id}
        id={e.id}
        poster={e.poster_path} 
        title={e.title||e.name}
        date={ e.release_date}
        media_type="movie"
        vote_average={e.vote_average}
        /> 
        )}

      </div>
      {numOfPages >1 &&  (
      <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
      )}
      
      
    </div>
  )
}

export default Movies;

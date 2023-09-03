import React from 'react'
import {img_300} from "../config/config";
import "./SingleContent.css";
import { Badge } from '@mui/material';
import ContentModel from '../contentmodel/contentModel';


const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  // console.log("media_type:", media_type); // Add this line
  // console.log("id:", id); // Add this line
  return (
    <ContentModel media_type={media_type} id={id}>
      <Badge badgeContent={vote_average}
      
      color={vote_average>7 ?"primary":"secondary"}/>
      <img
      className='poster'
      src={poster? `${img_300}${poster}`: "unavailable"}
      alt= {title}
      />
      <b className='title'> {title} </b>
      <span className='sunTitle'> {media_type==="tv" ? "TV Series":"Movie"}</span>
      <span className='sunTitle'>{date} </span>
      
    
      
    </ContentModel>
  )
}

export default SingleContent;

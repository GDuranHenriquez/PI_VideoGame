import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ReactPlayer from 'react-player'
import plyVideo from '../../assets/icons/play.png'


function ContentDataDetail(){
    const detailVideoGame = useSelector((state) => state.detailVideoGame);

    function platForms(platf){
      if(!platf){
        return null
      }
      if(platf.length === 0){
        return null;
      }else if(platf.length === 1){
        return platf[0];
      }else{
        return platf.join(' -- ')
      }
    };

    function genres(gen){
      if(!gen){
        return null;
      }
      if(gen.length === 0){
        return null;
      }else if(gen.length === 1){
        return gen[0];
      }else{
        return gen.join(' -- ')
      }
    };

    function description(descr){
      if(!descr){
        return null
      }
      if(descr.includes('<p>')){
        const desc_slice = descr.split('<p>Español<br />')
        return desc_slice[0]
      }
      return descr;
    }
    
    return <DataDetailContainer>    
      <div className="imageDescript">
        <div className="image">
          <img src={detailVideoGame.image} alt={`'ScreenShot of ${detailVideoGame.name}'`}/>
        </div>
        <div className="description">
          <h1>{detailVideoGame.name}</h1>
          <p>Released 🔥 {detailVideoGame.released} 🔥 </p>
          <p dangerouslySetInnerHTML={{__html: description(detailVideoGame.description)}}></p>
          <div className="platforms">
            {!platForms(detailVideoGame.platforms)? '': <p>Platforms: {platForms(detailVideoGame.platforms)}</p>}
          </div>
          <div className="gen">
            {!genres(detailVideoGame.genres)? '': <p>Genres: {genres(detailVideoGame.genres)}</p>}
          </div>
          <div className="rating">
            {!detailVideoGame.rating? '': <p>Rating: {detailVideoGame.rating}</p>}
          </div>          
        </div>
        
      </div>
      <div className="screenshots">
        {!detailVideoGame.screenshots_lis? '': detailVideoGame.screenshots_lis.map((srcImg, index) => (
          <div key={index} className="img">
            <img src={srcImg} alt="screenshots" />
          </div>
        )) }
      </div>
      <div className="traylers">
        {!detailVideoGame.traylers_lis? '': detailVideoGame.traylers_lis.map((srcVideo, index) => (
          <ReactPlayer url={srcVideo.max} className = 'viewPlayerContainer' controls playIcon={plyVideo} width="45%" height="100%"/>      
        )) }
      </div>
    </DataDetailContainer>

};

const DataDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-top: 130px;
  gap: 20px;  
  .imageDescript{
    display: flex;
    flex-wrap: nowrap;
    width: 90%;
    height: max-content;
    background-color: rgba(0, 0, 0, 0.9);    
    .image{
      display: flex;
      flex-wrap: nowrap;
      object-fit: cover;
      width: 50%;
      min-height: max-content;
      img{
        width: 100%;
        min-height: fit-content;
        object-fit: cover;
      }
    }
    .description{
      padding: 0 10px 0 10px;
      width: 50%;
      height: max-content;
      color: #a0b3b6;
      h1{
        margin-top: 10px;
        margin-bottom: 10px;
      }
      p{
        font-size: 13px;
        font-family: sans-serif;
        
      }
    }
  }
  .screenshots{
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    background-color: rgba(0, 0, 0, 0.9);
    height: max-content;
    .img{
      display: flex;
      flex-wrap: nowrap;
      object-fit: cover;
      width: 33.3%;
      min-height: max-content;
      img{
        width: 100%;
        min-height: fit-content;
        object-fit: cover;
      }
    }
  }
  .traylers{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 90%;    
    height: max-content;    
    gap: 20px;
    .viewPlayerContainer{
      padding: 0px;
      margin: 0px;
      display: flex;
      flex-wrap: wrap;
      width: 45%;
      object-fit: cover;
      min-height: max-content;
      box-shadow: 3px 3px 3px rgba(8, 198, 241, 0.5);
      video{
        padding: 0px;
        margin: 0px;
        display: flex;
        width: 100%;
        height: 100%;
      }
    }

  }
`

export default ContentDataDetail;
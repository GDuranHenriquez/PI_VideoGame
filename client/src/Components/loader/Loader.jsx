import react from "react";
import { useSelector } from "react-redux";
import LoadVideogame from '../../assets/gif/LoadVideogames.gif';
import StyledLoader from './Loader.module.css';
 

function Loader(){

  return <div className={StyledLoader.containerLoader}>
    <div className={StyledLoader.gifContainer}>
      <img src={LoadVideogame} alt="Loadin..." id={StyledLoader.imgLoader} className={StyledLoader.parpadear}/>
    </div>
  </div>

}

export default Loader;

import Carousel from 'react-multi-carousel';
import { useState , useEffect} from "react"
import 'react-multi-carousel/lib/styles.css';
import Card from "../components/GameCard"
const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  const s={
    width:"400px",
    height:"400px",
    backgroundColor:"white"
  }

function Games_slider({games,role}) {
  return (
    <div className="slider container">
        <h2 className="slider_title">TOP RATED GAMES</h2>
        <div className='container'>
        <Carousel responsive={responsive}>
            {
                games.map((game,index)=>(<Card game={game} key={index} role={role}/>))
            }
        </Carousel>
        </div>
    </div>
    
    
  )
}
export default Games_slider
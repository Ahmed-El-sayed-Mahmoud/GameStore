import { useState ,useCallback,useEffect,useRef} from "react"
import Btn from "./btn"
import "./css/slider.css"
const slideStyles = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  const container_style={
    /* height:"500px",
    position:"relative",
    width:"500px" */
    overflow:"hidden"
  }
  const rightArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };
  
  const leftArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };
  
  const sliderStyles = {
    position: "relative",
    height: "100%",
    width:"100%"
  };
  
  const dotsContainerStyles = {
    display: "flex",
    justifyContent: "center",
    position:" absolute",
    zIndex: "5",
    color: "white",
    left: "50%",
    transform: "translateX(-50%)",
    bottom: "2%"
  }
  
  const dotStyle = {
    margin: "0 3px",
    cursor: "pointer",
    fontSize: "20px",

  };
function Slider({games}) {
    const [container_size,set_cont_size]=useState(1170);
    const [cur_index,set_index]=useState(0);
    const handleresize=function()
    {
      if(window.innerWidth>1200)
        set_cont_size(1170);
      else if(window.innerWidth>992)
        set_cont_size(970)
      else if(window.innerWidth>768)
        set_cont_size(750);
      else
        set_cont_size(.9*window.innerWidth);
    }
    useEffect(()=>{
      window.addEventListener('resize',handleresize);
      return () => {
        window.removeEventListener('resize', handleresize);
      };
    },[window.innerWidth])

    const timerRef = useRef(null);

    const goToPrevious = () => {
        const isFirstSlide = cur_index === 0;
        const newIndex = isFirstSlide ? games.length - 1 : cur_index - 1;
        set_index(newIndex);
      };
      const goToNext = useCallback(() => {
        const isLastSlide = cur_index === games.length - 1;
        const newIndex = isLastSlide ? 0 : cur_index + 1;
        set_index(newIndex);
      }, [cur_index, games]);
      const goToSlide = (slideIndex) => {
        set_index(slideIndex);
      };
      useEffect(() => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
          goToNext();
        }, 4000);
    
        return () => clearTimeout(timerRef.current);
      }, [goToNext]);
      const slide_style=(slideIndex) => ({
        backgroundImage: `url(${games[slideIndex].url})`,
        width: `100%`,
        height:"100%",
        borderRadius: "10px",
    backgroundSize: "cover",
    backgroundPosition: "center",
      });
      const parent_style=()=>({
        height:"500px",
        width:"100%",
    position:"relative"
    , display:"-webkit-box",
    transition: "transform ease-out 0.3s",
    transform: `translateX(${-(cur_index *(container_size))}px)`,
    /* overflow:"hidden" */
      })
      const purchase=(index)=>{
        console.log(index);
      }
  return (
    <div className="container slider" style={container_style}>
        <h2 className="slider_title">GAMES ON TREND</h2>
      <div style={{width:"100%"}}>
        <div className="parent" style={parent_style()}>
            {games.map((_,index)=>(
              <div className="slide" key={index} style={slide_style(index)}>
                <div className="overlay">
                  <div style={{    height: "120px"}}>
                  <img src={games[index].logo} alt="" />
                  </div>
                  <p className="des">{games[index].describtion}</p>
                  <h3>sarting at {games[index].price} $</h3>
                  <div className="buy_save" >
                    <button className="buy_now" onClick={()=>purchase(games[index].name)}>Buy Now</button>
                    <div className="fav">
                    <svg xmlns="http://www.w3.org/2000/svg" height="17" width="17" viewBox="0 0 512 512"><path fill="#ffffff" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>
                    <p>Add to your fav</p>
                    </div>
                    
                  </div>
                </div>
              </div>
            ))}
        </div>
            <div onClick={goToPrevious} style={leftArrowStyles}>
                ❰
            </div>
            <div onClick={goToNext} style={rightArrowStyles}>
                ❱
            </div>
            <div style={dotsContainerStyles}>
        {games.map((game, slideIndex) => (
          <div
            style={dotStyle}
            key={slideIndex}
            onClick={() => {

                goToSlide(slideIndex)}}
          >
            ●
          </div>
        ))}
      </div>
      </div>
      
    </div>
  )
}

export default Slider
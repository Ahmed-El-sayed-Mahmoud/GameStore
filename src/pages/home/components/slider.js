import { useState ,useCallback,useEffect,useRef} from "react"
import "./css/slider.css"
const slideStyles = {
    width: "70%",
    height: "100%",
    borderRadius: "10px",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  const container_style={
    height:"500px",
    position:"relative"
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
  };
  
  const dotsContainerStyles = {
    display: "flex",
    justifyContent: "center",
  };
  
  const dotStyle = {
    margin: "0 3px",
    cursor: "pointer",
    fontSize: "20px",
  };
function Slider({games}) {
    const [cur_index,set_index]=useState(0);
    const timerRef = useRef(null);
        console.log(games[0].url)
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
      const slideStylesWidthBackground = {
        ...slideStyles,
        backgroundImage: `url(${games[cur_index].url})`,
        position:"relative",
        left:"0px"
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
  return (
    <div className="container" style={container_style}>
        
      <div style={slideStylesWidthBackground}>
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
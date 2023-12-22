import "./css/banner.css"
import Btn from "../components/btn"
function Banner({header,title,btn_text,btn_exist,img,game}) {
  const purchase=(name)=>{
    console.log(name);
  }
  return (
    <div className="offer">
        <div className="container">
            <div className="img">
              <img src={img}/>
            </div>
            <div className="text">
                <h2>{header}</h2>
                <p className="norm">{title}</p>
                <button className="buy_now" onClick={()=>purchase(game.Name)}>Buy Now</button>
            </div>
        </div>
    </div>
  )
}

export default Banner
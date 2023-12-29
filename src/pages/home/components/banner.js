import "./css/banner.css"

import Btn from "./btn"
import Msg from "./CoolPopup"
import { useState , useEffect} from "react"
function Banner({header,title,btn_text,btn_exist,img,game,role}) {
  let[show_msg,set_show]=useState(false);
  let [msg,set_msg]=useState("");
  useEffect(() => {
    let timeoutId;
    if (show_msg) {
      timeoutId = setTimeout(() => {
        set_show(false);
      }, 3500);
    }
    return () => clearTimeout(timeoutId);
  }, [show_msg]);
  const add_to_cart =async(name)=>{
    try {
      const game_to_cart = await fetch('http://localhost:3000/player/AddToCart', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            player_email:JSON.parse(localStorage.getItem("Email")),
            game_name:name
          })
      })
      
      if (!game_to_cart.ok) {
          throw new Error(`HTTP error! Status: ${game_to_cart.status}`);
      }
      const p = await game_to_cart.json();
      set_msg(p['msg'])
  }
  catch (error) {
    console.log(error)
}
  }
    const purchase=(name,op)=>{
      if(role==null)
      {
      window.location.href = "http://localhost:3003/Login";
      }
      else if(role=="Player")
      {
        add_to_cart(name,op);
        set_show(true);
      }
      
    else
    {
      set_msg(`You can not purchase this game as ${localStorage.getItem("Role")}`)
      set_show(true);
      
    }
        
}
const s={
  borderRadius: "10px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundImage: `url(${game.image})`,
  width:"90px",
  height:"250px",
}
  return (
    <div className="offer">
        <div className="container">
            <div className="img" style={s}>
              
            </div>
            {show_msg&&<Msg message={msg}/>}
            <div className="text">
                <h2>{header}</h2>
                <p className="norm">{title}</p>
                <button className="buy_now" onClick={()=>purchase(game.Name,1)}>Buy Now</button>
            </div>
        </div>
    </div>
  )
}

export default Banner
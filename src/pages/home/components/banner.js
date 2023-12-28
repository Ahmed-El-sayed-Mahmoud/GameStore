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
  const purchase=(name)=>{
    if(role=="Player")
    {
      add_to_cart(name);
      
      set_show(true);
    }
  else
      set_show(true);
}
  return (
    <div className="offer">
        <div className="container">
            <div className="img">
              <img src={img} alt="" />
            </div>
            {show_msg&&<Msg message={msg}/>}
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
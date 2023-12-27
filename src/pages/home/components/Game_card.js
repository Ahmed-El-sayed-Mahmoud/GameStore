import "./css/game_card.css"
import { useState , useEffect} from "react"
import {Rate} from "antd"
import {ShoppingCartOutlined}from "@ant-design/icons"
import Msg from"./CoolPopup"
function GameCard({game,role}) {
  const [show_msg,set_show]=useState(false);
  const [msg,set_msg]=useState("");
  useEffect(() => {
    let timeoutId;
    if (show_msg) {
      timeoutId = setTimeout(() => {
        set_show(false);
      }, 3500);
    }
    return () => clearTimeout(timeoutId);
  }, [show_msg]);
  const add_to_cart =async(name,op)=>{
    try {
      const game_to_cart = await fetch(`http://localhost:3000/player/AddTo${op==1?"Cart":"Fav"}`, {
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
    if(role=="Player")
    {
      add_to_cart(name,op);
      set_show(true);
    }
  else
      set_show(true);
}

  ////////////////////////////////////////////////////////
    const s={
        borderRadius: "10px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage: `url(${game.url})`,
    width:"100%",
    height:"310px"
    }
  useEffect(() => {
    let timeoutId;
    if (show_msg) {
      timeoutId = setTimeout(() => {
        set_show(false);
      }, 3500);
    }
    return () => clearTimeout(timeoutId);
  }, [show_msg]);
  let sold_times="";
  if(game.totalNumberSales>10000)
  sold_times="10000";
else if(game.totalNumberSales>1000)
sold_times="1000";
else if(game.totalNumberSales>100)
sold_times="100";
////////////////////////////////////////////////////////////////////////////
  return (
    <div className="game_card">
      {show_msg&&<Msg message={msg}/>}
        <div className="img" style={s}>
        <div className="overlay_card">
        <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>purchase(game.Name,1)} height="20" width="20" viewBox="0 0 576 512"><path fill="#ffffff" d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>purchase(game.Name,0)} height="20" width="20" viewBox="0 0 512 512"><path fill="#ffffff" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>
        </div>
        </div>
        <div className="game_info">
            <p>{game.Name}</p>
            <div className="rating">
                <Rate defaultValue={game.AVGRating} disabled={true} allowHalf={true} />
            </div>
            <div className="price">
                <p className="dicount">+{game.MIN_AGE}</p>
                <p>+{sold_times}<svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path fill="#ffffff" d="M253.3 35.1c6.1-11.8 1.5-26.3-10.2-32.4s-26.3-1.5-32.4 10.2L117.6 192H32c-17.7 0-32 14.3-32 32s14.3 32 32 32L83.9 463.5C91 492 116.6 512 146 512H430c29.4 0 55-20 62.1-48.5L544 256c17.7 0 32-14.3 32-32s-14.3-32-32-32H458.4L365.3 12.9C359.2 1.2 344.7-3.4 332.9 2.7s-16.3 20.6-10.2 32.4L404.3 192H171.7L253.3 35.1zM192 304v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16zm96-16c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16zm128 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg></p>
                <p>{game.PRICE}$</p>
            </div>
        </div>
    </div>
  )
}

export default GameCard
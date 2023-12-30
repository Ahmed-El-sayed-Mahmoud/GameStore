import React, { useEffect, useState ,useRef} from "react";
import "./ViewCart.css";
import Header from "../home/components/header";
import Card from "../home/components/GameCard";
import Popup from "../home/components/CoolPopup"
let subtotal = 0;
let coupon_discount=0;
let sub_discount=0;
let trials=[];
let real_coupons=[];
const IsSub = async () => {
  try {
    const sub = await fetch("http://localhost:3000/player/IsSub", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: JSON.parse(localStorage.getItem("Email")),
      }),
    });

    if (!sub.ok) {
      throw new Error(`HTTP error! Status: ${sub.status}`);
    }

    const sub_ = await sub.json();
    sub_discount=sub_[0].percentage;
  } catch (error) {
    console.error(error);
    return [];
  }
};
const games_in_cart = async () => {
  try {
    const game_in_cart = await fetch("http://localhost:3000/player/ViewCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: JSON.parse(localStorage.getItem("Email")),
      }),
    });

    if (!game_in_cart.ok) {
      throw new Error(`HTTP error! Status: ${game_in_cart.status}`);
    }

    const games = await game_in_cart.json();
    subtotal = 0;
    games.map((game) =>(subtotal += game.PRICE));
    return games;
  } catch (error) {
    console.error(error);
    return [];
  }
};
IsSub();
const create_order = async () => {
  try {
    const order = await fetch("http://localhost:3000/player/AddOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: JSON.parse(localStorage.getItem("Email")),
        tot_price:subtotal-coupon_discount-(sub_discount*subtotal/100),
        date:`${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`,
      }),
    });

    if (!order.ok) {
      throw new Error(`HTTP error! Status: ${order.status}`);
    }

    const order_ = await order.json();
    return order_[0].id;
  } catch (error) {
    console.error(error);
    return [];
  }
};
const create_order_game = async (order_id,cart_g,cs,email) => {
  try {
    const order = await fetch("http://localhost:3000/player/AddGamesOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id:order_id,
        games:cart_g,
        coupons:cs,
        email: JSON.parse(localStorage.getItem("Email"))
      }),
    });

    if (!order.ok) {
      throw new Error(`HTTP error! Status: ${order.status}`);
    }

    const order_ = await order.json();
    return order_;
  } catch (error) {
    console.error(error);
    return [];
  }
};
function ViewCart() {
  const [cartGames, setCartGames] = useState([]);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [show_msg,set_show_msg]=useState("");
  const[c_msg,set_c_msg]=useState(false);
  const [coupon, set_cop] = useState([]);
  const[show_pop,set_pop]=useState(false);
  const[msg_cont,set_msg_cont]=useState("");
  useEffect(()=>{
    trials=[];
    coupon_discount=0;
  },[])
  const checkout=async ()=>{
    console.log(real_coupons);
    const order = await create_order();
  const games_in_order = await create_order_game(order, cartGames,real_coupons);
  if(games_in_order.success)
  {
    set_msg_cont("Your Order has been Completed. Thanks for choosing GameVerse");
    set_pop(1);
    setCartGames([])
  }
  }
  let code_entered=useRef();
  const use_coupon = async (code_e) => {
    try {
      const coupon = await fetch("http://localhost:3000/player/UseCoupon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: JSON.parse(localStorage.getItem("Email")),
          code:code_e
        }),
      });
  
      if (!coupon.ok) {
        throw new Error(`HTTP error! Status: ${coupon.status}`);
      }
      const c = await coupon.json();
     if(c.length==0)
     {
      set_c_msg("INVALID COUPON");
      set_show_msg(1);
     }
     else if(c[0].redeemed==1)
     {
      set_c_msg("this coupon has already been used");
      set_show_msg(1);
     }
     else{
      set_c_msg("This coupon has been applied");
      set_show_msg(1);
      real_coupons.push(c[0]);
      coupon_discount+=Number.parseInt(c[0].price);
     }
      return c;
    } catch (error) {
      console.error(error);
    }
  };
  const handleKeyDown=(event)=>{
    if (event.key === 'Enter') {
      console.log(trials)
      if(trials.includes(code_entered.current.value))
      {
        set_c_msg("You have already entered this code")
        set_show_msg(1)
      }
      else
      {
        use_coupon(code_entered.current.value);
        trials.push(code_entered.current.value);
      }
    
  }
}
  const fetchCartGames = async () => {
    try {
      const games = await games_in_cart();
      setCartGames(games);
    } catch (error) {
      console.error("Error fetching cart games:", error);
    }
  };

  useEffect(() => {
    fetchCartGames();
  }, []);

  const handleCouponClick = () => {
    setShowCouponInput(!showCouponInput);
    setIsReversed(!isReversed);
  };

  return (
    <>
    {show_pop&&<Popup message={msg_cont}/>}
      <Header />
      <div className="container">
        <div className="title">Your Cart ({cartGames.length})</div>
        <div className="cart">
          {cartGames.length > 0&&<div className="bill">
            <h2>SUMMARY</h2>
            <div className="subtotal cont">
              <h3>Subtotal</h3>
              <h4>{subtotal}$</h4>
            </div>
            <div className="coupon">
              <p
                onClick={handleCouponClick}
                style={{ cursor: "pointer" }}
                className="cp"
              >
                Do You have a Coupon?
                <div
                  className="arrow"
                  style={{
                    width: "0",
                    height: "0",
                    borderLeft: "7px solid transparent",
                    borderRight: "7px solid transparent",
                    borderTop: "7px solid #fff",
                    transform: isReversed ? "scaley(-1)" : "scaley(1)",
                    cursor: "pointer",
                    transition: "transform 0.3s ease-in-out",
                  }}
                />
              </p>
              {showCouponInput && (
                <input
                  type="text"
                  name="couponCode"
                  id="couponCode"
                  placeholder="Coupon code"
                  className="code"
                  ref={code_entered}
                  onKeyDown={handleKeyDown}
                />
              )}
              {show_msg&&showCouponInput&&<p>{c_msg}</p>}
            </div>
            <div className="discounts">
              <div className="coupons cont">
                <p>Coupons</p>
                <p className="dis">-{coupon_discount}$</p>
              </div>
              <div className="sub cont">
                <p>Sub.Discount</p>
                <p className="dis">-{sub_discount}%</p>
              </div>
              <div className="total cont">
                <h3>Total</h3>
                <p className="total">{subtotal-coupon_discount-(sub_discount*subtotal/100)}$</p>
              </div>
              <button className="check" onClick={()=>checkout()}>Check Out</button>
            </div>
          </div>}

          <div className="cart_cont">
            {cartGames.length === 0 && (
              <div className="no_res">
                <h3>Your cart is Empty</h3>
                <p>Add games to your cart to purchase them.</p>
              </div>
            )}
            {cartGames.map((game, index) => (
              <div onClick={() => fetchCartGames()} key={index}>
                <Card game={game} role={localStorage.getItem("Role")}n="1" buy="0" />
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </>
  );
}

export default ViewCart;

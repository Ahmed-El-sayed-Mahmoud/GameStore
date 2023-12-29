import Header from "../home/components/header"
import { useState ,useEffect } from "react";
import Card from "../home/components/GameCard";
const games_in_cart = async () => {
    try {
      const game_in_cart = await fetch("http://localhost:3000/player/ViewFav", {
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
      return games;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
function Fav() {
    const [cartGames, setCartGames] = useState([]);
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
      }, [cartGames]);
  return (
    <>
    <Header/>
    <div className="container">
        <div className="title">Your Favourites ({cartGames.length})</div>
        <div className="cart">
          <div className="cart_cont">
            {cartGames.length === 0 && (
              <div className="no_res">
                <h3>Your cart is Empty</h3>
                <p>Add games to your cart to purchase them.</p>
              </div>
            )}
            {cartGames.map((game, index) => (
              <div onClick={() => fetchCartGames()} key={index}>
                <Card game={game} role={localStorage.getItem("Role")} buy="0" n="2" />
              </div>
            ))}
          </div>
          
        </div>
    </div>
    </>
  )
}

export default Fav
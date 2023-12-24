import "./home.css"
import Header from "./components/header"
import Banner from "./components/banner"
import Slider from "./components/slider"
import Games_slider from "./components/games_slider"
import Footer from "./components/Footer"
import Msg from "./components/CoolPopup"
/* const fetch_trend_game=async()=>{
  const response = await fetch("http://localhost:3000/game/");
  const games = await response.json();
  return games[0];
  }
  
 const game= await fetch_trend_game();
 const header=`${game?.Name} is now FREE `;
  const fetch_top_sold=async()=>{
    let games;
    try{
      const response = await fetch("http://localhost:3000/game/TopSold");
       games = await response.json();
      if (!games.ok) {
      throw new Error(`HTTP error! Status: ${games.status}`);
    }
    
  }
  catch (error) {
    console.log(error)
}
return games
  }
  const sold_games= await fetch_top_sold();
  const fetch_top_rated=async()=>{
    let games;
    try{
      const response = await fetch("http://localhost:3000/game/TopRated");
       games = await response.json();
      if (!games.ok) {
      throw new Error(`HTTP error! Status: ${games.status}`);
    }
    
  }
  catch (Error) {
    console.log(Error)
}
return games
  }
  const rated_games= await fetch_top_rated();
  console.log(rated_games) */
function Home() {
  
  return (
    <>
      {/* <Header  role={localStorage.getItem("Role")}/>
      <Banner header={header} title="What are you waiting for !" img="./media/god_of_war.jpg" game={game} btn_exist={true} btn_text="Purchase Now" role={localStorage.getItem("Role")}/>
      <Slider games={sold_games} role={localStorage.getItem("Role")}/>
      <Games_slider games={rated_games} role={localStorage.getItem("Role")}/>
      <Footer/> */}
    </>
  );
}

export default Home;
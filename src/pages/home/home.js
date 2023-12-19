import "../home/home.css"
import Header from "./components/header"
import Banner from "./components/banner"
import Slider from "./components/slider"
const fetch_trend_game=async()=>{
  const response = await fetch("http://localhost:3000/game/");
  const games = await response.json();
  return games[0];
  }
 const game= await fetch_trend_game();
 const header=`${game.Name} is now FREE `;
const games=[
    {
        name:"UNCHARTED",
        url:"./media/ncharted.jpg",
        price:"199.99"
    },
    {
        name:"SPIDER MAN III",
        url:"./media/spider.jpg",
        price:"209.99"
    },
    {
        name:"WITCHER",
        url:"./media/witcher.jpg",
        price:"105.75"
    },
    {
        name:"CYBER BUNK",
        url:"./media/cyber.jpg",
        price:"99.99"
    }
]
function home() {
  
  return (
    <>
      <Header/>
      <Banner header={header} title="What are you waiting for !" img="./media/god_of_war.jpg" btn_exist={true} btn_text="Purchase Now"/>
      <Slider games={games}/>
    
    </>
  );
}

export default home;
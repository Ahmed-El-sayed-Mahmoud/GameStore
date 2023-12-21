import "../Home/home.css"
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
        price:"199.99",
        logo:"./media/uncharted_logo.png",
        describtion:"chronicles Nathan Drake's thrilling adventures as he hunts for treasures, solves puzzles, and faces dangers in a series of action-packed games known for their cinematic storytelling and engaging characters."
    },
    {
        name:"SPIDER MAN III",
        url:"./media/spider.jpg",
        price:"209.99",
        logo:"./media/Spider-Man-Logo.png",
        describtion:"Balancing life as a web-slinging crimefighter and a regular citizen, players navigate a gripping storyline filled with villains, intense combat, and the challenges of being Spider-Man. The game is praised for its dynamic gameplay, expansive open-world New York City setting, and a narrative that captures the essence of the beloved Marvel character."
    },
    {
        name:"WITCHER",
        url:"./media/witcher.jpg",
        price:"105.75",
        logo:"./media/witcher_logo.png",
        describtion:" Geralt's quests to find his adopted daughter, Ciri, and unravel political intrigues. Renowned for its immersive storytelling, complex characters, and morally ambiguous choices, games offer a vast open world filled with monsters, magic, and compelling narratives."
    },
    {
        name:"CYBER BUNK",
        url:"./media/cyber.jpg",
        price:"99.99",
        logo:"./media/cyber_logo.png",
        describtion:" a mercenary in the futuristic Night City. The game, set in a cyberpunk world, features an open world with narrative depth, moral choices, and intense action, offering an immersive experience in a technologically advanced, morally complex future."
    }
]
function Home() {

  return (
    <>
      <Header/>
      <Banner header={header} title="What are you waiting for !" img="./media/god_of_war.jpg" btn_exist={true} btn_text="Purchase Now"/>
      <Slider games={games}/>
    
    </>
  );
}

export default Home;
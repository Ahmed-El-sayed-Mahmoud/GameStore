import "./css/all.in.css"
import "./css/normalize.css"
import "./css/page.css"
import Header from './components/header'
import Btn from './components/btn'
import Banner from "./components/banner"
const fetch_trend_game=async()=>{
  const response = await fetch("http://localhost:3000/game/");
  const games = await response.json();
  return games[0];
  }
 const game= await fetch_trend_game();
 const header=`${game.Name} is now FREE `
function App() {
  
  return (
    <div className="App">
      <Header/>
      <Banner header={header} title="What are you waiting for !" img="./media/god_of_war.jpg" btn_exist={true} btn_text="Purchase Now"/>
    </div>
  );
}

export default App;

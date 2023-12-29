import React, { useEffect, useState } from "react";
import Header from "../home/components/header";
import "./Search.css";
import { useParams } from "react-router-dom";
import Card from "../home/components/GameCard";
import Footer from "../home/components/Footer";

const fetch_search = async (s_term) => {
  try {
    const result = await fetch(
      `http://localhost:3000/game/search?s_term=${s_term}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!result.ok) {
      throw new Error(`HTTP error! Status: ${result.status}`);
    }

    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

function Search() {
  const [isReversed, setIsReversed] = useState(false);
  const [isReversed_r, setIsReversed_r] = useState(false);
  const [isReversed_ra, setIsReversed_ra] = useState(false);
const [expanded,setExpanded]=useState(false);
const [expanded_r,setExpanded_r]=useState(false);
const [expanded_ra,setExpanded_ra]=useState(false);
  const handleClick = () => {
    setIsReversed(!isReversed);
    setExpanded(!expanded)
  };
  const handleClick_r = () => {
    setIsReversed_r(!isReversed_r);
    setExpanded_r(!expanded_r)
  };
  const handleClick_ra = () => {
    setIsReversed_ra(!isReversed_ra);
    setExpanded_ra(!expanded_ra)
  };
  const { query } = useParams();
  let [gamesSearched, setGamesSearched] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch_search(query);
        setGamesSearched(data);
        setOriginalData(data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [query]);
  const filter_price=(p)=>{
    setGamesSearched(originalData.filter((game)=>game.PRICE<p))
  }
  const filter_date=(i)=>{
    let sortedGames;

    if (i === 1) {
      sortedGames = [...gamesSearched].sort(
        (a, b) => new Date(a.RDATE).getTime() - new Date(b.RDATE).getTime()
      );
    } else {
      sortedGames = [...gamesSearched].sort(
        (a, b) => new Date(b.RDATE).getTime() - new Date(a.RDATE).getTime()
      );
    }
  
    setGamesSearched(sortedGames);
  }
  const filter_rate=(i)=>{
    let sortedGames;

    if (i === 1) {
      sortedGames = [...gamesSearched].sort(
        (a, b) => a.AVGRating-b.AVGRating);
    } else {
      sortedGames = [...gamesSearched].sort(
        (a, b) => b.AVGRating-a.AVGRating);
    }
   
    setGamesSearched(sortedGames);
  }
  return (
    <>
      <Header />
      <div className="container">
        <div className="inner_cont">
          <div className="filter">
            <h3>Filters</h3>
            <div className={`expandable-list ${expanded ? 'expanded' : ''}`} >
              <h3 className="filter_price" onClick={handleClick}>
                Price{" "}
                <div className="arrow"
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
              </h3>
              {expanded&&
                <><p onClick={()=>filter_price(1)}>Free</p>
                <p onClick={()=>filter_price(100)}>Under 100$</p>
                <p onClick={()=>filter_price(200)}>Under 200$</p>
                <p onClick={()=>filter_price(400)}>Under 400$</p></>}
            </div>
            <div className={`expandable-list ${expanded_r ? 'expanded' : ''}`} >
              <h3 className="filter_price" onClick={handleClick_r}>
                Release Date{" "}
                <div className="arrow"
                  style={{
                    width: "0",
                    height: "0",
                    borderLeft: "7px solid transparent",
                    borderRight: "7px solid transparent",
                    borderTop: "7px solid #fff",
                    transform: isReversed_r ? "scaley(-1)" : "scaley(1)",
                    cursor: "pointer",
                    transition: "transform 0.3s ease-in-out",
                  }}
                />
              </h3>
              {expanded_r&&
                <><p onClick={()=>filter_date(1)}>Newest</p>
                <p onClick={()=>filter_date(2)}>Oldest</p>
                </>}
            </div>
            <div className={`expandable-list ${expanded_ra ? 'expanded' : ''}`} >
              <h3 className="filter_price" onClick={handleClick_ra}>
                Rating{" "}
                <div className="arrow"
                  style={{
                    width: "0",
                    height: "0",
                    borderLeft: "7px solid transparent",
                    borderRight: "7px solid transparent",
                    borderTop: "7px solid #fff",
                    transform: isReversed_ra ? "scaley(-1)" : "scaley(1)",
                    cursor: "pointer",
                    transition: "transform 0.3s ease-in-out",
                  }}
                />
              </h3>
              {expanded_ra&&
                <><p onClick={()=>filter_rate(2)}>Higher Rating</p>
                <p onClick={()=>filter_rate(1)}>Lower Rating</p>
                </>}
            </div>
          </div>
          {gamesSearched.length == 0 && (
            <div className="no_res">
              <h3>OOOPS!No results found</h3>
              <p>
                Unfortunately I could not find any results matching your search.
              </p>
            </div>
          )}
          {gamesSearched.length>0&&<div className="search_res">
            {gamesSearched &&
              gamesSearched.map((game, index) => {
                return (
                  <div className="card_res" key={index}>
                    <Card game={game} role={localStorage.getItem("Role")} buy="1" />
                  </div>
                );
              })}
          </div>}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Search;

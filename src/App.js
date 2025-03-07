import { useEffect, useState } from "react";
import CardDetail from "./components/CardDetail";
import Cards from "./components/Cards";
import "./App.css";

function App() {
  
  const [characters, setCharacters] = useState([]);//used for Card component
  
  const [selectedCharacter, setSelectedCharacter] = useState();//used for CardDetail component
  
  const [page, setPage] = useState(1);//used for page navigation previous/next

  const [hasNextPage, setHasNextPage] = useState(true);// use to track there is next page exist


  
  /*function is call to get data from API endpoint that is a list of characters */
  const fetchCharacters = async (page) => {
    let res = await fetch(`https://swapi.dev/api/people/?page=${page}`); // initial fetch will get page = 1(initial value)
    let data = await res.json();
    setCharacters(data.results);
    setHasNextPage(data.next !== null); // 'true' if there's a next page, 'false' if not
    
  };

  /*function is called when click onto each character to get the character details */
  const fetchCharacterDetails = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setSelectedCharacter(data);
    } catch (error) {
      console.error("Failed to fetch character details:", error);
    }
  };
  
  // when click previous/next button "setPage" is called to update "page"
  // [page] change then trigger and pass new "page" to "fetchCharacters" to get previous/next page of characters
  useEffect(() => {
    fetchCharacters(page);
  }, [page]);

  

  return (
    <div className="App">
      <h1>Star Wars Characters</h1>
      <div className="main-container ">
        <div>
          <Cards
            characters={characters}
            onCharacterClick={fetchCharacterDetails}
          />
          
        </div>
        {selectedCharacter && <CardDetail character={selectedCharacter} />}
      </div>

       {/* Pagination Buttons */}
      <div> 
        <button 
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))} 
          disabled={page === 1} 
        >
          Previous
        </button>

        <button 
          onClick={() => setPage((prevPage) => prevPage + 1)}
          
          disabled={hasNextPage===false} 
        >
          Next
        </button>
      </div>
        

    </div>
  );
}

export default App;
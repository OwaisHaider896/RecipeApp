import React, { useState, useEffect } from "react";
import "./styles.css";
import Recipe from "./Recipe";

export default function App() {
  const [search, setSearch] = useState("");
  const [recipe, setRecipe] = useState([]);
  const [querry, setQuerry] = useState("chicken");

  const Id = "4ad888f0";
  const Key = "686576515d1d39b9460830c8b10ca1d6";

  useEffect(() => {
    getRep();
  }, [querry]);

  const getRep = async () => {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=${querry}&app_id=${Id}&app_key=${Key}`
    );
    const data = await response.json();

    setRecipe(data.hits);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuerry(search);
    setSearch("");
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipe">
        {recipe.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            ingredients={recipe.recipe.ingredients}
            image={recipe.recipe.image}
          />
        ))}
      </div>
    </div>
  );
}

//"https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}

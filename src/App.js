import { Component } from "react";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

// updating the state will allow you to access the info globally in the code
// if you are filtering an array, we need a copy of the original array to access it later.
class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(() => {
          return { monsters: users };
        })
      );
  }

  // anonymous function - initialized once for better performance
  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField };
    });
  };

  render() {
    // this is more readable - deconstruction
    const { monsters, searchField} = this.state;
    const{ onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <h1 className="app-title">Monster Rolodex</h1>
        <SearchBox className='monster-search-box' onChangeHandler={onSearchChange} placeholder='search monsters'/> 
        <CardList monsters={ filteredMonsters } />
      </div>
    );
  }
}

export default App;

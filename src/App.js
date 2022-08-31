import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";

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
        <input
          className="search-box"
          type="search"
          placeholder="search monsters"
          onChange={onSearchChange}
        />
        {filteredMonsters.map((monster) => {
          return (
            <div>
              <h1 key={monster.id}>{monster.name}</h1>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;

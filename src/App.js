import { useState, useEffect } from "react";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";


const App = () => {
  const [searchField, setSearchField] = useState('') // [value, setValue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  },[]);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  

  return(
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox className='monsters-search-box'
      onChangeHandler={onSearchChange}
      placeholder='search monsters'
      />
      <CardList monsters={filteredMonsters} />
    </div>
  )



}



// THE CODE BELOW IS HOW WE WOULD WRITE THE CODE IF IT WAS A CLASS COMPONENT

// updating the state will allow you to access the info globally in the code
// if you are filtering an array, we need a copy of the original array to access it later.
// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: "",
//     };
//   }

//   componentDidMount() {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((users) =>
//         this.setState(() => {
//           return { monsters: users };
//         })
//       );
//   }

//   // anonymous function - initialized once for better performance
//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();
//     this.setState(() => {
//       return { searchField };
//     });
//   };

//   render() {
//     // this is more readable - deconstruction
//     const { monsters, searchField} = this.state;
//     const{ onSearchChange } = this;

//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });

//     return (
//       <div className="App">
//         <h1 className="app-title">Monster Rolodex</h1>
//         <SearchBox className='monster-search-box' onChangeHandler={onSearchChange} placeholder='search monsters'/> 
//         <CardList monsters={ filteredMonsters } />
//       </div>
//     );
//   }
// }

export default App;

import logo from './logo.svg';
import './App.css';
import { Component, useEffect, useState } from 'react';
import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';
const App = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);
  
  useEffect( () => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => setMonsters(users));
  }, [])

  useEffect( () => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => 
  {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);

  }
  

  return (
    <div className="App">
    <h1 className = "app-title">Monsters Rolodex</h1>
    <SearchBox 
      className = 'monsters-search-box'
      onChangeHandler = {onSearchChange}
      placeholder = 'Search Monsters'
    />
    <CardList monsters = {filteredMonsters} /> 
  </div>
  )
}

/*
class App extends Component {
  constructor(){
    super();

    this.state = {
      monsters: [],
      searchField: '',
    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => this.setState( () => 
      {
        return {monsters: users};
      },
      () => {
        console.log(this.state);
      }
    ));
  }

  onSearchChange = (event) => 
  {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState( () => {
      return {searchField};
    },
    () => {
      console.log(event);
    }
    );

  }

  render(){
    const { monsters, searchField } = this.state;
    const { onSearchChange}  = this;
    const filtered_monsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    return (
      <div className="App">
        <h1 className = "app-title">Monsters Rolodex</h1>
        <SearchBox 
          className = 'monsters-search-box'
          onChangeHandler = {onSearchChange}
          placeholder = 'Search Monsters'
        />
        <CardList monsters = {filtered_monsters} />
      </div>
    );
  }
} */

export default App;

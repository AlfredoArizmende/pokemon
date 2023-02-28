import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { Landing, Home, Detail, Form } from './views/index';
import NavBar from './components/NavBar/NavBar';


const App = () => {
  const location = useLocation().pathname;
  
  return (
    <div className="App">
      { location !== '/' && <NavBar /> }

      <Routes>
        <Route path='' element={ <Landing /> } />
        <Route path='home' element={ <Home /> } />
        <Route path='detail/:idPokemon' element={ <Detail /> } />
        <Route path='create' element={ <Form /> } />
      </Routes>
    </div>
  );
}


export default App;
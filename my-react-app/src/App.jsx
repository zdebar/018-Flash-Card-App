import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Card from "./components/Card";
import User from './components/User';
import Library from './components/Library';


function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Card src="jedna" trg="uno" prn="uno" />} />
        <Route path="/library" element={<Library />} />
        <Route path="/user" element={<User />} /> 
      </Routes>
    </div>
  );
}

export default App;

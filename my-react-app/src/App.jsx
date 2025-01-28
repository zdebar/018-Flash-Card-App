import './App.css';
import Header from './components/Header';
import CardSrc from "./components/CardSrc";


function App() {
  return (
    <div className="app">
      <Header />
      <CardSrc 
        src="jedna" 
        trg="uno"
        prn="uno"
      />
    </div>
  );
}

export default App;

import './App.css';
import Header from './components/Header';
import CardSrc from "./components/CardSrc";
import ChoiceBar from './components/ChoiceBar';

function App() {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <CardSrc 
          src="jedna" 
          trg="uno"
          prn="uno"
        />
      </main>
      <ChoiceBar />
    </div>
  );
}

export default App;

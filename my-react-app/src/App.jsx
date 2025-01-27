import './App.css';
import Header from './components/Header';
import CardSrc from "./components/CardSrc";

function App() {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <CardSrc 
          word="Hallo" 
          pronunciation="HA-lo"
        />
      </main>
      <footer className="footer">
        <p>&copy; 2025 Flashcard App</p>
      </footer>
    </div>
  );
}

export default App;

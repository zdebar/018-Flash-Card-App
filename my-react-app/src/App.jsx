import './App.css';
import Header from './components/Header';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="app-main">
        <p>Welcome to your flashcard app! Start learning by selecting a lesson.</p>
      </main>
      <footer className="app-footer">
        <p>&copy; 2025 Flashcard App</p>
      </footer>
    </div>
  );
}

export default App;

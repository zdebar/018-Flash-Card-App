import './Header.css'; // optional, for specific header styles

function Header() {
  return (
    <header className="app-header">
      <h1>Flashcard App</h1>
      <nav>
        <button>Home</button>
        <button>Lessons</button>
        <button>Scores</button>
      </nav>
    </header>
  );
}

export default Header;
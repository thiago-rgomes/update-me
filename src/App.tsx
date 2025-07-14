import "./App.css";
import Home from "./pages/Home";
import mainBackground from "./assets/dark-bg.png";

function App() {
  return (
    <main
      className="flex min-h-screen bg-cover bg-center text-white px-8 py-8"
      style={{ backgroundImage: `url(${mainBackground})` }}
    >
      <Home />
    </main>
  );
}

export default App;

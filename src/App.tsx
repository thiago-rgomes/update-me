import "./App.css";
import Home from "./pages/Home";
import mainBackground from "./assets/main-bg.jpg";

function App() {
  return (
    <main
      className="min-h-screen bg-cover bg-center text-white px-4 py-8"
      style={{ backgroundImage: `url(${mainBackground})` }}
    >
      <Home />
    </main>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
function App() {
  const [IsAuth, setIsAuth] = useState(localStorage.getItem("IsAuth"));

  const singUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };
  return (
    <div className="app-mian">
      <Router>
        <nav className="nav-main">
          <Link to="/">Home</Link>

          {!IsAuth ? (
            <Link to="/login">Login</Link>
          ) : (
            <>
              <Link to="/createpost">Create Post</Link>
              <button onClick={singUserOut}>Log Out</button>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home IsAuth={IsAuth} />} />
          <Route path="/createpost" element={<CreatePost IsAuth={IsAuth} />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

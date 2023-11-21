import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
function App() {
  const [IsAuth, setIsAuth] = useState(localStorage.getItem('IsAuth'));

  const singUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = '/login';
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
              <button
                onClick={singUserOut}
                style={{ padding: '7px', borderRadius: '5px', border: 'none' }}
              >
                Log Out
              </button>
              {auth.currentUser && auth.currentUser.photoURL && (
                <img
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '300px',
                  }}
                  src={auth.currentUser.photoURL}
                  alt="User Profile"
                />
              )}
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

// import './App.css';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link,
//   useNavigate,
// } from 'react-router-dom';
// import Home from './pages/Home';
// import CreatePost from './pages/CreatePost';
// import Login from './pages/Login';
// import { useState } from 'react';
// import { signOut } from 'firebase/auth';
// import { auth } from './firebase-config';

// function App() {
//   const [IsAuth, setIsAuth] = useState(
//     localStorage.getItem('IsAuth') === 'true'
//   );
//   const navigate = useNavigate();

//   const singUserOut = () => {
//     signOut(auth).then(() => {
//       localStorage.clear();
//       setIsAuth(false);
//       navigate('/login');
//     });
//   };

//   return (
//     <div className="appMain">
//       <Router>
//         <nav className="navMain">
//           <Link to="/">Home</Link>

//           {!IsAuth ? (
//             <Link to="/login">Login</Link>
//           ) : (
//             <>
//               <Link to="/createpost">Create Post</Link>
//               <button
//                 onClick={singUserOut}
//                 style={{ padding: '7px', borderRadius: '5px', border: 'none' }}
//               >
//                 Log Out
//               </button>
//               {auth.currentUser && auth.currentUser.photoURL && (
//                 <img
//                   style={{
//                     width: '50px',
//                     height: '50px',
//                     borderRadius: '50%',
//                   }}
//                   src={auth.currentUser.photoURL}
//                   alt="User Profile"
//                 />
//               )}
//             </>
//           )}
//         </nav>
//         <Routes>
//           <Route path="/" element={<Home IsAuth={IsAuth} />} />
//           <Route path="/createpost" element={<CreatePost IsAuth={IsAuth} />} />
//           <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

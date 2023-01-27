import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import MovieList from "../pages/MovieList";
import NewMovie from "../pages/NewMovie";
import UserList from "../pages/UserList";
import EditMovie from "../pages/EditMovie";
import DeleteMovie from "../Components/DeleteMovie";

function App(){
  const [updatedMovies, setUpdatedMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [currentMovieID, setCurrentMovieID] = useState({
    title:"",
    date_release:"",
    image_url:""
  })
   //const [movie, setMovie] = useState({movieid: 0})

   useEffect(() => {
        fetch("/movies")
            .then((r) => r.json())
            .then(data =>{
                console.log(data)
                setMovies(data)
            });
    }, []);



function onUpdateMovie(m){
    const updatedMovies = movies.map((ogMovie) => {
      if (ogMovie.id === m.id) {
        return updatedMovies;
      } else {
        return ogMovie;
      }
    });
    setUpdatedMovies(m)
  }



  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route exact path="/new">
            <NewMovie user={user} />
          </Route>
          <Route exact path="/users">
            <UserList />
          </Route>
          <Route exact path="/">
            <MovieList setCurrentMovieID ={ setCurrentMovieID }/>
          </Route>
          <Route exact path="/movies/:id/edit">
            <EditMovie user={user} />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;




// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// import React, { useEffect, useState } from "react";

// function DeleteMovie() {
//     const [amovie, setaMovie] = useState([]);

//     useEffect(() => {
//         fetch("/movies")
//             .then((r) => r.json())
//             .then(setaMovie);
//     }, []);

//     function handleDelete(id) {
//         fetch(`/movies/${id}`, {
//             method: "DELETE",
//         }).then((r) => {
//             if (r.ok) {
//                 setaMovie((amovie) =>
//                     amovie.filter((movie) => movie.id !== id)
//                 );
//             }
//         });
//     }

//     return (
//         <section className="container">
//             {amovie.map((movie) => (
//                 <div key={movie.id} className="card">
//                     <button onClick={() => handleDelete(movie.id)}>Delete</button>
//                 </div>
//             ))}
//         </section>
//     );
// }

// export default DeleteMovie;
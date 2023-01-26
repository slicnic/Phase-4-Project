import { useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import DeleteMovie from "../Components/DeleteMovie";

function MovieList() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("/movies")
            .then((r) => r.json())
            .then(data =>{
                console.log(data)
                setMovies(data)
            });
    }, []);

    function handleDelete(id) {
        console.log(id)
        fetch(`/movies/${id}`, {
            method: "DELETE",
        }).then((r) => {
            if (r.ok) {
                setMovies((amovie) =>
                    amovie.filter((movie) => movie.id !== id)
                );
            }
        });
    }

    return (
        <Wrapper>
            {movies.length > 0 ? (
                movies.map((movie) => (
                    // console.log(movie)
                    <Movie key={movie.id}>
                        <Box>
                            
                            

                            <h2>{movie.title}</h2>
                            <p>
                                <cite>Uploaded By {movie.user.username}</cite>
                            </p>
                            <p>
                                <img src={movie.image_url}></img>
                            </p>
                            
                            <p>Top Reviews</p>

                            {movie.reviews.length > 0 ? (
                                movie.reviews.map((review) => (
                                    <p>{review.content}</p>
                                    
                                )) 
                            ) : (
                                <>
                                        <p> <cite>No Reviews Found</cite></p>
                                </>
                            )}  <>
                                <Button variant="outline" 
                                    onClick={() => handleDelete(movie.id)}
                                >
                                    Delete
                                </Button>
                            </>
                        </Box>
                    </Movie>
                ))
            ) : (
                <>
                    <h2>No Movies Found</h2>
                    <Button as={Link} to="/new">
                        Make a New Movie
                    </Button>
                </>
            )}
        </Wrapper>
    );
}



const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Movie = styled.article`
  margin-bottom: 24px;
`;

export default MovieList;


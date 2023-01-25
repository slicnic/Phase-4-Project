import { useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

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

    return (
        <Wrapper>
            {movies.length > 0 ? (
                movies.map((movie) => (
                    <Movie key={movie.id}>
                        <Box>
                            <h2>{movie.title}</h2>
                            <p>
                                {/* <em>Time to Complete: {recipe.minutes_to_complete} minutes</em>
                                &nbsp;·&nbsp; */}
                                <cite>By {movie.user.username}</cite>
                            </p>
                            {/* <ReactMarkdown>{movie.user.name}</ReactMarkdown> */}
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

import { useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function UserList() {
    const [ausers, setaUsers] = useState([]);
    console.log(ausers)
    useEffect(() => {
        fetch("/users")
            .then((r) => r.json())
            .then(data =>{
                console.log(data)
                setaUsers(data)
                console.log(ausers)
            });
    }, []);

    return (
        <Wrapper>
            <h3>Current User Count {ausers.length}</h3>

            {ausers.length > 0 ? (
                ausers.map((auser) => (
                    <p>{auser.username}</p>
                ))
            ) : (
                <>
                    <h2>No Users Found</h2>
                    <Button as={Link} to="/">
                        Home
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

export default UserList;

import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
// import ReactMarkdown from "react-markdown";
import { Box, Button, Error, FormField, Input, Label, Textarea } from "../styles";

function Review({ user }) {
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0);
    const { id } = useParams();


    // const [dateReleased, setDateReleased] = useState("Date");
    // const [imageUrl, setImageUrl] = useState("image_url");
    // const [review, setReview] = useState("review")

    const [Errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    console.log(user)

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch("/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content,
                rating,
                user_id: user.id,
                movie_id: id
            }),
        }).then((r) => {
            setIsLoading(false);
            if (r.ok) {
                history.push("/");
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    return (
        <Wrapper>
            <WrapperChild>
                <h2>Create review</h2>
                <form onSubmit={handleSubmit}>
                    <FormField>
                        <Label htmlFor="Content">Content</Label>
                        <Input
                            type="Content"
                            id="Content"
                            placeholder="Please add your review here"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </FormField>
                    <FormField>
                        <Label htmlFor="rating">Rating</Label>
                        <Input
                            type="number"
                            id="rating"
                            placeholder="please add a rating one to five!"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        />
                    </FormField>
                    <FormField>
                        <Button color="primary" type="submit">
                            Submit Movie
                        </Button>
                    </FormField>
                </form>
            </WrapperChild>
           </Wrapper>
    );
}

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

export default Review;

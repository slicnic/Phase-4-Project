import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
// import ReactMarkdown from "react-markdown";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";

function NewMovie({ user }) {
    const [title, setTitle] = useState("Movie Title");
    const [dateReleased, setDateReleased] = useState("Date");
    const [imageUrl, setImageUrl] = useState("image_url");
    const [review, setReview] = useState("review")

    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    console.log(user)

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch("/movies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                date_released: dateReleased,
                image_url: imageUrl,
                review: review,
                user_id: user.id
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
                <h2>Create Movie</h2>
                <form onSubmit={handleSubmit}>
                    <FormField>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </FormField>
                    <FormField>
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input
                            type="string"
                            id="imageUrl"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </FormField>
                    <FormField>
                        <Label htmlFor="dateReleased">Date Released</Label>
                        <Textarea
                            id="dateReleased"
                            value={dateReleased}
                            onChange={(e) => setDateReleased(e.target.value)}
                        />
                    </FormField>
                    <FormField>
                        <Label htmlFor="review">Leave a Review</Label>
                        <Textarea
                            type="string"
                            id="review"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            //setFormData(formData => ({... formData, [name]:value}))
                        />
                    </FormField>
                    <FormField>
                        <Label htmlFor="user">User ID</Label>
                        <Input
                            id="userID"
                            value={user.id}
                            // onChange={(e) => setDateReleased(e.target.value)}
                        />
                    </FormField>
                    <FormField>
                        <Button color="primary" type="submit">
                            {isLoading ? "Loading..." : "Submit Movie"}
                        </Button>
                    </FormField>
                    <FormField>
                        {errors.map((err) => (
                            <Error key={err}>{err}</Error>
                        ))}
                    </FormField>
                </form>
            </WrapperChild>
            {/* <WrapperChild>
                <h1>{title}</h1>
                <p>
                    <em>Time to Complete: {minutesToComplete} minutes</em>
                    &nbsp;·&nbsp;
                    <cite>By {user.username}</cite>
                </p>
                <ReactMarkdown>{instructions}</ReactMarkdown>
            </WrapperChild> */}
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

export default NewMovie;

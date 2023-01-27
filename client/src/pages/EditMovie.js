import { useState, useEffect } from "react";
import { useHistory , useParams} from "react-router";
import styled from "styled-components";
// import ReactMarkdown from "react-markdown";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";

const EditMovie = ({ onUpdateMovie}) => {

    const initialState = {
      title: "",
      date_released: "",
      image_url: ""
    };
    const [formData, setFormData] = useState(initialState);
    const [movie, setMovie] = useState({});
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [title, setTitle] = useState('')
    const [date_release, setDateRelease] = useState('')
    const [image_url, setImageUrl] = useState('')


      const { id } = useParams();
      const history = useHistory();

     useEffect(() => {
      fetch(`/movies/${id}`)
      .then((r) => r.json())
      .then((movie) => {
        console.log(movie)
        setFormData(movie)
        setTitle(movie.title)
        setDateRelease(movie.date_released)
        setImageUrl(movie.image_url)
      }
      )
    }, [id])

      const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(formData => ({... formData, [name]:value}))
    }



    function handleSubmit(e) {
        e.preventDefault();
        console.log("test")
        setIsLoading(true);
        fetch(`/movies/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                date_released: date_release,
                image_url: image_url,
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
                        <label htmlFor="title">Title</label>
                        <Input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </FormField>
                    <FormField>
                        <label htmlFor="imageUrl">Image URL</label>
                        <Input
                            type="string"
                            id="imageUrl"
                            value={image_url}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </FormField>
                    <FormField>
                        <label htmlFor="dateReleased">Date Released</label>
                        <Textarea
                            id="dateReleased"
                            value={date_release}
                            onChange={(e) => setDateRelease(e.target.value)}
                        />
                    </FormField>
                    {/* <FormField>
                        <label htmlFor="user">User ID</label>
                        <Input
                            id="userID"
                            value={user.id}
                            // onChange={(e) => setDateReleased(e.target.value)}
                        />
                    </FormField> */}
                    <FormField>
                        <Button color="primary" type="submit">
                            {isLoading ? "Loading..." : "Submit Movie"}
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

export default EditMovie;

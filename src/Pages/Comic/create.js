import { useState, useEffect } from "react";
import { Button, Paper, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import settings from "../../settings";
import GenerateForm from "../../Components/GenerateForm";
export default function CreateComic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [created, setCreated] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageID, setImageID] = useState("");
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = await getAccessTokenSilently({
      issuerBaseURL: "https://dev-7wje8o2ffd0q20mn.us.auth0.com",
      audience: `https://dev-7wje8o2ffd0q20mn.us.auth0.com/api/v2/`,
    });
    try {
      const response = await fetch(settings.BACKEND + "/comic/create-comic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          description,
          imageID,
        }),
      });
      const data = await response.text();
      setCreated(true);
    } catch (error) {
      console.error(error);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (created) {
      navigate("/mycomics");
    }
  }, [created]);
  return (
    <div style={{ padding: 10, margin: 5 }}>
      <h3>Create Comic</h3>
      <Paper sx={{ padding: 5 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            sx={{ marginBottom: 5 }}
          />
          <br />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            fullWidth
            multiline
            rows={4}
            sx={{ marginBottom: 5 }}
          />
          <br />
          <GenerateForm
            onSuccess={(data) => {
              setImages(data.images);
              setImageID(data.imageIDs[0]);
              setLoading(false);
            }}
            onClick={() => {
              console.log("test");
              setLoading(true);
            }}
          />
          <br />
          {loading ? (
            <p>Loading...</p>
          ) : (
            images.map((image) => <img src={image}></img>)
          )}
          <Button type="submit">Create Manga</Button>
        </form>
      </Paper>
    </div>
  );
}

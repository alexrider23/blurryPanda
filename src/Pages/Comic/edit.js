import { useEffect, useState } from "react";
import { Button, Paper, TextField } from "@mui/material";
import { useLocation } from "react-router-dom";
import settings from "../../settings";
import { useAuth0 } from "@auth0/auth0-react";
export default function EditComic(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const comicId = queryParams.get("id");
  const [token, setToken] = useState("");
  useEffect(() => {
    getAccessTokenSilently({
      issuerBaseURL: "https://dev-7wje8o2ffd0q20mn.us.auth0.com",
      audience: `https://dev-7wje8o2ffd0q20mn.us.auth0.com/api/v2/`,
    }).then((token) => {
      setToken(token);
      try {
        fetch(settings.BACKEND + "/comic/view?comic_id=" + comicId, {
          credentials: "include",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setTitle(data.name);
            setDescription(data.description);
          });
      } catch (error) {
        console.error(error);
      }
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (token == "" || !isAuthenticated || !user) {
      alert("User is not authenticated or token is not available yet.");
      return;
    }
    try {
      const response = await fetch(settings.BACKEND + "/comic/update-comic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          comic_id: comicId,
          title,
          description,
        }),
      });
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

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
          <Button type="submit">Update comic</Button>
        </form>
      </Paper>
    </div>
  );
}

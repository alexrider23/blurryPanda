import {
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  MenuItem,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { useDropzone } from "react-dropzone";

import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import settings from "../../settings";

function RatioButtons(props) {
  let { setHeight, setWidth, width, height } = props;
  let options = [
    { name: "1:1", height: 512, width: 512 },
    { name: "2:3", height: 1024, width: 512 },
    { name: "3:2", height: 512, width: 1024 },
  ];
  return (
    <>
      {options.map((option) => (
        <Button
          style={{
            border:
              "1px dotted " +
              (height == option.height && width == option.width
                ? "blue"
                : "black"),
            color: "black",
            backgroundColor: "white",
            marginRight: 5,
          }}
          onClick={() => {
            setHeight(option.height);
            setWidth(option.width);
          }}
        >
          {option.name}
        </Button>
      ))}
    </>
  );
}
export default function GenerateForm(props) {
  const [prompt, setPrompt] = useState("");
  const [negative, setNegative] = useState("");
  const [model, setModel] = useState("");
  const [models, setModels] = useState([]);
  const [style, setStyle] = useState("");
  const [height, setHeight] = useState(512);
  const [width, setWidth] = useState(512);
  const [loading, setLoading] = useState(false);
  const [highPriority, setHighPriority] = useState(false);
  //Called when the image is generated or uploaded
  const onSuccess = props.onSuccess;
  //Called when the submit button is clicked
  const onClick = props.onClick;
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [uploadedImage, setUploadedImage] = useState(null);
  //For processing uploaded images
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      onClick();
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onloadend = async () => {
        setUploadedImage(reader.result);

        const token = await getAccessTokenSilently({
          issuerBaseURL: "https://dev-7wje8o2ffd0q20mn.us.auth0.com",
          audience: `https://dev-7wje8o2ffd0q20mn.us.auth0.com/api/v2/`,
        });

        let data = await fetch(settings.BACKEND + "/generation/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            image: reader.result,
            width: width,
            height: height,
          }),
        });
        data = await data.json();
        let response = await fetch(
          settings.BACKEND + "/generation/status?image=" + data.imageID,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        response = await response.json();
        if (response.success) {
          onSuccess({
            images: response.images.map((image) => image),
            imageIDs: data.imageID,
          });
        } else {
          console.error("Failed to generate image", response.error);
        }
      };
      reader.readAsDataURL(file);
    },
  });

  useEffect(() => {
    fetch(settings.BACKEND + "/generation/models")
      .then((response) => response.json())
      .then((data) => setModels(data.models));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = await getAccessTokenSilently({
      issuerBaseURL: "https://dev-7wje8o2ffd0q20mn.us.auth0.com",
      audience: `https://dev-7wje8o2ffd0q20mn.us.auth0.com/api/v2/`,
    });
    setLoading(true);
    onClick();
    try {
      const response = await fetch(settings.BACKEND + "/generation/txt2img", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          prompt,
          model,
          //style,
          height,
          width,
          //highPriority,
        }),
      });

      const data = await response.json();
      if (data.success) {
        // redirect to the generated image
        let response = await fetch(
          settings.BACKEND + "/generation/status?image=" + data.imageID[0],
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        response = await response.json();
        if (response.success) {
          onSuccess({
            images: response.images.map((image) => image),
            imageIDs: data.imageID,
          });
        } else {
          console.error("Failed to generate image", response.error);
        }
        // } else {
        //   if (response.status === 429) {
        //     alert("You have reached your daily image generation limit. Please try again tomorrow.");
        //   } else {
        //     console.warn("Failed to generate image");
        //   }
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <Paper style={{ padding: 25, background: "#121212" }}>
      <form onSubmit={handleSubmit}>
        <h3 style={{ color: "white" }}>Enter your prompt</h3>
        <TextField
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
          multiline
          fullWidth
          rows={4}
          style={{ backgroundColor: "#232323" }}
          InputProps={{
            style: {
              color: "white",
            },
          }}
        />

        <h3 style={{ color: "white" }}>Upload an image</h3>
        <div
          {...getRootProps()}
          style={{
            border: "2px dashed white",
            padding: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the image here ...</p>
          ) : (
            <p>Drag or choose an image to upload</p>
          )}
        </div>

        <h3 style={{ color: "white" }}>Choose your model</h3>
        <div
          style={{
            height: "360px",
            display: "flex",
            overflowX: "auto",
            flexWrap: "nowrap",
          }}
        >
          <ImageList
            cols={4}
            style={{
              flexWrap: "nowrap",
              transform: "translateZ(0)",
              cursor: "pointer",
            }}
          >
            {models.map((m, index) => (
              <ImageListItem
                key={index}
                onClick={() => setModel(m.owner + "/" + m.name + ":" + m.id)}
              >
                <img
                  src={m.image}
                  alt={m.name}
                  style={
                    model === m.owner + "/" + m.name + ":" + m.id
                      ? { filter: "brightness(50%)" }
                      : {}
                  }
                />
                <ImageListItemBar
                  title={m.name}
                  subtitle={<span>{m.description}</span>}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
        <h3 style={{ color: "white" }}>Choose your Style</h3>
        <FormControl fullWidth>
          <InputLabel id="style" style={{ color: "white" }}>
            Style
          </InputLabel>
          <Select
            labelId="style"
            label="style"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            style={{ backgroundColor: "#232323", color: "white" }}
          >
            <MenuItem value="Style 1">Style 1</MenuItem>
            <MenuItem value="Style 2">Style 2</MenuItem>
            <MenuItem value="Style 3">Style 3</MenuItem>
          </Select>
        </FormControl>
        <h3 style={{ color: "white" }}>Output settings</h3>
        <div style={{ display: "flex" }}>
          <div style={{ color: "white" }}>
            Ratio
            <br />
            <RatioButtons
              height={height}
              width={width}
              setHeight={setHeight}
              setWidth={setWidth}
            />
            <br />
          </div>
        </div>
        <h3 style={{ color: "white" }}>Enter Negative</h3>
        <TextField
          value={negative}
          onChange={(e) => setNegative(e.target.value)}
          multiline
          fullWidth
          rows={4}
          style={{ backgroundColor: "#232323" }}
          InputProps={{
            style: {
              color: "white",
            },
          }}
        />
        <br />
        <Button onClick={handleSubmit} disabled={loading}>
          Submit
        </Button>
      </form>
    </Paper>
  );
}

import Painterro from "painterro";
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Paper, TextField, Button } from "@mui/material";
import settings from "../../settings";
import { useAuth0 } from "@auth0/auth0-react";

export function GeneratedImageWithDraggableDialogue({ images, draggable }) {
  const canvasRef = useRef(null);
  const [size, setSize] = useState(100);

  const [dragging, setDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [textPosition, setTextPosition] = useState({ x: 100, y: 100 });
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    images.forEach((imageSrc, index) => {
      const image = new Image();

      image.crossOrigin = "anonymous";
      image.src = imageSrc;
      image.onload = () => {
        context.drawImage(
          image,
          (index * canvas.width) / images.length,
          0,
          canvas.width / images.length,
          canvas.height
        );
        if (draggable) {
          let scale = size / 100;
          context.drawImage(
            draggable,
            textPosition.x,
            textPosition.y,
            draggable.width * scale,
            draggable.height * scale
          );
        }
      };
    });
  }, [images, draggable, size, textPosition]);

  const handleMouseDown = (e) => {
    setStartPosition({
      x: e.clientX - textPosition.x,
      y: e.clientY - textPosition.y,
    });
    setDragging(true);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      let newX = e.clientX - startPosition.x;
      let newY = e.clientY - startPosition.y;
      if (newX < 10) newX = 10;
      if (newY < 10) newY = 10;
      let maxWidth = canvasRef.current.width - draggable.width;
      let maxHeight = canvasRef.current.height - draggable.height;
      if (newX > maxWidth) newX = maxWidth;
      if (newY > maxHeight) newY = maxHeight;
      setTextPosition({
        x: newX,
        y: newY,
      });
    }
  };

  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const handleSave = async () => {
    const token = await getAccessTokenSilently({
      issuerBaseURL: "https://dev-7wje8o2ffd0q20mn.us.auth0.com",
      audience: `https://dev-7wje8o2ffd0q20mn.us.auth0.com/api/v2/`,
    });
    const canvas = canvasRef.current;
    const base64image = canvas
      .toDataURL("image/png")
      .replace(/^data:image\/(png|jpg);base64,/, "");
    //Get image as base64

    await fetch(settings.BACKEND + "/generation/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        image: base64image,
        width: 512,
        height: 512,
      }),
    });
  };
  return (
    <Paper style={{ flex: 1, padding: 10, margin: 10 }}>
      <h3>Generated Image</h3>
      <canvas
        ref={canvasRef}
        width={512}
        height={512}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      />
      <br />
      Size:
      <input
        type="range"
        min="50"
        max="300"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      />
      <Button onClick={handleSave}>Save</Button>
    </Paper>
  );
}

export default function Dialogue() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const comicId = queryParams.get("id");
  const page = queryParams.get("page");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // ...
  //Fetch the page data
  useEffect(() => {
    fetch(
      settings.BACKEND +
        "/page/view" +
        "?comic_id=" +
        comicId +
        "&page=" +
        page,
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
      });
  }, []);

  const [text, setText] = useState("");
  const canvasRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [textPosition, setTextPosition] = useState({ x: 100, y: 100 });
  const [fontSize, setFontSize] = useState(50);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const image = new Image();
    image.src = "/dialog1.svg";
    image.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      context.font = fontSize + "px Arial";
      context.fillText(text, textPosition.x, textPosition.y);
    };
  }, [text, textPosition, fontSize]);

  function useImage() {
    const canvas = canvasRef.current;
    const img = new Image();
    img.src = canvas.toDataURL("image/png");
    img.crossOrigin = "anonymous";
    img.width = 140;
    img.height = 100;
    setDraggableImage(img);
  }
  const handleMouseDown = (e) => {
    setStartPosition({
      x: e.clientX - textPosition.x,
      y: e.clientY - textPosition.y,
    });
    setDragging(true);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      let newX = e.clientX - startPosition.x;
      let newY = e.clientY - startPosition.y;
      if (newX < 100) newX = 100;
      if (newY < 100) newY = 100;
      if (newX > 600) newX = 600;
      if (newY > 500) newY = 500;
      setTextPosition({
        x: newX,
        y: newY,
      });
    }
  };

  const [draggableImage, setDraggableImage] = useState(null);
  return (
    <div
      style={{ display: "flex", padding: 10, paddingTop: 20, width: "100%" }}
    >
      <Paper style={{ flex: 1, padding: 10, margin: 10 }}>
        <GeneratedImageWithDraggableDialogue
          images={images}
          draggable={draggableImage}
        />
      </Paper>
      <Paper style={{ flex: 1, padding: 10, margin: 10 }}>
        <b>Enter Dialogue:</b>
        <TextField
          multiline
          rows={4}
          variant="outlined"
          onChange={(e) => setText(e.target.value)}
          style={{ width: "100%" }}
        />
        <br /> Font Size:{" "}
        <input
          type="range"
          min="50"
          max="200"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
        />
        <b>Select Dialogue Bubble</b>
        <br />
        <div style={{ display: "flex" }}>
          <Paper
            style={{
              border: selectedImage === 1 ? "2px solid blue" : "none",
              padding: "10px",
              margin: "10px",
            }}
          >
            <img src="/dialog1.svg" onClick={() => setSelectedImage(1)} />
          </Paper>
          <Paper
            style={{
              border: selectedImage === 2 ? "2px solid blue" : "none",
              padding: "10px",
              margin: "10px",
            }}
          >
            <img src="/dialogue.png" onClick={() => setSelectedImage(2)} />
          </Paper>
          <Paper
            style={{
              border: selectedImage === 3 ? "2px solid blue" : "none",
              padding: "10px",
              margin: "10px",
            }}
          >
            <img src="/dialogue.png" onClick={() => setSelectedImage(3)} />
          </Paper>

          <Paper
            style={{
              border: selectedImage === 3 ? "2px solid blue" : "none",
              padding: "10px",
              margin: "10px",
            }}
          >
            <img src="/dialogue.png" onClick={() => setSelectedImage(3)} />
          </Paper>
        </div>
        <br /> Click to drag Text
        <br />
        <canvas
          ref={canvasRef}
          width={600}
          height={500}
          onClick={() => setSelectedImage(1)}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        />
        <Button onClick={useImage}>Use Dialog</Button>
      </Paper>
    </div>
  );
}

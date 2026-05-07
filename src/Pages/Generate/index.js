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
  Grid,
} from "@mui/material";

import React, { useState, useEffect } from "react";
import settings from "../../settings";
import GenerateForm from "../../Components/GenerateForm";

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
export default function Generate(props) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  return (
    <div style={{ margin: "50px" }}>
      <Grid container>
        <Grid item xs={6}>
          <Paper style={{ 
            marginTop: "50px", 
            padding: 20, 
            height: '100vh', 
            marginRight: '50px',
            backgroundColor: '#121212' 
            }}
          >
            {loading ? (
              <p>Loading...</p>
            ) : (
              images.map((image) => <img src={image}></img>)
            )}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <GenerateForm
            onSuccess={(data) => {
              setImages(data.images);
              setLoading(false);
            }}
            onClick={() => {
              setLoading(true);
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Button, Paper, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import settings from "../../settings";
import { useLocation } from "react-router-dom";
import GenerateForm from "../../Components/GenerateForm";
export default function ViewPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const comicId = queryParams.get("id");
  const page = queryParams.get("page");
  const [images, setImages] = useState([]);
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
        console.log(data);
        setImages(data);
      });
  }, []);

  return (
    <>
      {images.map((image) => (
        <>
          <img src={image} />
        </>
      ))}
    </>
  );
}

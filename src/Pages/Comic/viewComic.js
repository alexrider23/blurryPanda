import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import settings from "../../settings";
import { useAuth0 } from "@auth0/auth0-react";

function ViewComic() {
  const [pages, setPages] = useState(0);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const comicId = queryParams.get("id");

  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    fetch(settings.BACKEND + "/comic/info?comic_id=" + comicId)
      .then((response) => response.json())
      .then((data) => setPages(data.pages))
      .catch((error) => console.error(error));
  }, []);
  let pageElements = [];
  for (let i = 1; i <= pages; i++) {
    pageElements.push(
      <>
        <a href={"viewPage?id=" + encodeURIComponent(comicId) + "&page=" + i}>
          View Page {i}
        </a>
        <a href={"dialogue?id=" + encodeURIComponent(comicId) + "&page=" + i}>
          Add Dialogue {i}
        </a>
        <button onClick={() => DeletePage(comicId, i)}>Delete</button>
      </>
    );
  }

  function DeletePage(comicId, page) {
    getAccessTokenSilently({
      issuerBaseURL: "https://dev-7wje8o2ffd0q20mn.us.auth0.com",
      audience: `https://dev-7wje8o2ffd0q20mn.us.auth0.com/api/v2/`,
    }).then((token) => {
      fetch(settings.BACKEND + "/page/delete", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
        body: JSON.stringify({ comic_id: comicId, page }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    });
  }

  return (
    <div>
      <h1>Comic Pages</h1>
      {pages.length === 0 && <p>No pages found</p>}
      {pageElements}
    </div>
  );
}

export default ViewComic;

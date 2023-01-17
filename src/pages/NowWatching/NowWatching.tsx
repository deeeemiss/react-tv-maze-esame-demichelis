import { Button, FormControl, Grid, InputBase, Paper } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { getShowsBySearch, Show } from "../../api";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./NowWatching.css";
import Card from "../../components/Card/Card";
import { CurrentUserConsumer } from "../../context/UserContext";
import useWatching from "../../hooks/useWatching";

const NowWatching = () => {
  const navigate = useNavigate();
  const { currentUser } = CurrentUserConsumer();
  const showsWatch = useWatching(currentUser?.uid);

  return (
    <>
      <Link to={"/dashboard"}>
        <button className="button">Profile</button>
      </Link>
      <Link to={"/favourites"}>
        <button className="button">Favourites</button>
      </Link>
      <button onClick={() => navigate(-1)} className="button_goback">
        Go Back
      </button>
      <Grid container justifyContent="center" alignItems="center">
        <h1>Now Watching</h1>
        <Grid item style={{ padding: "2em" }} sm={8}>
          {showsWatch &&
            Object.keys(showsWatch).map((key) => (
              <Card show={showsWatch[key]} key={key} />
            ))}
        </Grid>
      </Grid>
    </>
  );
};

export default NowWatching;

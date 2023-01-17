import { Button, FormControl, Grid, InputBase, Paper } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getShowsBySearch, Show } from "../../api";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./Favourites.css";
import Card from "../../components/Card/Card";
import { auth, user } from "../../firebase/firebase";
import { CurrentUserConsumer } from "../../context/UserContext";
import useFavorite from "../../hooks/useFavorite";

const Favourites = () => {
  const navigate = useNavigate();
  const { currentUser } = CurrentUserConsumer();
  const showsFav = useFavorite(currentUser?.uid);

  return (
    <>
      <Link to={"/dashboard"}>
        <button className="button">Profile</button>
      </Link>
      <button onClick={() => navigate(-1)} className="button_goback">
        Go Back
      </button>
      <Link to={"/watching"}>
        <button className="button">Now Watching</button>
      </Link>
      <Grid container justifyContent="center" alignItems="center">
        <h1>Favourites</h1>
        <Grid item style={{ padding: "2em" }} sm={8}>
          {showsFav &&
            Object.keys(showsFav).map((key, index) => (
              <Card show={showsFav[key]} key={index} />
            ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Favourites;

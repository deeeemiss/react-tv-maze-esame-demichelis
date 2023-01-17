import { Button, FormControl, Grid, InputBase, Paper } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getShowsBySearch, ShowType } from "../../api";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./Favourites.css";
import Card from "../../components/Card/Card";
import { getUserFavorites } from "../../db/db";
import { auth, user } from "../../firebase";

const Favourites = () => {
  const navigate = useNavigate();
  const [shows, setShows] = useState<ShowType[]>([]);
  const [user] = useAuthState(auth);

  //add the handleFavourites function here and pass it to the Card component
  console.log(getUserFavorites(user?.uid!));

  useEffect(() => {
    getUserFavorites(user?.uid!);
  }, []);

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
          {shows.map((el) => (
            <Card show={el} key={el.id} />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Favourites;

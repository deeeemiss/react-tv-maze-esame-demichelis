import { Button, FormControl, Grid, InputBase, Paper } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { getShowsBySearch, ShowType } from "../../api";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./NowWatching.css";
import Card from "../../components/Card/Card";

const NowWatching = () => {
  const navigate = useNavigate();
  const [shows, setShows] = useState<ShowType[]>([]);

  //add the handleFavourites function here and pass it to the Card component

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
          {shows.map((el) => (
            <Card show={el} key={el.id} />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default NowWatching;

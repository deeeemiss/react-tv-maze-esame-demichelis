import { Button, CardContent, Typography, CardMedia } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Interweave } from "interweave";
import {
  addFavourite,
  addToWatch,
  removeFavourite,
  removeFromWatch,
} from "../../db/db";
import "./Card.css";
import {
  AddToQueue,
  Favorite,
  FavoriteBorder,
  RemoveFromQueueTwoTone,
} from "@mui/icons-material";
import { CurrentUserConsumer, UserContext } from "../../context/UserContext";
import useFavouriteCheck from "../../hooks/useFavoriteCheck";
import { ShowFav } from "../../models/show";
import useWatchingCheck from "../../hooks/useWatchingCheck";

export const Card = (props: any) => {
  const { currentUser } = CurrentUserConsumer();
  const favorite = useFavouriteCheck(props.show.id);
  const watching = useWatchingCheck(props.show.id);

  const handleFavorite = (show: ShowFav) => {
    console.log(favorite);
    console.log(props.show.id);
    if (favorite === false) {
      addFavourite(show, currentUser!.uid);
    } else {
      removeFavourite(show, currentUser!.uid);
    }
  };

  const handleWatching = (show: ShowFav) => {
    console.log(watching);
    console.log(props.show.id);
    if (watching === false) {
      removeFromWatch(currentUser!.uid);
      addToWatch(show, currentUser!.uid);
    } else {
      removeFromWatch(currentUser!.uid);
    }
  };

  return (
    <div className="card">
      <CardMedia
        component="img"
        image={props.show.image}
        alt={props.show.name}
        className="imgCard"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {props.show.name}{" "}
          <span className="language">{props.show.language}</span>
        </Typography>
        <Typography variant="body2" component={"div"}>
          <Interweave content={props.show.summary?.substring(0, 100) + "..."} />
        </Typography>
        <Button
          style={{
            marginLeft: "-0.5em",
            marginTop: "1.5em",
            marginBottom: "-1em",
            boxShadow:
              "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
          }}
        >
          <Link to={"/search/" + props.show.id}>Read more</Link>
        </Button>
        <Button
          style={{
            marginLeft: "1em",
            marginTop: "1.5em",
            marginBottom: "-1em",
            boxShadow:
              "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
          }}
        >
          {favorite ? (
            <Favorite onClick={() => handleFavorite(props.show)}></Favorite>
          ) : (
            <FavoriteBorder
              onClick={() => handleFavorite(props.show)}
            ></FavoriteBorder>
          )}
        </Button>
        <Button
          style={{
            marginLeft: "1em",
            marginTop: "1.5em",
            marginBottom: "-1em",
            boxShadow:
              "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
          }}
        >
          {watching ? (
            <RemoveFromQueueTwoTone
              onClick={() => handleWatching(props.show)}
            ></RemoveFromQueueTwoTone>
          ) : (
            <AddToQueue onClick={() => handleWatching(props.show)}></AddToQueue>
          )}
        </Button>
      </CardContent>
    </div>
  );
};

export default Card;

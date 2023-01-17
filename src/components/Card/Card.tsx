import { Button, CardContent, Typography, CardMedia } from "@mui/material";
import { useEffect, useState } from "react";
import { ShowType } from "../../api";
import { Link } from "react-router-dom";
import { Interweave } from "interweave";
import { addFavourite, removeFavourite, getUserFavorites } from "../../db/db";
import "./Card.css";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

//TODO: add now watching button like favourites

type PropsFavourite = {
  show: ShowType;
};

const Card = ({ show }: PropsFavourite) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const isFavorite = localStorage.getItem(show.id.toString());
    console.log(isFavorite);
    if (isFavorite) {
      setIsFavorite(true);
      console.log("favourite");
    }
  }, [show.id]);

  const uid = localStorage.getItem("user");

  const addFavorite = (show: ShowType, uid: string) => {
    addFavourite(show, uid);
    setIsFavorite(true);
    localStorage.setItem(show.id.toString(), "true");
    console.log("added to favourites " + uid);
  };

  const removeFavorite = (show: ShowType, uid: string) => {
    removeFavourite(show, uid);
    setIsFavorite(false);
    localStorage.removeItem(show.id.toString());
    console.log("removed from favourites " + uid);
  };

  return (
    <div className="card">
      <CardMedia component="img" image={show.image} alt={show.title} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {show.title} <span className="language">{show.language}</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Interweave content={show.summary?.substring(0, 100) + "..."} />
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
          <Link to={"/search/" + show.id}>Read more</Link>
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
          {isFavorite ? (
            <Favorite onClick={() => removeFavorite(show, uid!)} />
          ) : (
            <FavoriteBorder onClick={() => addFavorite(show, uid!)} />
          )}
        </Button>
      </CardContent>
    </div>
  );
};

export default Card;

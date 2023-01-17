import { Button, FormControl, Grid, InputBase, Paper } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { getShowsBySearch, ShowType } from "../../api";
import { Link, useSearchParams } from "react-router-dom";
import "./Search.css";
import Card from "../../components/Card/Card";
import { getUserFavorites } from "../../db/db";

//TODO: fix search bar and fix desktop view

const Search = () => {
  const [currentSearch, setCurrentSearch] = useSearchParams();
  const [shows, setShows] = useState<ShowType[]>([]);
  const uid = localStorage.getItem("uid");

  const handleOnSearchChange = useCallback(
    (query: string) => {
      setCurrentSearch({ search: query });
    },
    [setCurrentSearch]
  );

  const isSearchButtonDisabled = () =>
    currentSearch.get("search")?.trim().length === 0;

  const handleOnSearch = () => {
    getShowsBySearch(currentSearch?.get("search") || "").then((res) =>
      setShows(res)
    );
  };

  useEffect(() => {
    const currentSearchStr = currentSearch?.get("search")?.trim();
    if (
      !!currentSearchStr &&
      currentSearchStr.length > 0 &&
      shows.length === 0
    ) {
      handleOnSearch();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFavorite = () => {
    console.log(getUserFavorites(uid!));
  };

  return (
    <>
      <Link to={"/dashboard"}>
        <button className="button">Profile</button>
      </Link>
      <Link to={"/favourites"}>
        <button className="button">Favourites</button>
      </Link>
      <Link to={"/watching"}>
        <button className="button">Now Watching</button>
      </Link>
      <Grid container justifyContent="center" alignItems="center">
        <h1>TV Maze</h1>
        <Grid
          item
          style={{ padding: "2em", outline: "1px solid red", width: "100%" }}
        >
          <Paper
            component="form"
            sx={{ display: "flex", alignItems: "center" }}
            style={{ padding: "2em" }}
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <FormControl>
              <InputBase
                id="outlined-basic"
                placeholder="Search by title..."
                onChange={(e) => handleOnSearchChange(e.target.value)}
                value={currentSearch.get("search")}
                autoFocus
              />
            </FormControl>
            <FormControl>
              <Button
                disabled={isSearchButtonDisabled()}
                onClick={handleOnSearch}
                style={{
                  marginLeft: "1em",
                  boxShadow:
                    "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
                }}
              >
                Search
              </Button>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item style={{ padding: "2em" }} sm={8}>
          {shows.map((el) => (
            <Card show={el} key={el.id} />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Search;

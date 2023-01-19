import { Button, FormControl, Grid, InputBase, Paper } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { getShowsBySearch, Show } from "../../api/index";
import { Link, useSearchParams } from "react-router-dom";
import "./Search.css";
import Card from "../../components/Card/Card";
import { WidthFull } from "@mui/icons-material";
import React from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [show, setShow] = useState<Show[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = () => {
    getShowsBySearch(searchParams?.get("search") || "").then((res) =>
      setShow(res)
    );
  };

  useEffect(() => {
    handleSearch();
  }, [searchParams]);

  const getQuery = (e: any) => {
    setQuery(e.target.value);
    console.log(e.target.value);
  };

  /*   const isSearchButtonDisabled = () =>
    searchParams.get("search")?.trim().length === 0; */

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
        <Grid item style={{ padding: "2em", width: "100%" }}>
          <Paper
            component="form"
            sx={{ display: "flex", alignItems: "center" }}
            style={{
              padding: "1em",
              boxShadow:
                "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
            }}
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <FormControl style={{ width: "90%" }}>
              <InputBase
                id="outlined-basic"
                placeholder="Search by title..."
                onChange={getQuery}
                value={query}
                autoFocus
              />
            </FormControl>
            <FormControl>
              <Button
                onClick={() => setSearchParams({ search: query })}
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
        <Grid
          item
          style={{
            padding: "2em",
            display: "flex",
            flexWrap: "wrap",
          }}
          sm={12}
        >
          {show.map((el, i) => (
            <Card show={el} key={el.id} />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Search;

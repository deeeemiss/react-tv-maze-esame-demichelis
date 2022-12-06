import {
  Button,
  CardContent,
  FormControl,
  Grid,
  InputBase,
  Paper,
  Typography,
  Card,
  CardMedia,
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { useCallback, useEffect, useState } from "react";
import { getShowsBySearch, ShowType } from "../../api";
import { Link, useSearchParams } from "react-router-dom";
import "./Search.css";
import { Interweave } from "interweave";

const Search = () => {
  const [currentSearch, setCurrentSearch] = useSearchParams();
  const [shows, setShows] = useState<ShowType[]>([]);

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

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "10vh" }}
    >
      <h1>TV Maze</h1>
      <Grid item style={{ padding: "2em" }}>
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
          <Card className="card">
            <CardMedia component="img" image={el.image} alt={el.title} />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {el.title} <span className="language">{el.language}</span>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <Interweave content={el.summary?.substring(0, 100) + "..."} />
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
                <Link to={"/search/" + el.id}>Read more</Link>
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
                <FavoriteBorder />
              </Button>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Grid>
  );
};

export default Search;

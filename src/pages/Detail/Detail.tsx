import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "./Detail.css";
import {
  CardContent,
  CardHeader,
  Card,
  Grid,
  CardMedia,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import { getShowById, ShowDetailType } from "../../api";
import { Interweave } from "interweave";

const DetailPage = () => {
  const { showId } = useParams();
  const [showDetail, setShowDetail] = useState<ShowDetailType | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!!showId) {
      try {
        const showIdNum = parseInt(showId);
        getShowById(showIdNum).then((show) => {
          setShowDetail(show);
          console.log(show);
        });
      } catch (err) {
        console.error("NaN");
      }
    }
  }, [showId]);

  return !!showDetail ? (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item style={{ padding: "2em" }} sm={5}>
        <Card>
          <CardHeader
            title={showDetail.title}
            action={<Button onClick={() => navigate(-1)}>Go Back</Button>}
          />
          <CardMedia
            component="img"
            image={showDetail.image}
            alt={showDetail.image}
          />
          <CardContent>
            <Typography variant={"body1"} component={"span"}>
              <Interweave content={showDetail.summary} />
            </Typography>
            <Typography style={{ marginBottom: 10 }}>
              <strong>First aired:</strong> {showDetail.startDate}
            </Typography>
            {showDetail.genres?.map((genre, i) => (
              <span id="genre" key={i}>
                {genre}
              </span>
            ))}
            <Typography id="rating">{showDetail.avgRating}</Typography>
            <Typography id="language">{showDetail.language}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  ) : (
    <div
      style={{
        display: "flex",
        position: "absolute",
        top: "50%",
        left: "50%",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default DetailPage;

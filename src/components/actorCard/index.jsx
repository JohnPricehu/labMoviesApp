import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { ActorsContext } from "../../contexts/actorsContext";
import img from "../../images/film-poster-placeholder.png";
import { UserContext } from "../../contexts/UserContext";
import { checkActorInFavourites } from "../../supabaseClient";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

export default function ActorCard({ actor, action }) {
  const { favouriteActors, addToFavouriteActors } = useContext(ActorsContext);
  const { user } = useContext(UserContext);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    async function checkFavourite() {
      if (user) {
        const isFav = await checkActorInFavourites(user.email, actor.id);
        setIsFavourite(isFav);
      }
    }
    checkFavourite();
  }, [user, actor.id]);

  return (
    <Card sx={styles.card}>
      <CardHeader
        sx={styles.header}
        avatar={
          isFavourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {actor.name}
          </Typography>
        }
      />
      <Link to={`/actors/${actor.id}`}>
        <CardMedia
          sx={styles.media}
          image={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
              : img
          }
        />
      </Link>
      <CardContent>
        <Typography variant="h6" component="p">
          Known for: {actor.known_for_department}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {action(actor)}

        <Link to={`/actors/${actor.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
);
}
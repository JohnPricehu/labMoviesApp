import React from "react";
import ActorCard from "../components/actorCard";
import SampleActor from "./sampleActorData";
import { MemoryRouter } from "react-router";
import ActorsContextProvider from "../contexts/actorsContext";
import { action } from "@storybook/addon-actions";
import AddToFavouriteActorsIcon from "../components/cardIcons/addToFavouriteActors";

export default {
  title: "ActorsPage/ActorCard",
  component: ActorCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <ActorsContextProvider>{Story()}</ActorsContextProvider>,
  ],
};

export const Basic = () => {
  return (
    <ActorCard
      actor={SampleActor}
      action={(actor) => <AddToFavouriteActorsIcon actor={actor} />}
      taging={(actor) => null}
    />
  );
};
Basic.storyName = "Default";

export const Exceptional = () => {
  const sampleNoPoster = { ...SampleActor, profile_path: undefined };
  return (
    <ActorCard
      actor={sampleNoPoster}
      action={(actor) => <AddToFavouriteActorsIcon actor={actor} />}
      taging={(actor) => null}
    />
  );
};
Exceptional.storyName = "exception";

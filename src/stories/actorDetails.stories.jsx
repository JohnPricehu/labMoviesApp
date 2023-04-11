import React from "react";
import ActorDetails from "../components/actorDetails";
import SampleActor from "./sampleActorData";
import { MemoryRouter } from "react-router";
import ActorsContextProvider from "../contexts/actorsContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default {
  title: "Actor Details Page/ActorDetails",
  component: ActorDetails,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>
      </QueryClientProvider>
    ),
    (Story) => <ActorsContextProvider>{Story()}</ActorsContextProvider>,
  ],
};

export const Basic = () => <ActorDetails actor={SampleActor} />;

Basic.storyName = "Default";

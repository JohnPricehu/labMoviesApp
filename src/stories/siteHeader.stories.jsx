import React from "react";
import SiteHeader from "../components/siteHeader";
import { MemoryRouter } from "react-router";
import UserProvider from "../contexts/UserContext";

export default {
  title: "App Header",
  component: SiteHeader,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <UserProvider>{Story()}</UserProvider>,
  ],
};

export const Basic = () => <SiteHeader />;

Basic.storyName = "Default";

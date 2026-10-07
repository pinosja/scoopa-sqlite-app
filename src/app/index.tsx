import React from "react";
import { Builder, Cart, Details, Home, Tracking, Welcome } from "../screens";
import InventoryScreen from "../screens/InventoryScreen";
import { useApp } from "../store";

export default function Index() {
  const { screen } = useApp();
  switch (screen) {
    case "welcome":
      return <Welcome />;
    case "home":
      return <Home />;
    case "details":
      return <Details />;
    case "builder":
      return <Builder />;
    case "cart":
      return <Cart />;
    case "tracking":
      return <Tracking />;
    case "inventory":
      return <InventoryScreen />;
    default:
      return <Welcome />;
  }
}

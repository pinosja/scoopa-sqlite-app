import React from "react";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "./theme";

type FeatherName = React.ComponentProps<typeof Feather>["name"];
type IonName = React.ComponentProps<typeof Ionicons>["name"];
type MciName = React.ComponentProps<typeof MaterialCommunityIcons>["name"];

const FEATHER: Record<string, FeatherName> = {
  "arrow-left": "arrow-left",
  "arrow-right": "arrow-right",
  "arrow-up-right": "arrow-up-right",
  "circle-help": "help-circle",
  "circle-check": "check-circle",
  "chevron-down": "chevron-down",
  info: "info",
  heart: "heart",
  "shopping-bag": "shopping-bag",
  search: "search",
  "map-pin": "map-pin",
  ticket: "tag",
  plus: "plus",
  minus: "minus",
  phone: "phone",
  star: "star",
  check: "check",
  droplet: "droplet",
  cookie: "circle",
  sparkles: "star",
  snowflake: "cloud-snow",
  gift: "gift",
  "credit-card": "credit-card",
  "user-round": "user",
};

const ION: Record<string, IonName> = {
  signal: "cellular",
  wifi: "wifi",
  battery: "battery-full",
  house: "home-outline",
  "ice-cream-bowl": "ice-cream-outline",
  bike: "bicycle",
  "ice-cream": "ice-cream",
  "arrow-forward": "arrow-forward",
};

export default function Icon({
  name,
  size = 18,
  color = colors.ink,
}: {
  name: string;
  size?: number;
  color?: string;
}) {
  if (ION[name]) return <Ionicons name={ION[name]} size={size} color={color} />;
  const f = FEATHER[name] || "circle";
  return <Feather name={f} size={size} color={color} />;
}

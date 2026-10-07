import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
  type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "./Icon";
import { colors, fonts, shadow } from "./theme";

/* ---------- Mock status bar ---------- */
export function StatusBar({ time = "9:55", color = colors.ink }: { time?: string; color?: string }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.status, { paddingTop: insets.top + 6 }]}>
      <Text style={[s.statusTime, { color }]}>{time}</Text>
      <View style={s.statusIcons}>
        <Icon name="signal" size={15} color={color} />
        <Icon name="wifi" size={15} color={color} />
        <Icon name="battery" size={20} color={color} />
      </View>
    </View>
  );
}

/* ---------- Page header with round buttons ---------- */
export function PageHeader({
  title,
  leftIcon = "arrow-left",
  rightIcon = "circle-help",
  onLeft,
  onRight,
}: {
  title: string;
  leftIcon?: string;
  rightIcon?: string;
  onLeft?: () => void;
  onRight?: () => void;
}) {
  return (
    <View style={s.header}>
      <Pressable style={s.roundBtn} onPress={onLeft}>
        <Icon name={leftIcon} size={19} />
      </Pressable>
      <Text style={s.headerTitle}>{title}</Text>
      <Pressable style={s.roundBtn} onPress={onRight}>
        <Icon name={rightIcon} size={19} />
      </Pressable>
    </View>
  );
}

export function RoundButton({
  icon,
  onPress,
  size = 38,
  bg = colors.white,
  color = colors.ink,
}: {
  icon: string;
  onPress?: () => void;
  size?: number;
  bg?: string;
  color?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: bg, alignItems: "center", justifyContent: "center" }}
    >
      <Icon name={icon} size={size * 0.5} color={color} />
    </Pressable>
  );
}

/* ---------- Primary action button ---------- */
export function PrimaryButton({
  label,
  trailing,
  onPress,
  variant = "pink",
  icon,
  style,
}: {
  label: string;
  trailing?: string;
  onPress?: () => void;
  variant?: "pink" | "outline" | "ink";
  icon?: React.ReactNode;
  style?: ViewStyle;
}) {
  const bg = variant === "outline" ? colors.white : variant === "ink" ? colors.ink : colors.pink;
  const fg = variant === "outline" ? colors.ink : colors.white;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        s.primary,
        { backgroundColor: bg, opacity: pressed ? 0.9 : 1 },
        variant === "outline" && { borderWidth: 1, borderColor: colors.tan },
        style,
      ]}
    >
      <Text style={[s.primaryText, { color: fg }]}>{label}</Text>
      {icon ?? (trailing ? <Text style={[s.primaryText, { color: fg }]}>{trailing}</Text> : null)}
    </Pressable>
  );
}

/* ---------- Quantity stepper ---------- */
export function Stepper({
  value,
  onChange,
  size = "md",
}: {
  value: number;
  onChange: (n: number) => void;
  size?: "sm" | "md";
}) {
  const pad = size === "sm" ? 8 : 10;
  return (
    <View style={[s.stepper, { paddingHorizontal: pad + 2, paddingVertical: pad }]}>
      <Pressable onPress={() => onChange(value - 1)} hitSlop={8}>
        <Icon name="minus" size={14} />
      </Pressable>
      <Text style={s.stepperValue}>{value}</Text>
      <Pressable onPress={() => onChange(value + 1)} hitSlop={8}>
        <Icon name="plus" size={14} />
      </Pressable>
    </View>
  );
}

/* ---------- Product image on a soft stage ---------- */
export function ProductImage({
  source,
  width,
  height,
  radius = 0,
}: {
  source: ImageSourcePropType;
  width: number | string;
  height: number;
  radius?: number;
}) {
  return (
    <Image
      source={source}
      style={{ width: width as any, height, borderRadius: radius }}
      resizeMode="contain"
    />
  );
}

/* ---------- Section heading ---------- */
export function SectionHeading({ title, action }: { title: string; action?: string }) {
  return (
    <View style={s.sectionRow}>
      <Text style={s.sectionTitle}>{title}</Text>
      {action ? <Text style={s.sectionAction}>{action}</Text> : null}
    </View>
  );
}

const s = StyleSheet.create({
  status: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 26,
    paddingBottom: 6,
  },
  statusTime: { fontFamily: fonts.sansSemiBold, fontSize: 14 },
  statusIcons: { flexDirection: "row", alignItems: "center", gap: 5 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    height: 56,
  },
  roundBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { fontFamily: fonts.display, fontSize: 16, color: colors.ink },

  primary: {
    height: 54,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  primaryText: { fontFamily: fonts.sansSemiBold, fontSize: 15 },

  stepper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.tan,
    borderRadius: 100,
  },
  stepperValue: { fontFamily: fonts.display, fontSize: 14, color: colors.ink, minWidth: 10, textAlign: "center" },

  sectionRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  sectionTitle: { fontFamily: fonts.display, fontSize: 23, color: colors.ink },
  sectionAction: { fontFamily: fonts.sansSemiBold, fontSize: 11, color: colors.pink },
});

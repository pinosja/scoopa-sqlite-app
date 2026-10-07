import React, { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  PageHeader,
  PrimaryButton,
  ProductImage,
  RoundButton,
  SectionHeading,
  StatusBar,
  Stepper,
} from "./components";
import Icon from "./Icon";
import { colors, fonts, shadow } from "./theme";
import {
  ADDRESS,
  DELIVERY_FEE,
  HOME_FILTERS,
  PRODUCT_IMAGES,
  SCOOPS,
  SERVICE_FEE,
  SIZES,
  TOPPINGS,
  FLAVORS,
} from "./data";
import { useApp } from "./store";

/* ================= Welcome ================= */
export function Welcome() {
  const { go } = useApp();
  return (
    <View style={[st.fill, { backgroundColor: colors.pinkLight }]}>
      <StatusBar />
      <View style={st.welcomeBody}>
        <View style={{ alignItems: "center", gap: 8 }}>
          <Text style={st.brand}>Scoopa</Text>
          <Text style={st.brandTag}>LITTLE SCOOPS. BIG JOY.</Text>
        </View>

        <View style={{ width: 346, height: 345, alignItems: "center", justifyContent: "center" }}>
          <View style={st.welcomeHalo} />
          <View style={st.welcomeBubble} />
          <Icon name="sparkles" size={30} color={colors.pink} />
          <Image source={PRODUCT_IMAGES.hero} style={st.welcomeHero} resizeMode="contain" />
          <View style={st.qualitySticker}>
            <Text style={st.qualityTop}>100% joy</Text>
            <Text style={st.qualityBot}>0% boring</Text>
          </View>
        </View>

        <View style={{ alignItems: "center", gap: 12 }}>
          <Text style={st.welcomeTitle}>Your happy place,{"\n"}one scoop away.</Text>
          <Text style={st.welcomeSub}>
            Small-batch ice cream. Big-time happiness.{"\n"}Delivered right to your door.
          </Text>
        </View>

        <View style={{ alignSelf: "stretch", gap: 16, alignItems: "center" }}>
          <PrimaryButton
            label="Let's get scooping"
            icon={<Icon name="arrow-right" size={18} color={colors.white} />}
            onPress={() => go("home")}
            style={{ alignSelf: "stretch" }}
          />
          <Text style={st.welcomeMuted}>Already part of the scoop club?</Text>
          <Text style={st.welcomeSignin} onPress={() => go("home")}>
            Sign in
          </Text>
        </View>
      </View>
    </View>
  );
}

/* ================= Home ================= */
export function Home() {
  const { go, openFlavor, addToCart } = useApp();
  const [filter, setFilter] = useState<string>(HOME_FILTERS[0]);
  const cards = FLAVORS.slice(0, 2);

  return (
    <View style={st.fill}>
      <StatusBar />
      <View style={st.deliverHeader}>
        <View style={{ gap: 5 }}>
          <Text style={st.deliverLabel}>DELIVERING HAPPINESS TO</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Icon name="map-pin" size={12} color={colors.pink} />
            <Text style={st.deliverAddress}>{ADDRESS}</Text>
            <Icon name="chevron-down" size={12} color={colors.soft} />
          </View>
        </View>
        <Pressable style={st.bagBtn} onPress={() => go("cart")}>
          <Icon name="shopping-bag" size={21} color={colors.pink} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={st.homeBody}>
        <View style={{ gap: 5 }}>
          <Text style={st.homeHello}>Hey Mia, scoop happy!</Text>
          <Text style={st.bodyMuted}>A little treat makes a big difference.</Text>
        </View>

        <View style={st.searchBar}>
          <Icon name="search" size={18} color={colors.soft} />
          <Text style={st.searchText}>Find your forever flavor</Text>
        </View>

        <Pressable
          onPress={() => go("inventory")}
          style={{ borderWidth: 1, borderColor: colors.pink, borderRadius: 12, padding: 12, alignItems: "center" }}
        >
          <Text style={{ color: colors.pink, fontWeight: "700" }}>SQLite Inventory (Lab 05)</Text>
        </Pressable>

        <Pressable style={st.promo} onPress={() => go("builder")}>
          <View style={{ width: 168, gap: 9 }}>
            <Text style={st.promoKicker}>MADE BY YOU</Text>
            <Text style={st.promoTitle}>Your sundae.{"\n"}Your rules.</Text>
            <Text style={st.promoLink}>Build a sundae  →</Text>
          </View>
          <Image source={PRODUCT_IMAGES.sundae} style={{ width: 148, height: 150, marginRight: -20 }} resizeMode="contain" />
        </Pressable>

        <View style={{ flexDirection: "row", gap: 8 }}>
          {HOME_FILTERS.map((f) => {
            const on = f === filter;
            return (
              <Pressable
                key={f}
                onPress={() => setFilter(f)}
                style={[st.choice, on ? { backgroundColor: colors.pink, borderColor: colors.pink } : { backgroundColor: colors.white, borderColor: colors.tan }]}
              >
                <Text style={[st.choiceText, { color: on ? colors.white : colors.soft }]}>{f}</Text>
              </Pressable>
            );
          })}
        </View>

        <SectionHeading title="Fan-favorite flavors" action="See all" />

        <View style={{ flexDirection: "row", gap: 12 }}>
          {cards.map((fl) => (
            <Pressable key={fl.id} style={[st.flavorCard, { backgroundColor: fl.bg }]} onPress={() => openFlavor(fl.id)}>
              <View style={st.flavorStage}>
                <ProductImage source={fl.image} width={133} height={113} />
              </View>
              <Text style={st.flavorName}>{fl.name}</Text>
              <Text style={st.flavorBlurb}>{fl.blurb}</Text>
              <View style={st.flavorPriceRow}>
                <Text style={st.flavorPrice}>${fl.price.toFixed(2)}</Text>
                <Pressable
                  style={st.quickAdd}
                  onPress={() =>
                    addToCart({ name: fl.name, detail: "Regular · 1 scoop", price: fl.price, image: fl.image })
                  }
                >
                  <Icon name="plus" size={16} color={colors.white} />
                </Pressable>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={st.deliveryPromise}>
          <Icon name="snowflake" size={14} color={colors.pink} />
          <Text style={st.bodyMuted}>Scooped fresh. At your door in 25–30 min.</Text>
        </View>
      </ScrollView>

      <BottomTabs active="Home" onChange={(t) => (t === "Home" ? undefined : t === "Menu" ? go("home") : go("cart"))} onTrack={() => go("cart")} />
    </View>
  );
}

function BottomTabs({
  active,
  onChange,
  onTrack,
}: {
  active: string;
  onChange: (t: string) => void;
  onTrack: () => void;
}) {
  const insets = useSafeAreaInsets();
  const tabs = [
    { label: "Home", icon: "house" },
    { label: "Menu", icon: "ice-cream-bowl" },
    { label: "Rewards", icon: "gift" },
    { label: "Profile", icon: "user-round" },
  ];
  return (
    <View style={[st.tabs, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      {tabs.map((t) => {
        const on = t.label === active;
        return (
          <Pressable key={t.label} style={st.tabItem} onPress={() => onChange(t.label)}>
            <Icon name={t.icon} size={22} color={on ? colors.pink : colors.soft} />
            <Text style={[st.tabLabel, on && { color: colors.pink, fontFamily: fonts.sansBold }]}>{t.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/* ================= Flavor details ================= */
export function Details() {
  const { go, activeFlavor, addToCart } = useApp();
  const flavor = FLAVORS.find((f) => f.id === activeFlavor) ?? FLAVORS[0];
  const [size, setSize] = useState<string>("regular");
  const [extras, setExtras] = useState<string[]>(["sprinkles"]);
  const [qty, setQty] = useState(1);

  const sizeObj = SIZES.find((s) => s.id === size)!;
  const extrasTotal = extras.reduce((n, id) => n + (TOPPINGS.find((t) => t.id === id)?.price ?? 0), 0);
  const unit = sizeObj.price + extrasTotal;
  const lineTotal = unit * qty;

  const toggleExtra = (id: string) =>
    setExtras((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <View style={st.fill}>
      <StatusBar />
      <PageHeader title="Scoop spotlight" rightIcon="heart" onLeft={() => go("home")} />

      <ScrollView contentContainerStyle={st.detailsBody}>
        <View style={{ height: 245, alignItems: "center", justifyContent: "center" }}>
          <View style={st.detailsHalo} />
          <Image source={flavor.image} style={{ width: 253, height: 232 }} resizeMode="contain" />
          <View style={st.bestseller}>
            <Text style={st.bestsellerText}>{flavor.tag ?? "TREAT"}</Text>
          </View>
        </View>

        <View style={{ gap: 9 }}>
          <View style={st.rowBetween}>
            <Text style={st.detailsName}>{flavor.name}</Text>
            <Text style={st.detailsPrice}>${flavor.price.toFixed(2)}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Icon name="star" size={14} color={colors.pink} />
            <Text style={st.bodySmall}>4.9 ({flavor.reviews} happy scoopers)</Text>
            <Text style={st.bodySmall}> · </Text>
            <Text style={st.bodySmall}>Vegetarian</Text>
          </View>
          <Text style={st.bodyMuted}>
            A creamy, candy-sweet classic with a playful pink twist. Childhood happiness in every spoonful.
          </Text>
        </View>

        <View style={{ gap: 11 }}>
          <Text style={st.stepTitle}>Choose your size</Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            {SIZES.map((sz) => {
              const on = sz.id === size;
              return (
                <Pressable
                  key={sz.id}
                  onPress={() => setSize(sz.id)}
                  style={[st.sizeCard, on ? { backgroundColor: colors.pinkLight, borderColor: colors.pink, borderWidth: 1.5 } : { backgroundColor: colors.white, borderColor: colors.tan, borderWidth: 1 }]}
                >
                  <Text style={[st.sizeLabel, on && { color: colors.pink }]}>{sz.label}</Text>
                  <Text style={st.sizeDetail}>{sz.detail}</Text>
                  <Text style={st.sizePrice}>${sz.price.toFixed(2)}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={{ gap: 11 }}>
          <View style={st.rowBetween}>
            <Text style={st.stepTitle}>A little extra joy</Text>
            <Text style={st.bodySmall}>Optional</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            {TOPPINGS.map((t) => {
              const on = extras.includes(t.id);
              return (
                <Pressable
                  key={t.id}
                  onPress={() => toggleExtra(t.id)}
                  style={[st.extraCard, on ? { backgroundColor: colors.pinkLight, borderColor: colors.pink } : { backgroundColor: colors.white, borderColor: colors.tan }]}
                >
                  <Icon name={on ? "circle-check" : t.icon} size={21} color={on ? colors.pink : colors.ink} />
                  <Text style={st.extraLabel}>{t.label}</Text>
                  <Text style={st.extraPrice}>+${t.price.toFixed(2)}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Text style={st.bodySmall}>Made with real dairy · Contains milk</Text>
      </ScrollView>

      <View style={st.stickyAction}>
        <Stepper value={qty} onChange={(n) => setQty(Math.max(1, n))} />
        <PrimaryButton
          label="Add to bag"
          trailing={`$${lineTotal.toFixed(2)}`}
          style={{ flex: 1 }}
          onPress={() =>
            addToCart({
              name: flavor.name,
              detail: `${sizeObj.label} · ${extras.length} extra${extras.length === 1 ? "" : "s"}`,
              price: unit,
              qty,
              image: flavor.image,
            })
          }
        />
      </View>
    </View>
  );
}

/* ================= Sundae builder ================= */
export function Builder() {
  const { go, addToCart } = useApp();
  const [scoops, setScoops] = useState<string[]>(["strawberry", "vanilla"]);
  const [toppings, setToppings] = useState<string[]>(["sprinkles", "choco"]);
  const basePrice = 6.0;

  const toggle = (list: string[], setList: (v: string[]) => void, id: string) =>
    setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  const toppingsTotal = toppings.reduce((n, id) => n + (TOPPINGS.find((t) => t.id === id)?.price ?? 0), 0);
  const total = basePrice + toppingsTotal;

  return (
    <View style={st.fill}>
      <StatusBar />
      <PageHeader title="The sundae studio" rightIcon="info" onLeft={() => go("home")} />

      <ScrollView contentContainerStyle={st.builderBody}>
        <View style={{ gap: 7 }}>
          <Text style={st.h1}>A sundae, your way.</Text>
          <Text style={st.bodyMuted}>Mix it. Top it. Make it ridiculously you.</Text>
        </View>

        <View style={st.builderPreview}>
          <View style={st.builderHalo} />
          <Image source={PRODUCT_IMAGES.sundae} style={{ width: 200, height: 206 }} resizeMode="contain" />
          <View style={st.builderPrice}>
            <Text style={st.bodySmall}>TWO SCOOPS</Text>
            <Text style={st.builderPriceText}>${basePrice.toFixed(2)}</Text>
          </View>
          <View style={st.builderTag}>
            <Text style={st.builderTagText}>Nice combo!</Text>
          </View>
        </View>

        <View style={{ gap: 13 }}>
          <View style={st.rowBetween}>
            <Text style={st.stepTitle}>1. Pick your scoops</Text>
            <Text style={st.pinkSmall}>{scoops.length} of 2 selected</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            {SCOOPS.map((sc) => {
              const on = scoops.includes(sc.id);
              return (
                <Pressable key={sc.id} style={{ alignItems: "center", gap: 6, width: 62 }} onPress={() => toggle(scoops, setScoops, sc.id)}>
                  <View style={[st.scoopSwatch, { borderColor: on ? colors.pink : colors.tan, borderWidth: on ? 2 : 1 }]}>
                    <View style={[st.scoopDot, { backgroundColor: sc.color }]} />
                    {on && (
                      <View style={st.scoopCheck}>
                        <Icon name="check" size={11} color={colors.white} />
                      </View>
                    )}
                  </View>
                  <Text style={[st.scoopLabel, { color: on ? colors.pink : colors.soft }]}>{sc.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={{ gap: 10 }}>
          <Text style={st.stepTitle}>2. Top off the happiness</Text>
          {TOPPINGS.map((t) => {
            const on = toppings.includes(t.id);
            return (
              <Pressable
                key={t.id}
                onPress={() => toggle(toppings, setToppings, t.id)}
                style={[st.toppingRow, on && { backgroundColor: colors.pinkLight, borderColor: colors.pink }]}
              >
                <Icon name={t.icon} size={18} color={colors.ink} />
                <Text style={st.toppingLabel}>{t.label}</Text>
                <Text style={st.bodySmall}>+${t.price.toFixed(2)}</Text>
                <Icon name={on ? "circle-check" : "circle"} size={18} color={on ? colors.pink : colors.tan} />
              </Pressable>
            );
          })}
        </View>

        <Text style={st.bodySmall}>2 scoops + 2 toppings = one very happy you.</Text>
      </ScrollView>

      <View style={st.stickyAction}>
        <PrimaryButton
          label="Add my sundae"
          trailing={`$${total.toFixed(2)}`}
          style={{ flex: 1 }}
          onPress={() =>
            addToCart({
              name: "Your signature sundae",
              detail: `${scoops.length} scoops · ${toppings.length} toppings`,
              price: total,
              image: PRODUCT_IMAGES.sundae,
            })
          }
        />
      </View>
    </View>
  );
}

/* ================= Cart & payment ================= */
export function Cart() {
  const { go, cart, setQty, subtotal, total, placeOrder } = useApp();

  return (
    <View style={st.fill}>
      <StatusBar />
      <PageHeader title="Your happy bag" rightIcon="shopping-bag" onLeft={() => go("home")} />

      <ScrollView contentContainerStyle={st.cartBody}>
        <View style={st.rowBetween}>
          <Text style={st.cartTitle}>
            {cart.length === 0 ? "Your bag is empty." : cart.length === 1 ? "One treat. All yours." : "Two treats. All yours."}
          </Text>
          <Text style={st.bodySmall}>{cart.reduce((n, l) => n + l.qty, 0)} items</Text>
        </View>

        {cart.length === 0 ? (
          <View style={st.emptyCart}>
            <Icon name="ice-cream" size={40} color={colors.pink} />
            <Text style={st.bodyMuted}>Add something sweet from the menu.</Text>
            <PrimaryButton label="Browse flavors" icon={<Icon name="arrow-right" size={18} color={colors.white} />} onPress={() => go("home")} />
          </View>
        ) : (
          <>
            <View style={{ gap: 10 }}>
              {cart.map((line) => (
                <View key={line.key} style={st.cartItem}>
                  <View style={st.cartThumb}>
                    <Image source={line.image} style={{ width: 75, height: 76 }} resizeMode="contain" />
                  </View>
                  <View style={{ flex: 1, gap: 5 }}>
                    <Text style={st.cartItemName}>{line.name}</Text>
                    <Text style={st.bodySmall}>{line.detail}</Text>
                    <View style={st.rowBetween}>
                      <Text style={st.cartItemPrice}>${line.price.toFixed(2)}</Text>
                      <Stepper value={line.qty} onChange={(n) => setQty(line.key, n)} size="sm" />
                    </View>
                  </View>
                </View>
              ))}
            </View>

            <View style={st.destination}>
              <Icon name="map-pin" size={21} color={colors.pink} />
              <View style={{ flex: 1, gap: 3 }}>
                <Text style={st.destTitle}>{ADDRESS}</Text>
                <Text style={st.bodySmall}>Apt 2B · Leave at my door</Text>
              </View>
              <Text style={st.changeLink}>Change</Text>
            </View>

            <View style={st.promoRow}>
              <Icon name="ticket" size={18} color={colors.soft} />
              <Text style={[st.bodyMuted, { flex: 1 }]}>Have a sweet little promo code?</Text>
              <Icon name="plus" size={16} color={colors.pink} />
            </View>

            <View style={{ gap: 10 }}>
              <Text style={st.paymentTitle}>The scoop on your total</Text>
              <PriceRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              <PriceRow label="Delivery" value={`$${DELIVERY_FEE.toFixed(2)}`} />
              <PriceRow label="Service fee" value={`$${SERVICE_FEE.toFixed(2)}`} />
              <View style={st.divider} />
              <View style={st.rowBetween}>
                <Text style={st.totalLabel}>Total</Text>
                <Text style={st.totalValue}>${total.toFixed(2)}</Text>
              </View>
            </View>

            <View style={st.methodRow}>
              <Icon name="credit-card" size={22} color={colors.ink} />
              <View style={{ flex: 1, gap: 3 }}>
                <Text style={st.destTitle}>Visa ending in 4242</Text>
                <Text style={st.tinyMuted}>Secure, encrypted payment</Text>
              </View>
              <Icon name="circle-check" size={20} color={colors.green} />
            </View>
          </>
        )}
      </ScrollView>

      {cart.length > 0 && (
        <View style={st.stickyAction}>
          <PrimaryButton label="Place order" trailing={`$${total.toFixed(2)}`} style={{ flex: 1 }} onPress={placeOrder} />
        </View>
      )}
    </View>
  );
}

function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={st.rowBetween}>
      <Text style={st.bodyMuted}>{label}</Text>
      <Text style={st.bodySmall}>{value}</Text>
    </View>
  );
}

/* ================= Delivery tracking ================= */
export function Tracking() {
  const { go, total } = useApp();
  const [progress] = useState(3); // 0..3 milestones

  const milestones = ["Confirmed", "Scooped", "On the way", "Delivered"];

  return (
    <View style={st.fill}>
      <StatusBar />
      <PageHeader title="Follow the happiness" rightIcon="circle-help" onLeft={() => go("home")} />

      <ScrollView contentContainerStyle={st.trackingBody}>
        <View style={{ alignItems: "center", gap: 7 }}>
          <Text style={st.bodySemi}>Your scoops are on their way!</Text>
          <Text style={st.arrival}>10–15 min</Text>
          <Text style={st.bodyMuted}>Arriving 10:05–10:10 · Order #SC1048</Text>
        </View>

        <LiveMap />

        <View style={{ gap: 10 }}>
          <View style={st.rail}>
            <View style={st.railLine} />
            <View style={st.railDone} />
            {milestones.map((m, i) => {
              const done = i <= progress;
              const current = i === progress;
              const icon = i < progress ? "check" : i === progress ? "bike" : "house";
              return (
                <View key={m} style={{ width: 44, alignItems: "center" }}>
                  <View style={[st.milestone, { backgroundColor: done ? colors.pink : colors.pinkLight }]}>
                    <Icon name={icon} size={16} color={done ? colors.white : colors.pink} />
                  </View>
                </View>
              );
            })}
          </View>
          <View style={st.labelsRow}>
            {milestones.map((m, i) => (
              <Text key={m} style={[st.milestoneLabel, i === progress && { color: colors.pink, fontFamily: fonts.sansBold }]}>
                {m}
              </Text>
            ))}
          </View>
        </View>

        <View style={st.courierCard}>
          <View style={st.courierAvatar}>
            <Text style={st.courierInitials}>JL</Text>
          </View>
          <View style={{ flex: 1, gap: 4 }}>
            <Text style={st.courierName}>Jamie is bringing the joy</Text>
            <Text style={st.bodySmall}>Your scoop courier · ★ 4.9</Text>
          </View>
          <View style={st.callBtn}>
            <Icon name="phone" size={17} color={colors.pink} />
          </View>
        </View>

        <View style={st.orderInfo}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 9 }}>
            <Icon name="map-pin" size={18} color={colors.pink} />
            <View style={{ gap: 3 }}>
              <Text style={st.destTitle}>{ADDRESS}</Text>
              <Text style={st.bodySmall}>Apt 2B · Leave at my door</Text>
            </View>
          </View>
          <View style={st.divider} />
          <View style={st.rowBetween}>
            <Text style={st.bodySmall}>2 treats · Paid with Visa 4242</Text>
            <Text style={st.courierName}>${(total || 14.25).toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={st.stickyAction}>
        <PrimaryButton
          label="Message Jamie"
          variant="outline"
          icon={<Icon name="arrow-right" size={18} color={colors.ink} />}
          style={{ flex: 1 }}
          onPress={() => go("home")}
        />
      </View>
    </View>
  );
}

function LiveMap() {
  const block = (x: number, y: number, w: number, h: number, c: string, key: string) => (
    <View key={key} style={{ position: "absolute", left: x, top: y, width: w, height: h, backgroundColor: c, borderRadius: 10 }} />
  );
  const street = (x: number, y: number, w: number, h: number, key: string) => (
    <View key={key} style={{ position: "absolute", left: x, top: y, width: w, height: h, backgroundColor: colors.white }} />
  );
  return (
    <View style={st.map}>
      {block(18, 16, 65, 67, colors.greenLight, "b1")}
      {block(111, 16, 109, 65, colors.cream, "b2")}
      {block(251, 16, 85, 62, colors.cream, "b3")}
      {block(18, 112, 65, 103, colors.cream, "b4")}
      {block(111, 113, 106, 41, colors.greenLight, "b5")}
      {block(248, 112, 87, 100, colors.cream, "b6")}
      {block(112, 183, 107, 35, colors.cream, "b7")}
      {street(87, 0, 20, 240, "s1")}
      {street(224, 0, 20, 240, "s2")}
      {street(0, 86, 354, 20, "s3")}
      {street(104, 159, 140, 20, "s4")}

      <Text style={[st.mapLabel, { left: 143, top: 91 }]}>MAPLE STREET</Text>
      <Text style={[st.mapPark, { left: 130, top: 128 }]}>Maple Park</Text>

      {/* Route */}
      <View style={st.routeH} />
      <View style={st.routeV} />

      <View style={st.courierHalo} />
      <View style={st.courierPin}>
        <Icon name="bike" size={23} color={colors.white} />
      </View>

      <View style={st.homePin}>
        <Icon name="house" size={20} color={colors.white} />
      </View>
      <View style={st.doorLabel}>
        <Text style={st.doorLabelText}>Your door</Text>
      </View>

      <View style={st.liveBadge}>
        <View style={st.liveDot} />
        <Text style={st.liveText}>LIVE</Text>
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  fill: { flex: 1, backgroundColor: colors.paper },
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },

  // Welcome
  welcomeBody: { flex: 1, alignItems: "center", justifyContent: "space-between", paddingHorizontal: 28, paddingTop: 22, paddingBottom: 24 },
  brand: { fontFamily: fonts.displayBold, fontSize: 64, color: colors.pink },
  brandTag: { fontFamily: fonts.sansSemiBold, fontSize: 10, letterSpacing: 1.5, color: colors.pink },
  welcomeHalo: { position: "absolute", width: 322, height: 284, borderRadius: 161, backgroundColor: "#F76F95" },
  welcomeBubble: { position: "absolute", left: 7, top: 33, width: 34, height: 34, borderRadius: 17, backgroundColor: colors.yellow },
  welcomeHero: { width: 282, height: 334 },
  qualitySticker: { position: "absolute", right: 8, bottom: 24, width: 111, height: 84, borderRadius: 22, backgroundColor: colors.yellow, alignItems: "center", justifyContent: "center", gap: 3, transform: [{ rotate: "-8deg" }] },
  qualityTop: { fontFamily: fonts.display, fontSize: 21, color: colors.ink },
  qualityBot: { fontFamily: fonts.sansSemiBold, fontSize: 9, color: colors.ink },
  welcomeTitle: { fontFamily: fonts.display, fontSize: 38, lineHeight: 42, textAlign: "center", color: colors.ink },
  welcomeSub: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, textAlign: "center", color: colors.soft },
  welcomeMuted: { fontFamily: fonts.sans, fontSize: 12, color: colors.ink },
  welcomeSignin: { fontFamily: fonts.sansBold, fontSize: 13, color: colors.pink },

  // Home
  deliverHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, height: 76 },
  deliverLabel: { fontFamily: fonts.sans, fontSize: 10, color: colors.soft, letterSpacing: 0.5 },
  deliverAddress: { fontFamily: fonts.sansSemiBold, fontSize: 13, color: colors.ink },
  bagBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.pinkLight, alignItems: "center", justifyContent: "center" },
  homeBody: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 18, gap: 19 },
  homeHello: { fontFamily: fonts.display, fontSize: 31, color: colors.ink },
  bodyMuted: { fontFamily: fonts.sans, fontSize: 12, lineHeight: 17, color: colors.soft },
  bodySmall: { fontFamily: fonts.sans, fontSize: 11, color: colors.soft },
  tinyMuted: { fontFamily: fonts.sans, fontSize: 9, color: colors.soft },
  bodySemi: { fontFamily: fonts.sansSemiBold, fontSize: 14, color: colors.ink },
  pinkSmall: { fontFamily: fonts.sansSemiBold, fontSize: 11, color: colors.pink },
  searchBar: { flexDirection: "row", alignItems: "center", gap: 10, height: 45, borderRadius: 100, borderWidth: 1, borderColor: colors.tan, backgroundColor: colors.white, paddingHorizontal: 16 },
  searchText: { fontFamily: fonts.sans, fontSize: 12, color: colors.soft },
  promo: { flexDirection: "row", alignItems: "center", backgroundColor: colors.pinkLight, borderRadius: 22, padding: 18, height: 166, overflow: "hidden" },
  promoKicker: { fontFamily: fonts.sansBold, fontSize: 9, letterSpacing: 1, color: colors.pink },
  promoTitle: { fontFamily: fonts.display, fontSize: 27, lineHeight: 29, color: colors.ink },
  promoLink: { fontFamily: fonts.sansBold, fontSize: 12, color: colors.pink },
  choice: { height: 37, borderRadius: 100, borderWidth: 1, paddingHorizontal: 16, alignItems: "center", justifyContent: "center" },
  choiceText: { fontFamily: fonts.sansSemiBold, fontSize: 12 },
  flavorCard: { flex: 1, borderRadius: 22, padding: 12, gap: 4 },
  flavorStage: { height: 113, alignItems: "center", justifyContent: "center" },
  flavorName: { fontFamily: fonts.display, fontSize: 17, color: colors.ink },
  flavorBlurb: { fontFamily: fonts.sans, fontSize: 10, color: colors.soft },
  flavorPriceRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 4 },
  flavorPrice: { fontFamily: fonts.sansBold, fontSize: 13, color: colors.pink },
  quickAdd: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.pink, alignItems: "center", justifyContent: "center" },
  deliveryPromise: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7 },

  tabs: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 28, paddingTop: 14, borderTopWidth: 1, borderTopColor: colors.tan, backgroundColor: colors.white },
  tabItem: { width: 62, alignItems: "center", gap: 5 },
  tabLabel: { fontFamily: fonts.sans, fontSize: 10, color: colors.soft },

  // Details / Builder
  h1: { fontFamily: fonts.display, fontSize: 32, color: colors.ink },
  detailsBody: { paddingHorizontal: 24, paddingTop: 12, gap: 20, paddingBottom: 16 },
  detailsHalo: { position: "absolute", width: 250, height: 223, borderRadius: 125, backgroundColor: colors.pinkLight },
  bestseller: { position: "absolute", left: 24, top: 18, backgroundColor: colors.yellow, borderRadius: 100, paddingHorizontal: 12, paddingVertical: 7 },
  bestsellerText: { fontFamily: fonts.sansBold, fontSize: 10, color: colors.ink },
  detailsName: { fontFamily: fonts.display, fontSize: 28, color: colors.ink, flex: 1 },
  detailsPrice: { fontFamily: fonts.sansBold, fontSize: 19, color: colors.pink },
  stepTitle: { fontFamily: fonts.sansBold, fontSize: 14, color: colors.ink },
  sizeCard: { flex: 1, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 5, alignItems: "center", gap: 5 },
  sizeLabel: { fontFamily: fonts.sansBold, fontSize: 12, color: colors.ink },
  sizeDetail: { fontFamily: fonts.sans, fontSize: 9, color: colors.soft },
  sizePrice: { fontFamily: fonts.sansSemiBold, fontSize: 11, color: colors.ink },
  extraCard: { flex: 1, borderRadius: 12, borderWidth: 1, paddingVertical: 12, paddingHorizontal: 5, alignItems: "center", gap: 8 },
  extraLabel: { fontFamily: fonts.sansSemiBold, fontSize: 9, color: colors.ink, textAlign: "center" },
  extraPrice: { fontFamily: fonts.sans, fontSize: 10, color: colors.soft },
  stickyAction: { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 24, paddingTop: 14, paddingBottom: 24, borderTopWidth: 1, borderTopColor: colors.tan, backgroundColor: colors.paper },

  builderBody: { paddingHorizontal: 24, paddingTop: 12, gap: 18, paddingBottom: 16 },
  builderPreview: { height: 206, borderRadius: 22, backgroundColor: colors.pinkLight, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  builderHalo: { position: "absolute", width: 172, height: 172, borderRadius: 86, backgroundColor: colors.white },
  builderPrice: { position: "absolute", left: 17, top: 17, gap: 3 },
  builderPriceText: { fontFamily: fonts.display, fontSize: 22, color: colors.pink },
  builderTag: { position: "absolute", right: 17, bottom: 17, backgroundColor: colors.yellow, borderRadius: 100, paddingHorizontal: 10, paddingVertical: 6 },
  builderTagText: { fontFamily: fonts.sansBold, fontSize: 9, color: colors.ink },
  scoopSwatch: { width: 60, height: 60, borderRadius: 30, backgroundColor: colors.white, alignItems: "center", justifyContent: "center" },
  scoopDot: { width: 44, height: 44, borderRadius: 22 },
  scoopCheck: { position: "absolute", right: 0, bottom: 0, width: 18, height: 18, borderRadius: 9, backgroundColor: colors.pink, alignItems: "center", justifyContent: "center" },
  scoopLabel: { fontFamily: fonts.sansBold, fontSize: 10, textAlign: "center" },
  toppingRow: { flexDirection: "row", alignItems: "center", gap: 10, height: 46, borderRadius: 12, borderWidth: 1, borderColor: colors.tan, backgroundColor: colors.white, paddingHorizontal: 13 },
  toppingLabel: { fontFamily: fonts.sansMedium, fontSize: 12, color: colors.ink, flex: 1 },

  // Cart
  cartBody: { paddingHorizontal: 24, paddingTop: 12, gap: 16, paddingBottom: 16 },
  cartTitle: { fontFamily: fonts.display, fontSize: 25, color: colors.ink, flex: 1, lineHeight: 28 },
  cartItem: { flexDirection: "row", gap: 12, backgroundColor: colors.white, borderRadius: 22, padding: 12 },
  cartThumb: { width: 77, height: 90, borderRadius: 12, backgroundColor: colors.pinkLight, alignItems: "center", justifyContent: "center" },
  cartItemName: { fontFamily: fonts.sansBold, fontSize: 13, color: colors.ink },
  cartItemPrice: { fontFamily: fonts.sansBold, fontSize: 13, color: colors.pink },
  destination: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: colors.pinkLight, borderRadius: 12, padding: 14 },
  destTitle: { fontFamily: fonts.sansBold, fontSize: 12, color: colors.ink },
  changeLink: { fontFamily: fonts.sansBold, fontSize: 10, color: colors.pink },
  promoRow: { flexDirection: "row", alignItems: "center", gap: 9, height: 42, borderRadius: 12, borderWidth: 1, borderColor: colors.tan, backgroundColor: colors.white, paddingHorizontal: 14 },
  paymentTitle: { fontFamily: fonts.sansBold, fontSize: 14, color: colors.ink },
  divider: { height: 1, backgroundColor: colors.tan },
  totalLabel: { fontFamily: fonts.sansBold, fontSize: 15, color: colors.ink },
  totalValue: { fontFamily: fonts.sansBold, fontSize: 20, color: colors.pink },
  methodRow: { flexDirection: "row", alignItems: "center", gap: 10, borderRadius: 12, borderWidth: 1, borderColor: colors.tan, backgroundColor: colors.white, padding: 13 },
  emptyCart: { alignItems: "center", gap: 14, paddingVertical: 40 },

  // Tracking
  trackingBody: { paddingHorizontal: 24, paddingTop: 14, gap: 19, paddingBottom: 16 },
  arrival: { fontFamily: fonts.display, fontSize: 36, color: colors.pink },
  map: { height: 240, borderRadius: 22, backgroundColor: colors.mapBase, overflow: "hidden" },
  mapLabel: { position: "absolute", fontFamily: fonts.sans, fontSize: 8, color: colors.soft },
  mapPark: { position: "absolute", fontFamily: fonts.sans, fontSize: 8, color: colors.green },
  routeH: { position: "absolute", left: 108, top: 118, width: 90, height: 5, backgroundColor: colors.pink, borderRadius: 3 },
  routeV: { position: "absolute", left: 193, top: 60, width: 5, height: 60, backgroundColor: colors.pink, borderRadius: 3 },
  courierHalo: { position: "absolute", left: 72, top: 145, width: 50, height: 50, borderRadius: 25, backgroundColor: colors.pinkLight },
  courierPin: { position: "absolute", left: 78, top: 151, width: 38, height: 38, borderRadius: 19, backgroundColor: colors.pink, alignItems: "center", justifyContent: "center" },
  homePin: { position: "absolute", left: 214, top: 28, width: 40, height: 40, borderRadius: 20, backgroundColor: colors.pink, alignItems: "center", justifyContent: "center" },
  doorLabel: { position: "absolute", left: 258, top: 36, backgroundColor: colors.white, borderRadius: 12, paddingHorizontal: 9, paddingVertical: 6 },
  doorLabelText: { fontFamily: fonts.sansSemiBold, fontSize: 9, color: colors.ink },
  liveBadge: { position: "absolute", left: 16, top: 16, flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: colors.white, borderRadius: 100, paddingHorizontal: 9, paddingVertical: 6 },
  liveDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.green },
  liveText: { fontFamily: fonts.sansSemiBold, fontSize: 9, color: colors.ink, letterSpacing: 0.5 },
  rail: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 40 },
  railLine: { position: "absolute", left: 44, right: 44, height: 3, backgroundColor: colors.tan },
  railDone: { position: "absolute", left: 44, width: "55%", height: 3, backgroundColor: colors.pink },
  milestone: { width: 29, height: 29, borderRadius: 15, alignItems: "center", justifyContent: "center" },
  labelsRow: { flexDirection: "row", justifyContent: "space-between" },
  milestoneLabel: { fontFamily: fonts.sans, fontSize: 9, color: colors.soft, textAlign: "center", width: 75 },
  courierCard: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: colors.white, borderRadius: 22, padding: 14 },
  courierAvatar: { width: 45, height: 45, borderRadius: 23, backgroundColor: colors.yellow, alignItems: "center", justifyContent: "center" },
  courierInitials: { fontFamily: fonts.display, fontSize: 19, color: colors.ink },
  courierName: { fontFamily: fonts.sansBold, fontSize: 13, color: colors.ink },
  callBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.pinkLight, alignItems: "center", justifyContent: "center" },
  orderInfo: { backgroundColor: colors.pinkLight, borderRadius: 22, padding: 16, gap: 11 },
});

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { DELIVERY_FEE, FLAVORS, SERVICE_FEE, type FlavorId } from "./data";

export type Screen =
  | "welcome"
  | "home"
  | "details"
  | "builder"
  | "cart"
  | "tracking"
  | "inventory";

export type CartLine = {
  key: string;
  name: string;
  detail: string;
  price: number;
  qty: number;
  image: number;
};

type AppValue = {
  screen: Screen;
  go: (s: Screen) => void;
  activeFlavor: FlavorId;
  openFlavor: (id: FlavorId) => void;
  cart: CartLine[];
  addToCart: (line: Omit<CartLine, "key" | "qty"> & { qty?: number }) => void;
  setQty: (key: string, qty: number) => void;
  itemCount: number;
  subtotal: number;
  total: number;
  placed: boolean;
  placeOrder: () => void;
};

const AppContext = createContext<AppValue | null>(null);
let counter = 0;

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [activeFlavor, setActiveFlavor] = useState<FlavorId>("bubblegum");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [placed, setPlaced] = useState(false);

  const go = useCallback((s: Screen) => setScreen(s), []);
  const openFlavor = useCallback((id: FlavorId) => {
    setActiveFlavor(id);
    setScreen("details");
  }, []);

  const addToCart = useCallback(
    (line: Omit<CartLine, "key" | "qty"> & { qty?: number }) => {
      setCart((prev) => {
        const existing = prev.find((l) => l.name === line.name && l.detail === line.detail);
        if (existing) {
          return prev.map((l) =>
            l.key === existing.key ? { ...l, qty: l.qty + (line.qty ?? 1) } : l
          );
        }
        return [
          ...prev,
          { ...line, key: `line-${++counter}`, qty: line.qty ?? 1 },
        ];
      });
    },
    []
  );

  const setQty = useCallback((key: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, qty } : l))
    );
  }, []);

  const itemCount = useMemo(() => cart.reduce((n, l) => n + l.qty, 0), [cart]);
  const subtotal = useMemo(
    () => cart.reduce((n, l) => n + l.price * l.qty, 0),
    [cart]
  );
  const total = useMemo(() => {
    if (!cart.length) return 0;
    return subtotal + DELIVERY_FEE + SERVICE_FEE;
  }, [cart.length, subtotal]);

  const placeOrder = useCallback(() => {
    setPlaced(true);
    setScreen("tracking");
  }, []);

  const value: AppValue = {
    screen,
    go,
    activeFlavor,
    openFlavor,
    cart,
    addToCart,
    setQty,
    itemCount,
    subtotal,
    total,
    placed,
    placeOrder,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

export { FLAVORS };

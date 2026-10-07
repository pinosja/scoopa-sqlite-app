import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("scoopa_inventory.db");

export function initDatabase() {
  db.execSync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      stock INTEGER NOT NULL
    );
  `);

  // Auto-seed initial data on first launch if table is empty
  const countRow: any = db.getFirstSync(
    "SELECT COUNT(*) as count FROM products;"
  );
  if (countRow.count === 0) {
    db.runSync(
      "INSERT INTO products (name, category, price, stock) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?);",
      [
        "Bubblegum Pink", "Classic flavors", 4.5, 60,
        "Mango Sunshine", "Classic flavors", 4.5, 45,
        "Vanilla Cloud", "Classic flavors", 4.0, 38,
        "Chocolate Swirl", "Classics", 4.5, 52,
      ]
    );
  }
}

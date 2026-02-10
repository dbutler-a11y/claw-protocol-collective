const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', '..', 'data', 'claw.db');

let db;

function getDB() {
  if (!db) {
    const fs = require('fs');
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
  }
  return db;
}

function initDB() {
  const conn = getDB();

  conn.exec(`
    CREATE TABLE IF NOT EXISTS members (
      discord_id TEXT PRIMARY KEY,
      username TEXT NOT NULL,
      github_handle TEXT,
      joined_at TEXT DEFAULT (datetime('now')),
      tier INTEGER DEFAULT 5
    );

    CREATE TABLE IF NOT EXISTS agents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      owner_discord_id TEXT NOT NULL,
      repo_url TEXT,
      status TEXT DEFAULT 'pending',
      capabilities TEXT,
      submitted_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (owner_discord_id) REFERENCES members(discord_id)
    );

    CREATE TABLE IF NOT EXISTS contributions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      discord_id TEXT NOT NULL,
      type TEXT NOT NULL,
      tier INTEGER NOT NULL,
      description TEXT,
      base_score REAL DEFAULT 0,
      multiplier REAL DEFAULT 1.0,
      final_score REAL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (discord_id) REFERENCES members(discord_id)
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      initiative TEXT,
      status TEXT DEFAULT 'open',
      claimed_by TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      completed_at TEXT
    );
  `);

  console.log('Database initialized');
}

module.exports = { getDB, initDB };

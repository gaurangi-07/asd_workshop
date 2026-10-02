const fs = require('fs/promises');
const path = require('path');

const filepath = path.join(__dirname, '..', 'db.json');

async function readDB() {
  const data = await fs.readFile(filepath, 'utf-8');
  return JSON.parse(data);
}

async function writeDB(data) {
  await fs.writeFile(filepath, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = { readDB, writeDB };

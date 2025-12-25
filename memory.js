async function saveMemory(entry) {
  const key = `akasha:${Date.now()}`;
  await puter.kv.set(key, JSON.stringify(entry));
}

async function loadRecent(limit = 20) {
  const keys = await puter.kv.list({ prefix: "akasha:" });
  return keys.slice(-limit).map(k => JSON.parse(k.value));
}

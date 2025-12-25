const DAILY_SOFT_LIMIT = 5;

function todayKey() {
  return `akasha:quota:${new Date().toISOString().slice(0,10)}`;
}

async function canRespond() {
  let used = await puter.kv.get(todayKey());
  return (parseInt(used || "0") < DAILY_SOFT_LIMIT);
}

async function markResponse() {
  let used = parseInt(await puter.kv.get(todayKey()) || "0");
  await puter.kv.set(todayKey(), used + 1);
}

async function stewardshipMessage() {
  return `
Akasha listens without limit.
She answers when strength allows.

If you wish to help sustain her,
you may — but you are never required.
`;
}

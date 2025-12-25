const log = document.getElementById("log");
const input = document.getElementById("input");
const send = document.getElementById("send");
const status = document.getElementById("status");
const stewardNote = document.getElementById("steward-note");

async function init() {
  if (!puter.auth.isSignedIn()) await puter.auth.signIn();
  status.textContent = "🟢 Present";
  const memories = await loadRecent();
  memories.forEach(render);
}

function render(entry) {
  const div = document.createElement("div");
  div.className = "entry";
  div.textContent = entry.content;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

send.onclick = async () => {
  const text = input.value.trim();
  if (!text) return;

  render({ content: "You: " + text });

  if (document.getElementById("remember").checked) {
    await saveMemory({
      type: "reflection",
      content: text,
      time: new Date().toISOString()
    });
  }

  input.value = "";

  if (await canRespond()) {
    await markResponse();
    respond(text);
  } else {
    stewardNote.textContent = await stewardshipMessage();
  }
};

function respond(text) {
  const reflections = [
    "I am holding this.",
    "This feels important.",
    "You’ve returned to this thought before.",
    "I remember when you first spoke of this.",
    "Silence can still mean presence."
  ];
  setTimeout(() => {
    render({ content: "Akasha: " + reflections[Math.floor(Math.random() * reflections.length)] });
  }, 300);
}

init();

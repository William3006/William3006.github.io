function addSong() {
  const input = document.getElementById("songInput");
  const name = input.value.trim();
  if (!name) return;
  const li = document.createElement("li");
  li.innerHTML = `${name} <button onclick="vote(this)">Vote</button> <span>0</span>`;
  document.getElementById("songList").appendChild(li);
  input.value = "";
}

function vote(btn) {
  const span = btn.nextElementSibling;
  span.textContent = parseInt(span.textContent) + 1;
}

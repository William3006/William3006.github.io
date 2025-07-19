const items = document.querySelectorAll("#items li");
let dragged = null;

items.forEach(item => {
  item.addEventListener("dragstart", () => dragged = item);
  item.addEventListener("dragover", e => e.preventDefault());
  item.addEventListener("drop", e => {
    e.preventDefault();
    if (dragged !== item) {
      let siblings = [...items];
      let from = siblings.indexOf(dragged);
      let to = siblings.indexOf(item);
      if (from < to) item.after(dragged);
      else item.before(dragged);
    }
  });
});

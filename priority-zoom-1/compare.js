const userList = document.getElementById("userList");
const worldList = document.getElementById("worldList");

const priorities = [
  "Health", "Freedom", "Love", "Money", "Knowledge",
  "Happiness", "Power", "Safety", "Success", "Adventure"
];

const worldAvg = [
  "Health", "Happiness", "Safety", "Love", "Success",
  "Freedom", "Money", "Knowledge", "Adventure", "Power"
];

const userOrder = JSON.parse(localStorage.getItem("userPriorities")) || priorities;

userOrder.forEach(p => {
  const li = document.createElement("li");
  li.textContent = p;
  userList.appendChild(li);
});

worldAvg.forEach(p => {
  const li = document.createElement("li");
  li.textContent = p;
  worldList.appendChild(li);
});

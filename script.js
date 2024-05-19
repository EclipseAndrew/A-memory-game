let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr = arr.sort((a, b) => 0.5 - Math.random());
console.log(arr);
let x = 0;
let y = 0;
let step = 1;
let error = 0;

const updateStatus = () => {
  document.getElementById('steps').textContent = step - 1;
  document.getElementById('errors').textContent = error;
  document.getElementById('status').textContent = error < 3 ? 'Гра триває' : 'Ви програли';
};

const updateMessage = (message) => {
  document.getElementById('message').textContent = message;
};

const fieldInit = () => {
  for (let i = 0; i < 3; i++) {
    for (let k = 0; k < 3; k++) {
      let div = document.createElement("div");
      div.textContent = arr[i * 3 + k];
      if (i === 0 && k === 0) div.classList.add("active");
      document.querySelector(".field").append(div);
    }
  }
  setTimeout(() => {
    document
      .querySelectorAll(".field > div")
      .forEach((item) => (item.textContent = ""));
    document.addEventListener("keydown", pressKey);
    
    document.querySelectorAll(".field > div").forEach((block, index) => {
      block.addEventListener("click", () => handleClick(index));
      block.addEventListener("touchstart", () => handleClick(index)); 
    });
  }, 5000);
};

fieldInit();

const blocks = document.querySelectorAll(".field > div");

function pressKey(event) {
  console.log(event.key);

  blocks[y * 3 + x].classList.remove("active");

  if (
    event.key !== "ArrowDown" &&
    event.key !== "ArrowUp" &&
    event.key !== "ArrowLeft" &&
    event.key !== "ArrowRight" &&
    event.key !== "Enter"
  ) {
    return;
  }

  switch (event.key) {
    case "ArrowUp":
      y - 1 >= 0 ? y-- : (y = 2);
      break;
    case "ArrowDown":
      y + 1 === 3 ? (y = 0) : y++;
      break;
    case "ArrowLeft":
      x - 1 >= 0 ? x-- : (x = 2);
      break;
    case "ArrowRight":
      x + 1 === 3 ? (x = 0) : x++;
      break;
    case "Enter":
      if (arr[y * 3 + x] === step) {
        blocks[y * 3 + x].textContent = arr[y * 3 + x];
        step++;
        updateMessage('Правильно!');
      } else {
        updateMessage('Помилка!');
        error++;
      }
      break;
  }

  blocks[y * 3 + x].classList.add("active");
  updateStatus();

  if (error == 3) {
    updateMessage('Ви програли!');
    setTimeout(() => location.reload(), 2000);
  }

  if (step === 10) {
    updateMessage('Ви виграли!');
    setTimeout(() => location.reload(), 2000);
  }
}

// Доданий код для обробки кліків миші та дотиків
function handleClick(index) {
  const newX = index % 3;
  const newY = Math.floor(index / 3);

  blocks[y * 3 + x].classList.remove("active");
  x = newX;
  y = newY;

  blocks[y * 3 + x].classList.add("active");

  if (arr[y * 3 + x] === step) {
    blocks[y * 3 + x].textContent = arr[y * 3 + x];
    step++;
    updateMessage('Правильно!');
  } else {
    updateMessage('Помилка!');
    error++;
  }

  updateStatus();

  if (error == 3) {
    updateMessage('Ви програли!');
    setTimeout(() => location.reload(), 2000);
  }

  if (step === 10) {
    updateMessage('Ви виграли!');
    setTimeout(() => location.reload(), 2000);
  }
}


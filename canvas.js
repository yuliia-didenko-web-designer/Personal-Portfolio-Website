const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('drawingCanvas');
  const ctx = canvas.getContext('2d');

  const colorPickerInput = document.getElementById('colorPicker');
  const colorControlLabel = document.querySelector('.color-control label[title="Choose color"]');
  const colorPalette = document.querySelector('.color-palette');
  const colorOptions = document.querySelectorAll('.color-option');

  const lineWidthControlLabel = document.querySelector('.linewidth-control label[title="Line width"]');
  const lineWidthPalette = document.querySelector('.linewidth-palette');
  const lineWidthOptions = document.querySelectorAll('.linewidth-option');
  const lineWidthSliderInput = document.getElementById('lineWidthSlider');

  const clearBtn = document.getElementById('delete-button');
  const eraserBtn = document.getElementById('eraser-button');

  let drawing = false;
  let isErasing = false;
  let currentColor = colorPickerInput.value;
  let lineWidth = parseInt(lineWidthSliderInput.value);
  
  function resizeCanvasToDisplaySize(canvas, ctx) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const dpr = window.devicePixelRatio || 1;
  
    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
  }
  
  function draw() {
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(canvas.width / 2 / dpr, canvas.height / 2 / dpr, 50, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
  }
  window.addEventListener("resize", () => {
    resizeCanvasToDisplaySize(canvas, ctx);
    draw();
  });
  // Перший запуск
  resizeCanvasToDisplaySize(canvas, ctx);
  draw();

  // 🔘 Клік по іконці кольору — відкриває/закриває кастомну палітру кольорів
  colorControlLabel.addEventListener('click', () => {
    colorPalette.classList.toggle('active');
    lineWidthPalette.classList.remove('active'); // Закриваємо палітру товщини, якщо відкрита
  });

  // 🎨 Вибір кольору з кастомної палітри кольорів
  colorOptions.forEach(option => {
    option.addEventListener('click', () => {
      drawing = false; // Зупини малювання, щоб не малювати між кольорами
      isErasing = false;
      const selectedColor = option.dataset.color;
      currentColor = selectedColor;
      colorPickerInput.value = selectedColor;
      ctx.beginPath(); // 👉 почати новий шлях
      colorPalette.classList.remove('active');
    });
  });
  

  // 📏 Клік по іконці товщини лінії — відкриває/закриває палітру товщини
  lineWidthControlLabel.addEventListener('click', () => {
    lineWidthPalette.classList.toggle('active');
    colorPalette.classList.remove('active'); // Закриваємо палітру кольорів, якщо відкрита
  });

  // 🖋️ Вибір товщини лінії з палітри
  lineWidthOptions.forEach(option => {
    option.addEventListener('click', () => {
      const selectedWidth = parseInt(option.dataset.width);
      lineWidth = selectedWidth;
      lineWidthSliderInput.value = selectedWidth; // Оновлюємо значення прихованого range input
      lineWidthPalette.classList.remove('active');
    });
  });

  // 🎨 Зміна кольору (через вбудований color picker, якщо його все ж таки відкриють)
  colorPickerInput.addEventListener('input', () => {
    isErasing = false;
    currentColor = colorPickerInput.value;
  });

  // 📏 Зміна товщини (через прихований range input)
  lineWidthSliderInput.addEventListener('input', () => {
    isErasing = false;
    lineWidth = parseInt(lineWidthSliderInput.value);
  });

  // 🧽 Перемикач режиму гумки
  eraserBtn.addEventListener('click', () => {
    isErasing = true;
    eraserBtn.classList.toggle('active', isErasing);
  });

  // 🖱 Початок малювання (мишою)
  canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    const { x, y } = getCanvasCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  });

  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', () => drawing = false);
  canvas.addEventListener('mouseout', () => drawing = false);

  // ✍️ Початок малювання (дотиком)
  canvas.addEventListener('touchstart', (e) => {
    drawing = true;
    const { x, y } = getCanvasCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  });

  canvas.addEventListener('touchmove', draw);
  canvas.addEventListener('touchend', () => drawing = false);

  // 🧮 Отримання точних координат
  function getCanvasCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    return { x, y };
  }

  // 🖌 Малювання
  function draw(e) {
    if (!drawing) return;
    e.preventDefault();

    const { x, y } = getCanvasCoordinates(e);

    ctx.lineWidth = isErasing ? lineWidth * 15 : lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = isErasing ? '#ffffff' : currentColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  // 🧹 Очистка канви
  clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  // Закриваємо палітри при кліку за їх межами
  document.addEventListener('click', (event) => {
    if (!colorControlLabel.contains(event.target) && !colorPalette.contains(event.target) &&
        !lineWidthControlLabel.contains(event.target) && !lineWidthPalette.contains(event.target)) {
      colorPalette.classList.remove('active');
      lineWidthPalette.classList.remove('active');
    }
  });
});
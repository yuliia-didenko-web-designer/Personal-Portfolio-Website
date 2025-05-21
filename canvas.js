window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('drawingCanvas');
  const ctx = canvas.getContext('2d');

  const colorControlLabel = document.querySelector('.color-control label[title="Choose color"]');
  const colorPalette = document.querySelector('.color-palette');
  const colorOptions = document.querySelectorAll('.color-option');

  const lineWidthControlLabel = document.querySelector('.linewidth-control label[title="Line width"]');
  const lineWidthPalette = document.querySelector('.linewidth-palette');
  const lineWidthOptions = document.querySelectorAll('.linewidth-option');

  const clearBtn = document.getElementById('delete-button');
  const eraserBtn = document.getElementById('eraser-button');

  let drawing = false;
  let isErasing = false;
  let lineWidth = 3;
  let currentColor = '#000000';

  
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
  
  resizeCanvasToDisplaySize(canvas, ctx);

  window.addEventListener("resize", () => {
    resizeCanvasToDisplaySize(canvas, ctx);
  });

  
  colorControlLabel.addEventListener('click', () => {
    colorPalette.classList.toggle('active');
    lineWidthPalette.classList.remove('active');
  });

 
  colorOptions.forEach(option => {
    option.addEventListener('click', () => {
      drawing = false; 
      isErasing = false;
      const selectedColor = option.dataset.color;
      currentColor = selectedColor;
      ctx.beginPath(); 
      colorPalette.classList.remove('active');
    });
  });
  
  
  lineWidthControlLabel.addEventListener('click', () => {
    lineWidthPalette.classList.toggle('active');
    colorPalette.classList.remove('active');
  });

  
  lineWidthOptions.forEach(option => {
    option.addEventListener('click', () => {
      const selectedWidth = parseInt(option.dataset.width);
      lineWidth = selectedWidth;
      lineWidthPalette.classList.remove('active');
    });
  });

  eraserBtn.addEventListener('click', () => {
    isErasing = true;
    eraserBtn.classList.toggle('active', isErasing);
  });

  canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    const { x, y } = getCanvasCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  });

  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', () => drawing = false);
  canvas.addEventListener('mouseout', () => drawing = false);

  
  canvas.addEventListener('touchstart', (e) => {
    drawing = true;
    const { x, y } = getCanvasCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  });

  canvas.addEventListener('touchmove', draw);
  canvas.addEventListener('touchend', () => drawing = false);

  
  function getCanvasCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  
    const x = clientX - rect.left;
    const y = clientY - rect.top;
  
    return { x, y };
  }
  
  function draw(e) {
    if (!drawing) return;
    e.preventDefault();

    const { x, y } = getCanvasCoordinates(e);

    ctx.lineWidth = isErasing ? lineWidth * 5 : lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = isErasing ? '#ffffff' : currentColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  
  clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

 
  document.addEventListener('click', (event) => {
    if (!colorControlLabel.contains(event.target) && !colorPalette.contains(event.target) &&
        !lineWidthControlLabel.contains(event.target) && !lineWidthPalette.contains(event.target)) {
      colorPalette.classList.remove('active');
      lineWidthPalette.classList.remove('active');
    }
  });
});
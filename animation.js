    
    let cursorDot = document.querySelector(".cursor-dot");
    let cursorOutline = document.querySelector(".cursor-outline");

    window.addEventListener("mousemove", function (e) {
      let posX = e.clientX;
      let posY = e.clientY;

      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      cursorOutline.style.left = `${posX}px`;
      cursorOutline.style.top = `${posY}px`;

      cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
      }, { duration: 500, fill: "forwards" });
    });



    window.addEventListener("scroll", () => {
      if (window.scrollY > 1000) {
        document.querySelector(".hero-screen").classList.add("disassemble");
      } else {
        document.querySelector(".hero-screen").classList.remove("disassemble");
      }
    });


    



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
    
      resizeCanvasToDisplaySize(canvas);
    
      function resizeCanvasToDisplaySize(canvas) {
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
    
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
    
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
    
        ctx.scale(dpr, dpr);
      }
    
      // 🔘 Клік по іконці кольору — відкриває/закриває кастомну палітру кольорів
      colorControlLabel.addEventListener('click', () => {
        colorPalette.classList.toggle('active');
        lineWidthPalette.classList.remove('active'); // Закриваємо палітру товщини, якщо відкрита
      });
    
      // 🎨 Вибір кольору з кастомної палітри кольорів
      colorOptions.forEach(option => {
        option.addEventListener('click', () => {
          const selectedColor = option.dataset.color;
          currentColor = selectedColor;
          colorPickerInput.value = selectedColor;
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
        currentColor = colorPickerInput.value;
      });
    
      // 📏 Зміна товщини (через прихований range input)
      lineWidthSliderInput.addEventListener('input', () => {
        lineWidth = parseInt(lineWidthSliderInput.value);
      });
    
      // 🧽 Перемикач режиму гумки
      eraserBtn.addEventListener('click', () => {
        isErasing = !isErasing;
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
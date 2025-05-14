window.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const pixelSpinner = document.getElementById('pixel-spinner');

  // 確保載入畫面顯示
  if (loader) {
    loader.style.display = 'flex'; // 確保載入畫面顯示
    loader.style.opacity = '1';   // 確保完全可見
  }

  // 確保像素旋轉動畫立即啟動
  if (pixelSpinner) {
    const ctx = pixelSpinner.getContext('2d');
    let t = 0;
    function loop() {
      drawPixelSpinner(ctx, t);
      t += 0.18;
      pixelSpinner._spinReq = requestAnimationFrame(loop);
    }
    loop();
  }
});

window.addEventListener('load', () => {
  console.log('Auto Restocker page loaded');
  const loader = document.getElementById('loader');
  const starCanvas = document.getElementById('star-canvas');
  const lightCanvas = document.getElementById('light-canvas');

  // 隱藏載入畫面
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0'; // 添加淡出效果
      setTimeout(() => {
        loader.style.display = 'none'; // 完全隱藏載入畫面
      }, 500); // 等待淡出動畫完成後隱藏
    }, 500); // 模擬載入時間
  }

  // 移除星空背景的模糊效果
  if (starCanvas) {
    starCanvas.style.transition = 'filter 2s linear'; // 確保過渡效果
    starCanvas.style.filter = 'blur(0)'; // 移除模糊
  }

  if (lightCanvas) {
    lightCanvas.style.transition = 'filter 2s linear'; // 確保過渡效果
    lightCanvas.style.filter = 'blur(0)'; // 移除模糊
  }

  if (starCanvas && lightCanvas) {
    const starCtx = starCanvas.getContext('2d');
    const lightCtx = lightCanvas.getContext('2d');

    function drawStars() {
      starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * starCanvas.width;
        const y = Math.random() * starCanvas.height;
        const radius = Math.random() * 2;
        starCtx.beginPath();
        starCtx.arc(x, y, radius, 0, Math.PI * 2);
        starCtx.fillStyle = 'white';
        starCtx.fill();
      }
    }

    function drawLight() {
      lightCtx.clearRect(0, 0, lightCanvas.width, lightCanvas.height);
      const gradient = lightCtx.createRadialGradient(
        lightCanvas.width / 2,
        lightCanvas.height / 2,
        0,
        lightCanvas.width / 2,
        lightCanvas.height / 2,
        lightCanvas.width / 2
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      lightCtx.fillStyle = gradient;
      lightCtx.fillRect(0, 0, lightCanvas.width, lightCanvas.height);
    }

    function resizeCanvas() {
      starCanvas.width = window.innerWidth;
      starCanvas.height = window.innerHeight;
      lightCanvas.width = window.innerWidth;
      lightCanvas.height = window.innerHeight;
      drawStars();
      drawLight();
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
  }
});
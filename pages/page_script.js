window.addEventListener('DOMContentLoaded', () => {
  console.log('Auto Restocker page loaded');

  const loader = document.getElementById('loader');
  const starCanvas = document.getElementById('star-canvas');
  const lightCanvas = document.getElementById('light-canvas');
  const banner = document.querySelector('.banner-img');
  const bannerContainer = document.querySelector('.banner');

  // 星星数组，存储每个星星的属性
  let stars = [];
  let animationId;

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

  // 視差滾動效果
  if (banner && bannerContainer) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const parallaxSpeed = 0.1; // 視差速度
      const offset = Math.max(0, Math.min(scrollY * parallaxSpeed, 50)); // 限制移動範圍
      banner.style.objectPosition = `center calc(100% - ${offset}%)`; // 動態調整圖片位置
    });
  }

  // 星空背景與光效
  if (starCanvas && lightCanvas) {
    const starCtx = starCanvas.getContext('2d');
    const lightCtx = lightCanvas.getContext('2d');

    // 初始化星星属性
    function initStars() {
      stars = [];
      for (let i = 0; i < (starCanvas.height * starCanvas.width) / 1250; i++) {
        stars.push({
          x: Math.random() * starCanvas.width,
          y: Math.random() * starCanvas.height,
          radius: Math.random() * 2,
          speedX: (Math.random() - 0.5) * 0.5, // 水平速度 (-0.25 到 0.25)
          speedY: (Math.random() - 0.5) * 0.5, // 垂直速度
          alpha: Math.random(), // 初始透明度
          alphaSpeed: (Math.random() - 0.5) * 0.02, // 透明度变化速度
        });
      }
    }

    // 绘制星星并实现闪烁和移动效果
    function drawStars() {
      starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);

      stars.forEach(star => {
        // 更新星星位置
        star.x += star.speedX;
        star.y += star.speedY;

        // 边界检测 - 如果星星移出画布，重新放置
        if (star.x < 0) star.x = starCanvas.width;
        if (star.x > starCanvas.width) star.x = 0;
        if (star.y < 0) star.y = starCanvas.height;
        if (star.y > starCanvas.height) star.y = 0;

        // 更新透明度实现闪烁效果
        star.alpha += star.alphaSpeed;
        if (star.alpha > 1 || star.alpha < 0.3) {
          star.alphaSpeed = -star.alphaSpeed;
        }

        // 绘制星星
        starCtx.beginPath();
        starCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

        // 使用渐变增强星星效果
        const gradient = starCtx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.radius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.alpha})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        starCtx.fillStyle = gradient;
        starCtx.fill();
      });

      // 继续下一帧动画
      animationId = requestAnimationFrame(drawStars);
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

      // 重新初始化星星
      initStars();
      drawLight();
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // 初始化時調用一次

    // 开始动画
    initStars();
    drawStars();
  }

  const toggleButtons = document.querySelectorAll('.toggle-button');
  toggleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const extraInfo = button.nextElementSibling;
      if (extraInfo && extraInfo.classList.contains('extra-info')) {
        extraInfo.classList.toggle('hidden');
        extraInfo.classList.toggle('visible');
        button.classList.toggle('rotate');
      }
    });
  });

  // 清理函数 - 当页面卸载时停止动画
  window.addEventListener('beforeunload', () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  });
});
const cards = [
  {
    title: "Auto Restocker",
    description: "Automatically refill your inventory with this useful addon for Minecraft!",
    type: "Add-on",
    backgroundImage: "assets/autoRestocker_background.png",
    iconImage: "assets/autoRestocker.pack_icon.png",
    link: "pages/view/autoRestocker.page.html"
  },
  {
    title: "Another Addon",
    description: "Enhance your Minecraft experience with this amazing addon!",
    type: "Add-on",
    backgroundImage: "assets/autoRestocker_background.png",
    iconImage: "assets/autoRestocker.pack_icon.png",
    link: "pages/view/autoRestocker.page.html"
  },
  {
    title: "Another Addon",
    description: "Enhance your Minecraft experience with this amazing addon!",
    type: "Add-on",
    backgroundImage: "assets/autoRestocker_background.png",
    iconImage: "assets/autoRestocker.pack_icon.png",
    link: "pages/view/autoRestocker.page.html"
  },
  {
    title: "Another Addon",
    description: "Enhance your Minecraft experience with this amazing addon!",
    type: "Add-on",
    backgroundImage: "assets/autoRestocker_background.png",
    iconImage: "assets/autoRestocker.pack_icon.png",
    link: "pages/view/autoRestocker.page.html"
  },
  {
    title: "Another Addon",
    description: "Enhance your Minecraft experience with this amazing addon!",
    type: "Add-on",
    backgroundImage: "assets/autoRestocker_background.png",
    iconImage: "assets/autoRestocker.pack_icon.png",
    link: "pages/view/autoRestocker.page.html"
  }
];

document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('mousemove', e => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // 動態添加 radial 光圈，不覆蓋其他樣式
    item.style.backgroundImage = `
      radial-gradient(circle at ${x}px ${y}px, rgba(0,170,255,0.3) 0%, transparent 60%),
      linear-gradient(rgba(0, 170, 255, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 170, 255, 0.1) 1px, transparent 1px)
    `;
    item.style.backgroundSize = "20px 20px";
  });

  item.addEventListener('mouseleave', () => {
    item.style.backgroundImage = ''; // 恢復原始樣式
    item.style.backgroundSize = '';
  });

  item.addEventListener('click', e => {
    // 確保這段代碼不存在，否則會阻止跳轉
    // e.preventDefault();
  });
});

// 確保載入畫面立即顯示
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
  const loader = document.getElementById('loader');

  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0'; // 添加淡出效果
      setTimeout(() => {
        loader.style.display = 'none'; // 完全隱藏載入畫面
      }, 500); // 等待淡出動畫完成後隱藏
    }, 500); // 模擬 2 秒的載入時間
  }
});

// 星空背景動畫
function drawStars() {
  const starCanvas = document.getElementById('star-canvas');
  if (!starCanvas) return;

  const ctx = starCanvas.getContext('2d');
  const width = starCanvas.width = window.innerWidth;
  const height = starCanvas.height = window.innerHeight;

  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < 100; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = Math.random() * 1.5;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.fill();
  }
}

// 初始化星星背景
window.addEventListener('load', drawStars);

// 像素旋轉動畫繪製函數
function drawPixelSpinner(ctx, progress = 0) {
  ctx.clearRect(0, 0, 64, 64);
  const px = 8; // 每格像素
  const cx = 32, cy = 32;
  const len = 8;
  for (let i = 0; i < len; i++) {
    const angle = (i / len) * 2 * Math.PI + progress;
    const x = Math.round(cx + Math.cos(angle) * 20 / px) * px;
    const y = Math.round(cy + Math.sin(angle) * 20 / px) * px;
    ctx.save();
    ctx.globalAlpha = 0.3 + 0.7 * (i / len);
    ctx.shadowColor = "#fff";
    ctx.shadowBlur = 8;
    ctx.fillStyle = "#fff";
    ctx.fillRect(x - px / 2, y - px / 2, px, px);
    ctx.restore();
  }
}

// 像素風格轉圈動畫
function animatePixelSpinner() {
  const spinner = document.getElementById('pixel-spinner');
  if (!spinner) return;
  const ctx = spinner.getContext('2d');
  let t = 0;
  function loop() {
    drawPixelSpinner(ctx, t);
    t += 0.18;
    spinner._spinReq = requestAnimationFrame(loop);
  }
  loop();
}

animatePixelSpinner();

// 載入畫面控制
window.addEventListener('DOMContentLoaded', () => {
  const lightCanvas = document.getElementById('light-canvas');
  const loader = document.getElementById('loader');
  const loaderBg = document.getElementById('loader-bg');
  const pixelSpinner = document.getElementById('pixel-spinner');

  function resize() {
    [starCanvas, lightCanvas, loaderBg].forEach(c => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
      c.style.width = window.innerWidth + "px";
      c.style.height = window.innerHeight + "px";
    });
  }
  resize();
  window.addEventListener('resize', resize);

  // 提前載入星點
  const loaderBgCtx = loaderBg.getContext('2d');
  drawStars();
  // 複製星空到 loader 背景
  loaderBgCtx.drawImage(starCanvas, 0, 0);

  // 模擬資源載入
  setTimeout(() => {
    // 光點動畫
    const lightCtx = lightCanvas.getContext('2d');
    const dots = Array.from({length: 18}, () => new LightDot(lightCanvas.width, lightCanvas.height));
    animateLights(lightCtx, lightCanvas.width, lightCanvas.height, dots);

    // 隱藏 loader
    loader.style.opacity = 0;
    if (pixelSpinner && pixelSpinner._spinReq) cancelAnimationFrame(pixelSpinner._spinReq);
    setTimeout(() => loader.style.display = "none", 400);
  }, 900); // 900ms 模擬載入
});

// 動態生成卡片
const gallery = document.getElementById('gallery');

cards.forEach(card => {
  // 創建卡片的 HTML 結構
  const cardElement = document.createElement('a');
  cardElement.className = 'item';
  cardElement.href = card.link;

  cardElement.innerHTML = `
    <div class="background">
      <img src="${card.backgroundImage}" alt="background">
    </div>
    <div class="icon-and-name">
      <div class="pack-icon-container">
        <img src="${card.iconImage}" alt="${card.title} icon" class="pack-icon">
      </div>
      <h2 class="title">${card.title}</h2>
    </div>
    <div class="description-and-type">
      <p class="description">${card.description}</p>
      <p class="type">${card.type}</p>
    </div>
  `;

  // 將卡片添加到畫廊容器中
  gallery.appendChild(cardElement);
});

window.addEventListener('load', () => {
  const starCanvas = document.getElementById('star-canvas');
  const lightCanvas = document.getElementById('light-canvas');

  // 移除模糊效果
  if (starCanvas) {
    starCanvas.style.filter = 'blur(0)';
  }
  if (lightCanvas) {
    lightCanvas.style.filter = 'blur(0)';
  }
});

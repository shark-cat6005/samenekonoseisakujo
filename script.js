const cards = [
  {
    title: "Auto Restocker",
    description: "Automatically refill your inventory with this useful addon for Minecraft!" +
      "<br><br>v1.0.0&nbsp;&nbsp;&nbsp;&nbsp;<i>M</i> 1.21.70" +
      // "<br><i>*updating</i>" +
      "",
    type: "Script",
    backgroundImage: "assets/autoRestocker.banner.png",
    iconImage: "assets/autoRestocker.pack_icon.png",
    link: "pages/autoRestocker.page.view/autoRestocker.page.html"
  },
  {
    title: "<i>TPSV</i>",
    description: "Display TPS<br><br><i>*outdated</i>",
    type: "Script",
    backgroundImage: "assets/tpsv.banner.png",
    iconImage: "assets/tpsv.pack_icon.png",
    link: "pages/tpsv.page.view/tpsv.page.html"
  },
  {
    title: "Coming soon...",
    description: "Coming soon...",
    type: "",
    backgroundImage: "assets/unknown.png",
    iconImage: "assets/unknown.pack_icon.png",
    link: "pages/view/unknown/unknown.page.html"
  },
  {
    title: "Coming soon...",
    description: "Coming soon...",
    type: "",
    backgroundImage: "assets/unknown.png",
    iconImage: "assets/unknown.pack_icon.png",
    link: "pages/view/unknown/unknown.page.html"
  },
  {
    title: "Coming soon...",
    description: "Coming soon...",
    type: "",
    backgroundImage: "assets/unknown.png",
    iconImage: "assets/unknown.pack_icon.png",
    link: "pages/view/unknown/unknown.page.html"
  },
  {
    title: "Coming soon...",
    description: "Coming soon...",
    type: "",
    backgroundImage: "assets/unknown.png",
    iconImage: "assets/unknown.pack_icon.png",
    link: "pages/view/unknown/unknown.page.html"
  },
  {
    title: "Coming soon...",
    description: "Coming soon...",
    type: "",
    backgroundImage: "assets/unknown.png",
    iconImage: "assets/unknown.pack_icon.png",
    link: "pages/view/unknown/unknown.page.html"
  },
  {
    title: "Coming soon...",
    description: "Coming soon...",
    type: "",
    backgroundImage: "assets/unknown.png",
    iconImage: "assets/unknown.pack_icon.png",
    link: "pages/view/unknown/unknown.page.html"
  },
  {
    title: "Coming soon...",
    description: "Coming soon...",
    type: "",
    backgroundImage: "assets/unknown.png",
    iconImage: "assets/unknown.pack_icon.png",
    link: "pages/view/unknown/unknown.page.html"
  },
  {
    title: "Coming soon...",
    description: "Coming soon...",
    type: "",
    backgroundImage: "assets/unknown.png",
    iconImage: "assets/unknown.pack_icon.png",
    link: "pages/view/unknown/unknown.page.html"
  },
  {
    title: "Coming soon...",
    description: "Coming soon...",
    type: "",
    backgroundImage: "assets/unknown.png",
    iconImage: "assets/unknown.pack_icon.png",
    link: "pages/view/unknown/unknown.page.html"
  },
  {
    title: "Coming soon...",
    description: "Coming soon...",
    type: "",
    backgroundImage: "assets/unknown.png",
    iconImage: "assets/unknown.pack_icon.png",
    link: "pages/view/unknown/unknown.page.html"
  },
  {
    title: "Coming soon...",
    description: "Coming soon...",
    type: "",
    backgroundImage: "assets/unknown.png",
    iconImage: "assets/unknown.pack_icon.png",
    link: "pages/view/unknown/unknown.page.html"
  }
];

document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('mousemove', e => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    item.style.backgroundImage = `
      radial-gradient(circle at ${x}px ${y}px, rgba(0,170,255,0.3) 0%, transparent 60%),
      linear-gradient(rgba(0, 170, 255, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 170, 255, 0.1) 1px, transparent 1px)
    `;
    item.style.backgroundSize = "20px 20px";
  });
  item.addEventListener('mouseleave', () => {
    item.style.backgroundImage = '';
    item.style.backgroundSize = '';
  });
  item.addEventListener('click', e => {
    // e.preventDefault();
  });
});
window.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const pixelSpinner = document.getElementById('pixel-spinner');
  if (loader) {
    loader.style.display = 'flex';
    loader.style.opacity = '1';
  }
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
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }, 500);
  }
});

// 1. 替换 drawStars 函数和相关逻辑
// 2. 添加全局变量 stars 和 animationId

let stars = [];
let animationId;

// 初始化星星属性
function initStars() {
  stars = [];
  const starCanvas = document.getElementById('star-canvas');
  if (!starCanvas) return;
  for (let i = 0; i < (starCanvas.height * starCanvas.width) / 1250; i++) {
    stars.push({
      x: Math.random() * starCanvas.width,
      y: Math.random() * starCanvas.height,
      radius: Math.random() * 2,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      alpha: Math.random(),
      alphaSpeed: (Math.random() - 0.5) * 0.02,
    });
  }
}

// 绘制星星并实现闪烁和移动效果
function drawStars() {
  const starCanvas = document.getElementById('star-canvas');
  if (!starCanvas) return;
  const starCtx = starCanvas.getContext('2d');
  starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);

  stars.forEach(star => {
    // 更新星星位置
    star.x += star.speedX;
    star.y += star.speedY;

    // 边界检测
    if (star.x < 0) star.x = starCanvas.width;
    if (star.x > starCanvas.width) star.x = 0;
    if (star.y < 0) star.y = starCanvas.height;
    if (star.y > starCanvas.height) star.y = 0;

    // 闪烁
    star.alpha += star.alphaSpeed;
    if (star.alpha > 1 || star.alpha < 0.3) {
      star.alphaSpeed = -star.alphaSpeed;
    }

    // 绘制
    starCtx.beginPath();
    starCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    const gradient = starCtx.createRadialGradient(
      star.x, star.y, 0,
      star.x, star.y, star.radius
    );
    gradient.addColorStop(0, `rgba(255,255,255,${star.alpha})`);
    gradient.addColorStop(1, `rgba(255,255,255,0)`);
    starCtx.fillStyle = gradient;
    starCtx.fill();
  });

  animationId = requestAnimationFrame(drawStars);
}

// 监听窗口大小变化，重新初始化星星
function resizeStars() {
  const starCanvas = document.getElementById('star-canvas');
  if (!starCanvas) return;
  starCanvas.width = window.innerWidth;
  starCanvas.height = window.innerHeight;
  initStars();
}
window.addEventListener('resize', () => {
  resizeStars();
});

// 页面加载时初始化星星动画
window.addEventListener('DOMContentLoaded', () => {
  resizeStars();
  // 不要在这里调用 drawStars()
});

// 页面卸载时停止动画
window.addEventListener('beforeunload', () => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
});

function drawPixelSpinner(ctx, progress = 0) {
  ctx.clearRect(0, 0, 64, 64);
  const px = 8;
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
window.addEventListener('DOMContentLoaded', () => {
  const lightCanvas = document.getElementById('light-canvas');
  const loader = document.getElementById('loader');
  const loaderBg = document.getElementById('loader-bg');
  const pixelSpinner = document.getElementById('pixel-spinner');
  function resize() {
    const starCanvas = document.getElementById('star-canvas');
    const lightCanvas = document.getElementById('light-canvas');
    const loaderBg = document.getElementById('loader-bg');
    [starCanvas, lightCanvas, loaderBg].forEach(c => {
      if (!c) return;
      c.width = window.innerWidth;
      c.height = window.innerHeight;
      c.style.width = window.innerWidth + "px";
      c.style.height = window.innerHeight + "px";
    });
  }
  resize();
  window.addEventListener('resize', resize);
  const starCanvas = document.getElementById('star-canvas'); // 修正：加上这一行
  const loaderBgCtx = loaderBg.getContext('2d');
  setTimeout(() => {
    const lightCtx = lightCanvas.getContext('2d');
    // const dots = Array.from({ length: 18 }, () => new LightDot(lightCanvas.width, lightCanvas.height));
    // animateLights(lightCtx, lightCanvas.width, lightCanvas.height, dots);
    loader.style.opacity = 0;
    if (pixelSpinner && pixelSpinner._spinReq) cancelAnimationFrame(pixelSpinner._spinReq);
    setTimeout(() => {
      loader.style.display = "none";
      drawStars(); // loader消失後再啟動星星動畫
    }, 400);
  }, 900);
});

//card
const gallery = document.getElementById('gallery');

cards.forEach(card => {
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
  gallery.appendChild(cardElement);
});

window.addEventListener('load', () => {
  const starCanvas = document.getElementById('star-canvas');
  const lightCanvas = document.getElementById('light-canvas');
  if (starCanvas) {
    starCanvas.style.filter = 'blur(0)';
  }
  if (lightCanvas) {
    lightCanvas.style.filter = 'blur(0)';
  }
});

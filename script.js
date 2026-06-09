/* ── CANVAS PARTICLES ── */
(function () {
  const cv = document.getElementById('bgCanvas');
  const cx = cv.getContext('2d');
  let W, H;
  const resize = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
  resize(); window.addEventListener('resize', resize);

  const cols = ['#a78bfa','#06b6d4','#f472b6','#22d3a5'];
  const pts = Array.from({length:60}, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 1.6 + .3,
    vx: (Math.random()-.5) * .25,
    vy: -(Math.random() * .35 + .08),
    c: cols[Math.floor(Math.random()*4)],
    a: Math.random() * .55 + .15,
    life: Math.random(),
    spd: Math.random() * .003 + .001
  }));

  function draw() {
    cx.clearRect(0, 0, W, H);
    // blobs
    [[W*.15,H*.1,W*.45,'rgba(167,139,250,.055)'],[W*.85,H*.8,W*.38,'rgba(6,182,212,.045)'],[W*.5,H*.45,W*.3,'rgba(244,114,182,.035)']].forEach(([bx,by,br,bc])=>{
      const g = cx.createRadialGradient(bx,by,0,bx,by,br);
      g.addColorStop(0,bc); g.addColorStop(1,'transparent');
      cx.fillStyle=g; cx.beginPath(); cx.arc(bx,by,br,0,Math.PI*2); cx.fill();
    });
    pts.forEach(p => {
      p.x+=p.vx; p.y+=p.vy; p.life+=p.spd;
      if(p.y<-8){p.y=H+8;p.x=Math.random()*W;}
      if(p.x<-8)p.x=W+8; if(p.x>W+8)p.x=-8;
      cx.globalAlpha = Math.sin(p.life*Math.PI)*p.a;
      cx.fillStyle=p.c; cx.beginPath(); cx.arc(p.x,p.y,p.r,0,Math.PI*2); cx.fill();
    });
    cx.globalAlpha=1;
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── TOGGLE ABOUT ── */
const toggleBtn = document.getElementById('toggleBtn');
const moreItems = document.getElementById('moreItems');
const arr = document.getElementById('arr');
let open = false;

toggleBtn.addEventListener('click', () => {
  open = !open;
  moreItems.classList.toggle('open', open);
  arr.classList.toggle('open', open);
  toggleBtn.firstChild.textContent = open ? 'Show Less ' : 'Show More ';
  if (open) {
    document.querySelectorAll('#moreItems .about-item').forEach((el,i) => {
      setTimeout(() => el.classList.add('visible'), i * 70);
    });
  } else {
    document.querySelectorAll('#moreItems .about-item').forEach(el => el.classList.remove('visible'));
  }
});

/* ── SCROLL REVEAL ── */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: .15 });

document.querySelectorAll('.feat-card, .about-item:not(#moreItems .about-item)').forEach(el => io.observe(el));
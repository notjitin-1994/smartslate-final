<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null = null;
  let animationFrameId: number;
  let balls: Ball[] = [];
  let mouse = { x: -1e9, y: -1e9 };
  let colorsInitialized = false;

  // Configurable props for brand colors
  export let backgroundColor = '#001c33';
  export let particleColor = 'var(--brand-accent-color-2)';
  export let linkColor = 'var(--brand-accent-color-1)';

  const TAU = 2 * Math.PI;

  class Ball {
    x: number;
    y: number;
    vel: { x: number; y: number };

    constructor(startX?: number, startY?: number, startVelX?: number, startVelY?: number) {
      this.x = startX || Math.random() * canvas.width;
      this.y = startY || Math.random() * canvas.height;
      this.vel = {
        x: startVelX || Math.random() * 0.4 - 0.2,
        y: startVelY || Math.random() * 0.4 - 0.2
      };
    }

    update() {
      if (this.x > canvas.width + 50 || this.x < -50) {
        this.vel.x = -this.vel.x;
      }
      if (this.y > canvas.height + 50 || this.y < -50) {
        this.vel.y = -this.vel.y;
      }
      this.x += this.vel.x;
      this.y += this.vel.y;
    }

    draw() {
      if (!ctx) return;
      if (!ctx) return;
      // Add a glow effect to the particles
      ctx.shadowBlur = 20;
      ctx.shadowColor = particleColor;
   
      ctx.beginPath();
      ctx.globalAlpha = 0.4;
      ctx.fillStyle = particleColor;
      ctx.arc(this.x | 0, this.y | 0, 3, 0, TAU, false);
      ctx.fill();
   
      // Reset shadow for other elements
      ctx.shadowBlur = 0;
     }
  }

  function init() {
    if (!canvas) return;
    const canvasCtx = canvas.getContext('2d');
    if (!canvasCtx) return;
    ctx = canvasCtx;

    balls = [];
    const particleCount = (canvas.width * canvas.height) / (65 * 65);
    for (let i = 0; i < particleCount; i++) {
      balls.push(new Ball());
    }
  }

  function loop() {
    if (!ctx || !browser) return;

    if (!colorsInitialized) {
      const computedStyles = getComputedStyle(canvas);
      particleColor = computedStyles.getPropertyValue('--brand-accent-color-2').trim();
      linkColor = computedStyles.getPropertyValue('--brand-accent-color-1').trim();
      colorsInitialized = true;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Update and draw balls
    for (const ball of balls) {
    	ball.update();
    	ball.draw();
    }
  
    // Draw links
    for (let i = 0; i < balls.length; i++) {
    	const ball1 = balls[i];
    	for (let j = i + 1; j < balls.length; j++) {
    		const ball2 = balls[j];
    		const dist = Math.hypot(ball1.x - ball2.x, ball1.y - ball2.y);
    		if (dist < 100) {
    			ctx.beginPath();
    			ctx.strokeStyle = linkColor;
    			ctx.globalAlpha = 1 - dist / 100;
    			ctx.lineWidth = 1.4; // Reduced by 30% from 2
    			ctx.moveTo(ball1.x | 0, ball1.y | 0);
    			ctx.lineTo(ball2.x | 0, ball2.y | 0);
    			ctx.stroke();
    		}
    	}
    }
  
    animationFrameId = requestAnimationFrame(loop);
   }

  function handleMouseMove(event: MouseEvent) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  }

  onMount(() => {
    if (browser) {
      const resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
          canvas.width = entry.contentRect.width;
          canvas.height = entry.contentRect.height;
          init();
        }
      });

      if (canvas.parentElement) {
        resizeObserver.observe(canvas.parentElement);
      }

      init();
      loop();
      document.addEventListener('mousemove', handleMouseMove);

      return () => {
        resizeObserver.disconnect();
        cancelAnimationFrame(animationFrameId);
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }
  });
</script>

<canvas bind:this={canvas} style="position: absolute; top: 0; left: 0; z-index: -1; width: 100%; height: 100%;"></canvas>
// generate-icons.mjs — run with: node generate-icons.mjs
// Generates PWA icons using pure Node.js (no canvas needed)
// Creates SVG-based PNG placeholders

import { writeFileSync, mkdirSync } from 'fs';
import { createCanvas } from 'canvas';

const sizes = [72, 96, 128, 144, 192, 512];

mkdirSync('./public/icons', { recursive: true });

sizes.forEach(size => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#7C6FFF');
  gradient.addColorStop(1, '#4A3FCC');
  ctx.fillStyle = gradient;
  ctx.roundRect(0, 0, size, size, size * 0.2);
  ctx.fill();

  // Letter L
  const fontSize = size * 0.55;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold ${fontSize}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('₹', size / 2, size / 2 + size * 0.03);

  const buffer = canvas.toBuffer('image/png');
  writeFileSync(`./public/icons/icon-${size}.png`, buffer);
  console.log(`Created icon-${size}.png`);
});

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const BRAIN_DIR = 'C:/Users/VITOR HENRIQUE/.gemini/antigravity-ide/brain/be152794-60eb-4207-9293-29fadfc52024';
const PUBLIC_DIR = 'C:/Users/VITOR HENRIQUE/.gemini/antigravity-ide/scratch/kit-da-noiva-pretinha/public/criativos';

async function generateCreative1() {
  const width = 896;
  const height = 1200;
  const inputPath = path.join(BRAIN_DIR, 'noiva_criativo_v2_1790539664469.jpg');

  // SVG Overlay with fonts, dropshadows, modern badges, and high-impact text
  const svgOverlay = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="topGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0a0503" stop-opacity="0.88"/>
        <stop offset="60%" stop-color="#0a0503" stop-opacity="0.65"/>
        <stop offset="100%" stop-color="#0a0503" stop-opacity="0.0"/>
      </linearGradient>
      <linearGradient id="bottomGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0d0705" stop-opacity="0.0"/>
        <stop offset="35%" stop-color="#0d0705" stop-opacity="0.80"/>
        <stop offset="100%" stop-color="#0d0705" stop-opacity="0.96"/>
      </linearGradient>
      <linearGradient id="goldButton" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#e2ba6d"/>
        <stop offset="50%" stop-color="#c59942"/>
        <stop offset="100%" stop-color="#9a7226"/>
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.8"/>
      </filter>
      <filter id="badgeShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000" flood-opacity="0.5"/>
      </filter>
    </defs>

    <style>
      .badge-text { font-family: 'Segoe UI', Arial, sans-serif; font-size: 15px; font-weight: 800; fill: #ffffff; letter-spacing: 2px; text-anchor: middle; }
      .main-hook { font-family: 'Segoe UI', Arial, sans-serif; font-size: 38px; font-weight: 900; fill: #ffffff; text-anchor: middle; }
      .sub-hook { font-family: 'Georgia', serif; font-size: 21px; font-style: italic; fill: #f3d9a2; text-anchor: middle; }
      .card-title { font-family: 'Segoe UI', Arial, sans-serif; font-size: 26px; font-weight: 800; fill: #ffffff; text-anchor: middle; }
      .item-text { font-family: 'Segoe UI', Arial, sans-serif; font-size: 17px; font-weight: 600; fill: #ffffff; }
      .btn-text { font-family: 'Segoe UI', Arial, sans-serif; font-size: 18px; font-weight: 800; fill: #ffffff; text-anchor: middle; letter-spacing: 1px; }
      .brand-text { font-family: 'Segoe UI', Arial, sans-serif; font-size: 14px; font-weight: 600; fill: #d4af37; text-anchor: middle; letter-spacing: 3px; }
    </style>

    <!-- Top Gradient for Readability -->
    <rect x="0" y="0" width="${width}" height="280" fill="url(#topGradient)"/>

    <!-- Top Badge -->
    <g transform="translate(${width/2 - 150}, 35)" filter="url(#badgeShadow)">
      <rect width="300" height="34" rx="17" fill="#b02a37" stroke="#ffffff" stroke-width="1.5"/>
      <text x="150" y="23" class="badge-text">🎁 100% GRATUITO • GUIA OFICIAL</text>
    </g>

    <!-- Top Headline -->
    <g filter="url(#shadow)">
      <text x="${width/2}" y="115" class="main-hook">VAI CASAR EM 2025 OU 2026?</text>
      <text x="${width/2}" y="152" class="sub-hook">Não feche nenhum contrato antes de ler este checklist!</text>
    </g>

    <!-- Bottom Gradient -->
    <rect x="0" y="${height - 340}" width="${width}" height="340" fill="url(#bottomGradient)"/>

    <!-- Bottom Floating Content Card -->
    <g transform="translate(48, ${height - 300})" filter="url(#shadow)">
      <!-- Card background glassmorphism -->
      <rect width="${width - 96}" height="260" rx="20" fill="#180e0a" fill-opacity="0.82" stroke="#d4af37" stroke-width="1.8"/>

      <!-- Title inside card -->
      <text x="${(width - 96)/2}" y="42" class="card-title">📖 PLANNER DA NOIVA — 12 MESES ATÉ O SIM</text>

      <!-- Checklist items -->
      <g transform="translate(40, 75)">
        <text x="0" y="0" class="item-text" fill="#22c55e">✓ <tspan fill="#ffffff">Cronograma completo mês a mês sem esquecer nada</tspan></text>
        <text x="0" y="28" class="item-text" fill="#22c55e">✓ <tspan fill="#ffffff">Checklist exclusivo para a escolha do Vestido dos Sonhos</tspan></text>
        <text x="0" y="56" class="item-text" fill="#22c55e">✓ <tspan fill="#ffffff">Disponível no seu celular ou para imprimir</tspan></text>
      </g>

      <!-- CTA Button -->
      <g transform="translate(${(width - 96)/2 - 190}, 155)">
        <rect width="380" height="52" rx="26" fill="url(#goldButton)" stroke="#ffffff" stroke-width="1.5"/>
        <text x="190" y="32" class="btn-text">CLIQUE AQUI E BAIXE GRÁTIS 📲</text>
      </g>

      <!-- Brand signature -->
      <text x="${(width - 96)/2}" y="240" class="brand-text">ATELIER PRETINHA • ALTA COSTURA DE NOIVAS</text>
    </g>
  </svg>
  `;

  const outputPathBrain = path.join(BRAIN_DIR, 'criativo_1_final_com_texto.jpg');
  const outputPathPublic = path.join(PUBLIC_DIR, 'criativo-1-editorial.jpg');

  await sharp(inputPath)
    .composite([{ input: Buffer.from(svgOverlay), top: 0, left: 0 }])
    .jpeg({ quality: 95 })
    .toFile(outputPathBrain);

  fs.copyFileSync(outputPathBrain, outputPathPublic);
  console.log('Creative 1 rendered successfully!');
}

async function generateCreative2() {
  const width = 1024;
  const height = 1024;
  const inputPath = path.join(BRAIN_DIR, 'flatlay_criativo_v2_1790539682815.jpg');

  const svgOverlay = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#140a06" stop-opacity="0.94"/>
        <stop offset="100%" stop-color="#24120b" stop-opacity="0.96"/>
      </linearGradient>
      <linearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#16a34a"/>
        <stop offset="100%" stop-color="#15803d"/>
      </linearGradient>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#f5d77f"/>
        <stop offset="50%" stop-color="#e0b853"/>
        <stop offset="100%" stop-color="#bd912b"/>
      </linearGradient>
      <filter id="shadow2" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000" flood-opacity="0.75"/>
      </filter>
    </defs>

    <style>
      .badge-tag { font-family: 'Segoe UI', Arial, sans-serif; font-size: 15px; font-weight: 800; fill: #000000; letter-spacing: 1.5px; }
      .header-title { font-family: 'Segoe UI', Arial, sans-serif; font-size: 38px; font-weight: 900; fill: #ffffff; }
      .header-sub { font-family: 'Georgia', serif; font-size: 20px; font-style: italic; fill: #e5c378; }
      .card-item { font-family: 'Segoe UI', Arial, sans-serif; font-size: 18px; font-weight: 600; fill: #ffffff; }
      .btn-label { font-family: 'Segoe UI', Arial, sans-serif; font-size: 19px; font-weight: 800; fill: #ffffff; text-anchor: middle; letter-spacing: 0.5px; }
      .brand-mini { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; font-weight: 700; fill: #a38241; letter-spacing: 3px; text-anchor: middle; }
    </style>

    <!-- Floating Top-Left Card -->
    <g transform="translate(50, 50)" filter="url(#shadow2)">
      <rect width="600" height="340" rx="20" fill="url(#cardGrad)" stroke="#e0b853" stroke-width="2"/>

      <!-- Badge -->
      <g transform="translate(35, 30)">
        <rect width="210" height="32" rx="16" fill="url(#goldGradient)"/>
        <text x="15" y="21" class="badge-tag">✨ PRESENTE DA NOIVA</text>
      </g>

      <text x="35" y="105" class="header-title">ORGANIZAÇÃO SEM STRESS</text>
      <text x="35" y="138" class="header-sub">O checklist que toda noiva precisa antes do Sim 💍</text>

      <!-- Lines -->
      <g transform="translate(35, 175)">
        <text x="0" y="0" class="card-item"><tspan fill="#22c55e" font-weight="900">✓</tspan> O que contratar em cada um dos 12 meses</text>
        <text x="0" y="32" class="card-item"><tspan fill="#22c55e" font-weight="900">✓</tspan> Passo a passo para não estourar o orçamento</text>
        <text x="0" y="64" class="card-item"><tspan fill="#22c55e" font-weight="900">✓</tspan> Checklist exclusivo para o Aluguel do Vestido</text>
      </g>

      <!-- Badge "Gratuito" -->
      <g transform="translate(35, 275)">
        <rect width="130" height="28" rx="8" fill="#dc2626"/>
        <text x="14" y="19" font-family="'Segoe UI', sans-serif" font-size="13" font-weight="800" fill="#fff">100% GRATUITO</text>
      </g>
    </g>

    <!-- Bottom Action Ribbon / Banner -->
    <g transform="translate(50, ${height - 145})" filter="url(#shadow2)">
      <rect width="${width - 100}" height="95" rx="18" fill="url(#cardGrad)" stroke="#ffffff" stroke-width="1.2"/>

      <!-- CTA Button -->
      <g transform="translate(${width - 100 - 360}, 20)">
        <rect width="330" height="55" rx="28" fill="url(#btnGrad)" stroke="#ffffff" stroke-width="1.5"/>
        <text x="165" y="34" class="btn-label">QUERO MEU PLANNER 📲</text>
      </g>

      <!-- Left Callout -->
      <g transform="translate(35, 42)">
        <text x="0" y="0" font-family="'Segoe UI', sans-serif" font-size="22" font-weight="800" fill="#ffffff">Baixe agora mesmo no seu celular</text>
        <text x="0" y="24" font-family="'Georgia', serif" font-size="15" font-style="italic" fill="#e0b853">Atelier Pretinha — Especialista em Noivas</text>
      </g>
    </g>
  </svg>
  `;

  const outputPathBrain = path.join(BRAIN_DIR, 'criativo_2_final_com_texto.jpg');
  const outputPathPublic = path.join(PUBLIC_DIR, 'criativo-2-flatlay.jpg');

  await sharp(inputPath)
    .composite([{ input: Buffer.from(svgOverlay), top: 0, left: 0 }])
    .jpeg({ quality: 95 })
    .toFile(outputPathBrain);

  fs.copyFileSync(outputPathBrain, outputPathPublic);
  console.log('Creative 2 rendered successfully!');
}

async function generateCreative3() {
  const width = 768;
  const height = 1376;
  const inputPath = path.join(BRAIN_DIR, 'stories_criativo_v2_1790539702516.jpg');

  // Stories format: Safe zone at top (y: 120-400), bottom (y: 980-1260)
  const svgOverlay = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="storiesTop" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0a0503" stop-opacity="0.90"/>
        <stop offset="70%" stop-color="#0a0503" stop-opacity="0.75"/>
        <stop offset="100%" stop-color="#0a0503" stop-opacity="0.0"/>
      </linearGradient>
      <linearGradient id="storiesBottom" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0a0503" stop-opacity="0.0"/>
        <stop offset="25%" stop-color="#0a0503" stop-opacity="0.85"/>
        <stop offset="100%" stop-color="#0a0503" stop-opacity="0.96"/>
      </linearGradient>
      <linearGradient id="storiesGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f5d77f"/>
        <stop offset="100%" stop-color="#c59942"/>
      </linearGradient>
      <linearGradient id="pulseGreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#22c55e"/>
        <stop offset="100%" stop-color="#15803d"/>
      </linearGradient>
      <filter id="storiesShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.8"/>
      </filter>
    </defs>

    <style>
      .stories-badge { font-family: 'Segoe UI', Arial, sans-serif; font-size: 14px; font-weight: 900; fill: #ffffff; letter-spacing: 2px; text-anchor: middle; }
      .stories-title { font-family: 'Segoe UI', Arial, sans-serif; font-size: 34px; font-weight: 900; fill: #ffffff; text-anchor: middle; }
      .stories-sub { font-family: 'Georgia', serif; font-size: 19px; font-style: italic; fill: #f5d77f; text-anchor: middle; }
      .card-item-stories { font-family: 'Segoe UI', Arial, sans-serif; font-size: 16px; font-weight: 600; fill: #ffffff; }
      .stories-btn { font-family: 'Segoe UI', Arial, sans-serif; font-size: 18px; font-weight: 900; fill: #ffffff; text-anchor: middle; letter-spacing: 1px; }
      .stories-brand { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; font-weight: 700; fill: #d4af37; text-anchor: middle; letter-spacing: 3px; }
    </style>

    <!-- Top Overlay Background -->
    <rect x="0" y="0" width="${width}" height="350" fill="url(#storiesTop)"/>

    <!-- Top Badge -->
    <g transform="translate(${width/2 - 140}, 110)" filter="url(#storiesShadow)">
      <rect width="280" height="34" rx="17" fill="#dc2626" stroke="#ffffff" stroke-width="1.5"/>
      <text x="140" y="23" class="stories-badge">💍 NOIVINHA, ATENÇÃO!</text>
    </g>

    <!-- Top Headlines -->
    <g filter="url(#storiesShadow)">
      <text x="${width/2}" y="185" class="stories-title">LIBERAMOS O PLANNER</text>
      <text x="${width/2}" y="222" class="stories-title" fill="#f5d77f">DA NOIVA GRATUITO! 🎉</text>
      <text x="${width/2}" y="260" class="stories-sub">12 meses para organizar tudo sem desespero</text>
    </g>

    <!-- Bottom Overlay Background -->
    <rect x="0" y="${height - 380}" width="${width}" height="380" fill="url(#storiesBottom)"/>

    <!-- Bottom Feature Box -->
    <g transform="translate(40, ${height - 330})" filter="url(#storiesShadow)">
      <rect width="${width - 80}" height="260" rx="20" fill="#140a06" fill-opacity="0.88" stroke="#f5d77f" stroke-width="1.8"/>

      <!-- Checklist points -->
      <g transform="translate(30, 42)">
        <text x="0" y="0" class="card-item-stories"><tspan fill="#22c55e" font-weight="900">✔</tspan> Passo a passo do que contratar mês a mês</text>
        <text x="0" y="30" class="card-item-stories"><tspan fill="#22c55e" font-weight="900">✔</tspan> Guia para escolher o Vestido Perfeito</text>
        <text x="0" y="60" class="card-item-stories"><tspan fill="#22c55e" font-weight="900">✔</tspan> Salve no celular e leve para qualquer lugar</text>
      </g>

      <!-- CTA Button -->
      <g transform="translate(${(width - 80)/2 - 170}, 140)">
        <rect width="340" height="54" rx="27" fill="url(#pulseGreen)" stroke="#ffffff" stroke-width="1.5"/>
        <text x="170" y="34" class="stories-btn">TOQUE AQUI E PEGUE O SEU 📲</text>
      </g>

      <text x="${(width - 80)/2}" y="232" class="stories-brand">ATELIER PRETINHA • EXCLUSIVO PARA NOIVAS</text>
    </g>
  </svg>
  `;

  const outputPathBrain = path.join(BRAIN_DIR, 'criativo_3_final_com_texto.jpg');
  const outputPathPublic = path.join(PUBLIC_DIR, 'criativo-3-stories.jpg');

  await sharp(inputPath)
    .composite([{ input: Buffer.from(svgOverlay), top: 0, left: 0 }])
    .jpeg({ quality: 95 })
    .toFile(outputPathBrain);

  fs.copyFileSync(outputPathBrain, outputPathPublic);
  console.log('Creative 3 rendered successfully!');
}

async function main() {
  await generateCreative1();
  await generateCreative2();
  await generateCreative3();
  console.log('ALL 3 CREATIVES FINISHED!');
}

main().catch(err => {
  console.error('Error generating creatives:', err);
  process.exit(1);
});

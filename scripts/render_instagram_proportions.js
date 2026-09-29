const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const BRAIN_DIR = 'C:/Users/VITOR HENRIQUE/.gemini/antigravity-ide/brain/be152794-60eb-4207-9293-29fadfc52024';
const PUBLIC_DIR = 'C:/Users/VITOR HENRIQUE/.gemini/antigravity-ide/scratch/kit-da-noiva-pretinha/public/criativos';
const DESKTOP_DIR = 'C:/Users/VITOR HENRIQUE/Desktop/Criativos_Atelier_Pretinha';
const DOWNLOADS_DIR = 'C:/Users/VITOR HENRIQUE/Downloads/Criativos_Atelier_Pretinha';

const BASE_NOIVA_EDITORIAL = path.join(BRAIN_DIR, 'noiva_criativo_v2_1790539664469.jpg');
const BASE_FLATLAY = path.join(BRAIN_DIR, 'flatlay_criativo_v2_1790539682815.jpg');
const BASE_PROVADOR = path.join(BRAIN_DIR, 'stories_criativo_v2_1790539702516.jpg');

async function renderStory1() {
  // 1080 x 1920 (9:16) - Provador com Noiva e Celular
  const width = 1080;
  const height = 1920;

  // Resize base image to cover 1080x1920 cleanly
  const resizedBase = await sharp(BASE_PROVADOR)
    .resize(width, height, { fit: 'cover', position: 'center' })
    .toBuffer();

  // SVG Overlay respecting Meta Stories Safe Zones:
  // Top safe margin: > 260px (content starts at y=270)
  // Bottom safe margin: > 350px (content ends at y=1560)
  const svgOverlay = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="storyTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0a0503" stop-opacity="0.92"/>
        <stop offset="65%" stop-color="#0a0503" stop-opacity="0.75"/>
        <stop offset="100%" stop-color="#0a0503" stop-opacity="0.0"/>
      </linearGradient>
      <linearGradient id="storyBottomGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0a0503" stop-opacity="0.0"/>
        <stop offset="25%" stop-color="#0a0503" stop-opacity="0.85"/>
        <stop offset="85%" stop-color="#0a0503" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="#0a0503" stop-opacity="0.98"/>
      </linearGradient>
      <linearGradient id="btnGreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#22c55e"/>
        <stop offset="100%" stop-color="#15803d"/>
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="5" stdDeviation="7" flood-color="#000" flood-opacity="0.85"/>
      </filter>
    </defs>

    <style>
      .badge-text { font-family: 'Segoe UI', Arial, sans-serif; font-size: 19px; font-weight: 900; fill: #ffffff; letter-spacing: 2px; text-anchor: middle; }
      .main-title { font-family: 'Segoe UI', Arial, sans-serif; font-size: 44px; font-weight: 900; fill: #ffffff; text-anchor: middle; }
      .sub-title { font-family: 'Georgia', serif; font-size: 26px; font-style: italic; fill: #f5d77f; text-anchor: middle; }
      .item-text { font-family: 'Segoe UI', Arial, sans-serif; font-size: 22px; font-weight: 600; fill: #ffffff; }
      .btn-text { font-family: 'Segoe UI', Arial, sans-serif; font-size: 24px; font-weight: 900; fill: #ffffff; text-anchor: middle; letter-spacing: 1px; }
      .brand-text { font-family: 'Segoe UI', Arial, sans-serif; font-size: 16px; font-weight: 700; fill: #d4af37; text-anchor: middle; letter-spacing: 4px; }
    </style>

    <!-- Top Gradient (y: 0 to 520) -->
    <rect x="0" y="0" width="${width}" height="520" fill="url(#storyTopGrad)"/>

    <!-- SAFE ZONE TOP: Starts at y=270 (Free from Instagram profile/header) -->
    <g transform="translate(${width/2 - 180}, 270)" filter="url(#shadow)">
      <rect width="360" height="46" rx="23" fill="#dc2626" stroke="#ffffff" stroke-width="2"/>
      <text x="180" y="30" class="badge-text">💍 NOIVINHA, ATENÇÃO!</text>
    </g>

    <g filter="url(#shadow)">
      <text x="${width/2}" y="375" class="main-title">LIBERAMOS O PLANNER</text>
      <text x="${width/2}" y="425" class="main-title" fill="#f5d77f">DA NOIVA GRATUITO! 🎉</text>
      <text x="${width/2}" y="475" class="sub-title">12 meses para organizar tudo sem desespero</text>
    </g>

    <!-- Bottom Gradient (y: 1150 to 1920) -->
    <rect x="0" y="1150" width="${width}" height="770" fill="url(#storyBottomGrad)"/>

    <!-- SAFE ZONE BOTTOM: Ends at y=1560 (Free from Instagram reply bar and CTA sticker) -->
    <g transform="translate(60, 1190)" filter="url(#shadow)">
      <rect width="${width - 120}" height="350" rx="26" fill="#140a06" fill-opacity="0.90" stroke="#f5d77f" stroke-width="2.5"/>

      <!-- Checklist items -->
      <g transform="translate(45, 55)">
        <text x="0" y="0" class="item-text"><tspan fill="#22c55e" font-weight="900">✔</tspan> Passo a passo do que contratar mês a mês</text>
        <text x="0" y="42" class="item-text"><tspan fill="#22c55e" font-weight="900">✔</tspan> Guia para escolher o Vestido Perfeito</text>
        <text x="0" y="84" class="item-text"><tspan fill="#22c55e" font-weight="900">✔</tspan> Salve no celular e leve para qualquer lugar</text>
      </g>

      <!-- CTA Button inside card -->
      <g transform="translate(${(width - 120)/2 - 230}, 190)">
        <rect width="460" height="70" rx="35" fill="url(#btnGreen)" stroke="#ffffff" stroke-width="2"/>
        <text x="230" y="45" class="btn-text">TOQUE AQUI E PEGUE O SEU 📲</text>
      </g>

      <text x="${(width - 120)/2}" y="315" class="brand-text">ATELIER PRETINHA • EXCLUSIVO PARA NOIVAS</text>
    </g>
  </svg>
  `;

  const finalBuffer = await sharp(resizedBase)
    .composite([{ input: Buffer.from(svgOverlay), top: 0, left: 0 }])
    .jpeg({ quality: 95 })
    .toBuffer();

  const outBrain = path.join(BRAIN_DIR, '1_Story_9x16_Noiva_Provador.jpg');
  const outDesktop = path.join(DESKTOP_DIR, '1_Story_9x16_Noiva_Provador.jpg');
  const outDownloads = path.join(DOWNLOADS_DIR, '1_Story_9x16_Noiva_Provador.jpg');
  const outPublic = path.join(PUBLIC_DIR, 'story-1-provador.jpg');

  fs.writeFileSync(outBrain, finalBuffer);
  fs.writeFileSync(outDesktop, finalBuffer);
  fs.writeFileSync(outDownloads, finalBuffer);
  fs.writeFileSync(outPublic, finalBuffer);
  console.log('Story 1 (9:16) rendered successfully at 1080x1920!');
}

async function renderStory2() {
  // 1080 x 1920 (9:16) - Noiva no Ateliê com Planner
  const width = 1080;
  const height = 1920;

  const resizedBase = await sharp(BASE_NOIVA_EDITORIAL)
    .resize(width, height, { fit: 'cover', position: 'top' })
    .toBuffer();

  const svgOverlay = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="story2TopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0a0503" stop-opacity="0.94"/>
        <stop offset="65%" stop-color="#0a0503" stop-opacity="0.75"/>
        <stop offset="100%" stop-color="#0a0503" stop-opacity="0.0"/>
      </linearGradient>
      <linearGradient id="story2BottomGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0a0503" stop-opacity="0.0"/>
        <stop offset="25%" stop-color="#0a0503" stop-opacity="0.85"/>
        <stop offset="85%" stop-color="#0a0503" stop-opacity="0.96"/>
        <stop offset="100%" stop-color="#0a0503" stop-opacity="0.98"/>
      </linearGradient>
      <linearGradient id="goldBtn" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f5d77f"/>
        <stop offset="50%" stop-color="#c59942"/>
        <stop offset="100%" stop-color="#9a7226"/>
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="5" stdDeviation="7" flood-color="#000" flood-opacity="0.85"/>
      </filter>
    </defs>

    <style>
      .badge-text { font-family: 'Segoe UI', Arial, sans-serif; font-size: 19px; font-weight: 900; fill: #ffffff; letter-spacing: 2px; text-anchor: middle; }
      .main-title { font-family: 'Segoe UI', Arial, sans-serif; font-size: 46px; font-weight: 900; fill: #ffffff; text-anchor: middle; }
      .sub-title { font-family: 'Georgia', serif; font-size: 26px; font-style: italic; fill: #f5d77f; text-anchor: middle; }
      .item-text { font-family: 'Segoe UI', Arial, sans-serif; font-size: 22px; font-weight: 600; fill: #ffffff; }
      .btn-text { font-family: 'Segoe UI', Arial, sans-serif; font-size: 23px; font-weight: 900; fill: #000000; text-anchor: middle; letter-spacing: 0.5px; }
      .brand-text { font-family: 'Segoe UI', Arial, sans-serif; font-size: 16px; font-weight: 700; fill: #d4af37; text-anchor: middle; letter-spacing: 4px; }
    </style>

    <!-- Top Gradient (y: 0 to 520) -->
    <rect x="0" y="0" width="${width}" height="520" fill="url(#story2TopGrad)"/>

    <!-- SAFE ZONE TOP: Starts at y=270 (Free from Instagram profile/header) -->
    <g transform="translate(${width/2 - 200}, 270)" filter="url(#shadow)">
      <rect width="400" height="46" rx="23" fill="#b02a37" stroke="#ffffff" stroke-width="2"/>
      <text x="200" y="30" class="badge-text">🎁 100% GRATUITO • GUIA OFICIAL</text>
    </g>

    <g filter="url(#shadow)">
      <text x="${width/2}" y="380" class="main-title">VAI CASAR EM 2026 OU 2027?</text>
      <text x="${width/2}" y="430" class="sub-title">Não feche nenhum contrato antes de ler este checklist!</text>
    </g>

    <!-- Bottom Gradient (y: 1150 to 1920) -->
    <rect x="0" y="1150" width="${width}" height="770" fill="url(#story2BottomGrad)"/>

    <!-- SAFE ZONE BOTTOM: Ends at y=1560 -->
    <g transform="translate(60, 1190)" filter="url(#shadow)">
      <rect width="${width - 120}" height="350" rx="26" fill="#140a06" fill-opacity="0.90" stroke="#d4af37" stroke-width="2.5"/>

      <!-- Checklist items -->
      <g transform="translate(45, 55)">
        <text x="0" y="0" class="item-text"><tspan fill="#22c55e" font-weight="900">✔</tspan> Cronograma completo mês a mês sem esquecer nada</text>
        <text x="0" y="42" class="item-text"><tspan fill="#22c55e" font-weight="900">✔</tspan> Checklist exclusivo para a escolha do Vestido Perfeito</text>
        <text x="0" y="84" class="item-text"><tspan fill="#22c55e" font-weight="900">✔</tspan> Salve no celular ou imprima quando quiser</text>
      </g>

      <!-- CTA Button -->
      <g transform="translate(${(width - 120)/2 - 230}, 190)">
        <rect width="460" height="70" rx="35" fill="url(#goldBtn)" stroke="#ffffff" stroke-width="2"/>
        <text x="230" y="45" class="btn-text">CLIQUE NO LINK E BAIXE GRÁTIS 📲</text>
      </g>

      <text x="${(width - 120)/2}" y="315" class="brand-text">ATELIER PRETINHA • ALTA COSTURA DE NOIVAS</text>
    </g>
  </svg>
  `;

  const finalBuffer = await sharp(resizedBase)
    .composite([{ input: Buffer.from(svgOverlay), top: 0, left: 0 }])
    .jpeg({ quality: 95 })
    .toBuffer();

  const outBrain = path.join(BRAIN_DIR, '2_Story_9x16_Noiva_Editorial.jpg');
  const outDesktop = path.join(DESKTOP_DIR, '2_Story_9x16_Noiva_Editorial.jpg');
  const outDownloads = path.join(DOWNLOADS_DIR, '2_Story_9x16_Noiva_Editorial.jpg');
  const outPublic = path.join(PUBLIC_DIR, 'story-2-editorial.jpg');

  fs.writeFileSync(outBrain, finalBuffer);
  fs.writeFileSync(outDesktop, finalBuffer);
  fs.writeFileSync(outDownloads, finalBuffer);
  fs.writeFileSync(outPublic, finalBuffer);
  console.log('Story 2 (9:16) rendered successfully at 1080x1920!');
}

async function renderFeed1() {
  // 1080 x 1350 (4:5 Retrato Oficial Feed Instagram)
  const width = 1080;
  const height = 1350;

  const resizedBase = await sharp(BASE_NOIVA_EDITORIAL)
    .resize(width, height, { fit: 'cover', position: 'top' })
    .toBuffer();

  const svgOverlay = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="feedTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0a0503" stop-opacity="0.90"/>
        <stop offset="60%" stop-color="#0a0503" stop-opacity="0.65"/>
        <stop offset="100%" stop-color="#0a0503" stop-opacity="0.0"/>
      </linearGradient>
      <linearGradient id="feedBottomGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0d0705" stop-opacity="0.0"/>
        <stop offset="35%" stop-color="#0d0705" stop-opacity="0.80"/>
        <stop offset="100%" stop-color="#0d0705" stop-opacity="0.96"/>
      </linearGradient>
      <linearGradient id="goldBtn45" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f5d77f"/>
        <stop offset="50%" stop-color="#c59942"/>
        <stop offset="100%" stop-color="#9a7226"/>
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.8"/>
      </filter>
    </defs>

    <style>
      .badge-text { font-family: 'Segoe UI', Arial, sans-serif; font-size: 17px; font-weight: 800; fill: #ffffff; letter-spacing: 2px; text-anchor: middle; }
      .main-hook { font-family: 'Segoe UI', Arial, sans-serif; font-size: 42px; font-weight: 900; fill: #ffffff; text-anchor: middle; }
      .sub-hook { font-family: 'Georgia', serif; font-size: 24px; font-style: italic; fill: #f3d9a2; text-anchor: middle; }
      .card-title { font-family: 'Segoe UI', Arial, sans-serif; font-size: 29px; font-weight: 800; fill: #ffffff; text-anchor: middle; }
      .item-text { font-family: 'Segoe UI', Arial, sans-serif; font-size: 19px; font-weight: 600; fill: #ffffff; }
      .btn-text { font-family: 'Segoe UI', Arial, sans-serif; font-size: 20px; font-weight: 800; fill: #000000; text-anchor: middle; letter-spacing: 1px; }
      .brand-text { font-family: 'Segoe UI', Arial, sans-serif; font-size: 15px; font-weight: 600; fill: #d4af37; text-anchor: middle; letter-spacing: 3px; }
    </style>

    <!-- Top Gradient -->
    <rect x="0" y="0" width="${width}" height="320" fill="url(#feedTopGrad)"/>

    <!-- Top Badge -->
    <g transform="translate(${width/2 - 180}, 45)" filter="url(#shadow)">
      <rect width="360" height="40" rx="20" fill="#b02a37" stroke="#ffffff" stroke-width="1.8"/>
      <text x="180" y="27" class="badge-text">🎁 100% GRATUITO • GUIA OFICIAL</text>
    </g>

    <!-- Top Headline -->
    <g filter="url(#shadow)">
      <text x="${width/2}" y="130" class="main-hook">VAI CASAR EM 2026 OU 2027?</text>
      <text x="${width/2}" y="172" class="sub-hook">Não feche nenhum contrato antes de ler este checklist!</text>
    </g>

    <!-- Bottom Gradient -->
    <rect x="0" y="${height - 390}" width="${width}" height="390" fill="url(#feedBottomGrad)"/>

    <!-- Bottom Floating Content Card (Fits perfectly inside 4:5 frame) -->
    <g transform="translate(60, ${height - 350})" filter="url(#shadow)">
      <rect width="${width - 120}" height="300" rx="24" fill="#180e0a" fill-opacity="0.88" stroke="#d4af37" stroke-width="2"/>

      <text x="${(width - 120)/2}" y="48" class="card-title">📖 PLANNER DA NOIVA — 12 MESES ATÉ O SIM</text>

      <g transform="translate(45, 88)">
        <text x="0" y="0" class="item-text" fill="#22c55e">✓ <tspan fill="#ffffff">Cronograma completo mês a mês sem esquecer nada</tspan></text>
        <text x="0" y="32" class="item-text" fill="#22c55e">✓ <tspan fill="#ffffff">Checklist exclusivo para a escolha do Vestido dos Sonhos</tspan></text>
        <text x="0" y="64" class="item-text" fill="#22c55e">✓ <tspan fill="#ffffff">Disponível no seu celular ou para imprimir</tspan></text>
      </g>

      <g transform="translate(${(width - 120)/2 - 220}, 180)">
        <rect width="440" height="60" rx="30" fill="url(#goldBtn45)" stroke="#ffffff" stroke-width="1.8"/>
        <text x="220" y="38" class="btn-text">CLIQUE AQUI E BAIXE GRÁTIS 📲</text>
      </g>

      <text x="${(width - 120)/2}" y="278" class="brand-text">ATELIER PRETINHA • ALTA COSTURA DE NOIVAS</text>
    </g>
  </svg>
  `;

  const finalBuffer = await sharp(resizedBase)
    .composite([{ input: Buffer.from(svgOverlay), top: 0, left: 0 }])
    .jpeg({ quality: 95 })
    .toBuffer();

  const outBrain = path.join(BRAIN_DIR, '3_Feed_4x5_Noiva_Editorial.jpg');
  const outDesktop = path.join(DESKTOP_DIR, '3_Feed_4x5_Noiva_Editorial.jpg');
  const outDownloads = path.join(DOWNLOADS_DIR, '3_Feed_4x5_Noiva_Editorial.jpg');
  const outPublic = path.join(PUBLIC_DIR, 'feed-1-editorial-4x5.jpg');

  fs.writeFileSync(outBrain, finalBuffer);
  fs.writeFileSync(outDesktop, finalBuffer);
  fs.writeFileSync(outDownloads, finalBuffer);
  fs.writeFileSync(outPublic, finalBuffer);
  console.log('Feed 1 (4:5) rendered successfully at 1080x1350!');
}

async function renderFeed2() {
  // 1080 x 1080 (1:1 Quadrado Oficial Feed Instagram/Facebook)
  const width = 1080;
  const height = 1080;

  const resizedBase = await sharp(BASE_FLATLAY)
    .resize(width, height, { fit: 'cover', position: 'center' })
    .toBuffer();

  const svgOverlay = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cardGrad1x1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#140a06" stop-opacity="0.94"/>
        <stop offset="100%" stop-color="#24120b" stop-opacity="0.96"/>
      </linearGradient>
      <linearGradient id="btnGradGreen1x1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#16a34a"/>
        <stop offset="100%" stop-color="#15803d"/>
      </linearGradient>
      <linearGradient id="goldGradient1x1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#f5d77f"/>
        <stop offset="50%" stop-color="#e0b853"/>
        <stop offset="100%" stop-color="#bd912b"/>
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000" flood-opacity="0.75"/>
      </filter>
    </defs>

    <style>
      .badge-tag { font-family: 'Segoe UI', Arial, sans-serif; font-size: 16px; font-weight: 800; fill: #000000; letter-spacing: 1.5px; }
      .header-title { font-family: 'Segoe UI', Arial, sans-serif; font-size: 40px; font-weight: 900; fill: #ffffff; }
      .header-sub { font-family: 'Georgia', serif; font-size: 22px; font-style: italic; fill: #e5c378; }
      .card-item { font-family: 'Segoe UI', Arial, sans-serif; font-size: 19px; font-weight: 600; fill: #ffffff; }
      .btn-label { font-family: 'Segoe UI', Arial, sans-serif; font-size: 20px; font-weight: 800; fill: #ffffff; text-anchor: middle; letter-spacing: 0.5px; }
    </style>

    <!-- Floating Top-Left Card (Well inside margins) -->
    <g transform="translate(50, 50)" filter="url(#shadow)">
      <rect width="640" height="350" rx="22" fill="url(#cardGrad1x1)" stroke="#e0b853" stroke-width="2.2"/>

      <!-- Badge -->
      <g transform="translate(35, 30)">
        <rect width="240" height="34" rx="17" fill="url(#goldGradient1x1)"/>
        <text x="15" y="23" class="badge-tag">✨ PRESENTE DA NOIVA</text>
      </g>

      <text x="35" y="110" class="header-title">ORGANIZAÇÃO SEM STRESS</text>
      <text x="35" y="145" class="header-sub">O checklist que toda noiva precisa antes do Sim 💍</text>

      <!-- Lines -->
      <g transform="translate(35, 185)">
        <text x="0" y="0" class="card-item"><tspan fill="#22c55e" font-weight="900">✓</tspan> O que contratar em cada um dos 12 meses</text>
        <text x="0" y="34" class="card-item"><tspan fill="#22c55e" font-weight="900">✓</tspan> Passo a passo para não estourar prazos</text>
        <text x="0" y="68" class="card-item"><tspan fill="#22c55e" font-weight="900">✓</tspan> Checklist exclusivo para a prova do Vestido</text>
      </g>

      <!-- Badge "Gratuito" -->
      <g transform="translate(35, 285)">
        <rect width="140" height="30" rx="9" fill="#dc2626"/>
        <text x="14" y="20" font-family="'Segoe UI', sans-serif" font-size="14" font-weight="800" fill="#fff">100% GRATUITO</text>
      </g>
    </g>

    <!-- Bottom Action Ribbon / Banner (Fits inside 1:1 frame) -->
    <g transform="translate(50, ${height - 150})" filter="url(#shadow)">
      <rect width="${width - 100}" height="100" rx="20" fill="url(#cardGrad1x1)" stroke="#ffffff" stroke-width="1.5"/>

      <!-- CTA Button -->
      <g transform="translate(${width - 100 - 370}, 20)">
        <rect width="340" height="60" rx="30" fill="url(#btnGradGreen1x1)" stroke="#ffffff" stroke-width="1.8"/>
        <text x="170" y="38" class="btn-label">QUERO MEU PLANNER 📲</text>
      </g>

      <!-- Left Callout -->
      <g transform="translate(35, 42)">
        <text x="0" y="0" font-family="'Segoe UI', sans-serif" font-size="23" font-weight="800" fill="#ffffff">Baixe agora mesmo no seu celular</text>
        <text x="0" y="26" font-family="'Georgia', serif" font-size="16" font-style="italic" fill="#e0b853">Atelier Pretinha — Especialista em Noivas</text>
      </g>
    </g>
  </svg>
  `;

  const finalBuffer = await sharp(resizedBase)
    .composite([{ input: Buffer.from(svgOverlay), top: 0, left: 0 }])
    .jpeg({ quality: 95 })
    .toBuffer();

  const outBrain = path.join(BRAIN_DIR, '4_Feed_1x1_Quadrado_Mesa.jpg');
  const outDesktop = path.join(DESKTOP_DIR, '4_Feed_1x1_Quadrado_Mesa.jpg');
  const outDownloads = path.join(DOWNLOADS_DIR, '4_Feed_1x1_Quadrado_Mesa.jpg');
  const outPublic = path.join(PUBLIC_DIR, 'feed-2-mesa-1x1.jpg');

  fs.writeFileSync(outBrain, finalBuffer);
  fs.writeFileSync(outDesktop, finalBuffer);
  fs.writeFileSync(outDownloads, finalBuffer);
  fs.writeFileSync(outPublic, finalBuffer);
  console.log('Feed 2 (1:1) rendered successfully at 1080x1080!');
}

async function main() {
  await renderStory1();
  await renderStory2();
  await renderFeed1();
  await renderFeed2();
  console.log('ALL 4 INSTAGRAM PROPORTIONAL CREATIVES GENERATED!');
}

main().catch(err => {
  console.error('Render error:', err);
  process.exit(1);
});

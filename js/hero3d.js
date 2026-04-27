import * as THREE from "./three.module.min.js";

const canvas = document.getElementById("hero-canvas");
const stage = document.getElementById("hero-stage");

if (canvas && stage) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const modeButtons = [...document.querySelectorAll(".hero-mode")];

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
    preserveDrawingBuffer: true,
  });

  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0xebe5da, 0.022);

  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  const root = new THREE.Group();
  const sculpture = new THREE.Group();
  const equalizerBars = [];
  const orbitals = [];
  const waveRings = [];
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

  scene.add(root);
  root.add(sculpture);

  const palette = {
    pulse: {
      main: new THREE.Color("#c01822"),
      accent: new THREE.Color("#f6b06c"),
      glow: new THREE.Color("#ff3941"),
      foliage: new THREE.Color("#466a32"),
      speed: 1.15,
      lift: 1,
    },
    bass: {
      main: new THREE.Color("#111111"),
      accent: new THREE.Color("#c01822"),
      glow: new THREE.Color("#2f6df6"),
      foliage: new THREE.Color("#315b39"),
      speed: 1.75,
      lift: 1.35,
    },
    chill: {
      main: new THREE.Color("#e9e2d7"),
      accent: new THREE.Color("#2e7d68"),
      glow: new THREE.Color("#6fb6a6"),
      foliage: new THREE.Color("#5c7c45"),
      speed: 0.72,
      lift: 0.82,
    },
  };

  let activeMode = "pulse";

  const stoneTexture = createTexture("#a8957e", "#5b4d3f", 120);
  const ceramicTexture = createTexture("#d3252e", "#7a1117", 180);

  const brandMaterial = new THREE.MeshStandardMaterial({
    color: palette.pulse.main,
    map: ceramicTexture,
    metalness: 0.16,
    roughness: 0.5,
    emissive: new THREE.Color("#2b0507"),
    emissiveIntensity: 0.08,
  });

  const sideMaterial = new THREE.MeshStandardMaterial({
    color: "#2a1715",
    metalness: 0.22,
    roughness: 0.58,
  });

  const topGrassMaterial = new THREE.MeshStandardMaterial({
    color: palette.pulse.foliage,
    roughness: 0.92,
  });

  const soilMaterial = new THREE.MeshStandardMaterial({
    color: "#5d4636",
    map: stoneTexture,
    roughness: 0.9,
  });

  const darkMaterial = new THREE.MeshStandardMaterial({
    color: "#171411",
    roughness: 0.52,
    metalness: 0.12,
  });

  const warmMaterial = new THREE.MeshStandardMaterial({
    color: "#f6b06c",
    roughness: 0.55,
    metalness: 0.08,
  });

  const lightMaterial = new THREE.MeshStandardMaterial({
    color: "#f1ece3",
    roughness: 0.72,
  });

  const redLight = new THREE.PointLight(0xff3941, 2.7, 9);
  redLight.position.set(-3.2, 2.4, 3.2);
  scene.add(redLight);

  const blueLight = new THREE.PointLight(0x3f7eff, 1.35, 9);
  blueLight.position.set(3.4, 1.2, 3.4);
  scene.add(blueLight);

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8a775f, 1.8);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.35);
  keyLight.position.set(4.5, 6, 5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(2048, 2048);
  keyLight.shadow.camera.near = 0.1;
  keyLight.shadow.camera.far = 16;
  keyLight.shadow.camera.left = -6;
  keyLight.shadow.camera.right = 6;
  keyLight.shadow.camera.top = 6;
  keyLight.shadow.camera.bottom = -6;
  scene.add(keyLight);

  buildScene();
  attachInteractions();
  resize();
  window.addEventListener("resize", resize, { passive: true });

  if (reduceMotion) {
    renderStatic();
  } else {
    renderer.setAnimationLoop(animate);
  }

  function buildScene() {
    const island = new THREE.Group();
    island.position.y = -1.25;
    sculpture.add(island);

    const soil = new THREE.Mesh(new THREE.CylinderGeometry(2.65, 3.05, 0.62, 96), soilMaterial);
    soil.scale.z = 0.62;
    soil.receiveShadow = true;
    soil.castShadow = true;
    island.add(soil);

    const meadow = new THREE.Mesh(new THREE.CylinderGeometry(2.46, 2.58, 0.14, 96), topGrassMaterial);
    meadow.position.y = 0.36;
    meadow.scale.z = 0.6;
    meadow.receiveShadow = true;
    island.add(meadow);

    const mMesh = new THREE.Mesh(createMGeometry(), [brandMaterial, sideMaterial]);
    mMesh.name = "mumix-m";
    mMesh.position.set(0, 1.42, 0);
    mMesh.rotation.set(-0.08, -0.24, 0.035);
    mMesh.scale.set(0.98, 1.05, 0.98);
    mMesh.castShadow = true;
    mMesh.receiveShadow = true;
    sculpture.add(mMesh);

    const mInset = new THREE.Mesh(createMGeometry(), new THREE.MeshStandardMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: 0.08,
      roughness: 0.28,
      metalness: 0.1,
    }));
    mInset.position.copy(mMesh.position);
    mInset.position.z += 0.5;
    mInset.rotation.copy(mMesh.rotation);
    mInset.scale.set(0.91, 0.98, 0.88);
    sculpture.add(mInset);

    addGrass(island);
    addRocks(island);
    addEqualizer(island);
    addWaveRings();
    addOrbitingIcons(); 
    addFloatingPanels();

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(7, 96),
      new THREE.ShadowMaterial({ color: 0x2f241b, opacity: 0.16 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.62;
    floor.receiveShadow = true;
    scene.add(floor);
  }

  function createMGeometry() {
    const shape = new THREE.Shape();
    shape.moveTo(-1.8, -1.28);
    shape.lineTo(-1.8, 1.28);
    shape.lineTo(-0.7, 1.28);
    shape.lineTo(0, 0.2);
    shape.lineTo(0.7, 1.28);
    shape.lineTo(1.8, 1.28);
    shape.lineTo(1.8, -1.28);
    shape.lineTo(1.1, -1.28);
    shape.lineTo(1.1, 0.4);
    shape.lineTo(0, -0.6);
    shape.lineTo(-1.1, 0.4);
    shape.lineTo(-1.1, -1.28);
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.85,
      bevelEnabled: true,
      bevelSize: 0.08,
      bevelThickness: 0.1,
      bevelSegments: 8,
      curveSegments: 12,
      steps: 1,
    });

    geometry.center();
    geometry.computeVertexNormals();
    return geometry;
  }

  function addGrass(parent) {
    const bladeGeo = new THREE.ConeGeometry(0.026, 0.34, 5);
    const flowerGeo = new THREE.SphereGeometry(0.04, 10, 8);
    const rng = seededRandom(14);

    for (let i = 0; i < 115; i++) {
      const angle = rng() * Math.PI * 2;
      const radius = 0.55 + rng() * 1.95;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius * 0.58;
      const blade = new THREE.Mesh(bladeGeo, topGrassMaterial);
      const height = 0.5 + rng() * 0.55;
      blade.scale.set(0.7 + rng() * 0.75, height, 0.7 + rng() * 0.75);
      blade.position.set(x, 0.55 + height * 0.08, z);
      blade.rotation.set((rng() - 0.5) * 0.65, rng() * Math.PI, (rng() - 0.5) * 0.55);
      blade.castShadow = true;
      parent.add(blade);

      if (i % 19 === 0) {
        const flower = new THREE.Mesh(flowerGeo, i % 38 === 0 ? warmMaterial : lightMaterial);
        flower.position.set(x, 0.86 + height * 0.11, z);
        flower.castShadow = true;
        parent.add(flower);
      }
    }
  }

  function addRocks(parent) {
    const rockGeo = new THREE.DodecahedronGeometry(0.22, 1);
    const rockMaterial = new THREE.MeshStandardMaterial({
      color: "#7a7065",
      roughness: 0.86,
      metalness: 0.02,
    });

    [
      [-1.95, 0.5, 0.36, 1.2],
      [2.1, 0.45, -0.22, 0.9],
      [1.48, 0.46, 0.72, 0.68],
      [-0.7, 0.48, -0.92, 0.72],
    ].forEach(([x, y, z, scale], index) => {
      const rock = new THREE.Mesh(rockGeo, rockMaterial);
      rock.position.set(x, y, z);
      rock.scale.setScalar(scale);
      rock.rotation.set(index * 0.8, index * 0.45, index * 0.33);
      rock.castShadow = true;
      rock.receiveShadow = true;
      parent.add(rock);
    });
  }

  function addEqualizer(parent) {
    const barGeo = new THREE.BoxGeometry(0.12, 1, 0.12);
    for (let i = 0; i < 16; i++) {
      const mat = new THREE.MeshStandardMaterial({
        color: i % 3 === 0 ? "#c01822" : i % 3 === 1 ? "#171411" : "#f6b06c",
        roughness: 0.48,
        metalness: 0.22,
      });
      const bar = new THREE.Mesh(barGeo, mat);
      bar.position.set(-1.6 + i * 0.22, 0.72, 1.1);
      bar.scale.y = 0.25;
      bar.castShadow = true;
      parent.add(bar);
      equalizerBars.push(bar);
    }
  }

  function addWaveRings() {
    const ringMaterialA = new THREE.MeshBasicMaterial({
      color: "#c01822",
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
    });
    const ringMaterialB = new THREE.MeshBasicMaterial({
      color: "#171411",
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
    });

    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.05 + i * 0.42, 0.012, 10, 160), i % 2 ? ringMaterialB : ringMaterialA);
      ring.rotation.set(Math.PI / 2.35, 0.1 + i * 0.25, -0.16 + i * 0.18);
      ring.position.y = 0.04 + i * 0.18;
      ring.scale.z = 0.36;
      sculpture.add(ring);
      waveRings.push(ring);
    }
  }

  function addOrbitingIcons() {
    const discordTexture = createIconTexture('discord');
    const musicTexture = createIconTexture('music');
    const audioTexture = createIconTexture('audio');

    const configs = [
      [2.5, 0.74, 0, discordTexture],
      [2.92, 1.08, 2.1, musicTexture],
      [2.32, 1.44, 4.2, audioTexture],
      [2.75, 1.05, 5.6, musicTexture],
    ];

    configs.forEach(([radius, y, angle, texture]) => {
      const carrier = new THREE.Group();
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(0.48, 0.48, 1);
      
      carrier.add(sprite);
      carrier.userData = { radius, y, angle, speed: 0.24 + radius * 0.035 };
      sculpture.add(carrier);
      orbitals.push(carrier);
    });
  }

  function addFloatingPanels() {
    const panelGeo = new THREE.BoxGeometry(0.58, 0.1, 0.38);
    const panelMaterial = new THREE.MeshStandardMaterial({
      color: "#f1ece3",
      roughness: 0.48,
      metalness: 0.08,
    });

    for (let i = 0; i < 5; i++) {
      const panel = new THREE.Mesh(panelGeo, panelMaterial);
      panel.position.set(-2.2 + i * 1.1, 0.1 + i * 0.08, -1.08 - i * 0.1);
      panel.rotation.set(-0.15, 0.2 - i * 0.06, 0.06 - i * 0.03);
      panel.scale.set(1, 0.75 + i * 0.1, 1);
      panel.castShadow = true;
      sculpture.add(panel);
    }
  }

  function attachInteractions() {
    window.addEventListener("pointermove", (event) => {
      const rect = stage.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      pointer.tx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.ty = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    }, { passive: true });

    modeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeMode = button.dataset.mode || "pulse";
        modeButtons.forEach((item) => item.classList.toggle("active", item === button));
        applyMode(activeMode);
      });
    });
  }

  function applyMode(modeName) {
    const mode = palette[modeName] || palette.pulse;
    brandMaterial.color.copy(mode.main);
    brandMaterial.emissive.copy(mode.main).multiplyScalar(0.18);
    topGrassMaterial.color.copy(mode.foliage);
    redLight.color.copy(mode.glow);
    blueLight.color.copy(mode.accent);

    equalizerBars.forEach((bar, index) => {
      const color = index % 3 === 0 ? mode.main : index % 3 === 1 ? new THREE.Color("#171411") : mode.accent;
      bar.material.color.copy(color);
    });
  }

  function resize() {
    const width = Math.max(1, stage.clientWidth);
    const height = Math.max(1, stage.clientHeight);
    const isMobile = width < 760;

    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.set(isMobile ? 0.28 : 0.18, isMobile ? 1.05 : 1.05, isMobile ? 9.2 : 8.55);
    camera.lookAt(isMobile ? 0.25 : 0.82, isMobile ? 0.35 : 0.05, 0);
    camera.updateProjectionMatrix();

    root.position.set(isMobile ? 0.36 : 1.95, isMobile ? 1.08 : -0.22, 0);
    root.scale.setScalar(isMobile ? 0.44 : 0.72);
  }

  function animate(time) {
    const seconds = time * 0.001;
    const mode = palette[activeMode] || palette.pulse;

    pointer.x += (pointer.tx - pointer.x) * 0.065;
    pointer.y += (pointer.ty - pointer.y) * 0.065;

    root.rotation.y = pointer.x * 0.16 + Math.sin(seconds * 0.35) * 0.035;
    root.rotation.x = -pointer.y * 0.075;
    sculpture.position.y = Math.sin(seconds * mode.speed) * 0.035;

    waveRings.forEach((ring, index) => {
      ring.rotation.z += 0.0025 * mode.speed * (index + 1);
      ring.scale.x = 1 + Math.sin(seconds * mode.speed + index) * 0.025;
      ring.scale.y = 1 + Math.cos(seconds * mode.speed + index) * 0.025;
    });

    orbitals.forEach((carrier, index) => {
      const data = carrier.userData;
      const angle = data.angle + seconds * data.speed * mode.speed;
      carrier.position.set(Math.cos(angle) * data.radius, data.y + Math.sin(seconds * 1.1 + index) * 0.08, Math.sin(angle) * data.radius * 0.44);
    });

    equalizerBars.forEach((bar, index) => {
      const wave = Math.sin(seconds * (2.4 + mode.speed) + index * 0.74) * 0.5 + 0.5;
      const height = 0.24 + wave * 0.86 * mode.lift;
      bar.scale.y = height;
      bar.position.y = 0.56 + height * 0.5;
    });

    renderer.render(scene, camera);
  }

  function renderStatic() {
    root.rotation.y = 0.1;
    sculpture.position.y = 0;
    equalizerBars.forEach((bar, index) => {
      const height = 0.35 + (index % 5) * 0.12;
      bar.scale.y = height;
      bar.position.y = 0.56 + height * 0.5;
    });
    renderer.render(scene, camera);
  }
}

function createTexture(colorA, colorB, flecks) {
  const textureCanvas = document.createElement("canvas");
  const size = 256;
  textureCanvas.width = size;
  textureCanvas.height = size;
  const ctx = textureCanvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, colorA);
  gradient.addColorStop(1, colorB);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const rng = seededRandom(flecks);
  for (let i = 0; i < flecks; i++) {
    const alpha = 0.05 + rng() * 0.18;
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fillRect(rng() * size, rng() * size, 1 + rng() * 3, 1 + rng() * 3);
  }

  const texture = new THREE.CanvasTexture(textureCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1.6, 1.6);
  return texture;
}

function createIconTexture(type) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 128, 128);

  // Neon Red Styling
  const neonRed = '#ff0000';
  ctx.strokeStyle = neonRed;
  ctx.fillStyle = neonRed;
  ctx.lineWidth = 10;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  
  // Neon Glow Effect
  ctx.shadowBlur = 12;
  ctx.shadowColor = neonRed;

  if (type === 'discord') {
    ctx.beginPath();
    ctx.moveTo(34, 40);
    ctx.quadraticCurveTo(64, 30, 94, 40);
    ctx.lineTo(104, 80);
    ctx.quadraticCurveTo(64, 100, 24, 80);
    ctx.closePath();
    ctx.stroke();
    ctx.shadowBlur = 0; // Disable blur for eyes to keep them sharp
    ctx.beginPath();
    ctx.arc(48, 60, 6, 0, Math.PI * 2);
    ctx.arc(80, 60, 6, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === 'music') {
    ctx.beginPath();
    ctx.moveTo(40, 90);
    ctx.arc(30, 90, 10, 0, Math.PI * 2);
    ctx.moveTo(40, 90);
    ctx.lineTo(40, 30);
    ctx.lineTo(80, 20);
    ctx.lineTo(80, 80);
    ctx.arc(70, 80, 10, 0, Math.PI * 2);
    ctx.stroke();
  } else if (type === 'audio') {
    ctx.beginPath();
    ctx.moveTo(30, 45);
    ctx.lineTo(50, 45);
    ctx.lineTo(80, 25);
    ctx.lineTo(80, 103);
    ctx.lineTo(50, 83);
    ctx.lineTo(30, 83);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(80, 64, 20, -Math.PI / 3, Math.PI / 3);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(80, 64, 35, -Math.PI / 3, Math.PI / 3);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function seededRandom(seed) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return () => {
    value = value * 16807 % 2147483647;
    return (value - 1) / 2147483646;
  };
}

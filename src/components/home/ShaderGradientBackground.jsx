import { Component, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

function canUseWebGL() {
  if (typeof window === 'undefined') return false;

  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

let webGLCache = null;
function getCachedWebGLSupport() {
  if (webGLCache !== null) return webGLCache;
  webGLCache = canUseWebGL();
  return webGLCache;
}

class ShaderErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

const shaderGradientPresets = {
  hero: {
    color1: '#050505',
    color2: '#7f0000',
    color3: '#fff7f0',
    positionX: -0.18,
    positionY: 0.05,
    rotationZ: 228,
    brightness: 0.88,
    fallback: 'shader-fallback-hero',
  },
  cta: {
    color1: '#050505',
    color2: '#ff3b30',
    color3: '#f4f1ea',
    positionX: 0.18,
    positionY: -0.02,
    rotationZ: 216,
    brightness: 0.82,
    fallback: 'shader-fallback-hero',
  },
  midu: {
    color1: '#020202',
    color2: '#4a0810',
    color3: '#1a0808',
    positionX: -0.14,
    positionY: 0.46,
    rotationZ: 186,
    brightness: 0.52,
    fallback: 'shader-fallback-midu',
  },
  miduBalanced: {
    color1: '#060606',
    color2: '#7a1018',
    color3: '#2a1010',
    positionX: -0.08,
    positionY: 0.44,
    rotationZ: 178,
    brightness: 0.58,
    fallback: 'shader-fallback-midu-balanced',
  },
  miduHero: {
    color1: '#000000',
    color2: '#ff1a10',
    color3: '#ffffff',
    positionX: 0.02,
    positionY: 0.42,
    rotationZ: 172,
    brightness: 0.94,
    uStrength: 1.45,
    uAmplitude: 0.052,
    fallback: 'shader-fallback-midu-hero',
  },
  miduFooter: {
    color1: '#020202',
    color2: '#3a060c',
    color3: '#180606',
    positionX: 0.02,
    positionY: 0.52,
    rotationZ: 194,
    brightness: 0.48,
    fallback: 'shader-fallback-midu-footer',
  },
  miduLight: {
    color1: '#f4f1ea',
    color2: '#ff3b30',
    color3: '#fff7f0',
    positionX: 0.12,
    positionY: 0.38,
    rotationZ: 204,
    brightness: 0.68,
    fallback: 'shader-fallback-midu-light',
  },
  heroRedShader: {
    type: 'waterPlane',
    color1: '#ff1b16',
    color2: '#1a0000',
    color3: '#ff6a40',
    positionX: 0,
    positionY: 0.7,
    positionZ: 0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 176,
    brightness: 0.85,
    uSpeed: 0.092,
    uStrength: 2,
    uDensity: 1.14,
    uFrequency: 0.78,
    uAmplitude: 0.152,
    reflection: 0.24,
    grain: 'off',
    grainBlending: 0,
    cameraZoom: 0.64,
    cDistance: 4.9,
    fallback: '',
  },
};

const baseShaderProps = {
  control: 'props',
  type: 'waterPlane',
  shader: 'defaults',
  uStrength: 1.28,
  uDensity: 0.92,
  uFrequency: 2.7,
  uAmplitude: 0.038,
  uSpeed: 0.028,
  reflection: 0.08,
  lightType: '3d',
  envPreset: 'city',
  grain: 'off',
  cAzimuthAngle: 180,
  cPolarAngle: 112,
  cDistance: 4.2,
  cameraZoom: 1,
  positionZ: 0,
  rotationX: 0,
  rotationY: 0,
  wireframe: false,
};

const intensityClasses = {
  soft: 'opacity-45',
  quiet: 'opacity-[0.34]',
  barely: 'opacity-25',
  midu: 'opacity-[0.62]',
  miduBalanced: 'opacity-[0.64]',
  miduHero: 'opacity-100',
  footerMidu: 'opacity-[0.55]',
  miduLight: 'opacity-[0.42]',
  heroRedShader: 'opacity-[0.96]',
};

export default function ShaderGradientBackground({
  className = '',
  canvasClassName = '',
  fixed = false,
  fallback = true,
  intensity = 'quiet',
  priority = false,
  variant = 'hero',
  staticOnly = false,
}) {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [webglReady, setWebglReady] = useState(false);
  const [shaderReady, setShaderReady] = useState(false);
  const [isVisible, setIsVisible] = useState(priority);
  const [pixelDensity, setPixelDensity] = useState(0.42);
  const [shaderComponents, setShaderComponents] = useState(null);

  const preset = shaderGradientPresets[variant] || shaderGradientPresets.hero;
  const fallbackClass = fallback ? preset.fallback || 'shader-fallback-hero' : '';

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '160px 0px', threshold: 0.01 },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (staticOnly || shaderComponents || !isVisible) return undefined;

    let cancelled = false;
    const frame = window.requestAnimationFrame(() => {
      const ready = getCachedWebGLSupport();
      if (cancelled) return;

      setWebglReady(ready);
      setPixelDensity(window.matchMedia('(max-width: 768px)').matches ? 0.3 : 0.42);

      if (!ready) return;

      import('@shadergradient/react')
        .then((module) => {
          if (!cancelled) {
            setShaderComponents({
              ShaderGradient: module.ShaderGradient,
              ShaderGradientCanvas: module.ShaderGradientCanvas,
            });
          }
        })
        .catch(() => {
          if (!cancelled) setWebglReady(false);
        });
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
    };
  }, [isVisible, shaderComponents, staticOnly]);

  useEffect(() => {
    if (!shaderComponents || staticOnly) return undefined;

    const frame = window.requestAnimationFrame(() => {
      setShaderReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [shaderComponents, staticOnly]);

  const ShaderGradient = shaderComponents?.ShaderGradient;
  const ShaderGradientCanvas = shaderComponents?.ShaderGradientCanvas;
  const presetShader = Object.fromEntries(
    Object.entries(preset).filter(([key]) => key !== 'fallback'),
  );
  const shaderProps = { ...baseShaderProps, ...presetShader };
  const opacityClass = intensityClasses[intensity] || intensityClasses.quiet;
  const shouldAnimate = isVisible && !prefersReducedMotion && !staticOnly;
  const showShader = !staticOnly && webglReady && ShaderGradientCanvas && ShaderGradient;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none ${fixed ? 'fixed' : 'absolute'} inset-0 z-0 overflow-hidden [contain:strict] ${fallbackClass} ${className}`}
    >
      {showShader && (
        <ShaderErrorBoundary>
          <ShaderGradientCanvas
            className={`absolute inset-0 h-full w-full ${opacityClass} ${shaderReady ? 'shader-canvas-ready' : 'shader-canvas-loading'} ${canvasClassName}`}
            style={{ width: '100%', height: '100%' }}
            pixelDensity={pixelDensity}
            fov={45}
            pointerEvents="none"
            powerPreference="low-power"
            preserveDrawingBuffer={false}
          >
            <ShaderGradient
              {...shaderProps}
              animate={shouldAnimate ? 'on' : 'off'}
            />
          </ShaderGradientCanvas>
        </ShaderErrorBoundary>
      )}
    </div>
  );
}

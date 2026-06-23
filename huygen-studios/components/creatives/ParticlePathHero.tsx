"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LiquidGlass from './LiquidGlass';

gsap.registerPlugin(ScrollTrigger);

interface ParticlePathHeroProps {
  debugPath?: boolean;
  isEntered?: boolean;
}

interface Particle {
  progress: number;
  speed: number;
  size: number;
  maxOpacity: number;
  offsetX: number;
  offsetY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  initialized: boolean;
}

interface ControlPoint {
  x: number;
  y: number;
  label: string;
  isAnchor: boolean;
}

const SVG_WIDTH = 1072;
const SVG_HEIGHT = 794;

const initialPoints: ControlPoint[] = [
  { x: 598, y: 359, label: "Start", isAnchor: true },
  { x: 378, y: 359, label: "C1-1", isAnchor: false },
  { x: 298, y: 431, label: "C1-2", isAnchor: false },
  { x: 478, y: 431, label: "Anchor 1", isAnchor: true },
  { x: 578, y: 431, label: "C2-1", isAnchor: false },
  { x: 791, y: 472, label: "C2-2", isAnchor: false },
  { x: 711, y: 472, label: "Anchor 2", isAnchor: true },
  { x: 631, y: 472, label: "C3-1", isAnchor: false },
  { x: 767, y: 424, label: "C3-2", isAnchor: false },
  { x: 867, y: 454, label: "Anchor 3", isAnchor: true },
  { x: 967, y: 484, label: "C4-1", isAnchor: false },
  { x: 859, y: 461, label: "C4-2", isAnchor: false },
  { x: 939, y: 471, label: "Anchor 4", isAnchor: true },
  { x: 999, y: 481, label: "C5-1", isAnchor: false },
  { x: 992, y: 565, label: "C5-2", isAnchor: false },
  { x: 932, y: 585, label: "Anchor 5", isAnchor: true },
  { x: 882, y: 605, label: "C6-1", isAnchor: false },
  { x: 844, y: 696, label: "C6-2", isAnchor: false },
  { x: 884, y: 676, label: "End", isAnchor: true },
];

const getSVGPath = (pts: ControlPoint[]) => {
  if (pts.length < 4) return "";
  let pathStr = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i += 3) {
    if (i + 2 < pts.length) {
      pathStr += ` C ${pts[i].x} ${pts[i].y}, ${pts[i+1].x} ${pts[i+1].y}, ${pts[i+2].x} ${pts[i+2].y}`;
    }
  }
  return pathStr;
};

export default function ParticlePathHero({ debugPath = false, isEntered = false }: ParticlePathHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // GUI Settings State
  const [showGUI, setShowGUI] = useState(false);
  const [editPathMode, setEditPathMode] = useState(false);
  const [showControlHandles, setShowControlHandles] = useState(false); // Hide handles by default
  
  const [particleCount, setParticleCount] = useState(3300);
  const [color, setColor] = useState('#ab71f8');
  const [spreadX, setSpreadX] = useState(38);
  const [spreadY, setSpreadY] = useState(45);
  const [midSpread, setMidSpread] = useState(1.2); 
  const [maxDist, setMaxDist] = useState(150); 
  const [pushForce, setPushForce] = useState(2.0); 
  const [springK, setSpringK] = useState(0.04);
  
  const [controlPoints, setControlPoints] = useState<ControlPoint[]>(initialPoints);
  const [activeDragIdx, setActiveDragIdx] = useState<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mousePosRef = useRef({ x: -1000, y: -1000 });

  const bgX = useSpring(useTransform(mouseX, [-1, 1], [10, -10]), { stiffness: 50, damping: 20 });
  const bgY = useSpring(useTransform(mouseY, [-1, 1], [10, -10]), { stiffness: 50, damping: 20 });

  const textX = useSpring(useTransform(mouseX, [-1, 1], [-15, 15]), { stiffness: 50, damping: 20 });
  const textY = useSpring(useTransform(mouseY, [-1, 1], [-15, 15]), { stiffness: 50, damping: 20 });

  const subX = useSpring(useTransform(mouseX, [-1, 1], [25, -25]), { stiffness: 50, damping: 20 });
  const subY = useSpring(useTransform(mouseY, [-1, 1], [20, -20]), { stiffness: 50, damping: 20 });

  // Prevent selection/highlighting on other elements during drags
  useEffect(() => {
    if (activeDragIdx !== null) {
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
    } else {
      document.body.style.userSelect = 'auto';
      document.body.style.webkitUserSelect = 'auto';
    }
    return () => {
      document.body.style.userSelect = 'auto';
      document.body.style.webkitUserSelect = 'auto';
    };
  }, [activeDragIdx]);

  // Refs for animation loop to access latest state values without rebuilding WebGL context
  const paramsRef = useRef({
    color,
    spreadX,
    spreadY,
    midSpread,
    maxDist,
    pushForce,
    springK
  });

  useEffect(() => {
    paramsRef.current = {
      color,
      spreadX,
      spreadY,
      midSpread,
      maxDist,
      pushForce,
      springK
    };
  }, [color, spreadX, spreadY, midSpread, maxDist, pushForce, springK]);

  // Lookup Table for SVG Path
  const lutSize = 2000;
  const pathLUTRef = useRef<Float32Array>(new Float32Array(lutSize * 2));

  // Re-generate LUT when control points change
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    try {
      const totalLength = path.getTotalLength();
      const tempLUT = new Float32Array(lutSize * 2);
      for (let i = 0; i < lutSize; i++) {
        const pt = path.getPointAtLength((i / lutSize) * totalLength);
        tempLUT[i * 2] = pt.x;
        tempLUT[i * 2 + 1] = pt.y;
      }
      pathLUTRef.current = tempLUT;
    } catch (err) {
      console.error("Error generating path LUT: ", err);
    }
  }, [controlPoints]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Global Pointer Events for Smooth Drags (Industry Standard)
  useEffect(() => {
    if (activeDragIdx === null) return;

    const handleWindowPointerMove = (e: PointerEvent) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      
      // Map mouse position relative to canvas to SVG space (1072x794)
      const x = ((e.clientX - rect.left) / rect.width) * SVG_WIDTH;
      const y = ((e.clientY - rect.top) / rect.height) * SVG_HEIGHT;

      setControlPoints(prev => {
        const updated = [...prev];
        const oldPt = prev[activeDragIdx];
        
        const deltaX = Math.round(x) - oldPt.x;
        const deltaY = Math.round(y) - oldPt.y;

        // Move the anchor point
        updated[activeDragIdx] = {
          ...oldPt,
          x: Math.max(0, Math.min(SVG_WIDTH, oldPt.x + deltaX)),
          y: Math.max(0, Math.min(SVG_HEIGHT, oldPt.y + deltaY))
        };

        // If dragging an anchor, also offset its associated control points by the same delta
        if (oldPt.isAnchor) {
          const assocIndices: number[] = [];
          if (activeDragIdx > 0) assocIndices.push(activeDragIdx - 1);
          if (activeDragIdx < prev.length - 1) assocIndices.push(activeDragIdx + 1);

          assocIndices.forEach(idx => {
            const cp = prev[idx];
            if (!cp.isAnchor) {
              updated[idx] = {
                ...cp,
                x: Math.max(0, Math.min(SVG_WIDTH, cp.x + deltaX)),
                y: Math.max(0, Math.min(SVG_HEIGHT, cp.y + deltaY))
              };
            }
          });
        }

        return updated;
      });
    };

    const handleWindowPointerUp = () => {
      setActiveDragIdx(null);
    };

    window.addEventListener('pointermove', handleWindowPointerMove);
    window.addEventListener('pointerup', handleWindowPointerUp);

    return () => {
      window.removeEventListener('pointermove', handleWindowPointerMove);
      window.removeEventListener('pointerup', handleWindowPointerUp);
    };
  }, [activeDragIdx]);

  useEffect(() => {
    if (!isEntered) return;
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    // WebGL HIGH PERFORMANCE SETUP
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "high-performance" });
    const scene = new THREE.Scene();
    
    const dpr = window.devicePixelRatio || 1;
    renderer.setPixelRatio(dpr);
    
    // Orthographic Camera config for 1:1 pixel mapping (Y goes down)
    const camera = new THREE.OrthographicCamera(0, window.innerWidth, 0, window.innerHeight, 0.1, 100);
    camera.position.z = 10;
    
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const opacities = new Float32Array(particleCount);

    const cpuParticles: Particle[] = Array.from({ length: particleCount }).map(() => {
      const u = 1 - Math.random(); 
      const v = Math.random();
      const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
      
      return {
        progress: Math.random(),
        speed: 0.00005 + Math.random() * 0.0001,
        size: Math.random() * 8 + 3,
        maxOpacity: Math.random() * 0.8 + 0.2,
        offsetX: z, // Normalized spread coordinate (X)
        offsetY: Math.random() - 0.5, // Normalized spread coordinate (Y)
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        initialized: false
      };
    });

    cpuParticles.forEach((p, i) => {
      sizes[i] = p.size;
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        pixelRatio: { value: dpr },
        uColor: { value: new THREE.Color(paramsRef.current.color) }
      },
      vertexShader: `
        attribute float size;
        attribute float opacity;
        varying float vOpacity;
        uniform float pixelRatio;
        void main() {
          vOpacity = opacity;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = size * pixelRatio;
        }
      `,
      fragmentShader: `
        varying float vOpacity;
        uniform vec3 uColor;
        void main() {
          vec2 xy = gl_PointCoord.xy - vec2(0.5);
          float ll = length(xy);
          if (ll > 0.5) discard;
          
          float alpha = exp(-ll * 12.0) * vOpacity;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const render = () => {
      const rect = wrapper.getBoundingClientRect();
      const canvasRect = renderer.domElement.getBoundingClientRect();
      const currentDpr = window.devicePixelRatio || 1;
      
      const width = rect.width * currentDpr;
      const height = rect.height * currentDpr;
      
      // Perform resize checks safely without loops
      if (renderer.domElement.width !== Math.floor(width) || renderer.domElement.height !== Math.floor(height)) {
        renderer.setSize(rect.width, rect.height, false);
        camera.left = 0;
        camera.right = width;
        camera.top = 0;
        camera.bottom = height;
        camera.updateProjectionMatrix();
        material.uniforms.pixelRatio.value = currentDpr;
      }

      // Update shader uniform color dynamically
      material.uniforms.uColor.value.set(paramsRef.current.color);

      const scaleX = width / SVG_WIDTH;
      const scaleY = height / SVG_HEIGHT;

      const mouseCanvasX = (mousePosRef.current.x - canvasRect.left) * currentDpr;
      const mouseCanvasY = (mousePosRef.current.y - canvasRect.top) * currentDpr;

      const positionAttr = geometry.attributes.position;
      const opacityAttr = geometry.attributes.opacity;
      const posArray = positionAttr.array as Float32Array;
      const opArray = opacityAttr.array as Float32Array;
      const pathLUT = pathLUTRef.current;

      cpuParticles.forEach((p, i) => {
        p.progress += p.speed;
        if (p.progress > 1) {
          p.progress = 0;
          p.initialized = false;
        }

        // Lookup coordinates from SVG path LUT
        const lutIndex = Math.floor(p.progress * (lutSize - 1));
        const px = pathLUT[lutIndex * 2];
        const py = pathLUT[lutIndex * 2 + 1];

        // Paint brush stroke thickness
        const thickness = Math.pow(Math.sin(p.progress * Math.PI), paramsRef.current.midSpread);

        const targetX = (px + p.offsetX * paramsRef.current.spreadX * thickness) * scaleX;
        const targetY = (py + p.offsetY * paramsRef.current.spreadY * thickness) * scaleY;

        if (!p.initialized) {
          p.x = targetX;
          p.y = targetY;
          p.initialized = true;
        }

        // Interactive dispersion physics
        const dx = p.x - mouseCanvasX;
        const dy = p.y - mouseCanvasY;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
        const activeMaxDist = paramsRef.current.maxDist * currentDpr;
        
        if (dist < activeMaxDist) {
          const force = (activeMaxDist - dist) / activeMaxDist;
          p.vx += (dx / dist) * force * paramsRef.current.pushForce;
          p.vy += (dy / dist) * force * paramsRef.current.pushForce;
        }

        // Spring Return Force (Hooke's Law)
        p.vx += (targetX - p.x) * paramsRef.current.springK;
        p.vy += (targetY - p.y) * paramsRef.current.springK;

        p.x += p.vx;
        p.y += p.vy;
        
        p.vx *= 0.85;
        p.vy *= 0.85;

        posArray[i * 3 + 0] = p.x;
        posArray[i * 3 + 1] = p.y;
        posArray[i * 3 + 2] = 0;
        
        opArray[i] = p.maxOpacity * Math.sin(p.progress * Math.PI); 
      });

      positionAttr.needsUpdate = true;
      opacityAttr.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [particleCount, isEntered]);

  useEffect(() => {
    if (!isEntered) return;

    const ctx = gsap.context(() => {
      // 1. Text Container upward parallax
      gsap.to(".text-container", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // 2. Background image parallax zoom
      gsap.to(".hero-bg-img", {
        yPercent: 10,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // 3. Subject image parallax zoom
      gsap.to(".hero-subject-img", {
        yPercent: 5,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [isEntered]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Hidden SVG Path for calculations */}
      <svg
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        className="absolute top-0 left-0 w-0 h-0 pointer-events-none"
      >
        <path ref={pathRef} d={getSVGPath(controlPoints)} />
      </svg>

      {/* GUI Toggle Button */}
      {debugPath && (
        <button
          onClick={() => setShowGUI(!showGUI)}
          className="absolute top-24 left-6 z-50 bg-black/50 border border-white/10 hover:bg-[#ab71f8] hover:text-black hover:font-bold transition-all px-4 py-2 rounded-xl text-xs text-white pointer-events-auto"
        >
          {showGUI ? "Hide Control Panel" : "Show Control Panel"}
        </button>
      )}

      {/* Floating Control Panel */}
      {debugPath && showGUI && (
        <div className="absolute top-[152px] left-6 z-50 w-80 text-white pointer-events-auto">
          <LiquidGlass className="p-6 rounded-2xl border border-white/10" color="black" blur={20}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#ab71f8]">Particle Editor</h3>
              <button 
                onClick={() => setEditPathMode(!editPathMode)}
                className={`px-3 py-1 rounded text-xs transition-colors ${editPathMode ? 'bg-[#ab71f8] text-black font-semibold' : 'bg-white/10 hover:bg-white/20'}`}
              >
                {editPathMode ? 'Hide Handles' : 'Edit Curve'}
              </button>
            </div>
            
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-xs text-white/80">Show Control Handles</span>
                <input 
                  type="checkbox" 
                  checked={showControlHandles}
                  onChange={(e) => setShowControlHandles(e.target.checked)}
                  className="accent-[#ab71f8] w-4 h-4 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs text-white/60 block mb-1">Density (Particles: {particleCount})</label>
                <input 
                  type="range" min="500" max="5000" step="100"
                  value={particleCount} 
                  onChange={(e) => setParticleCount(Number(e.target.value))}
                  className="w-full accent-[#ab71f8]" 
                />
              </div>

              <div>
                <label className="text-xs text-white/60 block mb-1">Brush Color</label>
                <div className="flex gap-2 items-center">
                  <input 
                    type="color" 
                    value={color} 
                    onChange={(e) => setColor(e.target.value)}
                    className="w-8 h-8 rounded border-none cursor-pointer bg-transparent" 
                  />
                  <span className="text-xs font-mono">{color}</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-white/60 block mb-1">Spread X (Middle Width: {spreadX}px)</label>
                <input 
                  type="range" min="5" max="100" 
                  value={spreadX} 
                  onChange={(e) => setSpreadX(Number(e.target.value))}
                  className="w-full accent-[#ab71f8]" 
                />
              </div>

              <div>
                <label className="text-xs text-white/60 block mb-1">Spread Y (Middle Height: {spreadY}px)</label>
                <input 
                  type="range" min="5" max="100" 
                  value={spreadY} 
                  onChange={(e) => setSpreadY(Number(e.target.value))}
                  className="w-full accent-[#ab71f8]" 
                />
              </div>

              <div>
                <label className="text-xs text-white/60 block mb-1">Taper Curve Exponent (Bending: {midSpread})</label>
                <input 
                  type="range" min="0.5" max="3" step="0.1"
                  value={midSpread} 
                  onChange={(e) => setMidSpread(Number(e.target.value))}
                  className="w-full accent-[#ab71f8]" 
                />
              </div>

              <div>
                <label className="text-xs text-white/60 block mb-1">Interaction Radius: {maxDist}px</label>
                <input 
                  type="range" min="50" max="300" 
                  value={maxDist} 
                  onChange={(e) => setMaxDist(Number(e.target.value))}
                  className="w-full accent-[#ab71f8]" 
                />
              </div>

              <div>
                <label className="text-xs text-white/60 block mb-1">Push Force: {pushForce}</label>
                <input 
                  type="range" min="0.5" max="5" step="0.1"
                  value={pushForce} 
                  onChange={(e) => setPushForce(Number(e.target.value))}
                  className="w-full accent-[#ab71f8]" 
                />
              </div>

              <div>
                <label className="text-xs text-white/60 block mb-1">Spring Snap Force: {springK}</label>
                <input 
                  type="range" min="0.01" max="0.1" step="0.005"
                  value={springK} 
                  onChange={(e) => setSpringK(Number(e.target.value))}
                  className="w-full accent-[#ab71f8]" 
                />
              </div>

              <div>
                <label className="text-xs text-white/60 block mb-1">Output Path (Copy when done):</label>
                <textarea
                  readOnly
                  value={getSVGPath(controlPoints)}
                  onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                  className="w-full h-20 text-[10px] bg-black/40 border border-white/10 rounded p-1 text-white font-mono resize-none focus:outline-none focus:border-[#ab71f8]/50"
                />
              </div>
            </div>
          </LiquidGlass>
        </div>
      )}

      {/* SVG Pen Tool Draggable Control Point Handles Overlay */}
      {debugPath && editPathMode && (
        <svg
          ref={svgRef}
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          preserveAspectRatio="none"
          className="absolute top-0 left-0 w-full h-full z-40 pointer-events-none"
        >
          {/* Render connecting lines between control points and anchors */}
          {showControlHandles && controlPoints.map((pt, idx) => {
            if (!pt.isAnchor) {
              const anchorIdx = idx % 3 === 1 ? idx - 1 : idx + 1;
              const anchor = controlPoints[anchorIdx];
              if (anchor) {
                return (
                  <line
                    key={`line-${idx}`}
                    x1={pt.x}
                    y1={pt.y}
                    x2={anchor.x}
                    y2={anchor.y}
                    stroke="rgba(255, 255, 255, 0.25)"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                );
              }
            }
            return null;
          })}

          {/* Render draggable handles */}
          {controlPoints.map((pt, idx) => {
            // If control handles checkbox is off, only show Anchor points
            if (!showControlHandles && !pt.isAnchor) return null;
            return (
              <g key={`handle-${idx}`}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={pt.isAnchor ? 8 : 5}
                  fill={pt.isAnchor ? "#ab71f8" : "#ffffff"}
                  stroke="#000000"
                  strokeWidth="1.5"
                  className="cursor-pointer hover:scale-125 transition-transform pointer-events-auto"
                  style={{ 
                    filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.5))",
                    transformOrigin: "center",
                    transformBox: "fill-box"
                  }}
                  onPointerDown={() => setActiveDragIdx(idx)}
                />
                <text
                  x={pt.x + 10}
                  y={pt.y - 10}
                  fill="#ffffff"
                  fontSize="10"
                  className="pointer-events-none select-none opacity-60"
                  style={{ textShadow: "0 1px 2px #000" }}
                >
                  {pt.label}
                </text>
              </g>
            );
          })}
        </svg>
      )}

      <div 
        ref={wrapperRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full h-full object-cover min-w-[100vw] min-h-[100vh]"
      >
        {/* Layer 0: Background */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ x: bgX, y: bgY }}
        >
          <motion.img 
            initial={{ scale: 1.2, opacity: 0, filter: 'blur(15px)' }}
            animate={{ scale: 1.05, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 3, ease: [0.2, 0.8, 0.2, 1] }}
            src="/assets/Hero_background.png" 
            alt="Hero Background"
            className="hero-bg-img w-full h-full object-cover"
          />
        </motion.div>

        {/* Layer 10: Text */}
        <motion.div 
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
          style={{ x: textX, y: textY }}
        >
          <div className="text-container">
            <motion.h1 
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2, ease: [0.2, 0.8, 0.2, 1], delay: 0.5 }}
              className="text-white huge-text-line self-start line-huygen"
            >
              huygen
            </motion.h1>
            <motion.h1 
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2, ease: [0.2, 0.8, 0.2, 1], delay: 0.5 }}
              className="text-white huge-text-line self-end line-creatives"
            >
              creatives
            </motion.h1>
          </div>
        </motion.div>

        {/* Layer 20: Subject */}
        <motion.div 
          className="absolute inset-0 z-20 flex items-end justify-end pr-[15vw] pointer-events-none"
          style={{ x: subX, y: subY }}
        >
          <motion.img 
            initial={{ y: 40, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: [0.2, 0.8, 0.2, 1], delay: 0.8 }}
            src="/assets/Hero_subject.png" 
            alt="Subject"
            className="hero-subject-img h-[100vh] mb-[-10vh] object-contain object-bottom origin-bottom"
          />
        </motion.div>

        {/* Layer 30: WebGL Shaders Particles */}
        <motion.canvas 
          ref={canvasRef} 
          className="absolute top-0 left-0 w-full h-full z-30"
          style={{ pointerEvents: 'auto' }}
        />
      </div>
    </div>
  );
}

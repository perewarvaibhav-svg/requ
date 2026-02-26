"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;

        // 4K Rendering setup with high fidelity antialiasing
        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0));
        renderer.setSize(window.innerWidth, window.innerHeight);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 100);

        // ── Upscaled Particle field (4K Density) ──
        const COUNT = 35000; // Large increase for 4K "organic" feel
        const positions = new Float32Array(COUNT * 3);
        const sizes = new Float32Array(COUNT);
        const colors = new Float32Array(COUNT * 3);
        const randomness = new Float32Array(COUNT);

        for (let i = 0; i < COUNT; i++) {
            const i3 = i * 3;
            // Spread them slightly wider for 4K canvas
            positions[i3] = (Math.random() - 0.5) * 600;
            positions[i3 + 1] = (Math.random() - 0.5) * 600;
            positions[i3 + 2] = (Math.random() - 0.5) * 400;

            // Fine-tuned sizing for crisp look
            sizes[i] = Math.random() * 1.5 + 0.3;
            randomness[i] = Math.random();

            // Colors maintained exactly as before (Amber, Emerald, Deep Blue)
            const rand = Math.random();
            if (rand < 0.2) {
                colors[i3] = 1.0; colors[i3 + 1] = 0.8; colors[i3 + 2] = 0.0; // Amber
            } else if (rand < 0.6) {
                colors[i3] = 0.0; colors[i3 + 1] = 1.0; colors[i3 + 2] = 0.6; // Emerald
            } else {
                colors[i3] = 0.1; colors[i3 + 1] = 0.4; colors[i3 + 2] = 1.0; // Deep Blue
            }
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
        geo.setAttribute("aRandom", new THREE.BufferAttribute(randomness, 1));

        const mat = new THREE.ShaderMaterial({
            vertexColors: true,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            uniforms: {
                uTime: { value: 0 },
                uPixelRatio: { value: renderer.getPixelRatio() },
            },
            vertexShader: `
        attribute float size;
        attribute float aRandom;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        uniform float uPixelRatio;

        void main() {
          vColor = color;
          vec3 pos = position;

          // 60fps movement logic maintained
          float time = uTime * (0.1 + aRandom * 0.05);
          pos.x += sin(time + position.y * 0.01) * 20.0 * aRandom;
          pos.y += cos(time + position.x * 0.01) * 15.0 * aRandom;

          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * uPixelRatio * (120.0 / -mvPos.z);

          float dist = length(pos.xy) / 300.0;
          vAlpha = 1.0 - smoothstep(0.4, 1.5, dist);
          vAlpha *= (0.3 + 0.7 * sin(uTime * 1.5 + aRandom * 50.0));

          gl_Position = projectionMatrix * mvPos;
        }
      `,
            fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          float d = distance(gl_PointCoord, vec2(0.5));
          if (d > 0.5) discard;
          float strength = 0.08 / d;
          gl_FragColor = vec4(vColor * strength, vAlpha * (1.0 - d * 2.0));
        }
      `,
        });

        const particles = new THREE.Points(geo, mat);
        scene.add(particles);

        const onMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 10;
            const y = -(e.clientY / window.innerHeight - 0.5) * 8;
            camera.position.x += (x - camera.position.x) * 0.05;
            camera.position.y += (y - camera.position.y) * 0.05;
            camera.lookAt(0, 0, 0);
        };
        window.addEventListener("mousemove", onMouseMove);

        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", onResize);

        let frameId: number;
        let time = 0;
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            // requestAnimationFrame naturally targets 60fps or the screen's refresh rate
            time += 0.008;
            mat.uniforms.uTime.value = time;
            particles.rotation.y = time * 0.03;
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("resize", onResize);
            renderer.dispose(); geo.dispose(); mat.dispose();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            id="three-canvas"
            style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.6 }}
        />
    );
}

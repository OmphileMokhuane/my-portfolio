"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Portrait3D() {
    const containerRef = useRef(null);

    useEffect(() => {
        // Store the current ref value to use in cleanup
        const container = containerRef.current;
        if (!container) return;

        let scene, camera, renderer, uniforms;
        let animationId;
        let mouseEnterHandler, mouseLeaveHandler, mouseMoveHandler;
        let resizeHandler;
        let isHovering = false;

        const init = () => {
            const width = container.clientWidth;
            const height = container.clientHeight;

            // Scene + Camera
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
            camera.position.z = 2;

            // Renderer
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(width, height);
            renderer.setPixelRatio(window.devicePixelRatio);
            container.appendChild(renderer.domElement);

            // Load textures
            const loader = new THREE.TextureLoader();
            const imageTexture = loader.load("/portfolio_img.jpg");
            const depthTexture = loader.load("/depth_map.png");

            // Shaders - Modified to only affect X axis
            const vertexShader = `
        varying vec2 vUv;
        uniform sampler2D uDepth;
        uniform float uDepthScale;
        uniform vec2 uMouse;

        void main() {
          vUv = uv;
          vec4 depthData = texture2D(uDepth, uv);
          float depth = depthData.r * uDepthScale;

          // Mouse influence - ONLY X axis (left-right)
          vec3 newPosition = position;
          newPosition.z += depth * 0.5;
          newPosition.x += uMouse.x * depth * 0.3;
          // Removed Y axis movement

          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `;

            const fragmentShader = `
        varying vec2 vUv;
        uniform sampler2D uImage;

        void main() {
          vec4 color = texture2D(uImage, vUv);
          gl_FragColor = color;
        }
      `;

            uniforms = {
                uImage: { value: imageTexture },
                uDepth: { value: depthTexture },
                uDepthScale: { value: 0.4 },
                uMouse: { value: new THREE.Vector2(0, 0) },
            };

            const geometry = new THREE.PlaneGeometry(2, 2, 200, 200);
            const material = new THREE.ShaderMaterial({
                uniforms,
                vertexShader,
                fragmentShader,
            });

            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            // Mouse hover detection
            mouseEnterHandler = () => {
                isHovering = true;
            };

            mouseLeaveHandler = () => {
                isHovering = false;
                // Reset to center when mouse leaves
                if (uniforms && uniforms.uMouse && uniforms.uMouse.value) {
                    // Smooth return to center
                    const currentX = uniforms.uMouse.value.x;
                    const targetX = 0;
                    uniforms.uMouse.value.x += (targetX - currentX) * 0.1;
                }
            };

            // Mouse interaction - only when hovering
            mouseMoveHandler = (e) => {
                if (!container || !isHovering) return;
                const rect = container.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                // Only set X value, Y is always 0
                if (uniforms && uniforms.uMouse && uniforms.uMouse.value) {
                    uniforms.uMouse.value.set(x * 2.0, 0);
                }
            };

            container.addEventListener("mouseenter", mouseEnterHandler);
            container.addEventListener("mouseleave", mouseLeaveHandler);
            container.addEventListener("mousemove", mouseMoveHandler);

            // Resize
            resizeHandler = () => {
                if (!container) return;
                const width = container.clientWidth;
                const height = container.clientHeight;
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                renderer.setSize(width, height);
            };
            window.addEventListener("resize", resizeHandler);

            // Render loop
            const animate = () => {
                animationId = requestAnimationFrame(animate);

                // Smooth return to center when not hovering
                if (!isHovering && uniforms && uniforms.uMouse && uniforms.uMouse.value) {
                    const currentX = uniforms.uMouse.value.x;
                    uniforms.uMouse.value.x += (0 - currentX) * 0.05;
                }

                renderer.render(scene, camera);
            };
            animate();
        };

        init();

        // Cleanup function
        return () => {
            // Cancel animation frame
            if (animationId !== undefined) {
                cancelAnimationFrame(animationId);
            }

            // Remove event listeners
            if (mouseEnterHandler) {
                container.removeEventListener("mouseenter", mouseEnterHandler);
            }
            if (mouseLeaveHandler) {
                container.removeEventListener("mouseleave", mouseLeaveHandler);
            }
            if (mouseMoveHandler) {
                container.removeEventListener("mousemove", mouseMoveHandler);
            }
            if (resizeHandler) {
                window.removeEventListener("resize", resizeHandler);
            }

            // Dispose Three.js resources
            if (renderer) {
                renderer.dispose();
            }
            if (scene) {
                scene.traverse((object) => {
                    if (object.geometry) {
                        object.geometry.dispose();
                    }
                    if (object.material) {
                        if (Array.isArray(object.material)) {
                            object.material.forEach((material) => material.dispose());
                        } else {
                            object.material.dispose();
                        }
                    }
                });
            }

            // Remove renderer DOM element
            if (container && container.firstChild) {
                container.removeChild(container.firstChild);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[80vh] overflow-hidden rounded-2xl shadow-lg cursor-pointer"
        />
    );
}
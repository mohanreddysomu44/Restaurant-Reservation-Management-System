import { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    mountRef.current.appendChild(renderer.domElement);

    // 🌌 Sphere
    const geometry = new THREE.SphereGeometry(1.8, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      color: "#1e90ff",
      emissive: "#1e90ff",
      emissiveIntensity: 0.5,
      metalness: 0.7,
      roughness: 0.2,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // 💡 Lights
    const light = new THREE.PointLight("#1e90ff", 2);
    light.position.set(5, 5, 5);
    scene.add(light);

    const ambient = new THREE.AmbientLight("#0a1a2f", 0.8);
    scene.add(ambient);

    // 🔄 Animation
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      sphere.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    // 📱 Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // ✅ SAFE CLEANUP
    return () => {
      window.removeEventListener("resize", handleResize);

      if (animationId) cancelAnimationFrame(animationId);

      // dispose objects
      geometry.dispose();
      material.dispose();
      renderer.dispose();

      // remove canvas safely
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10" />;
};

export default ThreeBackground;
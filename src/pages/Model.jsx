import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import models from "../assets/Models.gltf";
import back from "../assets/test.jpg"
import hitler from "../assets/hitler.jpg"
import nuke from "../assets/nuke.jpg"
import ss from "../assets/ss.jpg"
import blss from "../assets/blss.jpg"
import Header from "../components/Header/Header";
import { Spinner } from "../components/spinner";

import {useParams} from "react-router-dom";

const ThreeScene = () => {
//   const { id } = useParams();
//     const {loading, blog} = useModel({
//         id: id || ""
//     });


// if (loading ) {
//     return <div>
//         <Header/>
    
//         <div className="h-screen flex flex-col justify-center">
            
//             <div className="flex justify-center">
//                 <Spinner/>
//             </div>
//         </div>
//     </div>
// }
  const scene = useRef(null);
  const camera = useRef(null);
  const renderer = useRef(null);
  const controls = useRef(null);
  const object = useRef(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [objToRender, setObjToRender] = useState("eye");

  const loadScene = () => {
    // Create a new scene
    scene.current = new THREE.Scene();
  
    // Create a new camera
    camera.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.current.position.z = 25;
  
    // Create a new renderer
    renderer.current = new THREE.WebGLRenderer({ alpha: true });
    renderer.current.setSize(window.innerWidth, window.innerHeight);
    const container = document.getElementById("container3D");
  
    // Clear the container
    container.innerHTML = "";
  
    // Append the renderer's canvas element
    container.appendChild(renderer.current.domElement);
  
    // Add lights to the scene
    const topLight = new THREE.DirectionalLight(0xffffff, 1);
    topLight.position.set(500, 500, 500);
    topLight.castShadow = true;
    scene.current.add(topLight);
  
    const ambientLight = new THREE.AmbientLight(0x333333, 5);
    scene.current.add(ambientLight);
  
    controls.current = new OrbitControls(camera.current, renderer.current.domElement);
  
    // Resize handling
    const handleResize = () => {
      camera.current.aspect = window.innerWidth / window.innerHeight;
      camera.current.updateProjectionMatrix();
      renderer.current.setSize(window.innerWidth, window.innerHeight);
    };
  
    window.addEventListener("resize", handleResize);
  
    const animate = () => {
      requestAnimationFrame(animate);
  
      // Make the object move
      if (object.current && objToRender === "eye") {
        object.current.rotation.y = -3 + (mouseX / window.innerWidth) * 3;
        object.current.rotation.x = -1.2 + (mouseY / window.innerHeight) * 2.5;
      }
  
      renderer.current.render(scene.current, camera.current);
    };
  
    animate();
  
    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      controls.current.dispose();
      renderer.current.dispose();
    };
  };
  
  useEffect(() => {
    // Load the GLTF model
    const loader = new GLTFLoader();
    loader.load(
      models,
      (gltf) => {
        object.current = gltf.scene;
  
        const desiredHeight = 0.1; // Adjust the desired height
        const desiredWidth = 0.1; // Adjust the desired width
        const desiredDepth = 0.1; 
  
        const scaleX = desiredWidth / object.current.scale.x;
        const scaleY = desiredHeight / object.current.scale.y;
        const scaleZ = desiredDepth / object.current.scale.z;
  
        object.current.scale.set(scaleX, scaleY, scaleZ);
          camera.current.position.z = 150; 
          camera.current.position.y = 50;

  
        scene.current.add(object.current);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error(error);
      }
    );
  
    loadScene();
    console.log("Yes");
  }, []); 
  

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouseX(event.clientX);
      setMouseY(event.clientY);
    };
  
    window.addEventListener("mousemove", handleMouseMove);
  
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
  <>
  <Header />
  <div id="container3D" style={{backgroundImage:`url(${nuke})`}}  />
  
      <h1 className="Quote">"Peace is the biggest illusion, War is the only constant"</h1>
        <img className="Fuhrer" src={blss} alt="Fuhrer" />
  </>)
};

export default ThreeScene;

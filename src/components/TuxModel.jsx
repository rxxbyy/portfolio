import {
    Center,
    Environment,
    OrbitControls,
    SoftShadows,
    useGLTF,
} from '@react-three/drei';

import { useThree, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';

// Preload the model
useGLTF.preload('/models/tux.glb');

function Model() {
    const { scene } = useGLTF('/models/tux.glb');
    const { viewport } = useThree();
    const cursor = useRef({x: 0, y: 0});
    const modelRef = useRef(scene);

    useEffect(() => {
        const handleMouseMove = (e) => {
            cursor.current.x = e.clientX / window.innerWidth - 0.5;
            cursor.current.y = e.clientY / window.innerHeight - 0.5;
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const handleModelClick = () => {
        const model = modelRef.current;
        if (!model) return;

        model.position.set(0, 0, 0);
        model.rotation.set(0, 0, 0);

        let startTime = null;
        const animationDuration = 500;
        
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / animationDuration, 1);
            
            model.position.y = Math.sin(progress * Math.PI);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                model.position.y = 0;
            }
        };
        
        requestAnimationFrame(animate);
    };

    useFrame((state) => {
        const parallaxX = cursor.current.x * 0.1;
        const parallaxY = -cursor.current.y * 0.1;
        state.camera.lookAt(parallaxX, parallaxY, 0);
    });

    return (
        <Center>
            <group
                rotation={[Math.PI / 8, -Math.PI / 12, 0]}
                position={[0, -1, 0]}
                onClick={handleModelClick} // Add onClick handler here
                onPointerOver={() => document.body.style.cursor = 'pointer'} // Optional: change cursor on hover
                onPointerOut={() => document.body.style.cursor = 'default'} // Optional: reset cursor
            >
                <primitive ref={modelRef} object={scene} visible={true} />
            </group>
        </Center>
    );
}

export default function TuxModel() {
    return (
        <>
            {/* Disable OrbitControls if you want manual camera movement */}
            {/* <OrbitControls
                enableZoom={false}
                enableDamping={true}
            /> */}
            <SoftShadows size={15} focus={1.5} samples={4} />
            <Environment preset="sunset" />
            <Model />
        </>
    );
}
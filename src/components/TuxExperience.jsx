import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import TuxModel from './TuxModel';

export default function TuxExperience() {
    const Fallback = () => (
        <mesh>
        </mesh>
    );

    return (
        <Canvas camera={{
            position: [0, 0, 5],
            fov: 50,
            near: 0.1,
            far: 1000,
            zoom: 3,
        }}>
            <Suspense fallback={<Fallback />}>
                <TuxModel />
            </Suspense>
        </Canvas>
    )
}
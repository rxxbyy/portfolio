import { Canvas } from '@react-three/fiber';
import IndexText from './IndexText';

export default function IndexTextModel() {
    return (
        <Canvas camera={{
            position: [0, 0, 5],
            fov: 50,
            near: 0.1,
            far: 1000,
            zoom: 3,
        }}>
            <IndexText />
        </Canvas>
    )
}
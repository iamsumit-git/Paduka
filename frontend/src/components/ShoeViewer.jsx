import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';

const Model = ({ url }) => {
    const { scene } = useGLTF(url);
    return <primitive object={scene} />;
};

const ShoeViewer = ({ modelUrl }) => {
    return (
        <div className="w-full h-full">
            <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.6}>
                        <Model url={modelUrl} />
                    </Stage>
                </Suspense>
                <OrbitControls autoRotate />
            </Canvas>
        </div>
    );
};

export default ShoeViewer;

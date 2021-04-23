import React from "react";

export interface DashboardProps {

}

export const Dashboard = (props: JSX.IntrinsicElements['group'] & DashboardProps) => {

    return (
        <group {...props}>

            <mesh position={[0, -0.07, -0.03]} scale={[0.08, 0.08, 0.1]} rotation={[-Math.PI/2, 0, 0]}>
                <planeGeometry args={[1, 1, 1, 1]} />
                <meshPhysicalMaterial color={"lightgray"} roughness={0} />
            </mesh>

            <mesh position={[0, -0.05, -0.01]}>
                <boxGeometry args={[0.01, 0.005, 0.01]} />
                <meshPhysicalMaterial color={"blue"} />
            </mesh>


            <spotLight position={[-0.7, 1, 0]} castShadow intensity={1} />
        </group>
    );
};
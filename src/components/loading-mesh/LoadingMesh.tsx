import React, {useRef} from "react";
import {Group, Mesh, Object3D} from "three";
import {useFrame} from "@react-three/fiber";

const onRef = <T, >(ref: React.MutableRefObject<T | undefined>, ...fn: ((obj: T) => void)[]) => {
    if (!ref?.current) {
        return;
    }

    const current: T = ref.current;

    fn.forEach(f => f(current));
};

const rotate = (x: number = 0, y: number = 0, z: number = 0) => ({rotation}: Object3D) => {

    rotation.x += x;
    rotation.y += y;
    rotation.z += z;
};

export interface LoadingMeshProps {

}

export const LoadingMesh = (props: JSX.IntrinsicElements['group'] & LoadingMeshProps) => {

    const box = useRef<Mesh>();
    const ballsGroup = useRef<Group>();
    const ball1 = useRef<Mesh>();
    const ball2 = useRef<Mesh>();

    useFrame(() => {

        onRef(box, rotate(0, -Math.PI / 8, 0));
        onRef(ballsGroup, rotate(0, Math.PI / 16, 0));
    });

    return (
        <group {...props}>
            <mesh ref={box}>
                <sphereBufferGeometry args={[0.05, 4, 0.5]}/>
                <meshPhysicalMaterial color={"red"}/>
            </mesh>
            <group ref={ballsGroup}>
                <mesh ref={ball1} position={[0.2, 0, 0.2]}>
                    <sphereBufferGeometry args={[0.005, 5, 5]}/>
                    <meshPhysicalMaterial color={"blue"}/>
                </mesh>
                <mesh ref={ball2} position={[-0.2, 0, -0.2]}>
                    <sphereBufferGeometry args={[0.005, 5, 5]}/>
                    <meshPhysicalMaterial color={"blue"}/>
                </mesh>
            </group>
        </group>
    );
};

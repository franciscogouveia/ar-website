import React, {useRef} from "react";
import {Group, Mesh, Object3D} from "three";
import {useFrame} from "@react-three/fiber";

const onRef = <T,>(ref: React.MutableRefObject<T | undefined>, ...fn: ((obj: T) => void)[]) => {
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

const scale = (x: number, y: number, z: number) => ({scale}: Object3D) => {

    scale.x = x;
    scale.y = y;
    scale.z = z;
};

const translate = (x: number, y: number, z: number) => ({position}: Object3D) => {
    position.x = x;
    position.y = y;
    position.z = z;
};

export interface LoadingMeshProps {

}

export const LoadingMesh = (props: JSX.IntrinsicElements['group'] & LoadingMeshProps) => {

    const box = useRef<Mesh>();
    const ballsGroup = useRef<Group>();
    const ball1 = useRef<Mesh>();
    const ball2 = useRef<Mesh>();

    useFrame(({clock}) => {
        const boxScale = (Math.sin(clock.elapsedTime) + 1.5) / 2;
        onRef(box,
            rotate(0, -Math.PI/8, 0),
            scale(boxScale, boxScale / 2, boxScale),
        );

        onRef(ballsGroup, rotate(0, Math.PI/16, 0));
        const ballDistance = (boxScale / 28);
        onRef(ball1, translate(ballDistance, 0, ballDistance));
        onRef(ball2, translate(-ballDistance, 0, -ballDistance));
    });

    return (
        <group {...props}>
            <mesh ref={box} position={[0, 0, 0]} rotation={[0, 0, 0]}>
                <sphereBufferGeometry args={[0.05, 4, 3]}/>
                <meshPhysicalMaterial color={"red"} />
            </mesh>
            <group ref={ballsGroup}>
                <mesh ref={ball1} >
                    <sphereBufferGeometry args={[0.005, 5, 5]}/>
                    <meshPhysicalMaterial color={"blue"}/>
                </mesh>
                <mesh ref={ball2} >
                    <sphereBufferGeometry args={[0.005, 5, 5]}/>
                    <meshPhysicalMaterial color={"blue"}/>
                </mesh>
            </group>
        </group>
    );
};

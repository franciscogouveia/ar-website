import React, {useMemo, useRef, useState} from "react";
import {Text} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {Interactive} from "@react-three/xr";
import {Group, Mesh} from "three";

export interface Step1Handler {
    next: () => void;
}

interface SubStepHandler {
    next: () => void;
}

const SubStep1 = (props: JSX.IntrinsicElements['group'] & SubStepHandler) => {

    const ref = useRef<Group>();
    const titleRef = useRef<Mesh>();

    useFrame(() => {

        if (!titleRef.current) {
            return;
        }

        titleRef.current.rotation.y += Math.PI / 32
    });

    return (
        <group ref={ref} {...props}>
            <Text
                ref={titleRef}
                position={[0, 0.005, 0]}
                fontSize={0.01}
                color={"gray"}
            >
                Olá!
            </Text>
            <mesh position={[0, -0.006, -0.01]} >
                <planeGeometry args={[0.03, 0.014]} />
                <meshStandardMaterial color={"white"} />
                <Text
                    fontSize={0.002}
                    textAlign={"center"}
                    maxWidth={0.03}
                    color={"black"}
                >
                    For this to work, you need to move the camera around the room until you see a marker in the center of the screen
                </Text>
            </mesh>

            <Interactive onSelect={() => props.next()}>
                <mesh position={[0, -0.02, -0.01]} >
                    <planeGeometry args={[0.005, 0.005]} />
                    <meshStandardMaterial color={"lightgray"} />
                    <Text
                        position={[0, 0, 0]}
                        fontSize={0.002}
                        color={"black"}
                    >
                        Ok!
                    </Text>
                </mesh>
            </Interactive>
        </group>
    );
};

const SubStep2 = (props: JSX.IntrinsicElements['group'] & SubStepHandler) => {

    const ref = useRef<Group>();

    return (
        <group ref={ref} {...props}>
            <mesh position={[0, -0.006, -0.01]} >
                <planeGeometry args={[0.03, 0.014]} />
                <meshStandardMaterial color={"white"} />
                <Text
                    fontSize={0.002}
                    textAlign={"center"}
                    maxWidth={0.03}
                    color={"black"}
                >
                    Great! When you are happy about the position of the marker, click on it
                </Text>
            </mesh>
        </group>
    );
};

export const Step1 = (props: JSX.IntrinsicElements['group'] & Step1Handler) => {

    const [step, setStep] = useState<number>(0);

    const child = useMemo(() => {
        switch (step) {
            case 0:
                return (
                    <SubStep1 next={() => setStep(1)} />
                );
            case 1:
                return (
                    <SubStep2 next={() => setStep(2)} />
                );
            default:
                return (
                    <Text fontSize={0.005} color={"red"}>Invalid state :(</Text>
                );
        }
    }, [step]);


    return (
        <group {...props}>
            {child}
        </group>
    );
};

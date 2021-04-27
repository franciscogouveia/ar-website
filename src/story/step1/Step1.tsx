import React, {Suspense, useEffect, useRef, useState} from "react";
import {Text} from "@react-three/drei";
import {useFrame, useThree} from "@react-three/fiber";
import {Interactive} from "@react-three/xr";
import {Group} from "three";
import {WithNextStep} from "../common/StoryInterfaces";
import {PhoneBasic} from "../../meshes/phone-basic/PhoneBasic";

const bringTo = (current: number, step: number, target: number) => {
    if (current > target) {
        return Math.max(current - step, target);
    } else {
        return Math.min(current + step, target);
    }
};

const bringToZero = (current: number, step: number = 0.01): number => {
    return bringTo(current, step, 0);
};

export const Step1 = (props: JSX.IntrinsicElements['group'] & WithNextStep) => {

    const {clock} = useThree();
    const phoneMesh = useRef<Group>();
    clock.start();

    const [animation, setAnimation] = useState<number>(1);

    useFrame(() => {

        if (!phoneMesh.current) {
            return;
        }

        const mesh: Group = phoneMesh.current;
        const maxRotation = (Math.PI / 6);

        const rotationSpeed = 2;

        switch (animation) {
            case 0:
                mesh.rotation.x = bringToZero(mesh.rotation.x);
                mesh.rotation.y = bringTo(mesh.rotation.y, 0.02, Math.cos(clock.elapsedTime * rotationSpeed) * maxRotation * 10);
                mesh.rotation.z = bringToZero(mesh.rotation.z);
                break;
            case 1:
                mesh.rotation.x = bringTo(mesh.rotation.x, 0.01, Math.cos(clock.elapsedTime * rotationSpeed) * maxRotation);
                mesh.rotation.y = bringToZero(mesh.rotation.y);
                mesh.rotation.z = bringToZero(mesh.rotation.z);
                break;
            default:
                mesh.rotation.x = bringToZero(mesh.rotation.x);
                mesh.rotation.y = bringToZero(mesh.rotation.y);
                mesh.rotation.z = bringTo(mesh.rotation.z, 0.01, Math.cos(clock.elapsedTime * rotationSpeed) * maxRotation);
        }
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            clock.stop();
            setAnimation((animation + 1) % 3);
            clock.start();
        }, 3000);

        return () => {
            clearTimeout(timer);
        }
    }, [animation, clock]);

    return (
        <group {...props}>
            <Suspense fallback={null}>
                <PhoneBasic innerRef={phoneMesh} position={[0.015, 0.02, -0.012]} scale={[0.2, 0.2, 0.2]} />
            </Suspense>
            <Text
                position={[-0.013, 0.007, 0]}
                fontSize={0.01}
                color={"gray"}
            >
                Olá!
            </Text>
            <mesh position={[0, -0.006, -0.01]} >
                <planeGeometry args={[0.05, 0.018]} />
                <meshStandardMaterial color={"black"} />
                <Text
                    fontSize={0.003}
                    textAlign={"center"}
                    maxWidth={0.04}
                    color={"white"}
                >
                    For this to work, you need to point the camera around the room until you see a marker on the floor
                </Text>
            </mesh>

            <Interactive onSelect={() => props.next()}>
                <mesh position={[0, -0.02, -0.01]} >
                    <planeGeometry args={[0.015, 0.006]} />
                    <meshStandardMaterial color={"lightgray"} />
                    <Text
                        position={[0, 0, 0]}
                        fontSize={0.002}
                        color={"black"}
                    >
                        Understood!
                    </Text>
                </mesh>
            </Interactive>
        </group>
    );
};

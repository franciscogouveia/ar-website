import {WithNextStep} from "../common/StoryInterfaces";
import React, {useEffect, useRef, useState} from "react";
import {Group} from "three";
import {Text} from "@react-three/drei";
import {Interactive} from "@react-three/xr";

export const Step2 = (props: JSX.IntrinsicElements['group'] & WithNextStep) => {

    const ref = useRef<Group>();
    const [visible, setVisibility] = useState<boolean>(false);

    useEffect(() => {
        // Show only after a couple of seconds
        const timer = setTimeout(() => setVisibility(true), 2000);

        return () => clearTimeout(timer);
    });

    return (
        <group ref={ref} {...props}>
            {visible && (
                <>

                    <mesh position={[0, -0.04, -0.01]}>
                        <planeGeometry args={[0.03, 0.014]}/>
                        <meshStandardMaterial color={"black"}/>
                        <Text
                            fontSize={0.002}
                            textAlign={"center"}
                            maxWidth={0.025}
                            color={"white"}
                        >
                            Place the marker in an empty space on the floor (e.g. center of the room) and click "Place it" button
                        </Text>
                    </mesh>

                    <Interactive onSelect={props.next}>
                        <mesh position={[0, -0.051, -0.01]}>
                            <planeGeometry args={[0.01, 0.006]}/>
                            <meshStandardMaterial color={"white"}/>
                            <Text
                                fontSize={0.002}
                                textAlign={"center"}
                                maxWidth={0.02}
                                color={"black"}
                            >
                                Place it
                            </Text>
                        </mesh>
                    </Interactive>
                </>
            )}
        </group>
    );
};

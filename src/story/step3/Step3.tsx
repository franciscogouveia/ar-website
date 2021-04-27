import {WithNextStep} from "../common/StoryInterfaces";
import React, {useEffect, useRef, useState} from "react";
import {Group} from "three";
import {Text} from "@react-three/drei";

export const Step3 = (props: JSX.IntrinsicElements['group'] & WithNextStep) => {

    const ref = useRef<Group>();
    const [visible, setVisibility] = useState<boolean>(true);

    useEffect(() => {
        // Show only during 10 seconds
        const timer = setTimeout(() => setVisibility(false), 10000);

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
                            Great! Now my CV is floating in your room. Walk around it to see the other pages.
                        </Text>
                    </mesh>

                </>
            )}
        </group>
    );
};

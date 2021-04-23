import {WithNextStep} from "../common/StoryInterfaces";
import React, {useEffect, useRef, useState} from "react";
import {Group} from "three";
import {Text} from "@react-three/drei";
import {Interactive} from "@react-three/xr";

export const Step2 = (props: JSX.IntrinsicElements['group'] & WithNextStep) => {

    const ref = useRef<Group>();
    const [visible, setVisibility] = useState<boolean>(false);

    useEffect(() => {
       const timer = setTimeout(() => {
           setVisibility(true);
       }, 2000);

       return () => clearTimeout(timer);
    });

    return (
        <group ref={ref} {...props}>
            {visible && (
                <Interactive onSelect={props.next}>
                    <mesh position={[0, -0.04, -0.01]} >
                        <planeGeometry args={[0.03, 0.014]} />
                        <meshStandardMaterial color={"white"} />
                        <Text
                            fontSize={0.002}
                            textAlign={"center"}
                            maxWidth={0.02}
                            color={"black"}
                        >
                            Place the marker in an empty space on the floor and click here
                        </Text>
                    </mesh>
                </Interactive>
            )}
        </group>
    );
};

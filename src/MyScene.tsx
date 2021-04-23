import {FollowCamera} from "./helpers/follow-camera/FollowCamera";
import {HitTracker} from "./helpers/hit-tracker/HitTracker";
import {LoadingMesh} from "./components/loading-mesh/LoadingMesh";
import React, {useRef, useState} from "react";
import {Group, Matrix4} from "three";
import {useThree} from "@react-three/fiber";
import {Step1} from "./story/step1/Step1";
import {Step2} from "./story/step2/Step2";
import {CV} from "./meshes/cv/CV";

export const MyScene = () => {
    const {camera} = useThree();
    const [step, setStep] = useState<number>(0);
    const [spot, setSpot] = useState<Matrix4|undefined>();
    const objectRef = useRef<Group>();

    const nextStep = () => {
        setStep(step + 1);
    };

    if (spot && objectRef.current) {
        const {position, quaternion, scale} = objectRef.current;
        spot.decompose(position, quaternion, scale);
    }

    return (
        <>
            <ambientLight intensity={0.5} />
            <spotLight
                position={[-0.2, 2, -0.1]}
                intensity={0.2}
                color={"yellow"} />
            <spotLight
                position={[0.5, 1.5, 0.5]}
                intensity={0.2}
                color={"yellow"} />

            <FollowCamera>
                {step === 0 && (<Step1 position={[0, 0, -camera.near - 0.01]} next={nextStep} />)}
                {step === 1 && (<Step2 position={[0, 0, -camera.near - 0.01]} next={nextStep} />)}
            </FollowCamera>

            {step === 1 && (
                <HitTracker onLocationChanged={(location) => setSpot(location)}>
                    <LoadingMesh />
                </HitTracker>
            )}

            {step === 2 && (
                <CV innerRef={objectRef} />
            )}
        </>
    );
};

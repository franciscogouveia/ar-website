import {FollowCamera} from "./helpers/follow-camera/FollowCamera";
import {HitTracker} from "./helpers/hit-tracker/HitTracker";
import {LoadingMesh} from "./components/loading-mesh/LoadingMesh";
import React, {useRef, useState} from "react";
import {Group, Matrix4} from "three";
import {useThree} from "@react-three/fiber";
import {Step1} from "./story/step1/Step1";
import {Step2} from "./story/step2/Step2";
import {CV} from "./meshes/cv/CV";
import {Step3} from "./story/step3/Step3";

export const MyScene = () => {
    const {camera} = useThree();
    const [step, setStep] = useState<number>(0);
    const sceneCenterRef = useRef<Group>();

    const nextStep = () => {
        setStep(step + 1);
    };

    const onHitTrackerChanged = (location: Matrix4) => {
        sceneCenterRef.current && location.decompose(sceneCenterRef.current.position, sceneCenterRef.current.quaternion, sceneCenterRef.current.scale);
    };

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
                {step === 2 && (<Step3 position={[0, 0, -camera.near - 0.01]} next={nextStep} />)}
            </FollowCamera>

            {step === 1 && (
                <HitTracker onLocationChanged={onHitTrackerChanged}>
                    <LoadingMesh />
                </HitTracker>
            )}

            <group ref={sceneCenterRef}>
                {step === 2 && (
                    <CV />
                )}
            </group>
        </>
    );
};

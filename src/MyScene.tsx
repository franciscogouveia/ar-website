import {FollowCamera} from "./helpers/follow-camera/FollowCamera";
import {HitTracker} from "./helpers/hit-tracker/HitTracker";
import {LoadingMesh} from "./components/loading-mesh/LoadingMesh";
import React, {useState} from "react";
import {useThree} from "@react-three/fiber";
import {Step1} from "./story/step1/Step1";

export const MyScene = () => {
    const {camera} = useThree();
    const [step, setStep] = useState<number>(0);

    return (
        <>
            <ambientLight intensity={1} />

            <FollowCamera>
                {step === 0 && (<Step1 position={[0, 0, -camera.near - 0.01]} next={() => {}} />)}

            </FollowCamera>

            <HitTracker onLocationChanged={() => {}}>
                <LoadingMesh />
            </HitTracker>
        </>
    );
};

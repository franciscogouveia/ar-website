import {InteractionManager, XR} from "@react-three/xr";
import {Canvas} from "@react-three/fiber";
import React, {FunctionComponent, PropsWithChildren, useEffect, useState} from "react";
import {RootState} from "@react-three/fiber/dist/declarations/src/core/store";
import {initAR, isARSupported} from "../../helpers/ar-init/IsARSupported";

export interface MyARCanvasProps {
    sessionInit?: any,
    onCreated?: (rootState: RootState) => void
}

export const MyARCanvas: FunctionComponent<MyARCanvasProps> = (props: PropsWithChildren<MyARCanvasProps>) => {

    const [isSupported, setIsSupported] = useState<boolean | null>(null);
    const [rs, setRs] = useState<RootState | null>(null);
    const [isStarted, setIsStarted] = useState<boolean>(false);

    useEffect(() => {
        isARSupported()
            .then(setIsSupported)
            .catch((e) => {
                console.error(`Could not check AR compatibility`, e);
                setIsSupported(false)
            });
    }, []);

    if (isSupported === null) {
        return (
            <div style={{color: "white"}}>
                Hold tight! Checking AR compatibility...
            </div>
        );
    }

    if (!isSupported) {
        return (
            <div style={{color: "red"}}>
                Sorry! It seems that AR is not supported in your browser :(
            </div>
        );
    }

    const onClickStart = async (rootState: RootState) => {

        const {gl} = rootState;

        try {
            await initAR(gl, props.sessionInit);
            setIsStarted(true);
            props.onCreated?.(rootState);
        } catch (e) {
            alert(`Could not start AR session: ${e.message}`);
        }
    };

    return (
        <div style={{textAlign: 'center'}}>
            <h1>Augmented Reality</h1>
            <hr />

            <Canvas vr onCreated={(rootState: RootState) => setRs(rootState)} style={{visibility: 'hidden', position: 'fixed'}}>
                <XR>
                    <InteractionManager>
                        {props.children}
                    </InteractionManager>
                </XR>
            </Canvas>

            {!isStarted && rs && (
                <>
                    <p>By clicking on the following button, you are allowing this website to access your camera to track the environment around you. This is required for an immersive augmented reality experience.</p>
                    <p>More information can be found <a href="https://www.w3.org/TR/webxr/#security" rel="noreferrer" target={"_blank"}>here</a>.</p>
                    <button style={{width: '100px', height: '100px'}} onClick={() => onClickStart(rs)}>Start AR Experience</button>
                </>
            )}
            {!isStarted && !rs && (
                <div style={{color: 'white'}}>Initializing XR canvas...</div>
            )}
        </div>
    )
};

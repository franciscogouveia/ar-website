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
        <>
            <Canvas vr onCreated={(rootState: RootState) => setRs(rootState)} style={{height: '720px'}}>
                {isStarted && (
                    <XR>
                        <InteractionManager>
                            {props.children}
                        </InteractionManager>
                    </XR>
                )}
            </Canvas>
            {!isStarted && rs && (
                <button onClick={() => onClickStart(rs)} value="Start">Click here when you are ready!</button>
            )}
            {!isStarted && !rs && (
                <div>Starting XR canvas...</div>
            )}
        </>
    )
};

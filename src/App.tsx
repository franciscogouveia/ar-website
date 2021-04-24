import React, {useEffect, useRef, useState} from 'react';
import {MyARCanvas} from "./components/canvas/CustomARCanvas";
import {MyScene} from './MyScene';
import {DomOverlay} from "./helpers/dom-overlay/DomOverlay";
import {RootState} from "@react-three/fiber/dist/declarations/src/core/store";
import {XRSession} from "three";

function App() {
    const domOverlayRef = useRef<HTMLDivElement>(null);
    const [overlay, setOverlay] = useState<Element | null>(null);
    const [arSession, setArSession] = useState<XRSession | null>(null);
    const sessionInit = {
        requiredFeatures: ["local-floor", "hit-test"],
    };

    useEffect(() => {
        if (domOverlayRef.current) {
            setOverlay(domOverlayRef.current);
        }

        return () => {
            setOverlay(null);
        };
    }, [domOverlayRef]);

    return (
        <>
            {overlay && (
                <MyARCanvas
                    sessionInit={sessionInit}
                    domOverlay={overlay}
                    onStarted={(rootState: RootState, session: XRSession) => setArSession(session)}
                    onEnded={() => setArSession(null)}
                >
                    <MyScene/>
                </MyARCanvas>
            )}
            <DomOverlay innerRef={domOverlayRef}
                        style={{width: '100%', height: '100%'}}
                        visible={!!arSession}
            >
                <div style={{position: 'absolute', bottom: '0px', left: '0px', right: '0px', backgroundColor: 'white', textAlign: 'center'}}>
                    <div style={{color: 'black'}}>
                        <b>Francisco de Gouveia | AR Experiment</b>
                        <hr />
                    </div>

                    <button style={{height: '32px'}} onClick={() => arSession?.end()}>Exit</button>
                </div>
            </DomOverlay>
        </>
    );
}

export default App;

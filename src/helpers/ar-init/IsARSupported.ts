import {Navigator, WebGLRenderer, XRSession, XRSessionInit} from "three";

const SESSION_TYPE = 'immersive-ar';
const {xr} = window.navigator as Navigator;

export const isARSupported = async () => {

    if ( xr ) {
        return await xr.isSessionSupported(SESSION_TYPE);
    } else {

        if ( window.isSecureContext === false ) {
            window.open(document.location.href.replace( /^http:/, 'https:' ));
        }

        return false;
    }
};

export const initAR = async (renderer: WebGLRenderer, sessionInit: XRSessionInit = {}): Promise<XRSession> => {

    if (!xr) {
        throw new Error('XR not supported');
    }

    const session = await xr.requestSession(SESSION_TYPE, sessionInit);

    const onSessionEnd = () => {
        session.removeEventListener("end", onSessionEnd);
    };
    session.addEventListener("end", onSessionEnd);

    renderer.xr.setReferenceSpaceType("local");
    await renderer.xr.setSession(session);

    return session;
};

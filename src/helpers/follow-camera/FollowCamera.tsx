import React, {PropsWithChildren} from "react";
import {createPortal, useThree} from "@react-three/fiber";

export interface FollowCameraProps {

}

export const FollowCamera = (props: PropsWithChildren<FollowCameraProps>) => {

    const {camera} = useThree();

    const portal = createPortal(
        props.children,
        camera,
    );

    return (<>{portal}</>);
};
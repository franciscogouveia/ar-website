import React, {PropsWithChildren, useRef} from "react";
import * as THREE from "three";
import {Group} from "three";
import {useHitTest} from "@react-three/xr";

export interface HitTrackerProps {
    onLocationChanged: (matrix: THREE.Matrix4) => void;
}

// We ignore the scale. We don't need to always reuse the same empty vector
const emptyVector = new THREE.Vector3();

/**
 * The children will be placed in the hit location with the right rotation.
 *
 * @param props
 * @constructor
 */
export const HitTracker = (props: PropsWithChildren<HitTrackerProps>) => {

    const ref = useRef<Group>();

    useHitTest((matrix, hit) => {

        if (hit && ref.current) {
            // Place group in real-world location with proper rotation
            matrix.decompose(ref.current.position, ref.current.quaternion, emptyVector);

            // Allow tracking of the coordinates on an upper level
            props.onLocationChanged(matrix.clone());
        }
    });

    return (
        <group ref={ref} {...props}>
            {props.children}
        </group>
    );
};


import React from 'react';
import ReactTestRenderer from '@react-three/test-renderer';
import {Renderer} from "@react-three/test-renderer/dist/declarations/src/types/public";
import {LoadingMesh} from './LoadingMesh';

const {act, create} = ReactTestRenderer;

describe("LoadingMesh", () => {

    const withLoadingMesh = async (fn: (renderer: Renderer) => Promise<jest.ProvidesCallback | void>): Promise<jest.ProvidesCallback | void> => {
        const renderer = await create(<LoadingMesh />);

        try {
            return (await fn(renderer));
        } finally {
            // Always unmount after test, regardless of outcome
            await renderer.unmount();
        }
    };

    it("should contain three spheres (1 red, 2 blue)", () => withLoadingMesh(async (renderer) => {
        await act(async () => {
            await renderer.advanceFrames(1, 1);
        });

        // Expect 3 meshes
        const meshes = renderer.scene.findAllByType("Mesh");
        expect(meshes).toHaveLength(3);

        // All of them should be spheres
        const meshesWithSpheres = meshes.filter(m => m.findAllByType("SphereGeometry").length > 0);
        expect(meshesWithSpheres).toHaveLength(meshes.length);

        // There should be 1 red and 2 blue spheres
        const colors = meshes.map(m => m.findAllByType("MeshPhysicalMaterial").map(m => m.props.color)).flat();
        const redColor = colors.filter(c => c === "red");
        expect(redColor).toHaveLength(1);
        const blueColor = colors.filter(c => c === "blue");
        expect(blueColor).toHaveLength(2);
    }));

    it("should rotate the spheres on Y axis", () => withLoadingMesh(async (renderer) => {
        await act(async () => {
            await renderer.advanceFrames(1, 1);
        });

        // Expect 3 meshes
        const meshes = renderer.scene.findAllByType("Mesh");
        expect(meshes).toHaveLength(3);

        const redMesh = meshes.find(m => !!m.findAllByType("MeshPhysicalMaterial").find(m => m.props.color === "red"));
        expect(redMesh).toBeDefined();

        if (!redMesh) {
            // We are asserting this in the line above, but for typescript to not assume it as possibly undefined, we need this checks
            throw new Error("redMesh not defined");
        }

        const redMeshInitialRotation = redMesh.instance.rotation.y;

        const blueMesh = meshes.find(m => !!m.findAllByType("MeshPhysicalMaterial").find(m => m.props.color === "blue"));
        expect(blueMesh).toBeDefined();

        if (!blueMesh) {
            // We are asserting this in the line above, but for typescript to not assume it as possibly undefined, we need this checks
            throw new Error("blueMesh not defined");
        }

        // The blue meshes are wrapped into a group parent
        const blueMeshesGroup = blueMesh.parent;
        expect(blueMeshesGroup).toBeDefined();

        if (!blueMeshesGroup) {
            // We are asserting this in the line above, but for typescript to not assume it as possibly undefined, we need this checks
            throw new Error("blueMeshesGroup not defined");
        }

        const blueMeshesGroupInitialRotation = blueMeshesGroup.instance.rotation.y;

        await act(async () => {
            await renderer.advanceFrames(1, 1);
        });

        expect(redMesh.instance.rotation.y).not.toEqual(redMeshInitialRotation);
        expect(blueMeshesGroup.instance.rotation.y).not.toEqual(blueMeshesGroupInitialRotation);
    }));
});


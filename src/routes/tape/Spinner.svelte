<script>
    import * as THREE from 'three'
    import { Group, Mesh } from '@threlte/core'
    import { CSG } from 'three-csg-ts';
    import { each } from 'svelte/internal';

    export let positionX;
    export let rotationZ;
    export let spinnerColor;
    // Spinners, 1: Create circle to hold teeth
    var outerRadius = 4;
    var innerRadius = 3;
    var height = 1;

    var arcShape = new THREE.Shape();
    arcShape.moveTo(outerRadius * 2, outerRadius);
    arcShape.absarc(outerRadius, outerRadius, outerRadius, 0, Math.PI * 2, false);
    var holePath = new THREE.Path();
    holePath.moveTo(outerRadius + innerRadius, outerRadius);
    holePath.absarc(outerRadius, outerRadius, innerRadius, 0, Math.PI * 2, true);
    arcShape.holes.push(holePath);

    var spinnerGeometry = new THREE.ExtrudeGeometry(arcShape, {
        bevelEnabled: false,
        steps: 1,
        curveSegments: 60
    });
    spinnerGeometry.center();

    // position={{ x: 2.8 * Math.cos(Math.PI * 2 * (i/6)), y: 2.8 * Math.sin(Math.PI * 2 * (i/6))}}
</script>
    
<Group 
    position={{ x: positionX }}
    rotation={{ z: rotationZ }}>
    <Mesh
        geometry={spinnerGeometry}
        material={new THREE.MeshStandardMaterial({
            color: spinnerColor
        })}/>
    {#each Array(6) as _, i}
    <Group rotation={{ x: 0, y: 0, z: (Math.PI / 3) * i}}>
        <Mesh
            geometry={new THREE.BoxGeometry(0.8, 1, 1)}
            material={new THREE.MeshStandardMaterial({
                color: spinnerColor
            })}
            position={{ y: 3 }}
            />
    </Group>
    {/each}
</Group>

<style></style>
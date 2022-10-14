
import * as THREE from 'three'
import {Group, Mesh, Object3DInstance } from '@threlte/core'
import { CSG } from '/three-csg-ts';

// Params
const params = {
    color: '#ffffff',
    textColor: '#B73E3E',
    backgroundColor: '#0b190e'
};

// Tape: 1, Create basic shape
const tapeShape = new THREE.Shape()

tapeShape.moveTo( 5, 0 );
tapeShape.lineTo( 55, 0);
tapeShape.bezierCurveTo(60, 0, 60, 0, 60, 5)
tapeShape.lineTo( 60, 35 )
tapeShape.bezierCurveTo(60, 40, 60, 40, 55, 40)
tapeShape.lineTo( 5, 40 )
tapeShape.bezierCurveTo(0, 40, 0, 40, 0, 35)
tapeShape.lineTo( 0, 5 )
tapeShape.bezierCurveTo(0, 0, 0, 0, 5, 0)

const extrudeSettings = { depth: 5, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
const tapeGeometry = new THREE.ExtrudeGeometry( tapeShape, extrudeSettings );
tapeGeometry.center()
let tapeMaterial = new THREE.MeshStandardMaterial(
    {
        roughness: 0.7,
        metalness: 0.6,
        transparent: true,
        opacity: 1,
        color: params['color']
    }
) 
const tape = new THREE.Mesh( tapeGeometry, tapeMaterial);

// Tape, 2: Punch holes in it where spinners will go
const cylinderLeft = new THREE.Mesh(
new THREE.CylinderGeometry(3.5, 3.5, 16, 64, 64),
new THREE.MeshNormalMaterial()
    );
cylinderLeft.rotateX(Math.PI / 2)
const cylinderRight = cylinderLeft.clone() // cloning the left cylinder
cylinderLeft.position.x = 12 // shifting left to left, right to right
cylinderLeft.updateMatrix()
cylinderRight.position.x = - 12
cylinderRight.updateMatrix()

const tapeWithLeftHole = CSG.subtract(tape, cylinderLeft)
const tapeWithHoles = CSG.subtract(tapeWithLeftHole, cylinderRight)

// Tape, 3: Punch out a middle rectangle for transparent windows
const cutoutBox = new THREE.Mesh(
    new THREE.BoxGeometry(13, 6, 12),
    new THREE.MeshStandardMaterial({ color: '#ffffff' })
);
const tapeWithNoMiddle = CSG.subtract(tapeWithHoles, cutoutBox)

export default class TapeOutline {
    constructor() {
      this.tapeGeometry = tapeWithNoMiddle.geometry
      this.tapeMaterial = tapeWithNoMiddle.material
    }
}



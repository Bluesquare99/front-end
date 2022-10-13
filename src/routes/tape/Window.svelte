<script>
    import * as THREE from 'three'
    import {Group, Mesh, Object3DInstance } from '@threlte/core'

    export let positionZ;
  </script>
    
<Mesh
    geometry={new THREE.BoxGeometry(13, 6, 1)}
    material={new THREE.MeshStandardMaterial({
        color: '#ffffff',
        transparent: true,
        opacity: 0.1
      })}
    position={{ z: positionZ }} />
  
<style></style>
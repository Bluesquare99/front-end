<script>
  import * as THREE from 'three'
  import {Group, Mesh, Object3DInstance, useFrame} from '@threlte/core'
  import { CSG } from 'three-csg-ts';

  import Spinner from './Spinner.svelte'
  import Window from './Window.svelte'
  import TapeOutline from './TapeOutline.js'

  import { createEventDispatcher } from 'svelte';

  // Tape aesthetics
  const params = {
      color: '#ffffff',
      textColor: '#B73E3E',
      backgroundColor: '#0b190e',
      spinnerColor: '#ffffff'
  };
  let tapeOutline = new TapeOutline()

  // Spinner rotation
  let rotation = 0
  let rotationValue = 0
  useFrame(() => {rotation += rotationValue}) // start rotating

  // Pause + play of audio
  export let stationName = null;
  const dispatch = createEventDispatcher()
  const pausePlay = () =>
  {
    // dispatch an event to main codebase when clicked, initializing playing of audio
    dispatch('audioPlay', stationName)
    rotationValue = (rotationValue === 0 ? 0.02 : 0)
  }
</script>
  
<Group>
  <Mesh
    geometry={tapeOutline.tapeGeometry}
    material={tapeOutline.tapeMaterial}
    interactive
    on:click={pausePlay}
    />
  <Window positionZ={3} />
  <Window positionZ={-3} />
  <Spinner
    positionX={-12}
    rotationZ={rotation}
    spinnerColor={params['spinnerColor']} />
  <Spinner 
    positionX={12}
    rotationZ={rotation}
    spinnerColor={params['spinnerColor']}  />
</Group>

<style></style>
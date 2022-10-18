<script>
	// THREE imports
	import Tape from './tape/Tape.svelte'
	import * as THREE from 'three'
	import {
		AmbientLight,
		Canvas,
		DirectionalLight,
		PointLight,
		Group,
		HemisphereLight,
		Mesh,
		OrbitControls,
		PerspectiveCamera,
		Object3DInstance,
		Fog
	} from '@threlte/core'


	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import { each } from 'svelte/internal';
	import { onMount } from 'svelte'

	const stations = [
		{
		'name': 'bff',
		'stream_url': 'https://ais-sa2.cdnstream1.com/2053_128.mp3',
		'site_url': 'https://bff.fm/'
		},{
		'name': 'wesu',
		'stream_url': 'http://radio.wesleyan.edu:8000/stream',
		'site_url': 'http://www.wesufm.org/'
		},{
		'name': 'kvrx',
		'stream_url': 'https://kvrx.org/now_playing/stream',
		'site_url': 'https://kvrx.org/app/'
		},{
		'name': 'koop',
		'stream_url': 'https://streaming.koop.org/stream.aac',
		'site_url': 'https://koop.org/'
		},{
		'name': 'ckdu',
		'stream_url': 'https://archive1.ckdu.ca:9750/ckdu_1_on_air_low.mp3',
		'site_url': 'https://ckdu.ca/'
		}
	]

	let playing = false
	let audioPlayer
	
	const handleAudioPlay = (event) =>
	{
		playing = !playing
		console.log(audioPlayer);
		if(!playing) audioPlayer.pause
		else  new Audio(stations[0]['stream_url']).play()
	}

	let cursorLeft, cursorTop;
	const changeCursorPosition = (event) =>
	{
		cursorLeft = event.clientX + "px"
		cursorTop = event.clientY + "px"
	}

	// Listen for messages
	// socket.addEventListener('message', (event) => {
	// 	console.log('Message from server ', event.data);
	// });
	// ws.addEventListener("message", (message) => {
	//     console.log(message);
	//     // Parse the incoming message here
	//     // const data = JSON.parse(message);
	// });
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section on:mousemove={changeCursorPosition}>
	<div 
		class="cursor" 
		id="cursor" 
		style="background-color: {playing ? '#3d9b3f' : '#ede59a'};
			border: {playing ? '6px solid #9cccdb' : '6px solid #ef9659'};
			left: {cursorLeft}; 
			top: {cursorTop}">
	</div>
    <Canvas>
      	<PerspectiveCamera position={{ x: 0, y: 0, z: 120 }} fov={400} near={0.1} far={1000} >
        <OrbitControls
          autoRotate={false}
          enableZoom={false}
          target={{ y: 0.5 }}
        />
      	</PerspectiveCamera>
  
      	<AmbientLight color={'#ffffff'} intensity={0.2} />
      	<DirectionalLight color={'#ffffff'} intensity={0.7} position={{ x: -40, y: 40, z: 300 }}></DirectionalLight>
     	<PointLight color={'#ffffff'} intensity={2.5} distance={2} decay={0.2} position={{ x: -40, y: 40, z: 300 }}></PointLight>

		<Tape on:audioPlay={handleAudioPlay}/>
    </Canvas>
</section>

<style>
	section {
		height: 80vh;
		width: 100%;
		cursor: none;
	}

	.cursor 
	{
		position: fixed;
		border-radius: 50%;
		transform: translateX(-50%) translateY(-50%);
		pointer-events: none;
		left: -100px;
		top: 50%;
		z-index: 10000;
		height: 18px;
		width: 18px;
	}
</style>

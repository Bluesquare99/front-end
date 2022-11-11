<script>
	import { getStores, navigating, page, updated } from '$app/stores';
	import { currentShows, currentShowsPairs, textC, selectedC } from '../stores.js';
	import { get } from 'svelte/store';
	import { each, object_without_properties, xlink_attr } from 'svelte/internal';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import DanceFloor from './shifting-grid/DanceFloor.svelte'
	
	import { AmbientLight, Canvas, PerspectiveCamera, OrbitControls, Object3DInstance, useFrame, useThrelte } from '@threlte/core';
	import * as THREE from 'three';
    import { onMount } from 'svelte';

	/**
	 * SECTION: Loading initial show values
	 */
	let initialUpdate = false;

	// $: console.log({ $currentShows, $page, $$props });
	export let data;
	$: curShows = data.currentShows;
	$: {
		if (initialUpdate === false) {
			currentShows.update((old) => curShows);
		}
	}

	$: currentStations = Object.keys($currentShowsPairs).sort(function (a, b) {
		return a.localeCompare(b);
	});
	$: currentShowNames = Object.values($currentShowsPairs).sort(function (a, b) {
		return a.localeCompare(b);
	});
	$: selected = {
		station: currentStations ? currentStations[selectedIndexStations] : 'None yet',
		show: currentShowNames ? currentShowNames[selectedIndexShows] : 'None yet'
	};
	$: console.log('selected show names', currentShowNames);
	$: console.log('selected index shows', selectedIndexShows);
	$: console.log('selected station and show', selected);
	
	/**
	 * SECTION: Selecting different stations
	 */
	let selectedIndexStations = 0;
	$: selectedIndexShows = (currentStations[0] ? getCorrespondingIndex(0, 'stationToShow') : 0)

	function getCorrespondingIndex(index, toStationOrShow) {
		let selectedIndex = -1

		if (toStationOrShow === 'stationToShow') {
			// for station => show
			const correspondingShow = $currentShowsPairs[currentStations[index]];
			currentShowNames.forEach((show, i) => {
				if (show === correspondingShow) 
				{
					selectedIndex = i;
				}
			});
		}
		return selectedIndex;
	}

	function onKeyDown(e) {
		switch (e.keyCode) {
			//down
			case 40:
				if (selectedIndexStations < currentStations.length - 1) {
					selectedIndexStations++;
				}
				break;
			//up
			case 38:
				if (selectedIndexStations > 0) {
					selectedIndexStations--;
				}
				break;
		}
		// get index of show from index of station
		const correspondingShowIndex = getCorrespondingIndex(selectedIndexStations, 'stationToShow');
		selectedIndexShows = correspondingShowIndex;
	}

	/**
	 * SECTION: CREATING A GLOBE
	 */
	let globeMap
	let globeDisco

	$: rotationX = tweened(0, {
		duration: 1200,
		easing: cubicOut
	});
	
	$: rotationY = tweened(0, {
		duration: 1200,
		easing: cubicOut
	});

	console.log(`rotationX equals ${rotationX}; rotationY equals ${rotationY}`);

	const handleRotateButtonClick = () => 
	{
		const latitudes = [53, 37, 30]
		const longitudes = [6, 122, 97]
		const rand = Math.floor(Math.random() * 3);
		rotationX.set((Math.PI * 2) * latitudes[rand] / 360)
		rotationY.set((Math.PI * 2) * longitudes[rand] / 360)
		console.log(`rotationX equals ${rotationX}; rotationY equals ${rotationY}`);
	}
    
	onMount(async () => {
        const initialGlobe = (await import('three-globe')).default;

        // SUBSECTION: Map Globe
		const stationStats = [
			{
				name: 'DDR',
				lat: 53.34766040284911,
				lng: -6.270136955821768
			},
			{
				name: 'BFF',
				lat: 37.7639450483543, 
				lng: -122.41844434668297
			},
			{
				name: 'KOOP',
				lat: 30.28866549322267,
				lng: -97.70617147356026
			}
		]
		const stationPointsArray = stationStats.map(station => {
			const container = {};

			container['lat'] = station['lat'],
			container['lng'] = station['lng'],
			container['color'] = 'red',
			container['altitude'] = 0.04,
			container['radius'] = .6

			return container;
		})

        globeMap = new initialGlobe()
            .globeImageUrl('src/lib/images/earf2.png')
			.pointsData(stationPointsArray)
			.pointAltitude('altitude')
			.pointRadius('radius')
			.pointColor('color')
		        
        // SUBSECTION: Disco Globe
        const TILE_MARGIN = 0.35; // degrees
        const GRID_SIZE = [60, 20];
        const tileWidth = 360 / GRID_SIZE[0];
        const tileHeight = 180 / GRID_SIZE[1];
        const tilesData = [];
        [...Array(GRID_SIZE[0]).keys()].forEach(lngIdx =>
			[...Array(GRID_SIZE[1]).keys()].forEach(latIdx =>
				tilesData.push({
				lng: -180 + lngIdx * tileWidth,
				lat: -90 + (latIdx + 0.5) * tileHeight,
				material: new THREE.MeshStandardMaterial({color: "#C0C0C0", metalness: 0.2 })
				})
        	)
        );

		globeDisco = new initialGlobe()
			.tilesData(tilesData)
			.tileWidth(tileWidth - TILE_MARGIN)
			.tileHeight(tileHeight - TILE_MARGIN)
			.tileMaterial('material');
	});

	// class:selected={selected['show'] === showName}
	// <div class="selected-station-bar" style="top: {`${$selectedStationBarHeight}px`};" />
	// <div class="selected-show-bar" style="top: {`${$selectedShowBarHeight}px`};" />
</script>

<button on:click={handleRotateButtonClick}>click me if you dare</button>

<svelte:window on:keydown|preventDefault={onKeyDown} />

<div class="holder">
	<div class="panel">
		<div class="divider divider-right">
			<p class="title">stations</p>
			{#each currentStations as station, index}
				<p
					class="list-item"
					style="color: {(selected['station'] === station) ? $selectedC : $textC};" 
				>
					{station}
				</p>
			{/each}
		</div>
		<div class="groovy-div">
			<div>
				<Canvas>
					<PerspectiveCamera position={{ x: 0, y: 0, z: 120 }} fov={400} near={0.1} far={1000} >
						<OrbitControls
						autoRotate={false}
						enableZoom={false}
						target={{ y: 0.5 }}
						/>
					</PerspectiveCamera>
					<AmbientLight color={'#ffffff'} intensity={1} />
					<Object3DInstance object={globeMap} scale={0.4} rotation={{x: rotationX ,y: rotationY}} />
				</Canvas>
			</div>
			<div>
				<DanceFloor />
			</div>
		</div>
		<div class="divider divider-left">
			<p class="title">show</p>
			{#each currentShowNames as showName, index}
				<p 
					class="list-item" 
					style="color: {(selected['show'] === showName) ? $selectedC : $textC};" 
					>{showName}</p>
			{/each}
		</div>
	</div>
</div>

<style>
	@font-face {
		font-family: 'Trim-Mono';
		src: url('/fonts/TrimMono-Medium.otf') format('opentype');
	}
	.holder {
		font-family: 'Trim-Mono';
		margin: auto;
		font-size: 1.2rem;
		padding: 40px;
	}
	.panel {
		height: 90vh;
		width: 80vw;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: auto auto;
		
	}

	.divider {
		height: 80%;
		width: 24rem;

		display: flex;
		flex-direction: column;
		gap: 12px;
		border: 1px solid black;
	}
	
	.groovy-div {
		height: 80%;
		width: 24rem;

		display: flex;
		flex-direction: column;
		gap: 12px;
		border: 1px solid black;
		justify-content: space-around;
	}

	.selected-station-bar {
		position: absolute;
		height: 2px;
		width: 12%;

		left: 20%;
		right: 0;
		margin-right: auto;

		background-color: #ffffff;
	}
	
	.selected-show-bar {
		position: absolute;
		height: 2px;
		width: 12%;

		left: 0;
		right: 20%;
		margin-left: auto;

		background-color: #ffffff;
	}

	#vibe {
		height: 40%;
		border: 1.5px solid black;
	}

	.title {
		font-size: 16px;
		transform: translateY(-6rem);
		text-align: center;
	}

	.list-item {
		text-align: center;
		color: lightsteelblue;
	}

	.selected {
		color: darkslategray;
	}

	.groovy-div {
		display: flex;
		flex-direction: column;
		gap: 40px;
		align-items: center;
	}


</style>



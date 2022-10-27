<script>
	import { getStores, navigating, page, updated } from '$app/stores';
	import * as knobby from 'svelte-knobby';
	import { currentShows, currentShowsPairs } from '../stores.js'
	import { get } from 'svelte/store';
	import { each, object_without_properties } from 'svelte/internal';

	/**
	 * SECTION: Gui
	 */
	const controls = knobby.panel({
	  // primitive values are handled automatically
	  message: 'Hello World!',
	  color: '#d15e47',
	  clicks: 0,
	  checked: false,
  
	  // specify options by using a { value } object
	  constrained: {
		// any object can be given a $label which will
		// appear in place of the property name
		$label: 'labelled input',
		value: 50,
		min: 0,
		max: 100,
		step: 1
	  },
  
	  // objects that can't be 'interpreted' (see below)
	  // are treated as folders
	  folder: {
		$label: 'labelled folder',
		a: 1, // accessed as $controls.folder.a
		b: 2,
		nested: {
		  c: 3, // accessed as $controls.folder.nested.c
		  d: 4
		}
	  }
	});
	$controls.message = 'Hello Knobby!';

	/**
	 * SECTION: Selecting different stations
	*/
	let selectedIndexStations = 0
	let selectedIndexShows = 0

	function setCorrespondingIndex(index, toStationOrShow)
	{
		if (toStationOrShow === 'stationToShow')
		{
			console.log('inside bp 1');
			// for station => show
			const correspondingShow = $currentShowsPairs[currentStations[index]]
			currentShowNames.forEach((show, i) =>
			{
				if (show === correspondingShow) selectedIndexShows = i
			})
		}
	}

	function onKeyDown(e)
	{
		switch (e.keyCode) {
			//down
			case 40:
				if (selectedIndexStations < currentStations.length - 1) 
				{
					selectedIndexStations++
				}
				break
			//up
			case 38:
				if (selectedIndexStations > 0) 
				{
					selectedIndexStations--
				}
				break
		}
		const correspondingShow = setCorrespondingIndex(selectedIndexStations, 'stationToShow')

		console.log(`selectedIndexStations: ${selectedIndexStations}`);
		console.log(`selectedIndexShows: ${correspondingShow}`);
	}

	/**
	 * SECTION: Unpacking Store
	*/
	let initialUpdate = false

	$: console.log({$currentShows, $page, $$props});
	export let data
	$: curShows = data.currentShows
	$: {
		if (initialUpdate === false)
		{
		currentShows.update(old => curShows)
	}
	}

	$: currentStations = Object.keys($currentShowsPairs).sort(function (a, b) {
			return a.localeCompare(b);
		});
	$: currentShowNames = Object.values($currentShowsPairs).sort(function (a, b) {
			return a.localeCompare(b);
		});
	$: selected = {
		'station': currentStations ? currentStations[selectedIndexStations] : 'None yet',
		'show': currentShowNames ? currentShowNames[selectedIndexShows] : 'None yet'
	}
	$: console.log(currentStations, currentShowNames);

	/**
	 * SECTION: Create smooth movement for backing div
	 */
	export let top
	export let left

	let el

	// reactive block will rerun each time el, top, or left changes
	$: if (el) {
		el.style.top = top + 'px'
		el.style.left = left + 'px'
		console.log(el.style);
	}
  </script>

  <svelte:window on:keydown|preventDefault={onKeyDown} />

  <div class="holder">
	<div class="panel" style="background-color: {'white'}">
		<div class="divider">
			<p class="title">stations</p>
			{#each currentStations as station}
				<div
				class="item-holder" 
				class:selected={selected['station'] === station
				}>
				<p 
					class="list-item"
					>{station}</p>
		</div>
			{/each}
		</div>
		<div class="divider">
			<p class="title">show</p>
			{#each currentShowNames as showName}
				<div
					class="item-holder" 
					class:selected={selected['show'] === showName}
					bind:this={el}>
					<p
						class="list-item"
						>{showName}</p>
				</div>
			{/each}
		</div>
	</div>
</div>
  

  <style>
	@font-face {
    font-family: "Trim-Mono";
    src: url("/fonts/TrimMono-Medium.otf") format("opentype");
    }
	.holder {
		font-family: "Trim-Mono";
		margin: auto;
	}
	.panel {
		height: 90vh;
		width: 80vw;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16px;
		margin: auto auto;
	}

	.divider {
		height: 80%;
		width: 16rem;
		border: 1.5px solid black;
		padding: 40px 0px;
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

	.item-holder {
		height: 10%;
		display: flex;
		flex-direction: column;
		align-items: center;

		margin: 8px 12px;
	}

	.selected {
		background-color: yellowgreen;
		border: 1px solid black;
	}

	.list-item {
		text-align: center;
	}
  </style>
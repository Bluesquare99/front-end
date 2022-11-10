<script>
	import Footer from './Footer.svelte';
	import './styles.css';
	import * as knobby from 'svelte-knobby';
	import { backgroundC, textC, selectedC } from '../stores.js';


	/**
	 * SECTION: Gui
	 */
	 const controls = knobby.panel({
	  // primitive values are handled automatically
	  backgroundC: '#ffffff',
	  textC: '#242424',
	  selectedC: '#beff8a',
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
	  }
	});

	$: $backgroundC = $controls.backgroundC
	$: $textC = $controls.textC
	$: $selectedC = $controls.selectedC

</script>

<div class="app" style="background-color: {$backgroundC};">
	
	<main>
		<slot/>
	</main>
	
	
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		/* padding: 1rem; */
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

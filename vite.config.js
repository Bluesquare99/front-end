import { sveltekit } from '@sveltejs/kit/vite';
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs';

/** @type {import('vite').UserConfig} */
const config = {
	optimizeDeps: {
		esbuildOptions: {
			plugins: [esbuildCommonjs(['node-cron'])]
		}
	},
	define: {
		global: {},
		'process.env': process.env
	},
	plugins: [sveltekit()],
	ssr: {
		noExternal: ['three', 'troika-three-text']
	}
};

export default config;

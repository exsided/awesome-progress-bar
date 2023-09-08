// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader';
import dynamicImport from 'vite-plugin-dynamic-import';
import eslint from 'vite-plugin-eslint';

export default defineNuxtConfig({
	devtools: { enabled: true },

	modules: ['@pinia/nuxt'],

	css: ['~/assets/styles/main.scss'],

	vite:
	{
		LintOnStart: false,

		plugins: [svgLoader(), dynamicImport(), eslint({ lintOnStart: false, failOnError: false, failOnWarning: false })],

		css:
		{
			preprocessorOptions:
			{
				scss:
				{
					additionalData: `
					@import "~/assets/styles/base/mixins.scss";
					@import "~/assets/styles/base/variables.scss";
					`,
				},
			},
		},
	},
});

const {config} = require('./wdio.conf');

const path = require('path');

const tmpFilesPath = path.resolve('./test/.artifacts');

const downloadsFolder = path.resolve(tmpFilesPath, 'downloads');

config.services = ['edgedriver'];

config.capabilities = [
	{
		// maxInstances can get overwritten per capability. So if you have an in-house Selenium

		// grid with only 5 firefox instances available you can make sure that not more than

		// 5 instances get started at a time.

		'maxInstances': 1,

		'browserName': 'MicrosoftEdge',

		'acceptInsecureCerts': true, //'unhandledPromptBehavior': 'ignore',

		'ms:edgeOptions': {
			args: [
				'--window-size=1920,1080',
				'--inprivate',
				'--headless',
				//'--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
			],

			excludeSwitches: ['enable-automation'],

			prefs: {
				'download.prompt_for_download': false,

				'directory_upgrade': true,

				'download.default_directory': downloadsFolder,
			},
		}, // If outputDir is provided WebdriverIO can capture driver session logs // it is possible to configure which logTypes to include/exclude. // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs // excludeDriverLogs: ['bugreport', 'server'],
	},
];

exports.config = config;

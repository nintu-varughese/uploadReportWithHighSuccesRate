const homePage = require('../page_objects/homePage');
const env = require('../../test-data/url.json')
const testData = require('../../test-data/testData.json');

describe('QaWolf.com  ', () => {
		it('should be able to launch url', async () => {
			await homePage.openUrl(env.baseUrl);
			await expect(browser).toHaveUrl('https://www.qawolf.com/');
		});
		it('user should be able to Click on GET STARTED', async () => {
			await homePage.getStarted(testData.getStarted,'Get started with QA Wolf');
			expect(await homePage.$homePageHeader('Get started with QA Wolf').isDisplayed()).toBe(true, 'Expect startup page header to be displayed');
			await expect(browser).toHaveUrl('https://www.qawolf.com/get-started');
		});
	});


const Commom = require("./common");
class Homepage extends Commom {
	constructor() {
		super();
		this.$homePageHeader = (header) =>  $(`//h1[contains(text(),'${header}')]`);
		this.$topNavigationBar = (menu) => $(`//div[@class="navbar-link-wrapper"]//a[contains(text(),'${menu}')]`);
	}

/**
 * Methods
*/

/**
 * Method to click on Get Started
 * @param {String} name Name of the Navigation Icon
 * @param {String} header 
 */
async getStarted(name,header){
	await this.$topNavigationBar(name).click();
	await this.$homePageHeader(header).waitForDisplayed({timeout: 30000, timeoutMsg: `Header still not displayed`});

}

}
module.exports = new Homepage();

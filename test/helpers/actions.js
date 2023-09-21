/**
 *  Exports
 */
module.exports = {
    /**
     * Scroll to element to view and click
     * @param {ElementFinder} $element
     * @param {number} timeout
     */
    scrollAndClick: async ($element, timeout = 10000) => {
      await $element.scrollIntoView();
      await $element.waitForClickable({ timeout: timeout });
      await $element.click();
    }
  };
  
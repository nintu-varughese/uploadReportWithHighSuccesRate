import { test, expect, Page } from '@playwright/test';
import HomePage from '../pages/homePage';
import MiniWebApps from '../pages/miniWebApps';
import VerifyAccountPage from '../pages/verifyAccount';
import TagsInputBoxPage from '../pages/tagsInputBox';
import MultiLevelDropdownPage from '../pages/multiLevelDropdown';
import NewTabPage from '../pages/newTab';
import PopUpWindowPage from '../pages/popUpWindow';
import NestedIframePage from '../pages/nestedIframe';
import StarsRatingPage from '../pages/starsRatingWidget';
import CoveredElementsPage from '../pages/coveredElements';
import QaUploadFilePage from '../pages/qaUploadFile';
import QaDownloadFilePage from '../pages/qaDownloadFile';
import ModalPopUpPage from '../pages/modalPopUp';
import BudgetTrackerPage from '../pages/budgetTracker';
import MouseHoverPage from '../pages/mouseHover';
import NavigationMenuPage from '../pages/navigationMenu';
import ContextMenuPage from '../pages/ContextMenuPage';
import ShadowDomPage from '../pages/shadowDomPage';
import RatingRangeSliderPage from '../pages/ratingRangeSlider';
import { SortableListPage } from '../pages/sotableList';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

test.describe('QA Playground Full Automation Sequence', () => {
  let homePage: HomePage;
  let miniWebApps: MiniWebApps;
  let verifyAccountPage: VerifyAccountPage;
  let tagsInputBoxPage: TagsInputBoxPage;
  let dropdownPage: MultiLevelDropdownPage;
  let newTabPage: NewTabPage;
  let popUpWindowPage: PopUpWindowPage;
  let nestedIframePage: NestedIframePage;
  let starsRatingPage: StarsRatingPage;
  let coveredElementsPage: CoveredElementsPage;
  let qaUploadFilePage: QaUploadFilePage;
  let downloadPage: QaDownloadFilePage;
  let modalPopUpPage: ModalPopUpPage;
  let budgetTrackerPage: BudgetTrackerPage;
  let mouseHoverPage: MouseHoverPage;
  let navigationMenuPage: NavigationMenuPage;
  let contextMenuPage: ContextMenuPage;
  let shadowDomPage: ShadowDomPage;
  let ratingSliderPage: RatingRangeSliderPage;

  test.beforeEach(async ({ page, baseURL }) => {
    homePage = new HomePage(page);
    miniWebApps = new MiniWebApps(page);
    verifyAccountPage = new VerifyAccountPage(page);
    tagsInputBoxPage = new TagsInputBoxPage(page);
    dropdownPage = new MultiLevelDropdownPage(page);
    newTabPage = new NewTabPage(page);
    popUpWindowPage = new PopUpWindowPage(page);
    nestedIframePage = new NestedIframePage(page);
    starsRatingPage = new StarsRatingPage(page);
    coveredElementsPage = new CoveredElementsPage(page);
    qaUploadFilePage = new QaUploadFilePage(page);
    downloadPage = new QaDownloadFilePage(page);
    modalPopUpPage = new ModalPopUpPage(page);
    budgetTrackerPage = new BudgetTrackerPage(page);
    mouseHoverPage = new MouseHoverPage(page);
    navigationMenuPage = new NavigationMenuPage(page);
    contextMenuPage = new ContextMenuPage(page);
    shadowDomPage = new ShadowDomPage(page);
    ratingSliderPage = new RatingRangeSliderPage(page);

    await homePage.navigate(baseURL!);
  });

  test('TC01: Open Mini Web Apps section and verify "Full Courses" link', async () => {
    await homePage.clickMiniWebApps();
    await expect(homePage.miniWebAppsHeading, 'Mini Web Apps heading is not visible').toBeVisible();
  });

  test('TC02: Verify Spider-Man row shows correct real name', async () => {
    await miniWebApps.clickDynamicTable();
    await expect(miniWebApps.spiderManRealName, 'Spider-Man real name mismatch').toHaveText('Peter Parker');
  });

  test('TC03: Ensure only one Spider-Man row exists', async () => {
    await miniWebApps.clickDynamicTable();
    await expect(miniWebApps.spiderManRow, 'More than one Spider-Man row found').toHaveCount(1);
  });

  test('TC04: Spider-Man real name remains correct after shuffle', async () => {
    await miniWebApps.clickDynamicTable();
    await miniWebApps.reloadTablePage();
    await expect(miniWebApps.spiderManRealName, 'Spider-Man real name changed after shuffle').toHaveText('Peter Parker');
  });

  test('TC05: Enter code "9" and check success message', async () => {
    await verifyAccountPage.fillAndSubmitCode('9');
    await expect(verifyAccountPage.successMessage, 'Success message not visible after entering correct code').toBeVisible();
  });

  test('TC06: Enter incorrect code "1" and verify success message NOT visible', async () => {
    await verifyAccountPage.fillAndSubmitCode('1');
    await expect(verifyAccountPage.successMessage, 'Success message should NOT be visible for incorrect code').not.toBeVisible();
  });

  test('TC07: Enter empty code and verify success message not visible', async () => {
    await verifyAccountPage.fillAndSubmitCode('');
    await expect(verifyAccountPage.successMessage, 'Success message should NOT be visible for empty code').not.toBeVisible();
  });

  test('TC08: Add multiple tags and verify counts', async () => {
    await tagsInputBoxPage.addTagsAndReset(['tag1', 'tag2']);
    await expect(tagsInputBoxPage.tags, 'Tag count mismatch after adding multiple tags').toHaveCount(2);
    await expect(tagsInputBoxPage.remainingCount, 'Remaining count incorrect after adding multiple tags').toHaveText('8');
  });

  test('TC09: Remove a tag and verify updated count', async () => {
    await tagsInputBoxPage.removeTagAfterAdding(['tag1', 'tag2'], 'tag1');
    await expect(tagsInputBoxPage.tags, 'Tag count mismatch after removing a tag').toHaveCount(1);
    await expect(tagsInputBoxPage.remainingCount, 'Remaining count incorrect after removing a tag').toHaveText('9');
  });

  test('TC10: Add empty tag should not be allowed', async () => {
    await tagsInputBoxPage.addTagsAndReset(['']);
    await expect(tagsInputBoxPage.tags, 'Empty tag should not be added').toHaveCount(0);
    await expect(tagsInputBoxPage.remainingCount, 'Remaining count incorrect after adding empty tag').toHaveText('10');
  });

  test('TC11: Adding duplicate tag should not increase count', async () => {
    await tagsInputBoxPage.addTagsAndReset(['tag1', 'tag1']);
    await expect(tagsInputBoxPage.tags, 'Duplicate tag should not increase count').toHaveCount(1);
  });

  test('TC12: Adding tags beyond max limit should be prevented', async () => {
    const tags = Array.from({ length: 12 }, (_, i) => `tag${i + 1}`);
    await tagsInputBoxPage.addTagsAndReset(tags);
    await expect(tagsInputBoxPage.tags, 'Tag count should not exceed max limit of 10').toHaveCount(10);
  });

  test('TC13: Adding invalid/special characters in tag', async () => {
    await tagsInputBoxPage.addTagsAndReset(['@!$', '#$%']);
    await expect(tagsInputBoxPage.tags, 'Special character tags count mismatch').toHaveCount(2);
  });

  test('TC14: Open "Settings", verify submenu and click HTML to check URL', async () => {
    const { url: settingsUrl, submenuItems } = await dropdownPage.openSettingsAndGetDetails();
    await expect(submenuItems, 'Settings submenu items mismatch').toEqual(dropdownPage.expectedSettingsSubMenu);
    await expect(settingsUrl, 'Settings URL mismatch').toBe('https://qaplayground.dev/apps/multi-level-dropdown/#settings');
    await dropdownPage.clickSubMenuItem('HTML');
    const htmlUrl = await dropdownPage.getCurrentURL();
    await expect(htmlUrl, 'HTML submenu URL mismatch').toBe('https://qaplayground.dev/apps/multi-level-dropdown/#!HTML');
  });

  test('TC15: Open "Animals", verify submenu and click first animal to check URL', async () => {
    const { url: animalsUrl, submenuItems } = await dropdownPage.openAnimalsAndGetDetails();
    await expect(submenuItems, 'Animals submenu items mismatch').toEqual(dropdownPage.expectedAnimalsSubMenu);
    await expect(animalsUrl, 'Animals section URL mismatch').toBe('https://qaplayground.dev/apps/multi-level-dropdown/#animals');
    await dropdownPage.clickSubMenuItem('Kangaroo');
    const firstAnimalUrl = await dropdownPage.getCurrentURL();
    await expect(firstAnimalUrl, 'First animal URL mismatch').toBe('https://qaplayground.dev/apps/multi-level-dropdown/#!Kangaroo');
  });

  test('TC16: Open new browser tab and verify welcome text', async () => {
    await newTabPage.openNewTabSection();
    const newPage = await newTabPage.clickOpenNewTab();
    const heading = newTabPage.newPageHeadingLocator(newPage);
    await expect(heading, 'New tab heading not visible').toBeVisible();
  });

  test('TC17: Open popup, close it, and verify success message', async () => {
    await popUpWindowPage.openPopUpSection();
    const successMessageLocator = await popUpWindowPage.openPopUpAndClose();
    await expect(successMessageLocator, 'Success message after closing popup not visible').toBeVisible();
    await expect(successMessageLocator, 'Success message text mismatch').toHaveText('Button Clicked');
  });

  test('TC18: Verify message visible after clicking button inside nested iframe', async () => {
    await nestedIframePage.openNestedIframeSection();
    const msgLocator = await nestedIframePage.clickButtonAndGetMessage();
    await expect(msgLocator, 'Message inside nested iframe not visible').toBeVisible();
  });

  test('TC19: Click each star and verify emoji', async () => {
    await starsRatingPage.openStarsRatingWidget();
    for (let i = 0; i < 5; i++) {
      const emojiLocator = await starsRatingPage.rateStarAndGetEmojiLocator(i);
      await expect(emojiLocator, `Emoji for star ${i + 1} not visible`).toBeVisible();
    }
  });

  test('TC20: Click covered button and verify success', async () => {
    await coveredElementsPage.openCoveredElementsSection();
    await coveredElementsPage.scrollClickAndVerify();
  });

  test('TC21: Upload an image file and verify filename', async () => {
    const uploadedFile = await qaUploadFilePage.uploadFileAndReturnLocator();
    await expect(uploadedFile, 'Uploaded file not visible').toBeVisible();
  });

  test('TC22: Download a file and verify name & size', async () => {
    const filePath = await downloadPage.downloadFileAndReturnPath('sample.pdf');
    await expect(fs.existsSync(filePath), 'Downloaded file does not exist').toBeTruthy();
    await expect(path.basename(filePath), 'Downloaded file name mismatch').toBe('sample.pdf');
    const stats = fs.statSync(filePath);
    await expect(stats.size > 0, 'Downloaded file size is zero').toBeTruthy();
  });

  test('TC23: Add income entry and verify total', async () => {
    await budgetTrackerPage.openBudgetTracker();
    await budgetTrackerPage.addEntry(100, 'income');
    const total = await budgetTrackerPage.getTotal();
    await expect(total, 'Income total mismatch').toBeCloseTo(100, 2);
  });

  test('TC24: Add expense entry and verify total', async () => {
    await budgetTrackerPage.openBudgetTracker();
    await budgetTrackerPage.addEntry(50, 'expense');
    const total = await budgetTrackerPage.getTotal();
    await expect(total, 'Expense total mismatch').toBeCloseTo(-50, 2);
  });

  test('TC25: Hover over movie poster and verify details', async () => {
    await mouseHoverPage.openMouseHoverSection();
    await mouseHoverPage.hoverOverMovie();
    const details = await mouseHoverPage.getMovieDetails();
    await expect(details.title, 'Movie title mismatch').toBe(mouseHoverPage.expectedTitle);
    await expect(details.current, 'Current price mismatch').toBe(mouseHoverPage.expectedCurrentPrice);
    await expect(details.old, 'Old price mismatch').toBe(mouseHoverPage.expectedOldPrice);
    await expect(details.buyVisible, 'Buy button not visible').toBeTruthy();
  });

  test('TC26: Click navigation menu items and verify headers', async () => {
    await navigationMenuPage.clickNavMenu();
    const headers = await navigationMenuPage.getAllPagesFlow();
    await expect(headers, 'Navigation menu headers mismatch').toEqual([
      'Welcome to the About Page',
      'Welcome to the Blog Page',
      'Welcome to the Portfolio Page',
      'Welcome to the Contact Page'
    ]);
  });

  test('TC27: Click Boost button in Shadow DOM and verify progress', async ({ page }) => {
    await shadowDomPage.openShadowDomApp();
    const progress = await shadowDomPage.clickBoostAndGetProgress();
    await expect(progress, 'Boost progress value incorrect').toBe(95);
  });

  test('TC28: Move slider until Send Feedback visible, click it, verify thank you message', async () => {
    await ratingSliderPage.openSection();
    await ratingSliderPage.moveSliderUntilFeedbackVisible();
    await ratingSliderPage.clickFeedbackButton();
    await expect(ratingSliderPage.feedbackMessage, 'Feedback message not visible after clicking Send Feedback').toBeVisible();
  });

  test('TC29: Close modal popup if displayed and assert welcome message', async () => {
  await modalPopUpPage.openModalPopupSection();
  await expect(modalPopUpPage.welcomeMessage,
    'Modal popup welcome message "Welcome Peter Parker!" is not visible.'
  ).toBeVisible();
});


  test('TC30: Sortable List - Arrange items in correct order', async ({ page }) => {
    const sortableList = new SortableListPage(page);
    await sortableList.navigate();

    const totalItems = await sortableList.countItems();
    let sortedIndex = 0;

    while (true) {
      const items = await sortableList.getAllItemsClasses();
      sortedIndex = items.findIndex(item => !item.className?.includes("right"));
      if (sortedIndex === -1) break;

      for (let i = sortedIndex; i < totalItems; i++) {
        for (let j = i + 1; j < totalItems; j++) {
          const currentItems = await sortableList.getAllItemsClasses();
          if (currentItems[i].name! > currentItems[j].name!) {
            await sortableList.dragItem(j, i);
            await sortableList.clickCheckOrder();
          }
        }
      }
    }
    const finalItems = await sortableList.getAllItemsClasses();
    for (const [index, item] of finalItems.entries()) {
      await expect(item.className, `Sortable list item at index ${index} is not in correct order`).toContain("right");
    }
  });
});

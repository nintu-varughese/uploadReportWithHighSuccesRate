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
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.resolve(__dirname, '../.env') });
test.describe('QA Playground Full Automation Sequence', () => {

  // =============================
  // Page objects
  // =============================
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

  // =============================
  // Setup before each test
  // =============================
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

  // =============================
  // Mini Web Apps Tests
  // =============================
  test('TC01: Open Mini Web Apps section and verify "Full Courses" link', async () => {
    await homePage.clickMiniWebApps();
    await expect(homePage.miniWebAppsHeadingLocator).toBeVisible();
  });

  test('TC02: Verify Spider-Man row shows correct real name', async () => {
    await miniWebApps.clickDynamicTable();
    await expect(miniWebApps.spiderManRealNameCell).toHaveText('Peter Parker');
  });

  test('TC03: Ensure only one Spider-Man row exists', async () => {
    await miniWebApps.clickDynamicTable();
    await expect(miniWebApps.spiderManRows).toHaveCount(1);
  });

  test('TC04: Spider-Man real name remains correct after shuffle', async () => {
  await miniWebApps.clickDynamicTable();
  await miniWebApps.reloadTablePage();
  await expect(miniWebApps.spiderManRealNameCell).toHaveText('Peter Parker');
  });
  // =============================
  // Verify Account Tests
  // =============================
  test('TC05: Enter code "9" and check success message', async () => {
    await verifyAccountPage.fillAndSubmitCode('9');
    await expect(verifyAccountPage.successMessage).toBeVisible();
  });

  test('TC06: Enter incorrect code "1" and verify success message NOT visible', async () => {
    await verifyAccountPage.fillAndSubmitCode('1');
    await expect(verifyAccountPage.successMessage).not.toBeVisible();
  });
  
  test('TC07: Enter empty code and verify success message not visible', async () => {
  await verifyAccountPage.fillAndSubmitCode(''); 
  await expect(verifyAccountPage.successMessage).not.toBeVisible();
 });
  // =============================
  // Tags Input Box Tests
  // =============================
  test('TC08: Add multiple tags and verify counts', async () => {
    await tagsInputBoxPage.addTagsAndReset(['tag1', 'tag2']);
    await expect(tagsInputBoxPage.tags).toHaveCount(2);
    await expect(tagsInputBoxPage.remainingCount).toHaveText('8');
  });

  test('TC09: Remove a tag and verify updated count', async () => {
    await tagsInputBoxPage.removeTagAfterAdding(['tag1', 'tag2'], 'tag1');
    await expect(tagsInputBoxPage.tags).toHaveCount(1);
    await expect(tagsInputBoxPage.remainingCount).toHaveText('9');
  });

  test('TC10: Add empty tag should not be allowed', async () => {
  await tagsInputBoxPage.addTagsAndReset(['']);
  await expect(tagsInputBoxPage.tags).toHaveCount(0); 
  await expect(tagsInputBoxPage.remainingCount).toHaveText('10'); 
});
test('TC11: Adding duplicate tag should not increase count', async () => {
  await tagsInputBoxPage.addTagsAndReset(['tag1', 'tag1']);
  await expect(tagsInputBoxPage.tags).toHaveCount(1); 
});
test('TC12: Adding tags beyond max limit should be prevented', async () => {
  const tags = Array.from({ length: 12 }, (_, i) => `tag${i+1}`); 
  await tagsInputBoxPage.addTagsAndReset(tags);
  await expect(tagsInputBoxPage.tags).toHaveCount(10); 
});
test('TC13: Adding invalid/special characters in tag', async () => {
  await tagsInputBoxPage.addTagsAndReset(['@!$', '#$%']);
  await expect(tagsInputBoxPage.tags).toHaveCount(2); 
});
  // =============================
  // Multi-Level Dropdown Tests
  // =============================
test('TC14: Open "Settings", verify submenu and click HTML to check URL', async () => {
  const { url: settingsUrl, submenuItems } = await dropdownPage.openSettingsAndGetDetails();
  expect(submenuItems).toEqual(dropdownPage.expectedSettingsSubMenu);
  expect(settingsUrl).toBe('https://qaplayground.dev/apps/multi-level-dropdown/#settings');
  await dropdownPage.clickSubMenuItem('HTML');
  const htmlUrl = await dropdownPage.getCurrentURL();
  expect(htmlUrl).toBe('https://qaplayground.dev/apps/multi-level-dropdown/#!HTML');
});

test('TC15: Open "Animals", verify submenu and click first animal to check URL', async () => {
  const { url: animalsUrl, submenuItems } = await dropdownPage.openAnimalsAndGetDetails();
  expect(submenuItems).toEqual(dropdownPage.expectedAnimalsSubMenu);
  expect(animalsUrl).toBe('https://qaplayground.dev/apps/multi-level-dropdown/#animals');
  await dropdownPage.clickSubMenuItem('Kangaroo');
  const firstAnimalUrl = await dropdownPage.getCurrentURL();
  expect(firstAnimalUrl).toBe('https://qaplayground.dev/apps/multi-level-dropdown/#!Kangaroo');
});

  // =============================
  // New Tab Test
  // =============================

  test('TC16: Open new browser tab and verify welcome text', async () => {
    await newTabPage.openNewTabSection();
    const newPage = await newTabPage.clickOpenNewTab();
    await expect(newTabPage.getNewPageTextLocator(newPage)).toBeVisible();
  });

 // =============================
  // Pop-Up Window
  // =============================

test('TC17: Open popup, close it, and verify success message', async () => {
  await popUpWindowPage.openPopUpSection();
  const successMessageLocator = await popUpWindowPage.openPopUpAndClose();
  await expect(successMessageLocator).toBeVisible();
  await expect(successMessageLocator).toHaveText('Button Clicked');
});

  // =============================
  // Nested Iframe Test
  // =============================
test('TC18: Verify message visible after clicking button inside nested iframe', async () => {
  await nestedIframePage.openNestedIframeSection();
  const msgLocator = await nestedIframePage.clickButtonAndGetMessage();
  await expect(msgLocator).toBeVisible();
});

  // =============================
  // Stars Rating Widget Test
  // =============================
  test('TC19: Click each star and verify emoji', async () => {
    await starsRatingPage.openStarsRatingWidget();
    for (let i = 0; i < 5; i++) {
      const emojiLocator = await starsRatingPage.rateStarAndGetEmojiLocator(i);
      await expect(emojiLocator).toBeVisible();
    }
  });

  // =============================
  // Covered Elements Test
  // =============================
  test('TC20: Click covered button and verify success', async () => {
    await coveredElementsPage.openCoveredElementsSection();
    await coveredElementsPage.scrollClickAndVerify();
  });

  // =============================
  // Upload File Test
  // =============================
  test('TC21: Upload an image file and verify filename', async () => {
    const uploadedFile = await qaUploadFilePage.uploadFileAndReturnLocator();
    await expect(uploadedFile).toBeVisible();
  });

  // =============================
  // Download File Test
  // =============================
  test('TC22: Download a file and verify name & size', async () => {
    const filePath = await downloadPage.downloadFileAndReturnPath('sample.pdf');
    expect(fs.existsSync(filePath)).toBeTruthy();
    expect(path.basename(filePath)).toBe('sample.pdf');
    const stats = fs.statSync(filePath);
    expect(stats.size).toBeGreaterThan(0);
  });
  // =============================
  // Budget Tracker Tests
  // =============================
  test('TC23: Add income entry and verify total', async () => {
    await budgetTrackerPage.openBudgetTracker();
    await budgetTrackerPage.addEntry(100, 'income');
    const total = await budgetTrackerPage.getTotal();
    await expect(total).toBeCloseTo(100, 2);
  });

  test('TC24: Add expense entry and verify total', async () => {
    await budgetTrackerPage.openBudgetTracker();
    await budgetTrackerPage.addEntry(50, 'expense');
    const total = await budgetTrackerPage.getTotal();
    await expect(total).toBeCloseTo(-50, 2);
  });
  // =============================
  // Mouse Hover Test
  // =============================
  test('TC25: Hover over movie poster and verify details', async () => {
    await mouseHoverPage.openMouseHoverSection();
    await mouseHoverPage.hoverOverMovie();
    const details = await mouseHoverPage.getMovieDetails();
    await expect(details.title).toBe(mouseHoverPage.expectedTitle);
    await expect(details.current).toBe(mouseHoverPage.expectedCurrentPrice);
    await expect(details.old).toBe(mouseHoverPage.expectedOldPrice);
    await expect(details.buyVisible).toBeTruthy();
  });
  // =============================
  // Navigation Menu Test
  // =============================
  test('TC26: Click navigation menu items and verify headers', async () => {
    await navigationMenuPage.clickNavMenu();
    const headers = await navigationMenuPage.getAllPagesFlow();
    await expect(headers).toEqual([
      'Welcome to the About Page',
      'Welcome to the Blog Page',
      'Welcome to the Portfolio Page',
      'Welcome to the Contact Page'
    ]);
  });

  // =============================
  // Shadow DOM Test
  // =============================
  test('TC28: Click Boost button in Shadow DOM and verify progress', async ({ page }) => {
  await shadowDomPage.openShadowDomApp();
  const progress = await shadowDomPage.clickBoostAndGetProgress();
  expect(progress).toBe(95);
});

  // =============================
  // Rating Range Slider
  // =============================
test('TC29: Move slider until Send Feedback visible, click it, verify thank you message', async () => {
  await ratingSliderPage.openSection();
  await ratingSliderPage.moveSliderUntilFeedbackVisible();
  await ratingSliderPage.clickFeedbackButton();
  await expect(ratingSliderPage.getFeedbackMessageLocator()).toBeVisible();
});

  // =============================
  // Modal Popup Test
  // =============================
  test('TC30: Close modal popup if displayed and assert welcome message', async () => {
  await modalPopUpPage.openModalPopupSection();
  await modalPopUpPage.assertWelcomeMessageVisible();

  });
});
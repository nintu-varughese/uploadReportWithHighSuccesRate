import { test, expect } from "../pages/customFixture";
import path from "path";
import fs from "fs";

test.describe("QA Playground Full Automation Sequence", () => {
  test.beforeEach(async ({ homePage, baseURL }) => {
    await homePage.navigate(baseURL!);
  });

  test.describe("Mini Web Apps - Dynamic Table", () => {
    test("TC01: Open Mini Web Apps section and verify heading", async ({ homePage }) => {
      await test.step("Click Mini Web Apps link", async () => {
        await homePage.clickMiniWebApps();
      });
      await test.step("Verify Mini Web Apps heading visibility", async () => {
        await expect(homePage.miniWebAppsHeading).toBeVisible();
      });
    });

    test("TC02: Verify Spider-Man real name", async ({ miniWebApps }) => {
      await test.step("Open Dynamic Table", async () => {
        await miniWebApps.clickDynamicTable();
      });
      await test.step("Check Spider-Man's real name", async () => {
        await expect(miniWebApps.spiderManRealName).toHaveText("Peter Parker");
      });
    });

    test("TC03: Ensure only one Spider-Man row exists", async ({ miniWebApps }) => {
      await test.step("Open Dynamic Table", async () => {
        await miniWebApps.clickDynamicTable();
      });
      await test.step("Verify single Spider-Man row", async () => {
        await expect(miniWebApps.spiderManRow).toHaveCount(1);
      });
    });

    test("TC04: Verify Spider-Man real name after shuffle", async ({ miniWebApps }) => {
      await test.step("Reload table and verify Spider-Man", async () => {
        await miniWebApps.clickDynamicTable();
        await miniWebApps.reloadTablePage();
        await expect(miniWebApps.spiderManRealName).toHaveText("Peter Parker");
      });
    });
  });

  test.describe("Verify Account Code", () => {
    test("TC05: Enter code '9' and check success", async ({ verifyAccountPage }) => {
      await test.step("Fill and submit code '9'", async () => {
        await verifyAccountPage.fillAndSubmitCode("9");
      });
      await test.step("Verify success message", async () => {
        await expect(verifyAccountPage.successMessage).toBeVisible();
      });
    });

    test("TC06: Enter incorrect code '1' and check no success", async ({ verifyAccountPage }) => {
      await test.step("Fill and submit code '1'", async () => {
        await verifyAccountPage.fillAndSubmitCode("1");
      });
      await test.step("Verify success message not visible", async () => {
        await expect(verifyAccountPage.successMessage).not.toBeVisible();
      });
    });

    test("TC07: Enter empty code and check no success", async ({ verifyAccountPage }) => {
      await test.step("Fill and submit empty code", async () => {
        await verifyAccountPage.fillAndSubmitCode("");
      });
      await test.step("Verify success message not visible", async () => {
        await expect(verifyAccountPage.successMessage).not.toBeVisible();
      });
    });
  });

  test.describe("Tags Input Box", () => {
    test("TC08: Add multiple tags", async ({ tagsInputBoxPage }) => {
      await test.step("Add tags 'tag1' and 'tag2'", async () => {
        await tagsInputBoxPage.addTagsAndReset(["tag1", "tag2"]);
      });
      await test.step("Verify tag count and remaining", async () => {
        await expect(tagsInputBoxPage.tags).toHaveCount(2);
        await expect(tagsInputBoxPage.remainingCount).toHaveText("8");
      });
    });

    test("TC09: Remove a tag", async ({ tagsInputBoxPage }) => {
      await test.step("Add tags 'tag1' and 'tag2' then remove 'tag1'", async () => {
        await tagsInputBoxPage.removeTagAfterAdding(["tag1", "tag2"], "tag1");
      });
      await test.step("Verify updated count", async () => {
        await expect(tagsInputBoxPage.tags).toHaveCount(1);
        await expect(tagsInputBoxPage.remainingCount).toHaveText("9");
      });
    });

    test("TC10: Prevent empty tag addition", async ({ tagsInputBoxPage }) => {
      await test.step("Try adding empty tag", async () => {
        await tagsInputBoxPage.addTagsAndReset([""]);
      });
      await test.step("Verify no tags added", async () => {
        await expect(tagsInputBoxPage.tags).toHaveCount(0);
        await expect(tagsInputBoxPage.remainingCount).toHaveText("10");
      });
    });

    test("TC11: Prevent duplicate tags", async ({ tagsInputBoxPage }) => {
      await test.step("Add duplicate 'tag1'", async () => {
        await tagsInputBoxPage.addTagsAndReset(["tag1", "tag1"]);
      });
      await test.step("Verify one tag present", async () => {
        await expect(tagsInputBoxPage.tags).toHaveCount(1);
      });
    });

    test("TC12: Prevent tags beyond max limit", async ({ tagsInputBoxPage }) => {
      await test.step("Add 12 tags", async () => {
        const tags = Array.from({ length: 12 }, (_, i) => `tag${i + 1}`);
        await tagsInputBoxPage.addTagsAndReset(tags);
      });
      await test.step("Verify only 10 tags accepted", async () => {
        await expect(tagsInputBoxPage.tags).toHaveCount(10);
      });
    });

    test("TC13: Add special character tags", async ({ tagsInputBoxPage }) => {
      await test.step("Add '@!$' and '#$%'", async () => {
        await tagsInputBoxPage.addTagsAndReset(["@!$", "#$%"]);
      });
      await test.step("Verify 2 tags accepted", async () => {
        await expect(tagsInputBoxPage.tags).toHaveCount(2);
      });
    });
  });

  test.describe("Multi-Level Dropdowns", () => {
    test("TC14: Open Settings submenu and click HTML", async ({ dropdownPage }) => {
      await test.step("Open Settings submenu", async () => {
        const { url: settingsUrl, submenuItems } = await dropdownPage.openSettingsAndGetDetails();
        await expect(settingsUrl).toBe("https://qaplayground.dev/apps/multi-level-dropdown/#settings");
        await expect(submenuItems).toEqual(dropdownPage.expectedSettingsSubMenu);
      });
      await test.step("Click HTML submenu and verify URL", async () => {
        await dropdownPage.clickSubMenuItem("HTML");
        const htmlUrl = await dropdownPage.getCurrentURL();
        await expect(htmlUrl).toBe("https://qaplayground.dev/apps/multi-level-dropdown/#!HTML");
      });
    });

    test("TC15: Open Animals submenu and click first animal", async ({ dropdownPage }) => {
      await test.step("Open Animals submenu", async () => {
        const { url: animalsUrl, submenuItems } = await dropdownPage.openAnimalsAndGetDetails();
        await expect(animalsUrl).toBe("https://qaplayground.dev/apps/multi-level-dropdown/#animals");
        await expect(submenuItems).toEqual(dropdownPage.expectedAnimalsSubMenu);
      });
      await test.step("Click Kangaroo and verify URL", async () => {
        await dropdownPage.clickSubMenuItem("Kangaroo");
        const firstAnimalUrl = await dropdownPage.getCurrentURL();
        await expect(firstAnimalUrl).toBe("https://qaplayground.dev/apps/multi-level-dropdown/#!Kangaroo");
      });
    });
  });

  test.describe("Navigation and Tabs", () => {
    test("TC16: Open new tab and verify welcome text", async ({ newTabPage }) => {
      await test.step("Open new tab section", async () => {
        await newTabPage.openNewTabSection();
      });
      await test.step("Click 'Open New Tab' and verify heading", async () => {
        const newPage = await newTabPage.clickOpenNewTab();
        const heading = newTabPage.newPageHeadingLocator(newPage);
        await expect(heading).toBeVisible();
      });
    });

    test("TC17: Click navigation menu and verify headers", async ({ navigationMenuPage }) => {
      await test.step("Open navigation menu", async () => {
        await navigationMenuPage.clickNavMenu();
      });
      await test.step("Verify page headers", async () => {
        const headers = await navigationMenuPage.getAllPagesFlow();
        await expect(headers).toEqual([
          "Welcome to the About Page",
          "Welcome to the Blog Page",
          "Welcome to the Portfolio Page",
          "Welcome to the Contact Page"
        ]);
      });
    });
  });

  test.describe("Popups and Modals", () => {
    test("TC18: Open popup, close and verify success message", async ({ popUpWindowPage }) => {
      await test.step("Open popup section", async () => {
        await popUpWindowPage.openPopUpSection();
      });
      await test.step("Open and close popup, verify message", async () => {
        const successMessage = await popUpWindowPage.openPopUpAndClose();
        await expect(successMessage).toBeVisible();
        await expect(successMessage).toHaveText("Button Clicked");
      });
    });

    test("TC19: Close modal popup and verify welcome message", async ({ modalPopUpPage }) => {
      await test.step("Open modal popup section", async () => {
        await modalPopUpPage.openModalPopupSection();
      });
      await test.step("Verify welcome message", async () => {
        await expect(modalPopUpPage.welcomeMessage).toBeVisible();
      });
    });
  });

  test.describe("Iframes", () => {
    test("TC20: Click button in nested iframe and verify message", async ({ nestedIframePage }) => {
      await test.step("Open nested iframe section", async () => {
        await nestedIframePage.openNestedIframeSection();
      });
      await test.step("Click button and verify message", async () => {
        const msgLocator = await nestedIframePage.clickButtonAndGetMessage();
        await expect(msgLocator).toBeVisible();
      });
    });

    test("TC21: Verify Changeable Iframe sequence", async ({ changeableIframePage }) => {
      await test.step("Verify iframe sequence and final message", async () => {
        await changeableIframePage.verifyIframeSequence();
        await expect(changeableIframePage.secondIframeLegend).toBeVisible();
      });
    });
  });

  test.describe("File Upload and Download", () => {
    test("TC22: Upload image file and verify filename", async ({ qaUploadFilePage }) => {
      await test.step("Upload file and verify filename", async () => {
        const uploadedFile = await qaUploadFilePage.uploadFileAndReturnLocator();
        await expect(uploadedFile).toBeVisible();
      });
    });

    test("TC23: Download file and verify name & size", async ({ downloadPage }) => {
      await test.step("Download file and verify", async () => {
        const filePath = await downloadPage.downloadFileAndReturnPath("sample.pdf");
        await expect(fs.existsSync(filePath)).toBeTruthy();
        await expect(path.basename(filePath)).toBe("sample.pdf");
        const stats = fs.statSync(filePath);
        await expect(stats.size > 0).toBeTruthy();
      });
    });
  });

  test.describe("Budget Tracker", () => {
    test("TC24: Add income entry and verify total", async ({ budgetTrackerPage }) => {
      await test.step("Add income entry", async () => {
        await budgetTrackerPage.openBudgetTracker();
        await budgetTrackerPage.addEntry(100, "income");
      });
      await test.step("Verify total updated", async () => {
        const total = await budgetTrackerPage.getTotal();
        await expect(total).toBeCloseTo(100, 2);
      });
    });

    test("TC25: Add expense entry and verify total", async ({ budgetTrackerPage }) => {
      await test.step("Add expense entry", async () => {
        await budgetTrackerPage.openBudgetTracker();
        await budgetTrackerPage.addEntry(50, "expense");
      });
      await test.step("Verify total updated", async () => {
        const total = await budgetTrackerPage.getTotal();
        await expect(total).toBeCloseTo(-50, 2);
      });
    });
  });

  test.describe("Mouse Hover", () => {
    test("TC26: Hover over movie poster and verify details", async ({ mouseHoverPage }) => {
      await test.step("Open mouse hover section", async () => {
        await mouseHoverPage.openMouseHoverSection();
      });
      await test.step("Hover and verify details", async () => {
        await mouseHoverPage.hoverOverMovie();
        const details = await mouseHoverPage.getMovieDetails();
        await expect(details.title).toBe(mouseHoverPage.expectedTitle);
        await expect(details.current).toBe(mouseHoverPage.expectedCurrentPrice);
        await expect(details.old).toBe(mouseHoverPage.expectedOldPrice);
        await expect(details.buyVisible).toBeTruthy();
      });
    });
  });

  test.describe("Shadow DOM & Rating Slider", () => {
    test("TC27: Click Boost button in Shadow DOM", async ({ shadowDomPage }) => {
      await test.step("Open Shadow DOM app and click Boost", async () => {
        await shadowDomPage.openShadowDomApp();
        const progress = await shadowDomPage.clickBoostAndGetProgress();
        await expect(progress).toBe(95);
      });
    });

    test("TC28: Move slider and verify feedback", async ({ ratingSliderPage }) => {
      await test.step("Open slider section and move slider", async () => {
        await ratingSliderPage.openSection();
        await ratingSliderPage.moveSliderUntilFeedbackVisible();
      });
      await test.step("Click feedback button and verify message", async () => {
        await ratingSliderPage.clickFeedbackButton();
        await expect(ratingSliderPage.feedbackMessage).toBeVisible();
      });
    });
  });

  test.describe("Sortable List", () => {
    test("TC29: Arrange items and verify correct order", async ({ sortableListPage }) => {
      await test.step("Open sortable list section", async () => {
        await sortableListPage.navigate();
      });
      await test.step("Sort and verify all items", async () => {
        const totalItems = await sortableListPage.countItems();
        let sortedIndex = 0;
        while (true) {
          const items = await sortableListPage.getAllItemsClasses();
          sortedIndex = items.findIndex(item => !item.className?.includes("right"));
          if (sortedIndex === -1) break;
          for (let i = sortedIndex; i < totalItems; i++) {
            for (let j = i + 1; j < totalItems; j++) {
              const currentItems = await sortableListPage.getAllItemsClasses();
              if (currentItems[i].name! > currentItems[j].name!) {
                await sortableListPage.dragItem(j, i);
                await sortableListPage.clickCheckOrder();
              }
            }
          }
        }
        const finalItems = await sortableListPage.getAllItemsClasses();
        for (const item of finalItems) {
          await expect(item.className).toContain("right");
        }
      });
    });
  });

  test.describe("Redirect Chain, Context Menu & Fetching Data", () => {
    test("TC30: Verify Redirect Chain and Go Back button", async ({ redirectPage }) => {
      await test.step("Trigger redirects and verify Go Back", async () => {
        await redirectPage.clickHeader();
        await redirectPage.clickRedirectLink();
        await redirectPage.goBackButton.waitFor({state: "visible", timeout:10000});
        await expect(redirectPage.goBackButton).toBeVisible();
      });
    });

    test("TC31: Right-click context menu and verify items", async ({ rightClickPage }) => {
      await test.step("Open context menu and verify options", async () => {
        await rightClickPage.rightClickHeader();
        await expect(rightClickPage.previewOption).toBeVisible();
        await expect(rightClickPage.shareOption).toBeVisible();
        await expect(rightClickPage.getLinkOption).toBeVisible();
        await expect(rightClickPage.renameOption).toBeVisible();
        await expect(rightClickPage.deleteOption).toBeVisible();
        await expect(rightClickPage.settingsOption).toBeVisible();
      });
      await test.step("Hover share and verify submenu items", async () => {
        await rightClickPage.hoverShare();
        await expect(rightClickPage.twitterOption).toBeVisible();
        await expect(rightClickPage.instagramOption).toBeVisible();
        await expect(rightClickPage.dribbleOption).toBeVisible();
        await expect(rightClickPage.telegramOption).toBeVisible();
      });
    });

    test("TC32: Verify 100 cards loaded with headers and body", async ({ fetchingDataPage }) => {
      await test.step("Click fetching data header and wait for card load", async () => {
        await fetchingDataPage.clickFetchingDataHeader();
        await fetchingDataPage.page.waitForFunction(
          selector => document.querySelectorAll(selector).length === 100,
          fetchingDataPage.cardSelector
        );
        const cards = fetchingDataPage.page.locator(fetchingDataPage.cardSelector);
        await expect(cards).toHaveCount(100);
      });
      await test.step("Validate each card's header and body visibility", async () => {
        const cards = fetchingDataPage.page.locator(fetchingDataPage.cardSelector);
        for (let i = 0; i < 100; i++) {
          const card = cards.nth(i);
          await expect(card.locator(fetchingDataPage.cardHeaderSelector)).toBeVisible();
          await expect(card.locator(fetchingDataPage.cardBodySelector)).toBeVisible();
        }
      });
    });
  });
  test.describe("Stars Rating Widget", () => {
  test("TC33: Click each star and verify emoji", async ({ starsRatingPage }) => {
    await test.step("Open stars rating widget", async () => {
      await starsRatingPage.openStarsRatingWidget();
    });
    await test.step("Click each star and verify emoji visibility", async () => {
      for (let i = 0; i < 5; i++) {
        const emojiLocator = await starsRatingPage.rateStarAndGetEmojiLocator(i);
        await expect(emojiLocator).toBeVisible();
      }
    });
  });
});
test.describe("Covered Elements", () => {
  test("TC34: Click covered button and verify success", async ({ coveredElementsPage }) => {
    await test.step("Open covered elements section", async () => {
      await coveredElementsPage.openCoveredElementsSection();
    });
    await test.step("Scroll, click covered button, and verify success", async () => {
      await coveredElementsPage.scrollClickAndVerify();
    });
  });
});
});

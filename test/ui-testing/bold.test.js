const timeout = process.env.SLOWMO ? 60000 : 10000;
const fs = require('fs');
beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
});

describe('Bold Text', () => {
  test('Adds strong text in rich text mode', async () => {
    // switches to wysiwyg mode if it is in markdown mode
    if (await page.evaluate(() => $(".woofmark-mode-markdown").is(":disabled"))) {
      await page.click('.woofmark-mode-wysiwyg');
    }

    // clicks on bold button and checks if 'strong text' is added in the editor
    await page.waitForSelector('.ple-module-body');
    await page.waitForSelector('.wk-wysiwyg');
    await page.keyboard.press('Backspace');
    await page.click('.woofmark-command-bold');

    const stringIsIncluded = await page.evaluate(() => document.querySelector('.wk-wysiwyg').textContent.includes('strong text'));
    expect(stringIsIncluded).toBe(true);
    // resets the changes by removing the added text
    await page.keyboard.press("Backspace");
  }, timeout);

  test('Adds strong text in markdown mode', async () => {
    // clicks on bold button and checks if '**strong text**' is added in the editor
    await page.waitForSelector('.woofmark-mode-markdown');
    await page.click('.woofmark-mode-markdown');
    await page.evaluate(() => document.querySelector('.ple-textarea').value += ' ');
    await page.click('.woofmark-command-bold');
    let stringIsIncluded = await page.evaluate(() => document.querySelector('.ple-textarea').value.includes('**strong text**'));
    expect(stringIsIncluded).toBe(true);

    // clicks bold button again to un-bolden the text but retains the text value 'strong text'
    await page.click('.woofmark-command-bold');
    stringIsIncluded = await page.evaluate(() => document.querySelector('.ple-textarea').value.includes('strong text'));
    expect(stringIsIncluded).toBe(true);
    stringIsIncluded = await page.evaluate(() => document.querySelector('.ple-textarea').value.includes('**strong text**'));
    expect(stringIsIncluded).toBe(false);

    // resets changes by removing the added text and changes back to wysiwyg mode
    await page.keyboard.press("Backspace");
    await page.click('.woofmark-mode-wysiwyg');
  }, timeout);

  test('does not leave empty lines with ** bold markdown tags when adding newlines from end of bold text', async () => {
    // switches to wysiwyg mode if it is in markdown mode
    if (await page.evaluate(() => $(".woofmark-mode-markdown").is(":disabled"))) {
      await page.click('.woofmark-mode-wysiwyg');
    }
    await page.waitForSelector('.ple-module-body');
    await page.waitForSelector('.wk-wysiwyg');

    await page.type("Normal text");
    await page.type(String.fromCharCode(13)); // Enter (see https://stackoverflow.com/questions/46442253/pressing-enter-button-in-puppeteer)

    await page.click('.woofmark-command-bold');
    await page.type("Bold text");
    await page.type(String.fromCharCode(13));
    await page.type(String.fromCharCode(13));
    
    // here we observed a bug where we get 2 empty lines with just `**` on each
    await page.type("Bold again");

    stringMatches = await page.evaluate(() => document.querySelector('.ple-textarea').value == "Normal text\n\n**Bold text**\n\n**Bold again**");
    expect(stringMatches).toBe(true);
  }, timeout);
});

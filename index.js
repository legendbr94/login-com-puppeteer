const puppeteer = require('puppeteer-extra')
// Enable stealth plugin with all evasions
puppeteer.use(require('puppeteer-extra-plugin-stealth')());


//Create Sleep function to use in Async/Await function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const randomDelay = (min, max) =>
Math.floor(Math.random() * (max - min + 1) + min);


(async () => {

  await sleep(1000);

  // Launch the browser in headless mode and set up a page.
  const browser = await puppeteer.launch({
    slowMo: 250, // slow down by 250ms
          dumpio: true,
          headless: false,
          channel: 'chrome',
          // executablePath: '/usr/bin/google-chrome-stable',
          ignoreHTTPSErrors: true,  

    args: [   '--no-sandbox',
              '--disable-setuid-sandbox',
              '--disable-web-security',
              '--disable-infobars',
              '--enable-automation',
              '--window-position=0,0',
              '--ignore-certifcate-errors',
              '--ignore-certifcate-errors-spki-list',
        // '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
  ],
   
  })
  const page = await browser.newPage()

  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
  );
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
  });

  await page.setViewport({ width: 800, height: 600 })
  await page.goto('https://www.bet365.com')

  await page.$eval(".hm-MainHeaderRHSLoggedOutMed_Login", elem => elem.click());

    const selectorUsername = '.lms-StandardLogin_Username';
    await page.waitForSelector(selectorUsername, {visible: true, timeout: 3000, delay: randomDelay(300, 600) });

    const selectorPassword = '.lms-StandardLogin_Password';
    await page.waitForSelector(selectorPassword, {visible: true, timeout: 3000, delay: randomDelay(300, 600) });

    await page.type(selectorUsername, "user",
    {
      delay: randomDelay(200, 300)
    });
    await page.type(selectorPassword, "123",
    {
      delay: randomDelay(200, 300)
    });

    await page.keyboard.press('Enter', {delay: randomDelay(300, 600)});

  // await browser.close()
})()
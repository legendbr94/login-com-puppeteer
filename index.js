const puppeteer = require('puppeteer-extra')
// Enable stealth plugin with all evasions
puppeteer.use(require('puppeteer-extra-plugin-stealth')());

const chromeLauncher = require('chrome-launcher');

const chromeConfig = {
        chromePath: "/usr/bin/google-chrome-stable"
}

//Create Sleep function to use in Async/Await function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const randomDelay = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

(async () => {
  await sleep(1000);

  const browser = await puppeteer.launch({
    slowMo: 250, // slow down by 250ms
    headless: false,
    // channel: 'chrome',
     executablePath: chromeConfig.chromePath,
    ignoreHTTPSErrors: true,

    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-infobars',
      '--enable-automation',
      '--window-position=0,0',
      '--ignore-certifcate-errors',
      '--ignore-certifcate-errors-spki-list',

      // '--disable-accelerated-2d-canvas',
      '--no-zygote',
      '--renderer-process-limit=1',
      '--no-first-run',
      '--disable-dev-shm-usage',
      '--disable-infobars',
      '--lang=en-US,en',
      '--window-size=1920x1080',
      '--disable-extensions',
      // '--user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"'
    ],
  })

  const page = await browser.newPage()

  await page.emulateTimezone("Asia/Singapore");
    // await page.setUserAgent(
  //   'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
  // );

  // await page.setViewport({width: (width/2)-21, height: height-111});

  // await page.setExtraHTTPHeaders({
  //   'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
  // });

  await page.setViewport({
    width: 800, height: 600
  })

  await page.goto('https://www.bet365.com')

  // await page.$eval(".hm-MainHeaderRHSLoggedOutMed_Login", elem => elem.click());

  await page.click(".hm-MainHeaderRHSLoggedOutMed_Login",
    {
      timeout: 1000, delay: randomDelay(3000, 6000)
    })

  const selectorUsername = '.lms-StandardLogin_Username';
  await page.waitForSelector(selectorUsername,
    {
      visible: true, timeout: 3000, delay: randomDelay(2000, 5000)
    });

  const selectorPassword = '.lms-StandardLogin_Password';
  await page.waitForSelector(selectorPassword,
    {
      visible: true, timeout: 3000, delay: randomDelay(3000, 6000)
    });

  await page.type(selectorUsername, "USUÁRIO",
    {
      delay: randomDelay(2000, 6000)
    });
  await page.type(selectorPassword, "SENHA",
    {
      delay: randomDelay(2000, 3000)
    });

  await page.keyboard.press('Enter', { delay: randomDelay(3000, 6000) });

  // await browser.close()
})()
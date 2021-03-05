const puppeteer = require("puppeteer");

let browser, page;
beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

  page = await browser.newPage();
  await page.goto("http://localhost:3000");
});

afterEach(async () => {
  await browser.close();
});

test("check header logo", async () => {
  const text = await page.$eval("a.brand-logo", (el) => el.innerHTML);
  expect(text).toEqual("Blogster");
});

test("click login button to oAuth flow", async () => {
  await page.click(".right a");

  const url = page.url();
  expect(url).toMatch(/accounts\.google\.com/);
});

// test("when signin show logout button", async () => {
//   const id = "601c3542dd7f7710d4e53431";

//   const Buffer = require("safe-buffer").Buffer;
//   const sessionObject = {
//     passport: {
//       user: id,
//     },
//   };

//   const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString(
//     "base64"
//   );

//   const Keygrip = require("keygrip");
// });

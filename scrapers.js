const puppeteer = require('puppeteer');

async function scrapePage(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="mw-content-text"]/div[1]/table[1]/tbody/tr[2]/td/a/img');
    const src = el.getProperty('src');
    const imgURL = (await src).jsonValue();

    const [el2] = await page.$x('//*[@id="firstHeading"]');
    const txt = el2.getProperty('textContent');
    const title = (await txt).jsonValue();

    const [el3] = await page.$x('//*[@id="mw-content-text"]/div[1]/table[1]/tbody/tr[2]/td/div');
    const txt2 = el3.getProperty('textContent');
    const value = (await txt2).jsonValue();

    console.log({imgURL, title, value});
    await browser.close();
}
scrapePage('https://en.wikipedia.org/wiki/Julius_Caesar');

const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    await page.waitForXPath('//*[@id="imgBlkFront"]')
    const [el] = await page.$x('//*[@id="imgBlkFront"]');
    const src = el.getProperty('src');
    const imgURL = (await src).jsonValue();

    await page.waitForXPath('//*[@id="productTitle"]')
    const [el2] = await page.$x('//*[@id="productTitle"]');
    const txt = el2.getProperty('textContent');
    const title = (await txt).jsonValue();

    await page.waitForXPath('//*[@id="price"]')
    const [el3] = await page.$x('//*[@id="price"]');
    const txt2 = el3.getProperty('textContent');
    const price = (await txt2).jsonValue();

    console.log({imgURL, title, price});
    await browser.close();
}

scrapeProduct('https://www.amazon.ca/Atomic-Habits-Proven-Build-Break/dp/0735211299/ref=sr_1_1?gclid=CjwKCAjw4ayUBhA4EiwATWyBrqMPyRNjdAsm6qFAgPdgg3VU3V-49gSmfUbboklXEv5-jiFJXEw5hhoCVLEQAvD_BwE&hvadid=538107724032&hvdev=c&hvlocphy=9000800&hvnetw=g&hvqmt=e&hvrand=14293299909348710143&hvtargid=kwd-547063149774&hydadcr=25614_9766669&keywords=atomic+habits+books&qid=1653348486&sr=8-1');
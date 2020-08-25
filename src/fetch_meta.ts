import puppeteer from "puppeteer";
const { PendingXHR } = require('pending-xhr-puppeteer');


export const fetchMeta = async (url) => {
    var prefix = 'http://';
    if (url.substr(0, prefix.length) !== prefix) {
        url = prefix + url;
    }
    const browser = await puppeteer.launch({
        // headless: false
    });
    const page = await browser.newPage();
    const pendingXHR = new PendingXHR(page)
    await page.goto(url);
    // await page.waitForNavigation({ waitUntil: "networkidle0" });
    await pendingXHR.waitForAllXhrFinished();
    await new Promise((res) => {
        setTimeout(res, 2000);
    })
    const result = await page.evaluate(() => {
        const head = document.head;
        const description = head.querySelector('meta[name=description]') as HTMLMetaElement;
        const ogImage = head.querySelector('meta[property="og:image"]') as HTMLMetaElement;
        const ogImageWidth = head.querySelector('meta[property="og:image:width"]') as HTMLMetaElement;
        const ogImageHeight = head.querySelector('meta[property="og:image:height"]') as HTMLMetaElement;
        const ogTitle = head.querySelector('meta[property="og:title"]') as HTMLMetaElement;
        const ogDescription = head.querySelector('meta[property="og:description"]') as HTMLMetaElement;
        const ogType = head.querySelector('meta[property="og:type"]') as HTMLMetaElement;

        const twitterSite = head.querySelector('meta[name="twitter:site"]') as HTMLMetaElement;

        return {
            title: head.getElementsByTagName('title')[0].innerText,
            descripton: description ? description.content : null,
            ogTitle: ogTitle ? ogTitle.content : null,
            ogDescription: ogDescription ? ogDescription.content : null,
            ogImage: ogImage ? ogImage.content : null,
            ogImageWidth: ogImageWidth ? ogImageWidth.content : null,
            ogImageHeight: ogImageHeight ? ogImageHeight.content : null,
            ogType: ogType ? ogType.content : null,
            twitterSite: twitterSite ? twitterSite.content : null
        }
    })
    console.log(result);
    await browser.close();
}
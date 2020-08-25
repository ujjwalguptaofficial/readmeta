import puppeteer from "puppeteer";
const { PendingXHR } = require('pending-xhr-puppeteer');
import { Spinner } from "cli-spinner";


export const fetchMeta = async (url: string) => {
    const spinner = new Spinner(`Fetching.. %s`);
    // spinner. spinnerInstance = new Spinner(`${text}.. %s`);
    spinner.setSpinnerString(18);
    spinner.start();
    var prefix = 'http://';
    if (url.indexOf("http") < 0) {
        url = prefix + url;
    }
    try {
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
            const twitterTitle = head.querySelector('meta[name="twitter:title"]') as HTMLMetaElement;
            const twitterDescription = head.querySelector('meta[name="twitter:description"]') as HTMLMetaElement;
            const twitterImage = head.querySelector('meta[name="twitter:image"]') as HTMLMetaElement;
            const twitterCard = head.querySelector('meta[name="twitter:card"]') as HTMLMetaElement;

            return {
                title: head.getElementsByTagName('title')[0].innerText,
                descripton: description ? description.content : null,
                ogTitle: ogTitle ? ogTitle.content : null,
                ogDescription: ogDescription ? ogDescription.content : null,
                ogImage: ogImage ? ogImage.content : null,
                ogImageWidth: ogImageWidth ? ogImageWidth.content : null,
                ogImageHeight: ogImageHeight ? ogImageHeight.content : null,
                ogType: ogType ? ogType.content : null,
                twitterSite: twitterSite ? twitterSite.content : null,
                twitterTitle: twitterTitle ? twitterTitle.content : null,
                twitterDescription: twitterDescription ? twitterDescription.content : null,
                twitterImage: twitterImage ? twitterImage.content : null,
                twitterCard: twitterCard ? twitterCard.content : null,
            }
        })
        spinner.stop();
        console.log(`
    
    `);
        for (const key in result) {
            if (result[key]) {
                console.log(`${key} : "${result[key]}"`);
                console.log("");
            }
        }
        await browser.close();
    } catch (error) {
        spinner.stop();
        console.error("some error occured");
        console.error("Error message is", error.message);
        console.info("please contact author of this Project");
    }
}
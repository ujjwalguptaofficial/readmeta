import puppeteer from "puppeteer";
const { PendingXHR } = require('pending-xhr-puppeteer');
import { Spinner } from "cli-spinner";
import { printTag } from "./print_tag";
import { changeImageSize, crop } from "./change_img";


export const fetchMeta = async (url: string, shouldPreview) => {
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
            headless: !shouldPreview,
            devtools: true,
            args: ['--disable-infobars']
        });
        let page = await browser.newPage();
        const pendingXHR = new PendingXHR(page)
        await page.goto(url);
        // await page.waitForNavigation({ waitUntil: "networkidle0" });
        await pendingXHR.waitForAllXhrFinished();
        await new Promise((res) => {
            setTimeout(res, 2000);
        })
        const result = await page.evaluate(() => {
            const head = document.head;
            const title = document.querySelector("title");
            const description = head.querySelector('meta[name=description]') as HTMLMetaElement;
            const keywords = head.querySelector('meta[property=keywords]') as HTMLMetaElement;

            const ogTitle = head.querySelector('meta[property="og:title"]') as HTMLMetaElement;
            const ogDescription = head.querySelector('meta[property="og:description"]') as HTMLMetaElement;
            const ogSiteName = head.querySelector('meta[property="og:site_name"]') as HTMLMetaElement;
            const ogImage = head.querySelector('meta[property="og:image"]') as HTMLMetaElement;
            const ogImageWidth = head.querySelector('meta[property="og:image:width"]') as HTMLMetaElement;
            const ogImageHeight = head.querySelector('meta[property="og:image:height"]') as HTMLMetaElement;
            const ogType = head.querySelector('meta[property="og:type"]') as HTMLMetaElement;
            const ogUrl = head.querySelector('meta[property="og:url"]') as HTMLMetaElement;
            const fbAppId = head.querySelector('meta[property="fb:app_id"]') as HTMLMetaElement;

            const twitterSite = head.querySelector('meta[name="twitter:site"]') as HTMLMetaElement;
            const twitterTitle = head.querySelector('meta[name="twitter:title"]') as HTMLMetaElement;
            const twitterDescription = head.querySelector('meta[name="twitter:description"]') as HTMLMetaElement;
            const twitterImage = head.querySelector('meta[name="twitter:image"]') as HTMLMetaElement;
            const twitterCard = head.querySelector('meta[name="twitter:card"]') as HTMLMetaElement;
            const twitterImageAlt = head.querySelector('meta[name="twitter:image:alt"]') as HTMLMetaElement;

            return {
                general: {
                    title: title ? title.innerText : null,
                    descripton: description ? description.content : null,
                    keywords: keywords ? keywords.content : null,
                },
                facebook: {
                    "og:title": ogTitle ? ogTitle.content : null,
                    "og:description": ogDescription ? ogDescription.content : null,
                    "og:site_name": ogSiteName ? ogSiteName.content : null,
                    "og:image": ogImage ? ogImage.content : null,
                    "og:image:width": ogImageWidth ? ogImageWidth.content : null,
                    "og:image:height": ogImageHeight ? ogImageHeight.content : null,
                    "og:type": ogType ? ogType.content : null,
                    "og:url": ogUrl ? ogUrl.content : null,
                    "fb:app_id": fbAppId ? fbAppId.content : null,
                },
                twitter: {
                    "twitter:site": twitterSite ? twitterSite.content : null,
                    "twitter:title": twitterTitle ? twitterTitle.content : null,
                    "twitter:description": twitterDescription ? twitterDescription.content : null,
                    "twitter:image": twitterImage ? twitterImage.content : null,
                    "twitter:card": twitterCard ? twitterCard.content : null,
                    "twitter:image:alt": twitterImageAlt ? twitterImageAlt.content : null,
                }


            }
        })
        spinner.stop();
        console.log(`
    
        `);
        const location = await page.evaluate(() => {
            return window.location;
        })
        await page.close();
        if (shouldPreview) {
            page = (await browser.pages())[0];
            // await page.exposeFunction("changeImageSize", changeImageSize);
            await page.evaluate(async ({ og, changeImageSize, crop, location }) => {
                eval("changeImageSize = " + changeImageSize)
                eval("crop = " + crop);
                let imgUrl = og["og:image"];
                if (imgUrl) {
                    if (imgUrl.indexOf("http") < 0) {
                        imgUrl = location.origin + imgUrl;
                    }
                }
                const croppedImg = await crop(imgUrl, 1);
                const img = await changeImageSize(croppedImg, 78, 78);
                document.body.innerHTML = `<h2>WhatsApp</h2>
                <div class="whatsapp">
                   <div class="whatsapp_text">
                        <img class="whatsapp_text_img" src="${img}"/>
                        <div class="whatsapp_text_tag">
                            <div class="whatsapp_text_tag_title">${og["og:title"]}</div>
                            <div class="whatsapp_text_tag_desc">${og["og:description"]}</div>
                            <div class="whatsapp_text_tag_link">${og["og:url"]}</div>
                        </div>
                   </div>
                   <a href="${og["og:url"]}">${og["og:url"]}</a>
                </div>
                <style>
                .whatsapp{
                    display:flex;
                    flex-direction:column;
                    padding: 6px 7px 8px 9px;
                    background: #dcf8c6;
                }
                .whatsapp_text{
                    display:flex;
                    background:#cfe9ba;
                    margin: -3px -4px 6px -6px;
                    border-radius: 6px;
                }
                .whatsapp_text_img{
                    height: 90px;
                    max-height: 100%;
                }
                .whatsapp_text_tag{
                    display:flex;
                    flex-direction:column;
                    padding: 6px 10px;
                }
                .whatsapp_text_tag_title{
                    margin-bottom:2px;
                    color:#000;
                    font-weight:400;
                    font-size:14px;
                }
                .whatsapp_text_tag_desc{
                    font-size:12px;
                    color:rgb(0,0,0,0.45);
                    font-weight:400;
                }
                .whatsapp_text_tag_link{
                    font-size:12px;
                    color:rgb(0,0,0,0.8);
                    font-weight:400;
                    padding-top:1px;
                }
                </style>
                `;

            }, {
                changeImageSize: changeImageSize.toString(),
                crop: crop.toString(),
                og: result.facebook,
                location
            } as any)

        }
        else {
            printTag(result);
            await browser.close();
        }

    } catch (error) {
        spinner.stop();
        console.error("some error occured");
        console.error("Error message is", error.message);
        console.info("please contact author of this Project");
        process.exit();
    }
}
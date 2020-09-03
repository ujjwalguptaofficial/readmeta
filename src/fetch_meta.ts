import puppeteer from "puppeteer";
const { PendingXHR } = require('pending-xhr-puppeteer');
import { Spinner } from "cli-spinner";
import { printTag } from "./print_tag";
import { changeImageSize, crop } from "./change_img";
import { previewWhatsApp } from "./preview_whatsapp";
import { previewfacebook } from "./preview_fb";


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
            // devtools: true,
            // args: ['--disable-infobars']
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
            const ogImages = head.querySelectorAll('meta[property="og:image"]') as NodeList;
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


            function getOgImageContent() {
                return ogImages.length > 1 ? (() => {
                    const contents = [];
                    ogImages.forEach((val: HTMLMetaElement) => {
                        contents.push(val.content);
                    });
                    return contents;
                })() : (ogImages[0] as HTMLMetaElement).content;
            }
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
                    "og:image": ogImages.length > 0 ? getOgImageContent() : null,
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
            await page.evaluate(() => {
                document.body.innerHTML = `<div id="app">
                <div class="app_note"></div>
                </div>
                <style>
                html, body, #app {
                    height: 100%;
                    width: 100%;
                    // overflow: hidden;
                    padding: 0;
                    margin: 0;
                }

                .app_note{
                    font-weight:500;
                    font-size:18px;
                    margin:10px;
                }

                #app{
                    display:flex;
                    flex-direction:column;
                }
                </style>
                `;
                document.querySelector('.app_note').innerHTML = `Note:- readmeta simulate meta tags for different application, 
                but can not gurantee. 
                It might be that some app has changed their rendering technique & readmeta is not updated.`
                const meta = document.createElement("meta");
                meta.name = "viewport";
                meta.content = "width=device-width";
                document.head.appendChild(meta);
            })
            const payloadForApp = {
                changeImageSize: changeImageSize.toString(),
                crop: crop.toString(),
                og: result.facebook,
                location
            };
            console.log("Rendering whatsapp\n");
            await previewWhatsApp(page, payloadForApp);
            console.log("Rendering facebook\n");
            await previewfacebook(page, payloadForApp);

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
export function previewTwitter(page, options) {
    return page.evaluate(async ({ tag, changeImageSize, crop, location }) => {
        try {

            eval("changeImageSize = " + changeImageSize)
            eval("crop = " + crop);

            const twitterCard = tag["twitter:card"];
            let imgUrl = tag["twitter:image"];
            if (imgUrl) {
                if (imgUrl.indexOf("http") < 0) {
                    imgUrl = location.origin + imgUrl;
                }
            }
            let img;
            if (twitterCard === 'summary_large_image') {
                const croppedImg = await crop(imgUrl, 2 / 1);
                img = await changeImageSize(croppedImg, 600, 314);
            }
            else {

            }


            const twitter = document.createElement('div');
            twitter.innerHTML = `<h2>Twitter</h2>
            <p>Can also be previewed at official twitter tool - <a target="_blank" href="https://cards-dev.twitter.com/validator">https://cards-dev.twitter.com/validator</a></p>
            <div class="twitter">
                <div class="twitter_image_wrapper">
                    <img class="twitter_image" src="${img}">
                </div>
                <div class="twitter_text">
                    <div class="twitter_text_title">${tag["twitter:title"]}</div>
                    <div class="twitter_text_desc">${tag["twitter:description"]}</div>
                    <div class="twitter_text_host">${location.host}</div>
                </div>
            </div>
        <style>
        .twitter{
            display:flex;
            flex-direction:column;
            width: fit-content;
            margin: 50px;

            border-radius: .85714em;
            border-width: 1px;
            border-style: solid;
            border-color: #E1E8ED;
            box-sizing: border-box;
            color: inherit!important;
            max-width: 800px;
            overflow: hidden;
        }

        .twitter_image{
            width: 100%;
            height: 100%;
        }

        .twitter_image_wrapper{
            width: 438px;
            height: 220px;
            border-bottom-width: 1px;
            border-bottom-width: 1px;
            border-color: inherit;
            border-bottom-style: solid;
        }

        .twitter_text{
            display:flex;
            flex-direction:column;
            padding-left: 1em;
            padding-right: 1em;

            padding: .75em;
            box-sizing: border-box;
            text-decoration: none;

            font-size: 14px;
            font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
            line-height: 1.3em;
            width:436px;
        }

        .twitter_text_host{
            text-transform: lowercase;
            color: #8899A6;
            max-height: 1.3em;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-top: .32333em;
        }

        .twitter_text_title{
            max-height: 1.3em;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 1em;
            margin: 0 0 .15em;
        }

        .twitter_text_desc{
            max-height: 2.6em;
            overflow: hidden;
            margin-top: .32333em;
        }
         
        </style>
        `;
            document.querySelector("#app").appendChild(twitter);
        } catch (error) {
            console.error(error);
            window.alert(`Some error occured, Check console for more info`);
        }
    }, options);
}
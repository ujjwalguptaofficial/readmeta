export function previewfacebook(page, options) {
    return page.evaluate(async ({ og, changeImageSize, crop, location }) => {
        try {

            eval("changeImageSize = " + changeImageSize)
            eval("crop = " + crop);
            let imgUrl = og["og:image"];
            imgUrl = Array.isArray(imgUrl) ? imgUrl[0] : imgUrl;
            if (imgUrl) {
                if (imgUrl.indexOf("http") < 0) {
                    imgUrl = location.origin + imgUrl;
                }
            }
            const croppedImg = await crop(imgUrl, 1.91 / 1);
            const img = await changeImageSize(croppedImg, 540, 281);
            const facebook = document.createElement('div');
            facebook.innerHTML = `<h2>Facebook</h2>
        <div class="facebook">
            <img class="facebook_image" src="${img}">
            <div class="facebook_text">
                <div class="facebook_text_host">${location.host}</div>
                <div class="facebook_text_title">${og["og:title"]}</div>
                <div class="facebook_text_desc">${og["og:description"]}</div>
            </div>
        </div>
        <style>
        .facebook{
            display:flex;
            flex-direction:column;
            border-left: 1px solid #dadde1;
            border-right: 1px solid #dadde1;
            border-bottom: 1px solid #dadde1;
            width: fit-content;
            margin-bottom: 50px;
        }

        .facebook_image{
            width: 524px;
            height: 274px;
        }

        .facebook_text{
            display:flex;
            flex-direction:column;
            max-height: 190px;
            padding: 10px 12px;
        }

        .facebook_text_host{
            color: #606770;
            flex-shrink: 0;
            font-size: 12px;
            line-height: 16px;
            overflow: hidden;
            padding: 0;
            text-overflow: ellipsis;
            text-transform: uppercase;
            white-space: nowrap;
        }

        .facebook_text_title{
            font-weight: 600;
            overflow: hidden;
            font-family: inherit;
            font-size: 16px;
            line-height: 20px;
            margin: 3px 0 0;
            padding-top: 2px;
        }

        .facebook_text_desc{
            margin-top: 3px;
            color: #606770;
            font-size: 14px;
            line-height: 20px;
            word-break: break-word;
        }
         
        </style>
        `;
            document.querySelector("#app").appendChild(facebook);
        } catch (error) {
            console.error(error);
            window.alert(`Some error occured, Check console for more info`);
        }
    }, options);
}
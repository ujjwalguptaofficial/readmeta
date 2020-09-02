export function previewWhatsApp(page, options) {
    return page.evaluate(async ({ og, changeImageSize, crop, location }) => {
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
        const whatsapp = document.createElement('div');
        whatsapp.innerHTML = `<h2>WhatsApp</h2>
        <div class="whatsapp">
           <div class="whatsapp_text">
                <img class="whatsapp_text_img" src="${img}"/>
                <div class="whatsapp_text_tag">
                    <div class="whatsapp_text_tag_title">${og["og:title"]}</div>
                    <div class="whatsapp_text_tag_desc">${og["og:description"]}</div>
                    <div class="whatsapp_text_tag_host">${location.host}</div>
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
            box-shadow: 0 1px .5px rgba(var(--shadow-rgb),.13);
            border-radius: 7.5px;
            border-top-right-radius: 0;
            max-width: 95%;
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
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .whatsapp_text_tag_desc{
            font-size:12px;
            color:rgb(0,0,0,0.45);
            font-weight:400;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .whatsapp_text_tag_host{
            font-size:12px;
            color:rgb(0,0,0,0.8);
            font-weight:400;
            padding-top:1px;
        }
        </style>
        `;
        document.querySelector("#app").appendChild(whatsapp);
    }, options);
}
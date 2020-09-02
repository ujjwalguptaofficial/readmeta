// import { getImgExtensionFromUrl } from "./get_extension_from_url";

export const changeImageSize = async function (
    dataUrl: string,
    width: number,
    height: number,
    quality: number = 1   // e.g. 0.9 = 90% quality
): Promise<string> {

    const getImgExtensionFromUrl = (url: string) => {
        const extension = ["jpg", "jpeg", "png", "svg", "webp"];
        return extension.find(q => url.includes(q));
    };

    function getImage(dataUrl: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            // add current data for caching issue
            // if (dataUrl.includes('http')) {
            //     dataUrl = addParameterToURL(dataUrl, 'cors', Date.now());
            // }
            const image = new Image();
            image.src = dataUrl;
            image.crossOrigin = "true";
            image.onload = () => {
                resolve(image);
            };
            // image.onerror = (el: any, err: ErrorEvent) => {
            //     reject(err.error);
            // };
        });
    }

    // Create a temporary image so that we can compute the height of the image.
    const image = await getImage(dataUrl);
    const imageType = `image/${getImgExtensionFromUrl(dataUrl)}`;
    // Create a temporary canvas to draw the downscaled image on.
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    // Draw the downscaled image on the canvas and return the new data URL.
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(image, 0, 0, width, height);
    const newDataUrl = canvas.toDataURL(imageType, quality);
    return newDataUrl;
}

export const crop = function (url, aspectRatio) {

    // we return a Promise that gets resolved with our canvas element
    return new Promise(resolve => {

        // this image will hold our source image data
        const inputImage = new Image();

        // we want to wait for our image to load
        inputImage.onload = () => {

            // let's store the width and height of our image
            const inputWidth = inputImage.naturalWidth;
            const inputHeight = inputImage.naturalHeight;

            // get the aspect ratio of the input image
            const inputImageAspectRatio = inputWidth / inputHeight;

            // if it's bigger than our target aspect ratio
            let outputWidth = inputWidth;
            let outputHeight = inputHeight;
            if (inputImageAspectRatio > aspectRatio) {
                outputWidth = inputHeight * aspectRatio;
            } else if (inputImageAspectRatio < aspectRatio) {
                outputHeight = inputWidth / aspectRatio;
            }

            // calculate the position to draw the image at
            const outputX = (outputWidth - inputWidth) * .5;
            const outputY = (outputHeight - inputHeight) * .5;

            // create a canvas that will present the output image
            const outputImage = document.createElement('canvas');

            // set it to the same size as the image
            outputImage.width = outputWidth;
            outputImage.height = outputHeight;

            // draw our image at position 0, 0 on the canvas
            const ctx = outputImage.getContext('2d');
            ctx.drawImage(inputImage, outputX, outputY);
            document.body.appendChild(outputImage);

            // resolve(outputImage);
            resolve(outputImage.toDataURL("image/png"));
        };

        // start loading our image
        inputImage.src = url;
    })

}
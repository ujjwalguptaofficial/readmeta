export const crop = function (url, aspectRatio) {
    const getImgExtensionFromUrl = (url: string) => {
        const extension = ["jpg", "jpeg", "png", "svg", "webp"];
        return extension.find(q => url.includes(q));
    };
    // we return a Promise that gets resolved with our canvas element
    return new Promise((resolve, reject) => {

        // this image will hold our source image data
        const inputImage = new Image();
        inputImage.crossOrigin = "true";

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
            // document.body.appendChild(outputImage);
            const imageType = `image/${getImgExtensionFromUrl(url)}`;
            // resolve(outputImage);
            resolve(outputImage.toDataURL(imageType));
        };

        inputImage.onerror = reject;

        // start loading our image
        inputImage.src = url;
    })

}
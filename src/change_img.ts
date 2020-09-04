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
            const image = new Image();
            image.src = dataUrl;
            image.crossOrigin = "true";
            image.onload = () => {
                resolve(image);
            };
            image.onerror = reject;
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

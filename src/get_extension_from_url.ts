export const getImgExtensionFromUrl = (url: string) => {
    const extension = ["jpg", "jpeg", "png", "svg", "webp"];
    return extension.find(q => url.includes(q));
};
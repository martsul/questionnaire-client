import base64 from "base64-js";

const handlerFile = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const img = base64.fromByteArray(new Uint8Array(arrayBuffer));
    return { img, type: file.type };
};

export const convertImg = async (url?: string) => {
    if (!url) return "";
    if (url.startsWith("blob:")) {
        const response = await fetch(url);
        const blob = await response.blob();
        const file = new File([blob], "image.png", { type: blob.type })
        return await handlerFile(file)
    }
    return url;
};

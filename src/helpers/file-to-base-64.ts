import base64 from "base64-js";

export const fileToBase64 = async (file: File | undefined) => {
    if (file) {
        const arrayBuffer = await file.arrayBuffer();
        const img = base64.fromByteArray(new Uint8Array(arrayBuffer));
        return { img, type: file.type };
    }
    return { img: null, type: null };
};

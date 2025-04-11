const convertToBlob = async (response: Response) => {
    const blob = await response.blob();
    const mimeType = blob.type || "image/jpeg";
    const defaultFileName = `image-${Date.now()}.jpg`;
    return { blob, mimeType, defaultFileName };
};

const convertToDataTransfer = async (response: Response) => {
    const { blob, defaultFileName, mimeType } = await convertToBlob(response);
    const file = new File([blob], defaultFileName, { type: mimeType });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    return dataTransfer.files;
};

export const imgInFile = async (url?: string) => {
    if (!url) return undefined;
    const response = await fetch(url);
    if (!response.ok) return undefined;
    return convertToDataTransfer(response);
};

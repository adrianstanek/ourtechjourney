export const stringToUint = (input: string, asBase64 = false) => {
    if (asBase64) input = btoa(unescape(encodeURIComponent(input)));

    const charList = input.split('');
    const uintArray = [];

    for (let i = 0; i < charList.length; i++) {
        if (charList[i] !== undefined) {
            uintArray.push(charList[i]?.charCodeAt(0) as never);
        }
    }
    return new Uint8Array(uintArray);
};

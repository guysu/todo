export const $ = document.querySelector.bind(document);

export function generateGUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
}

export function addOnClickHandler(DOMelement, func) {
    $(DOMelement).addEventListener("click", func);
}

export const serverAddress = "http://localhost:3232/todos";

export const $ = document.querySelector.bind(document);

export function addOnClickHandler(DOMelement, func) {
    $(DOMelement).addEventListener("click", func);
}

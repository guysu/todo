export const $ = document.querySelector.bind(document);

export function addOnClickHandler(DOMelement: string, func: (event: Event) => void) {
    $(DOMelement)!.addEventListener("click", func);
}
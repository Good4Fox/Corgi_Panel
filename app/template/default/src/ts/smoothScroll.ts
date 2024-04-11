export function smoothScroll(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
        behavior: 'smooth'
        });
    }
}

export function smoothURL(elementId: string) {
    window.location.href = elementId
}
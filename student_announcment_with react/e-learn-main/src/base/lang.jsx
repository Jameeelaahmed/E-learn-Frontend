
import ar from '../lang/ar.json'
import en from '../lang/en.json'

export function lang(text) {
    text = text.toLowerCase();
    let lang = localStorage.getItem("lang");
    if (lang) {
        if (lang === "ar") {
            return ar[text] || text;
        } else {
            return en[text] || text;
        }
    }
    return text; // Return default text if language is not set
}
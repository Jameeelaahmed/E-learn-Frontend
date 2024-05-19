// // i18n/i18n.js
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import translationAR from './locales/ar/translation.json';
// import translationEN from './locales/en/translation.json';

// const resources = {
//   en: {
//     translation: translationEN,
//   },
//   ar: {
//     translation: translationAR,
//   },
// };

// i18n
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     supportedLngs: ['en', 'ar'],
//     resources,
//     lng: "ar", // Default language set to 'ar'
//     interpolation: {
//         escapeValue: false,
//     },
//     detection: {
//         order: ['cookie','querystring','localStorage','sessionStorage','navigator','htmlTag', 'path', 'subdomain'],
//         caches: ['cookie']
//     },
//     backend: {
//         loadPath: '/locales/{{lng}}/translation.json',
//     },
//     react: {
//         useSuspense: false,
//     },
// });


// export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en/translation.json';
import translationAR from './locales/ar/translation.json';
import HttpApi from 'i18next-http-backend'
const resources={
    en:{
        translation:translationEN
    },
    ar:{
        translation:translationAR
    }
};

i18n
.use(LanguageDetector)
.use(initReactI18next)
// .use(HttpApi)
.init({
    supportedLngs: ['en', 'ar'],
    resources,
    lng: "ar", 
    interpolation: {
        escapeValue: false,
    },
    detection: {
        order: ['cookie','querystring','localStorage','sessionStorage','navigator','htmlTag', 'path', 'subdomain'],
        caches: ['cookie']
    },
    backend: {
        loadPath: '/locales/{{lng}}/translation.json',
    },
    react: {
        useSuspense: false,
    },
});

export default i18n;

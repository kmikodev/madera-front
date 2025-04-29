import i18n from "i18next";
import { initReactI18next } from "react-i18next";
 import es from "@/i18n/es";
import en from "@/i18n/en";
import pl from "@/i18n/pl";


const resources = {
    es,
en,
pl,

};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "es",

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
//api
import api_uz from './api/uz'
import api_uk from './api/uk'
import api_ru from './api/ru'
import api_en from './api/en'

//config
const ext_uz = Object.assign(api_uz);
const ext_uk = Object.assign(api_uk,);
const ext_ru = Object.assign(api_ru);
const ext_en = Object.assign(api_en);

export default {
  'uz': ext_uz,
  'uk': ext_uk,
  'ru': ext_ru,
  'en': ext_en
}


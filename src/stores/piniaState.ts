import { defineStore } from 'pinia'

export const piniaState = defineStore('piniaState', {
  state: () => {
    return {
      appLocales: [
        { name: "Ру", code: "ru" },
        { name: "Уз", code: "uk" },
        { name: "O`z", code: "uz" },
        { name: "Eng", code: "en" },
      ],
      user: {
        id: 1,
        fio: "Diyorbek To'raboyev",
        phone: "942700025",
        login: "diyorbek_25",
        password: "0025",
        email: "diyorbek@gmail.com"
      },
      curLocale: "uz",
      colorsInx: 8,
      isDarkMode: 0,
      baseLeftDrawer: true,
      miniState: false,
      currentRouteCategoryName: "",
      errorCode: null,
      fromRouteName: '',
      globalError: undefined,
      currentRouteName: ""
    }
  },
  persist: true
})

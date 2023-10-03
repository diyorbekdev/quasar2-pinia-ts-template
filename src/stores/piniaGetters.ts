import routes_main from "src/router/main_categories";
import { defineStore } from "pinia";
import { piniaState } from "src/stores/piniaState";

export const piniaGetters = defineStore("piniaGetters", {
  getters: {
    getRoutes() {
      const modulesCategoriesArr = Object.keys(routes_main).map((key) => {
        let deepCloneMC = JSON.parse(JSON.stringify(routes_main[key]));
        return deepCloneMC;
      });

      const categoriesFilteredArr = modulesCategoriesArr.filter(
        (e) =>
          (e.children &&
            e.children.filter(
              (el1) =>
                // state.userActions.some(
                //   (ua) =>
                //     ua.app_actions_id === el1.meta.action_id && ua.access_state === 1
                // )
                true
            ).length > 0) ||
          e.meta.is_q_item
      );

      return categoriesFilteredArr;
    },
    getColorsInx() {
      return piniaState().colorsInx;
    },
    getUser() {
      return piniaState().user;
    },
    getCurrentRouteCategoryName() {
      return piniaState().currentRouteCategoryName;
    },
    getCurrentRouteName() {
      return piniaState().currentRouteName;
    },
    getIsDarkMode() {
      return piniaState().isDarkMode;
    },
    getCurLocale() {
      return piniaState().curLocale;
    },
    getLocaleByCode(code) {
      return piniaState().appLocales.find((locale) => locale.code === code);
    },
  },
});

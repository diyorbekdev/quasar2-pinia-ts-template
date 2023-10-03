import routes_main from "src/router/main_categories";

import { defineStore } from 'pinia'
import { piniaState } from "src/stores/piniaState";

export const piniaActions = defineStore('piniaActions', {
  actions: {
    setColorsInx(val: number) {
      piniaState().colorsInx = val
    },
    setUser(val: any) {
      piniaState().user = val
    },
    setBaseLeftDrawer(val: boolean) {
      piniaState().baseLeftDrawer = val
    },
    setMiniState(val: boolean) {
      piniaState().miniState = val;
    },
    setCurrentRouteCategoryName(val: string) {
      piniaState().currentRouteCategoryName = val;
    },
    setIsDarkMode(val: number) {
      piniaState().isDarkMode = val
    },
    setFromRouteName(val: any) {
      piniaState().fromRouteName = val;
    },
    setGlobalError(val: any) {
      piniaState().globalError = val;
    }
  },
})

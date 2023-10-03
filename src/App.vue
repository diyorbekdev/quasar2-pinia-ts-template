<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { piniaState } from "./stores/piniaState";
import { piniaActions } from "./stores/piniaActions";
import { getCssVar, setCssVar } from 'quasar'

const main_colors = ref([
  {
    id: 0,
    bg: "#f1f3f5",
    primary: "#1976CF",
    secondary: "#26A69A",
    selected: true,
    is_bold: 0,
  },
  {
    id: 1,
    bg: "#fefeda",
    primary: "#35699B",
    secondary: "#283848",
    selected: false,
    is_bold: 0,
  },
  {
    id: 2,
    bg: "#e4feda",
    primary: "#04B8D7",
    secondary: "#01768C",
    selected: false,
    is_bold: 0,
  },
  {
    id: 3,
    bg: "#d2fafa",
    primary: "#7952b3",
    secondary: "#3F1B74",
    selected: false,
    is_bold: 0,
  },
  {
    id: 4,
    bg: "#ddeffa",
    primary: "#F58634",
    secondary: "#9F4D11",
    selected: false,
    is_bold: 0,
  },
  {
    id: 5,
    bg: "#0099BC",
    primary: "#2D7D9A",
    secondary: "#638B8B",
    selected: false,
    is_bold: 1,
  },
  {
    id: 6,
    bg: "#053F5C",
    primary: "#F27F0C",
    secondary: "#F27F0C",
    selected: false,
    is_bold: 1,
  },
  {
    id: 7,
    bg: "#377375",
    primary: "#F77839",
    secondary: "#E6A189",
    selected: false,
    is_bold: 1,
  },
  {
    id: 8,
    bg: "#4F9AA1",
    primary: "#1976CF",
    secondary: "#43A047",
    selected: false,
    is_bold: 1,
  },
]);

function methodS() {
  function setMainColors(item: any) {
    if (Object.keys(item).length) {
      setCssVar('primary', item.primary)
      setCssVar('secondary', item.secondary)

      localStorage.primary = item.primary;
      localStorage.secondary = item.secondary;

      let r = document.querySelector(":root") as HTMLElement;
      if (r && r.style) r.style.setProperty("--state-bg-color", item.bg);

      if (item.id >= 5) {
        r.style.setProperty("--state-table-bg-color", "#F1F3F5");
      } else {
        r.style.setProperty("--state-table-bg-color", item.bg);
      }

      main_colors.value.forEach((el) => {
        el.selected = false;
        if (el.id == item.id) {
          el.selected = true;
        }
      });
    }
  }

  return {setMainColors}
}

export default defineComponent({
  name: "App",
  computed: {
  },
  methods: {
  },
  setup() {
    function editColorApex(type: any) {
      let app = document.querySelector("#q-app") as HTMLDivElement;
      let html = document.querySelector("html") as HTMLHtmlElement;

      if (type === 1) {
        app.setAttribute("class", "dark-mode");
        html.setAttribute("class", "notranslate dark-mode");
      } else if (type === 0) {
        app.setAttribute("class", "");
        html.setAttribute("class", "notranslate");
      }
    }

    return {
      editColorApex,
      ...methodS()
    }
  },
  mounted() {
    this.$i18n.locale = piniaState().curLocale;

    if (piniaState().colorsInx >= 0) {
      let inx = piniaState().colorsInx
      this.setMainColors(main_colors.value[piniaState().colorsInx]);
    }
    if (piniaState().isDarkMode >= 0) {
      let inx = piniaState().isDarkMode
      this.editColorApex(inx);
    }
  },
  watch: {
    $route(to, from) {
      if (piniaState().errorCode && from.path !== "/login") {
        piniaActions().setFromRouteName(from.path);
      } else {
        piniaActions().setFromRouteName("/");
      }
    },
  },
});
</script>

<style>
.truncate div.q-field__native.row.items-center.cursor-pointer div {
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}

html.dark-mode {
  background-color: #010101 !important;
  filter: invert(100%) !important;
}
</style>

<style lang="scss">
.dark-mode {
  em,
  img,
  svg,
  image,
  video,
  audio,
  embed,
  iframe,
  object,
  button,
  canvas,
  figure:empty {
    filter: invert(100%) !important;
    -webkit-filter: invert(100%) !important;
  }

  .img:empty,
  .btn:empty,
  .logo:empty,
  .image:empty,
  .photo:empty,
  .button:empty,
  [role="button"],
  input[type="checkbox"],
  .night-mode-extra-class-for-background-image,
  [style*="background:url"]:not(html):not(body):not(input),
  [style*="background: url"]:not(html):not(body):not(input),
  [style*="background-image"]:not(html):not(body):not(input) {
    filter: invert(100%) !important;
    -webkit-filter: invert(100%) !important;
  }

  :-webkit-full-screen img,
  :-webkit-full-screen svg,
  :-webkit-full-screen video,
  :-webkit-full-screen embed,
  :-webkit-full-screen object,
  :-webkit-full-screen canvas,
  :-webkit-full-screen button {
    filter: invert(0%) !important;
    -webkit-filter: invert(0%) !important;
  }

  :-moz-full-screen img,
  :-moz-full-screen svg,
  :-moz-full-screen video,
  :-moz-full-screen embed,
  :-moz-full-screen object,
  :-moz-full-screen canvas,
  :-moz-full-screen button {
    filter: invert(0%) !important;
    -webkit-filter: invert(0%) !important;
  }
}
</style>

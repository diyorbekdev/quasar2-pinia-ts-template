<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="fit full-height q-pa-none row text-black">
    <div
      class="flex content-between text-center animm"
      :class="
        miniState || is_main
          ? 'col-12 column justify-between'
          : 'col-2 justify-center row'
      "
      style="height: calc(100vh - 0px); border-right: 1px solid lightgrey"
      v-if="getRoutes.length != 1"
    >
      <div class="full-width">
        <div
          class="flex items-center q-px-xs overflow-hidden"
          style="
            gap: 5px;
            height: 55px;
            flex-flow: row nowrap;
            text-wrap: nowrap;
          "
        >
          <div
            class="logo"
            :class="getColorsInx >= 5 ? '_bold' : 'bg-primary'"
            style="width: 40px"
          >
            <img src="src/assets/logo.svg" style="width: 30px" />
          </div>
          <q-item
            style="height: 55px; z-index: 99; width: calc(100% - 50px)"
            class="no-shadow shadow-1"
            dense
            v-if="is_main"
          >
            <q-item-section>
              <div class="q-px-sm">
                <q-input
                  value=""
                  borderless
                  dense
                  :color="getColorsInx >= 5 ? 'white' : ''"
                  :label-color="getColorsInx >= 5 ? 'grey-4' : ''"
                  v-model="module_searcher_value"
                  @input="moduleSearcher"
                  :class="getColorsInx >= 5 ? 'input_white' : ''"
                  :label="'Izlash...'"
                >
                  <template v-slot:prepend>
                    <q-icon
                      name="mdi-search-web"
                      :color="getColorsInx >= 5 ? 'grey-4' : 'grey'"
                    />
                  </template>
                </q-input>
              </div>
            </q-item-section>
          </q-item>
        </div>

        <div class="menus full-width" v-if="filtered_modules.length === 0">
          <ul style="padding-left: 2px" class="q-mt-md">
            <li
              v-for="(item, inx) in getRoutes"
              :key="inx"
              @click="setIndex(inx, item)"
              :class="{
                active: getRoutes.length === 1 || activeMenuName === item.name,
                'text-left': is_main,
                'text-center': !is_main,
                _bold: getColorsInx >= 5,
              }"
              class="q-mb-md text-left q-pa-sm flex justify-between items-center"
            >
              <div
                :class="{
                  'flex-start': !miniState,
                  'justify-center': miniState && !is_main,
                }"
              >
                <q-icon
                  size="2em"
                  :color="getColorsInx >= 5 ? 'white' : 'grey'"
                  :name="item.meta.icon"
                />
                <b
                  class="q-ml-lg text-subtitle2"
                  :class="getColorsInx >= 5 ? 'text-white' : 'text-black'"
                  v-if="
                    (!miniState && is_main) ||
                    (is_main && $q.screen.width < 1024)
                  "
                  >{{ item.meta.title }}</b
                >
              </div>
              <q-icon
                v-if="item.children && item.children.length && !miniState && is_main"
                class="q-mr-md"
                size="sm"
                name="mdi-chevron-right"
              />
              <q-tooltip
                v-if="!(miniState || is_main)"
                :offset="[60, 0]"
                :delay="100"
                :hide-delay="0"
                transition-show="jump-down"
                transition-hide="none"
                :class="
                  getRoutes.length === 1 || activeMenuInx === inx
                    ? 'bg-primary'
                    : ''
                "
                anchor="center right"
                self="center middle"
              >
                {{ item.meta.title }}
              </q-tooltip>
            </li>
          </ul>
        </div>

        <div class="menus" v-else>
          <ul style="padding-left: 2px">
            <li
              v-for="(item, inx) in filtered_modules"
              :key="inx"
              @click="setIndex(inx, item)"
              :class="{
                active: filtered_modules.length === 1 || activeMenuInx === inx,
                'text-left': is_main,
                'text-center': !is_main,
                _bold: getColorsInx >= 5,
              }"
              class="q-mb-lg text-left q-pa-sm flex justify-between items-center"
            >
              <div
                :class="{
                  'flex-start': !miniState,
                  'justify-center': miniState && !is_main,
                }"
              >
                <q-icon
                  size="2em"
                  :color="getColorsInx >= 5 ? 'white' : 'grey'"
                  :name="item.icon"
                />
                <b
                  :class="getColorsInx >= 5 ? 'text-white' : 'text-black'"
                  class="q-ml-lg text-subtitle2"
                  v-if="
                    (!miniState && is_main) ||
                    (is_main && $q.screen.width < 1024)
                  "
                  >{{ item.title }}</b
                >
              </div>
              <q-icon
                v-if="item.children.length && !miniState && is_main"
                class="q-mr-md"
                size="sm"
                name="mdi-chevron-right"
              />
              <q-tooltip
                v-if="!(miniState || is_main)"
                :offset="[60, 0]"
                :delay="100"
                :hide-delay="0"
                transition-show="jump-down"
                transition-hide="none"
                :class="
                  filtered_modules.length === 1 || activeMenuInx === inx
                    ? 'bg-primary'
                    : ''
                "
                anchor="center right"
                self="center middle"
              >
                {{ item.meta.title }}
              </q-tooltip>
            </li>
          </ul>
        </div>
      </div>

      <div class="close_btn q-pa-sm">
        <q-icon
          @click="editMiniState(!miniState)"
          class="cursor-pointer mini-state-btn"
          :class="getColorsInx >= 5 ? 'text-white' : 'text-grey-8'"
          size="2em"
          :name="miniState ? 'mdi-chevron-right' : 'mdi-chevron-left'"
        />
      </div>
    </div>

    <div
      class="animm"
      :class="getRoutes.length != 1 ? 'col-10' : 'col-12'"
      :style="
        getColorsInx >= 5
          ? 'border-right: 1px solid #c7c7c7'
          : 'border-right: 1px solid lightgrey'
      "
      v-if="!miniState && !is_main"
    >
      <q-item
        :class="getColor === '#37474F' ? 'text-grey-5' : 'text-grey'"
        style="height: 55px; z-index: 99"
        class="no-shadow shadow-1"
      >
        <q-item-section>
          <div class="q-px-sm">
            <q-input
              value=""
              borderless
              dense
              :color="getColorsInx >= 5 ? 'white' : ''"
              :label-color="getColorsInx >= 5 ? 'grey-4' : ''"
              v-model="module_searcher_value"
              @input="moduleSearcher"
              :class="getColorsInx >= 5 ? 'input_white' : ''"
              :label="'Izlash...'"
            >
              <template v-slot:prepend>
                <q-icon
                  name="mdi-search-web"
                  :color="getColorsInx >= 5 ? 'grey-4' : 'grey'"
                />
              </template>
            </q-input>
          </div>
        </q-item-section>
      </q-item>

      <q-scroll-area
        style="height: calc(100vh - 65px)"
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
      >
        <div class="relative-position" v-if="searched_modules.length === 0">
          <q-list
            class="q-pl-sm overflow-hidden menu_panel"
            style="transform: scaleX(1)"
          >
            <div class=""></div>
            <div class="q-py-sm">
              <q-item
                v-for="(module, index1) in getRoutes.filter(
                  (el) => el.name == activeMenuName
                )[0].children"
                :key="index1"
                :to="
                  getRoutes.filter((el) => el.name == activeMenuName)[0].path +
                  '/' +
                  module.path
                "
                clickable
                :active="getCurrentRouteName === module.name"
                active-class="text-italic text-bold"
                @click="curModule(module)"
              >
                <q-item-section avatar class="q-pl-sm q-pr-md">
                  <q-icon
                    :name="module.meta.icon"
                    :color="getColorsInx >= 5 ? 'white' : returnColor(index1)"
                    size="17px"
                  />
                </q-item-section>
                <q-item-section
                  class="q-pl-none"
                  :class="getColorsInx >= 5 ? 'text-white' : ''"
                >
                  {{ module.meta.title }}
                </q-item-section>
              </q-item>
            </div>
          </q-list>
        </div>
        <div class="q-px-sm overflow-hidden menu_panel" v-else>
          <!-- <q-list
            class="q-pl-sm overflow-hidden menu_panel"
            style="transform: scaleX(1)"
          >
            <q-item
              v-for="(module, index2) in category.children"
              :key="index2"
              :to="category.path + '/' + module.path"
              clickable
              v-ripple
              :active="getCurrentRouteName() === module.name"
              active-class="text-black text-bold"
              @click="
                curModule(module),
                  (module_searcher_value = ''),
                  (filtered_modules = []),
                  (searched_modules = [])
              "
            >
              <q-item-section avatar class="q-pl-sm q-pr-md">
                <q-icon
                  size="17px"
                  :name="module.meta.icon"
                  :color="getColorsInx >= 5 ? 'white' : returnColor(index2)"
                />
              </q-item-section>
              <q-item-section
                class="q-pl-none"
                :class="getColorsInx >= 5 ? 'text-white' : ''"
              >
                {{ $t(module.meta.title) }}
              </q-item-section>
            </q-item>
          </q-list> -->
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
import { piniaGetters } from "src/stores/piniaGetters";
import { mapState } from "pinia";

export default {
  name: "MainMenuPanel",

  props: {
    miniStateProps: {},
  },

  data() {
    return {
      miniState: false,
      showOpened: true,
      module_searcher_value: null,
      expansionItem: null,
      searched_modules: [],
      filtered_modules: [],
      activeMenuInx: 0,
      thumbStyle: {
        right: "2px",
        borderRadius: "5px",
        width: "4px",
        backgroundColor: "#d9dadc",
      },
      barStyle: {
        right: "2px",
        borderRadius: "5px",
        width: "4px",
        backgroundColor: "#69696b",
      },
      colors: [
        "green",
        "red",
        "orange",
        "teal",
        "cyan",
        "purple",
        "blue",
        "lime",
      ],
      is_main: 1,
      activeMenuName: "BaseLayout",
    };
  },

  computed: {
    ...mapState(piniaGetters, [
      "getRoutes",
      "getColorsInx",
      "getUser",
      "getCurrentRouteCategoryName",
      "getCurrentRouteName",
    ]),
    returnDefaultOpened() {
      return (index) => {
        return (
          this.getCurrentRouteCategoryName === this.filtered_modules[0].name ||
          this.filtered_modules[index].children.length === 1
        );
      };
    },
  },

  watch: {
    $route(to, from) {
      let obj = this.getRoutes.filter(
        (el) => el.name == this.activeMenuName
      )[0];

      if (obj.name != "home") this.is_main = null;
    },
    miniStateProps() {
      this.miniState = true;

      if (!this.activeMenuInx) {
        this.is_main = 1;
        this.activeMenuInx = 0;
        this.activeMenuName = "home";
      }
    },
    module_searcher_value() {
      if (!this.module_searcher_value) {
        this.is_main = 1;
      }
    },
  },

  methods: {
    returnColor(inx) {
      return this.colors[inx % 8];
    },
    setIndex(inx, obj) {
      this.is_main = obj.meta.is_main;
      this.activeMenuInx = inx;
      this.activeMenuName = obj.name;
      this.$emit("editMiniState", false);
      this.miniState = false;
      this.expansionItem = null;

      if (obj.meta.is_dashboard) {
        if (obj.meta.is_main) this.$router.push("/");
      }
    },
    curModule(meta) {
      this.$emit("showInfoDialog", meta);
    },

    editMiniState(k) {
      this.$emit("editMiniState", k);
      this.miniState = k;
    },

    moduleSearcher() {
      this.searched_modules = [];
      this.filtered_modules = [];

      let menus = JSON.parse(JSON.stringify(this.getRoutes));

      if (this.module_searcher_value.length >= 2) {
        menus.forEach((el) => {
          let obj = this.filterFunc(el);
          if (obj.name) {
            this.searched_modules.push(obj);
            this.filtered_modules.push(obj);
          }
        });
      }

      if (this.searched_modules.length < this.activeMenuInx) {
        this.activeMenuInx = 0;
      }
    },

    filterFunc(obj) {
      let menu = {},
        children = [];
      if (this.includeFunc(obj.title)) {
        menu = obj;
      }
      if (obj.children) {
        let children = obj.children.map((el) => {
          children = el.children.filter((v) => {
            return this.includeFunc(v.meta.title);
          });

          el.children = children;
          return el;
        });

        children = children.filter((el) => el.children.length > 0);

        if (children.length) {
          menu = { ...obj, children };
        } else {
          menu = {};
        }
      }

      return menu;
    },
    includeFunc(title) {
      let word = title.toLocaleString();

      let first_word = word.split(".")[0];
      let second_word = word.split(".")[1];

      let translates = {
        english:
          this.$i18n._vm.messages.en[first_word] &&
          this.$i18n._vm.messages.en[first_word][second_word]
            ? this.$i18n._vm.messages.en[first_word][second_word]
            : "",
        russian:
          this.$i18n._vm.messages.ru[first_word] &&
          this.$i18n._vm.messages.ru[first_word][second_word]
            ? this.$i18n._vm.messages.ru[first_word][second_word]
            : "",
        uzbek:
          this.$i18n._vm.messages.uz[first_word] &&
          this.$i18n._vm.messages.uz[first_word][second_word]
            ? this.$i18n._vm.messages.uz[first_word][second_word]
            : "",
        uzbek_k:
          this.$i18n._vm.messages.uk[first_word] &&
          this.$i18n._vm.messages.uk[first_word][second_word]
            ? this.$i18n._vm.messages.uk[first_word][second_word]
            : "",
      };

      return (
        translates.english
          .toLowerCase()
          .includes(this.module_searcher_value.toLowerCase()) ||
        translates.russian
          .toLowerCase()
          .includes(this.module_searcher_value.toLowerCase()) ||
        translates.uzbek
          .toLowerCase()
          .includes(this.module_searcher_value.toLowerCase()) ||
        translates.uzbek_k
          .toLowerCase()
          .includes(this.module_searcher_value.toLowerCase())
      );
    },
    findActiveMenuIndex() {
      const filter = this.$route.path.split("/").filter((el) => el !== "");

      if (!!filter.length) {
        this.activeMenuInx = this.getRoutes.findIndex(
          (el) =>
            !!el.children.filter((item) => item.path.includes(filter[0])).length
        );

        this.expansionItem = this.getRoutes[
          this.activeMenuInx
        ].children.findIndex(
          (el) =>
            !!el.children.filter((item) => item.path.includes(filter[1])).length
        );
      } else {
        this.activeMenuInx = 0;
        this.expansionItem = null;
      }
    },
  },
  mounted() {
    if (this.getRoutes.length == 1) {
      this.setIndex(0, { name: this.activeMenuName });
    }
  },
};
</script>

<style lang="scss">
.menu_panel {
  max-width: 295px !important;

  .q-expansion-item {
    .q-item__label {
      max-width: 183px !important;
    }

    .q-expansion-item__container {
      .q-item {
        .q-item__section--avatar {
          min-width: 25px;
        }
      }

      .q-item[aria-expanded="true"] {
        background: rgba(var(--state-bg-color), 1);
        border-radius: 8px;
        backdrop-filter: brightness(90%);
      }
    }
  }
}

.logo {
  border-radius: 8px;
  padding: 5px;

  &._bold {
    background: rgba(var(--state-bg-color), 1);
    -webkit-backdrop-filter: brightness(90%);
    backdrop-filter: brightness(90%);
  }

  img {
    width: 100%;
  }
}

.menus {
  li {
    cursor: pointer;
    flex-flow: row nowrap;
    height: 35px;
    overflow: hidden;

    div {
      width: 85%;
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    &.active {
      border-left: 3px solid $primary;

      i,
      b {
        color: $primary !important;
        opacity: 1 !important;
      }
    }

    &.active._bold {
      border-left: 3px solid $white;

      i,
      b {
        color: $white !important;
        opacity: 1 !important;
        font-style: italic;
      }
    }

    &:hover {
      i,
      b {
        color: $primary !important;
        opacity: 0.5;
      }
    }

    &._bold {
      i,
      b {
        color: white;
      }
      &:hover {
        i,
        b {
          color: $white !important;
          opacity: 0.8;
        }
      }
    }
  }
}

@media (max-width: 1006px) {
  .mini-state-btn {
    display: none !important;
  }
}

.animm {
  // transition: width 3s !important;
}

.input_white {
  input {
    color: white !important;
  }
}
</style>

<template>
  <q-layout view="lHh Lpr lFf" class="drawer_class">
    <q-header
      class="no-shadow q-pa-none q-ma-none header_class"
      elevated
      style="
        height: 55px;
        display: flex;
        align-items: center;
        z-index: 99 !important;
      "
    >
      <q-toolbar class="main-bg-color" style="min-height: 55px">
        <q-btn
          dense
          v-if="$q.screen.width < 1024 || getRoutes.length == 1"
          flat
          round
          icon="menu"
          @click="setMiniStateMethod"
        />

        <q-toolbar-title
          class="text-subtitle1 text-bold q-ml-sm"
          :class="getColorsInx >= 5 ? 'text-white' : 'text-primary'"
          style=""
        >
          NavoiUran
        </q-toolbar-title>

        <div class="dateNowBg">
          <h6
            class="text-bold dateNow"
            :class="getColorsInx >= 5 ? 'text-white' : ''"
          >
            {{ datenow }}
          </h6>
        </div>
        <q-select
          v-model="language"
          :options="appLocales"
          option-value="code"
          option-label="name"
          :display-value="language ? language.name : 'No lagnuage selected'"
          borderless
          no-error-icon
          class="q-mx-md q-pr-none q-py-none q-my-none language_select"
          transition-show="fade"
          transition-hide="fade"
          style="margin-bottom: -3px"
          :class="getColorsInx >= 5 ? 'text-white' : 'text-blue-6'"
        >
          <template v-slot:selected="">
            <div
              class="text-bold"
              :class="getColorsInx >= 5 ? 'text-white' : 'text-blue-6'"
              v-if="language?.name"
            >
              {{ language.name }}
            </div>
          </template>

          <template #option="props">
            <q-item
              v-bind="props.itemProps"
              v-on="props.itemEvents"
              style="cursor: pointer"
            >
              <div class="row full-width">
                <div class="col col-12" v-if="props.opt?.name">
                  {{ props.opt["name"] }}
                </div>
              </div>
            </q-item>
          </template>
        </q-select>

        <span>
          <q-avatar
            size="36px"
            class="overlapping cursor-pointer q-mr-md"
            @click="rightDrawer = !rightDrawer"
          >
            <img v-if="getUser && getUser.resources_token" :src="ImgPath" />
            <img v-else src="~src/assets/nouser_photo.jpg" />
          </q-avatar>
        </span>

        <q-btn
          :class="getColorsInx >= 5 ? 'text-white' : 'text-blue-6'"
          dense
          flat
          round
          icon="mdi-exit-to-app"
          @click="logout"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawer"
      :mini="miniState"
      side="left"
      :mini-to-overlay="miniState"
      class="q-ma-none no-shadow"
    >
      <q-scroll-area
        class="fit q-pa-none no-shadow main-bg-color"
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
      >
        <main-menu-panel
          @editMiniState="editMiniState($event)"
          :miniStateProps="miniStateProps"
        />
      </q-scroll-area>
    </q-drawer>

    <q-drawer
      v-model="rightDrawer"
      :width="350"
      side="right"
      bordered
      elevated
      overlay
    >
      <user-info-drawer />
    </q-drawer>

    <q-page-container
      @click="rightDrawer = false"
      :style="{ background: 'white' }"
    >
      <q-card class="container-card no-shadow q-pl-sm">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          :duration="400"
        >
          <router-view class="q-pt-md" />
        </transition>
      </q-card>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { mapActions, mapState } from "pinia";
import { piniaState } from "src/stores/piniaState";
import { piniaGetters } from "src/stores/piniaGetters";
import { piniaActions } from "src/stores/piniaActions";
import { useQuasar } from "quasar";
import MainMenuPanel from "src/components/base/MainMenuPanel.vue";
import UserInfoDrawer from "src/components/base/UserInfoDrawer.vue";
import { getCurrentInstance  } from 'vue'

const miniState = ref(false);
const leftDrawer = ref(true);
const rightDrawer = ref(false);
const miniStateProps = ref(0);
const language = ref(0);

function methods() {}

export default defineComponent({
  name: "BaseLayout",
  components: {
    MainMenuPanel,
    UserInfoDrawer
  },
  methods: {
    ...mapActions(piniaActions, ["setBaseLeftDrawer"]),
  },
  computed: {
    ...mapState(piniaState, ["appLocales", "baseLeftDrawer"]),
    ...mapState(piniaGetters, ["getRoutes", "getColorsInx", "getUser", "getLocaleByCode"]),
  },
  setup() {
    const $q = useQuasar();
    const app = getCurrentInstance();
    let $dateutil = {formatDate: (x: Date, s: string) => {}}
    if(app != null) {
      $dateutil = app.appContext.config.globalProperties.$dateutil;
    }

    let datenow = ref("")
    let timerId = null

    leftDrawer.value = piniaState().baseLeftDrawer;

    function setMiniStateMethod() {
      if ($q.screen.width > 1024) {
        miniState.value = !miniState.value;
        piniaActions().setMiniState(miniState.value);
      } else {
        leftDrawer.value = !leftDrawer.value;
      }
    }

    function editMiniState(props: true | false) {
      miniState.value = props;
      piniaActions().setMiniState(miniState.value);
    }

    timerId = setInterval(() => {
      datenow.value =
        $dateutil.formatDate(new Date(), "DD.MM.YYYY") +
        " | " +
        new Date().getHours() +
        ":" +
        ((new Date().getMinutes() + "").length === 1
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes());
    }, 1000);

    return {
      language,
      miniState,
      rightDrawer,
      leftDrawer,
      setMiniStateMethod,
      editMiniState,
      $q,
      datenow,
      timerId,
      $dateutil
    };
  },
  mounted() {
    if (!this.$i18n.locale) {
          if (piniaState().user != null) {
            this.$i18n.locale = piniaState().user.lang_code;
          } else {
            this.$i18n.locale = "uz";
          }
        }
    language.value = piniaState().appLocales.find((locale) => locale.code === this.$i18n.locale);
  },
  watch: {
    "$q.screen.width"() {
      if (this.$q.screen.width < 1350) {
        miniState.value = true;
        miniStateProps.value++;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.active-menu {
  color: white;
  background: #f2c037;
}

.dateNow {
  background-color: $primary;
  color: transparent;
  text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.5);
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  font-weight: bold;
  margin-right: 10px;
  font-size: 17px;
}

@media screen and (max-width: 776px) {
  .dateNow {
    display: none;
  }
  .info-button {
    display: none;
  }
}

@media screen and (max-width: 1000px) {
  .search-litsevoy {
    display: none;
  }
}

@media screen and (max-width: 1000px) {
  .searchMeters {
    display: none;
  }
}

.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  transform: scale(0.8);
}

.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}

.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: $secondary;
  margin: -4px 0 0 -4px;
}

.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}

.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}

.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}

.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}

.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}

.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}

.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}

.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}

.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}

.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}

.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}

.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}

.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}

.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}

.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}

.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}

@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.container-card {
  //max-width: calc(100% - 8px);
  margin: 0px 4px 0;
  // height: calc(94vh - 20px);
  background: $white;
  //overflow: hidden !important;
  border-radius: $border-radius;
  //box-shadow: $shadow;
}
</style>

<style lang="scss">
.drawer_class {
  .q-drawer {
    margin: 0 !important;
    border-radius: 0 !important;
    // box-shadow: none !important;
    .q-drawer__content {
      border-radius: 0;
    }
  }
}

.header_class {
  margin: 0;
  border-radius: 0;
  top: 0;
}
</style>

<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="full-height q-pa-sm bg-white">
    <div class="bg-white">
      <div class="main-table-bg-color-brightness row justify-center q-mb-xl">
        <q-avatar size="100px" class="user_photo shadow-1">
          <img
            v-if="ImgPath && getUser && getUser.resources_token"
            :src="ImgPath"
          />
          <img v-else src="~src/assets/nouser_photo.jpg" alt="User image" />
          <div class="user-btn row justify-center">
            <q-btn
              :icon="
                getUser && getUser.resources_token
                  ? 'mdi-pencil-outline'
                  : 'mdi-plus'
              "
              size="10px"
              round
              class="bg-white q-mr-sm"
              @click="card = !card"
              color="green"
            />
            <q-btn
              v-if="ImgPath && getUser && getUser.resources_token"
              icon="delete"
              size="10px"
              round
              @click="deleteImg"
              color="red"
            />
          </div>
        </q-avatar>
      </div>

      <q-item class="column">
        <q-item-section class="q-my-none">
          <q-item-label class="text-h6 text-primary text-center">
            {{ getUser && getUser.fio ? getUser.fio : "- - -" }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>

    <q-card class="no-shadow no-border q-pa-sm bg-white q-mt-none">
      <q-card-section
        class="flex row justify-between items-center q-px-none q-py-none"
      >
        <b class="text-subtitle1">Asosiy ma'lumotlar</b>
        <q-btn
          icon="mdi-account-edit"
          flat
          color="primary"
          @click="showDialogSetUsersInfo"
          dense
        />
      </q-card-section>
      <q-card-section class="q-px-none q-py-none q-mt-sm">
        <div class="flex row justify-between items-center q-py-xs">
          <div class="text-grey">
            <q-icon
              name="mdi-mail"
              size="16px"
              class="q-mr-sm"
              color="grey-5"
            />
            <span>Email</span>
          </div>
          <div>
            <b class="">{{
              getUser && getUser.email ? getUser.email : "- - -"
            }}</b>
          </div>
        </div>

        <div class="flex row justify-between items-center q-py-xs">
          <div class="text-grey">
            <q-icon
              name="mdi-phone"
              size="16px"
              class="q-mr-sm"
              color="grey-5"
            />
            <span>Telefon raqam</span>
          </div>
          <div>
            <b class="">{{
              getUser && getUser.phone ? getUser.phone : "- - -"
            }}</b>
          </div>
        </div>

        <!-- <div class="flex row justify-between items-center q-py-xs">
          <div class="text-grey">
            <q-icon
              name="mdi-bank"
              size="16px"
              class="q-mr-sm"
              color="grey-5"
            />
            <span>{{ $t("captions.l_branch_name") }}</span>
          </div>
          <div>
            <b class="">
              {{
                getUser && getUser.branchs_name ? getUser.branchs_name : "--"
              }}
              <q-tooltip>
                {{
                  getUser && getUser.branchs_name
                    ? getUser.branchs_name
                    : "- - -"
                }}
              </q-tooltip>
            </b>
          </div>
        </div> -->

        <div class="flex row justify-between items-center q-py-xs">
          <div class="text-grey">
            <q-icon
              name="mdi-login"
              size="16px"
              class="q-mr-sm"
              color="grey-5"
            />
            <span>Login</span>
          </div>
          <div>
            <b class="">{{
              getUser && getUser.login ? getUser.login : "- - -"
            }}</b>
          </div>
        </div>

        <div class="flex row justify-between items-center q-py-xs">
          <div class="text-grey">
            <q-icon
              name="mdi-lock"
              size="16px"
              class="q-mr-sm"
              color="grey-5"
            />
            <span>Parol</span>
          </div>
          <div>
            <q-btn
              dense
              flat
              color="primary"
              label="O'zgartirish"
              size="12px"
              @click="changePassword"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="no-shadow no-border q-pa-sm bg-white q-mt-md">
      <q-card-section
        class="flex row justify-between items-center q-px-none q-py-sm"
      >
        <b class="text-subtitle1">Sayt mavzusi</b>
        <q-btn
          dense
          flat
          :icon="!getIsDarkMode ? 'mdi-weather-night' : 'mdi-weather-sunny'"
          color="primary"
          @click="editColorApex(getIsDarkMode)"
        />
      </q-card-section>
      <q-card-section class="q-px-none q-py-none q-mt-sm">
        <q-scroll-area
          ref="scrollArea"
          :bar-style="barStyle"
          :thumb-style="thumbStyle"
          class="q-pa-xs"
          style="height: 190px; width: 100%; border: 1px dashed lightgray"
        >
          <div class="row no-wrap relative-position" style="column-gap: 10px">
            <div
              v-for="(item, index) in main_colors"
              :key="index"
              style="width: 180px"
            >
              <div
                class="cursor-pointer text-primary"
                @click.stop="setMainColors(item)"
                style="border-radius: 8px"
                :style="
                  item.selected
                    ? 'border: 2px solid'
                    : 'border: 2px solid #e5e3e3'
                "
              >
                <div class="q-pt-xs q-pl-xs" style="border-radius: 5px">
                  <div
                    class="header q-pa-sm"
                    :style="{ background: item.bg }"
                    style="border-bottom: 1px solid #e5e3e3"
                  >
                    <q-badge
                      rounded
                      class="q-px-sm q-mr-sm shadow-1"
                      :style="{ background: item.bg }"
                    />
                    <q-badge
                      rounded
                      class="q-px-sm q-mr-sm shadow-1"
                      :style="{ background: item.primary }"
                    />
                    <q-badge
                      rounded
                      class="q-px-sm q-mr-sm shadow-1"
                      :style="{ background: item.secondary }"
                    />
                  </div>
                  <div class="row" style="backdrop-filter: brightness(98%)">
                    <div
                      class="col-5 q-px-sm"
                      :style="{ background: item.bg }"
                      style="border-right: 1px solid #e5e3e3"
                    >
                      <div
                        class="q-my-sm q-py-md"
                        :style="{ background: item.primary }"
                        style="border-radius: 5px"
                      ></div>

                      <div
                        class="q-my-sm q-py-sm"
                        v-for="item in 2"
                        :key="item"
                        style="background: #e7e6e6; border-radius: 3px"
                      ></div>
                    </div>
                    <div class="col-7"></div>
                  </div>
                </div>
                <div
                  class="flex row justify-between items-center q-pl-md"
                  style="border-top: 1px solid #e5e3e3"
                >
                  <b class="text-caption">
                    {{ item.selected ? "Tanlangan" : "" }}
                  </b>
                  <q-checkbox
                    left-label
                    v-model="item.selected"
                    @input="setMainColors(item)"
                    checked-icon="task_alt"
                    unchecked-icon="mdi-checkbox-blank-circle-outline"
                    color="primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </q-scroll-area>
        <div class="flex row justify-end q-mt-sm  ">
          <q-btn
            icon="mdi-arrow-left"
            dense
            size="sm"
            class="q-mr-sm"
            color="grey-5"
            @click="animateScroll('left')"
          />
          <q-btn
            icon="mdi-arrow-right"
            dense
            size="sm"
            color="grey-5"
            @click="animateScroll('right')"
          />
        </div>
      </q-card-section>
    </q-card>

    <!--    edit password -->

    <q-dialog
      v-model="setPasswordDialog"
      transition-show="jump-up"
      transition-hide="jump-down"
      persistent
    >
      <q-card>
        <q-bar class="bg-primary text-white">
          <q-space />
          <q-btn dense flat icon="close" v-close-popup class="q-px-none">
            <q-tooltip content-class="bg-secondary text-white"
              >{{ $t("system.l_close") }}
            </q-tooltip>
          </q-btn>
        </q-bar>
        <q-form
          ref="editForm"
          @submit="onSubmitNewPassWord"
          @validation-error="onValidationError"
        >
          <q-card-section class="q-pa-sm">
            <div class="row justify-center">
              <div class="col col-12">
                <q-input
                  v-model="bean.old_password"
                  :type="isPwd ? 'text' : 'password'"
                  :placeholder="$t('system.l_old_password')"
                  :label="$t('system.l_old_password')"
                  lazy-rules
                  counter
                  class="q-pa-md"
                  :rules="[
                    (val) => !!val || $t('system.field_is_required'),
                    (val) => val.length >= 3 || $t('system.min_6_chars'),
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="mdi-account-key" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </div>

              <div class="col col-12">
                <q-input
                  v-model="bean.password"
                  :type="isPwdNew ? 'text' : 'password'"
                  :placeholder="$t('system.l_new_password')"
                  :label="$t('system.l_new_password')"
                  lazy-rules
                  class="q-pa-md"
                  counter
                  v-bind:rules="Required"
                  ref="fldPasswordChange"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwdNew ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      v-on:click="isPwdNew = !isPwdNew"
                    ></q-icon>
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="mdi-account-key" />
                  </template>
                </q-input>
              </div>

              <div class="col col-12">
                <q-input
                  v-model="bean.confirm_password"
                  :type="isPwdConfirm ? 'text' : 'password'"
                  :placeholder="$t('system.l_confirm_password')"
                  :label="$t('system.l_confirm_password')"
                  lazy-rules
                  class="q-pa-md"
                  counter
                  v-bind:rules="ConfirmPWD"
                  ref="fldPasswordChangeConfirm"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwdConfirm ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      v-on:click="isPwdConfirm = !isPwdConfirm"
                    ></q-icon>
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="mdi-account-key" />
                  </template>
                </q-input>
              </div>
            </div>
          </q-card-section>
          <q-separator color="secondary" />
          <q-card-actions align="right" class="q-pa-sm">
            <div class="q-pa-md q-gutter-md">
              <q-chip
                dense
                square
                size="10"
                color="accent"
                text-color="white"
                icon="edit"
              >
                {{ $t("system.l_change_password") }}
              </q-chip>
            </div>
            <q-space />
            <q-btn
              flat
              :label="$t('system.l_cancel')"
              class="text-secondary"
              v-close-popup
            />
            <q-btn
              flat
              :label="$t('system.l_save')"
              class="text-secondary"
              type="submit"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <!--    edit password -->

    <!--    edit avatar-->

    <q-dialog v-model="card">
      <q-card
        style="
          border-radius: 12px;
          min-width: min-content;
          max-width: max-content;
          width: fit-content;
        "
        class="my-card"
      >
        <q-uploader
          accept=".jpg,.png,.JPG, image/*"
          :label="$t('fp_captions.l_upload')"
          :factory="factoryFn"
          color="grey-3"
          text-color="primary"
          class="q-ma-md"
          style="
            border-radius: 12px;
            min-width: 30vw;
            max-width: fit-content;
            min-height: min-content;
            height: inherit;
            max-height: max-content;
          "
        >
          <template #header="scope">
            <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
              <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
              <div class="col">
                <div class="q-uploader__title q-ml-sm">
                  {{ $t("fp_captions.l_upload") }}
                </div>
              </div>

              <q-btn
                v-if="scope.files.length === 0"
                type="a"
                icon="download"
                @click="scope.pickFiles"
                round
                dense
                flat
              >
                <q-uploader-add-trigger />

                <q-tooltip
                  :delay="400"
                  :hide-delay="300"
                  content-class="bg-primary"
                >
                  {{ $t("fp_captions.l_call_order_file_download") }}
                </q-tooltip>
              </q-btn>
              <q-btn
                v-if="scope.canUpload && scope.files.length > 0"
                icon="upload"
                @click="scope.upload"
                round
                dense
                flat
              >
                <q-tooltip
                  :delay="400"
                  :hide-delay="300"
                  content-class="bg-primary"
                >
                  {{ $t("fp_captions.l_submit") }}
                </q-tooltip>
              </q-btn>
              <q-btn
                icon="clear"
                @click="removeFile(scope), scope.removeQueuedFiles"
                round
                dense
                flat
                color="grey"
              >
                <q-tooltip
                  :delay="400"
                  :hide-delay="300"
                  content-class="bg-primary"
                >
                  {{
                    scope.files.length === 0
                      ? $t("system.l_close")
                      : $t("system.delete")
                  }}
                </q-tooltip>
              </q-btn>
            </div>
          </template>
          <template #list="scope">
            <div style="width: 100%; height: 100%">
              <img
                v-if="scope.files.length > 0"
                :src="scope.files[0].__img.src"
                style="object-fit: contain; width: 100%"
              />
              <img
                v-else
                style="object-fit: contain; width: 100%"
                :src="ImgPath"
              />
            </div>
          </template>
        </q-uploader>
      </q-card>
    </q-dialog>

    <!-- edit avatar-->

    <!-- edit user info  -->

    <q-dialog
      v-model="setUsersInfo"
      :model-id="bean.id"
      transition-show="jump-up"
      transition-hide="jump-down"
      persistent
    >
      <q-card>
        <q-bar class="bg-primary text-white">
          <b>Ma'lumotlar</b>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup class="q-px-none">
            <q-tooltip content-class="bg-secondary text-white"
              >{{ $t("system.l_close") }}
            </q-tooltip>
          </q-btn>
        </q-bar>
        <q-form
          ref="editForm"
          @submit="onSubmitUserInfo"
          @validation-error="onValidationError"
        >
          <q-card-section class="q-pa-sm">
            <div class="row justify-center">
              <div class="col-xs-12">
                <q-input
                  v-model="beanSetInfo.fio"
                  placeholder="F.I.Sh"
                  label="F.I.Sh"
                  lazy-rules
                  outlined
                  class="q-pa-md"
                  :rules="[
                    (val) => !!val || $t('system.field_is_required'),
                    (val) => val.length >= 3 || $t('system.min_3_chars'),
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12">
                <q-input
                  v-model="beanSetInfo.email"
                  placeholder="Email"
                  label="Email"
                  class="q-pa-md"
                  outlined
                >
                  <template v-slot:prepend>
                    <q-icon name="mail" />
                  </template>
                </q-input>
              </div>

              <div class="col-xs-12">
                <q-input
                  v-model="beanSetInfo.phone"
                  mask="(##) ### - ## - ##"
                  fill-mask
                  outlined
                  placeholder="Telefon raqami"
                  label="Telefon raqami"
                  unmasked-value
                  class="q-pa-md"
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>
            </div>
          </q-card-section>
          <q-separator color="secondary" />
          <q-card-actions align="right" class="q-pa-sm">
            <div class="q-px-md q-py-sm q-gutter-md">
              <q-chip
                square
                color="accent"
                text-color="white"
                icon="edit"
                class="q-px-sm"
              >Taxrirlash</q-chip>
            </div>
            <q-space />
            <q-btn
              flat
              label="Bekor qilish"
              class="text-grey"
              v-close-popup
            />
            <q-btn
              label="Saqlash"
              class="text-white"
              type="submit"
              color="primary"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <q-dialog v-model="small">
      <q-card style="width: 400px; border-radius: 12px">
        <q-card-section>
          <div class="row">
            <div class="col=2">
              <q-icon
                size="xl"
                color="negative"
                name="mdi-alert-octagon-outline"
              ></q-icon>
            </div>
            <p class="col-10 q-px-md" style="font-size: medium">
              {{ "fp_captions.l_delete_confirm" }}
            </p>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white">
          <q-btn
            flat
            color="primary"
            :label="'fp_captions.comfirm'"
            dense
            style="font-size: small"
            @click="deleteImg"
          />
          <q-btn
            flat
            color="negative"
            :label="'fp_captions.cancel'"
            v-close-popup
            dense
            style="font-size: small"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!--   edit user-->
  </div>
</template>

<script lang="ts">
// import StandartInputDialog from "../base/StandartInputDialog";
// import { urls } from "src/utils/constants";
// import { cfghttp } from "src/utils/constants";
import { getCssVar, setCssVar } from "quasar";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { piniaActions } from "./../../stores/piniaActions";
import { piniaGetters } from "./../../stores/piniaGetters";
import { piniaState } from "./../../stores/piniaState";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { mapState } from "pinia";

const colors = ref([
  { primary: "#35699B", secondary: "#084887" },
  { primary: "#466483", secondary: "#283848" },
  { primary: "#1976CF", secondary: "#084887" },
  { primary: "#04B8D7", secondary: "#01768C" },
  { primary: "#7952b3", secondary: "#3F1B74" },
  { primary: "#B91F3A", secondary: "#780A1E" },
  { primary: "#F58634", secondary: "#9F4D11" },
]);
const position = 210;
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
const colorsApex = ref([
  { dashPrimary: "#37474F", dashSecondary: "#263238" },
  { dashPrimary: "#FFFFFF", dashSecondary: "#FFFFFF" },
]);
const userInfoChanged = ref(false);
const setPasswordDialog = ref(false);
const confirm_password = ref(null);
const isPwd = ref(false);
const isPwdNew = ref(false);
const isPwdConfirm = ref(false);
const avatarResourceID = ref(null);
const setUsersInfo = ref(false);
const card = ref(false);
const path = "../../statics/nouser_photo.jpg";
const userId = ref(null);
const resourceTypeID = 1;
const small = ref(false);
const bean = ref({
  id: null,
  old_password: null,
  password: null,
});
const beanDefault = ref({
  id: null,
  old_password: null,
  password: null,
});
const beanSetInfo = ref({
  fio: "",
  email: "",
  phone: "",
});

function methodS() {}

export default defineComponent({
  name: "UserInfoDrawer",
  // components: { StandartInputDialog },
  watch: {
    "beanSetInfo.fio": {
      handler: function (after, before) {
        if (before && before !== after) this.userInfoChanged = true;
      },
      deep: true,
    },
  },

  computed: {
    ...mapState(piniaGetters, ["getIsDarkMode"]),
    getUser() {
      return piniaState().user;
    },
    ImgPath() {
      if (this.getUser && !this.getUser.resources_token) {
        return null;
      }
      if (this.getUser && this.getUser.resources_token) {
        return (
          // urls.FILE + "/" + this.getUser.resources_token + "/view"
          ""
        );
      }
      this.card = false;
    },
    ConfirmPWD() {
      return [
        (v: String) => !!v || this.$t("system.field_is_required"),
        (v: String) => v.length >= 3 || this.$t("system.min_6_chars"),
        (v: String) => {
          const fldPasswordChange = ref(null);

          return (
            v == fldPasswordChange.value || this.$t("system.not_equal_password")
          );
        },
      ];
    },
    Required() {
      const pattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[+\-!@#\$%\^&\*])(?=.{8,20})/;
      return [
        (val: string) =>
          pattern.test(val) || this.$t("system.example_password"),
      ];
    },

    primary_color() {
      return getCssVar("primary");
    },
  },

  methods: {
    setAvatars(val: number) {
      var set = {
        users_id: this.getUser && this.getUser.id ? this.getUser.id : null,
        resources_id: val,
      };

      // this.$axios
      //   .post(urls.USERS + "/set-avatar", set)
      //   .then((response) => {
      //     this.setUserImg(val);

      //     if (val) {
      //       this.$store.commit("setUser", {
      //         ...this.getUser,
      //         resources_token: response.data,
      //       });
      //     }

      //     this.card = !this.card;
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   });
    },
    factoryFn(file: any) {
      // return new Promise((resolve, reject) => {
      //   let formData = new FormData();
      //   formData.append("file", file[0]);
      //   formData.append("system_language", "uz");
      //   formData.append("resource_types_id", this.resourceTypeID);
      //   this.$axios
      //     .post(urls.UPLOAD_RESOURCE, formData, {
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //       },
      //     })
      //     .then((response) => {
      //       this.showInfo(this.$t("fp_captions.l_upload_successfully"));
      //       this.setAvatars(response.data);
      //       resolve();
      //     })
      //     .catch((error) => {
      //       this.showError((error) => {
      //         console.error(error);
      //       });
      //       reject();
      //     });
      // });
    },
    onSubmitNewPassWord() {
      // this.$axios
      //   .post(urls.SET_NEW_PASSWORD, this.bean)
      //   .then((response) => {
      //     this.setPasswordDialog = false;
      //   })
      //   .catch((error) => {
      //     this.showError(error);
      //   });
    },
    onSubmitUserInfo() {
      if (this.userInfoChanged) {
        // this.$axios
        //   .post(urls.EDIT_USER_INFO, this.beanSetInfo)
        //   .then((response) => {
        //     this.setUserInfo(response.data);
        //     this.setUsersInfo = false;
        //   })
        //   .catch((error) => {
        //     this.showError(error);
        //   })
        //   .finally((res) => {
        //     this.userInfoChanged = false;
        //     window.location.reload();
        //   });
      }

      this.setUsersInfo = false;
      return;
    },
    deleteImg() {
      // if (this.small) {
      //   this.$axios
      //     .delete(urls.RESOURCE + "/" + this.getUser.img_resource_token)
      //     .then((resp) => {
      //       this.$store.commit("setUser", {
      //         ...this.getUser,
      //         resources_token: null,
      //       });
      //       this.setAvatars(null);
      //       this.showInfo(this.$t("fp_captions.l_delete_successfully"));
      //       this.small = false;
      //     });
      // } else {
      //   this.small = true;
      // }
    },
  },
  setup() {
    const { t } = useI18n();
    const scrollArea = ref(null);

    onMounted(() => {
      console.log(scrollArea)
    })

    const thumbStyle = {
      right: "0px",
      borderRadius: "5px",
      backgroundColor: "#d9dadc",
      width: "5px",
      height: "4px",
      opacity: 0.75,
    };
    const barStyle = {
      right: "0px",
      borderRadius: "9px",
      backgroundColor: "#e5e8e8",
      width: "5px",
      height: "4px",
      opacity: 0.2,
    };

    function editColor(primary: string, secondary: string) {
      setCssVar("primary", primary);
      setCssVar("secondary", secondary);
      localStorage.primary = primary;
      localStorage.secondary = secondary;
    }

    function editColorApex(type: any) {
      let app = document.querySelector("#q-app") as HTMLDivElement;
      let html = document.querySelector("html") as HTMLHtmlElement;

      if (type === 0) {
        app.setAttribute("class", "dark-mode");
        html.setAttribute("class", "notranslate dark-mode");

        piniaActions().setIsDarkMode(1);
      } else {
        app.setAttribute("class", "");
        html.setAttribute("class", "notranslate");

        piniaActions().setIsDarkMode(0);
      }
    }

    function changePassword() {
      bean.value = Object.assign({}, beanDefault.value);
      setPasswordDialog.value = true;
    }

    function setMainColors(item: any) {
      if (Object.keys(item).length) {
        setCssVar("primary", item.primary);
        setCssVar("secondary", item.secondary);
        localStorage.primary = item.primary;
        localStorage.secondary = item.secondary;

        let r = document.querySelector(":root") as HTMLElement;

        if (item.id >= 5) {
          r.style.setProperty("--state-table-bg-color", "#F1F3F5");
        } else {
          r.style.setProperty("--state-table-bg-color", item.bg);
        }

        r.style.setProperty("--state-bg-color", item.bg);

        main_colors.value.forEach((el) => {
          el.selected = false;
          if (el.id == item.id) {
            el.selected = true;
            piniaActions().setColorsInx(el.id);
          }
        });
      }
    }

    function removeFile(file: any) {
      if (file.files && file.files.length > 0) file.files = [];
      else card.value = !card.value;
    }

    function animateScroll(type: any) {

      console.log(scrollArea.value)
      let positionL = 0;
      if (scrollArea != null && scrollArea.value != null) {
        positionL =
          scrollArea.value.getScroll().horizontalPosition +
          (type === "left" ? -1 * position : position);

        scrollArea.value.setScrollPosition("horizontal", positionL, 300);
      }
    }

    function showDialogSetUsersInfo() {
      beanSetInfo.value.fio = piniaGetters().getUser.fio;
      beanSetInfo.value.email = piniaGetters().getUser.email;
      beanSetInfo.value.phone = piniaGetters().getUser.phone;
      setUsersInfo.value = true;
    }

    function languages() {
      return piniaState().appLocales;
    }

    function onValidationError() {}

    return {
      // data
      t,
      colors,
      position,
      main_colors,
      colorsApex,
      userInfoChanged,
      setPasswordDialog,
      confirm_password,
      isPwd,
      isPwdNew,
      isPwdConfirm,
      avatarResourceID,
      setUsersInfo,
      card,
      path,
      userId,
      resourceTypeID,
      small,
      bean,
      beanSetInfo,
      thumbStyle,
      barStyle,
      beanDefault,
      scrollArea,

      // functions
      editColor,
      editColorApex,
      changePassword,
      setMainColors,
      removeFile,
      animateScroll,
      showDialogSetUsersInfo,
      languages,
      onValidationError
    };
  },
  mounted() {
    // const $q = useQuasar();
    // $q.dark.set(false);
      const scrollArea = ref(null);

    if (localStorage.primary) setCssVar("primary", localStorage.primary);
    if (localStorage.secondary) setCssVar("secondary", localStorage.secondary);

    if (piniaGetters().getColorsInx >= 0) {
      let inx = piniaGetters().getColorsInx;
      this.setMainColors(this.main_colors[inx]);
    }
  },
});
</script>
<style lang="scss">
.box-color {
  width: 20px;
  height: 20px;
  border-radius: 100%;
  margin: 5px 10px;
  cursor: pointer;
  display: block;
}
</style>

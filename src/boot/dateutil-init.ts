import { boot } from "quasar/wrappers";
import { date } from "quasar";

export default boot(async ({ app, router, store }) => {
  // something to do
  const f = date.formatDate;
  date.formatDate = function (xdate, pattern) {
    if (!xdate) return "";
    return f(xdate, pattern);
  };

  app.config.globalProperties.$dateutil = date;
});

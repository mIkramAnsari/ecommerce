const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");

const buildAdminRouter = (admin) => {
  // const router = buildRouter(admin);
  // const router = AdminBroExpress.buildRouter(admin);
  const router = AdminJSExpress.buildAuthenticatedRouter(admin, {
    authenticate: async (email, password) => {
      // const user = await AdminService.getOneByEmail({ email });
      if (email == "admin@admin.com" || password == "admin") {
        // const matched = await bcrypt.compare(password, user.password);
        // if (matched) {
        return {
          email: "admin@admin.com",
          password: "admin",
        };
        // }
      }
      return false;
    },
    cookiePassword: "some-secret-password-used-to-secure-cookie",
  });
  return router;
};

module.exports = buildAdminRouter;
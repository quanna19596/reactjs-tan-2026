export default {
  rootUrl: import.meta.env.VITE_ROOT_URL ?? "",
  service: {
    dummy: {
      baseUrl: import.meta.env.VITE_DUMMY_SERVICE_BASE_URL ?? "",
    },
  },
  cookie: {
    domain: import.meta.env.VITE_COOKIE_DOMAIN ?? "",
  },
  zma: {
    appId: import.meta.env.VITE_APP_ID ?? "",
    secretKey: import.meta.env.VITE_SECRET_KEY ?? "",
    isAvailable:
      window.location.hostname !== import.meta.env.VITE_DOMAIN_NAME || false,
  },
};

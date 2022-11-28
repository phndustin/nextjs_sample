const config = {
  publicPages: [/\/signin/, /\/signup/, /\/forgot-password/, /\/reset-password/, /\/paylink\/.+/, /\/reset-pass/, /\/verify-email/, /\/resend-email/, /\/verify-update-email/, '/'],

  /* I18n configuration, `languages` and `defaultLanguage` are required currently. */
  i18n: {
    /* Countrys flags: https://www.flaticon.com/packs/countrys-flags */
    languages: [
      {
        key: 'en',
        title: 'English',
        flag: '/imgs/flags/america.png'
      }
    ],
    defaultLanguage: 'en'
  },

  /* We will save these store to storage */
  store: {
    whitelist: ['userStore']
  }
}

export default config

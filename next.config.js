
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turn off React StrictMode for now, as react-aria (used by Plasmic)
  // has some troubles with it. See
  // https://github.com/adobe/react-spectrum/labels/strict%20mode
  reactStrictMode: false,
  i18n: {
    locales: ['it', "en"], // Add your supported locales here
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
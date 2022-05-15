/** @type {import('next').NextConfig} */
const postCssPresetEnv = require('postcss-preset-env');
const postCssCustomProperties = require('postcss-custom-properties');
const postcssCustomMedia = require('postcss-custom-media');
const postcssNested = require('postcss-nested');

const nextConfig = {
  reactStrictMode: true,
  postcssLoaderOptions: {
    ident: 'postcss',
    sourceMap: true,
    plugins: () => [
      postCssCustomProperties({
        preserve: false,
        importFrom: './styles/partials/variables.css',
      }),
      postcssCustomMedia({
        preserve: false,
        importFrom: './styles/partials/variables.css',
      }),
      postCssPresetEnv({
        stage: 0,
        browserslist: 'last 2 versions',
      }),
      postcssNested(),
    ],
  },
  images: {
    domains: ['images.punkapi.com'],
  },
}

module.exports = nextConfig

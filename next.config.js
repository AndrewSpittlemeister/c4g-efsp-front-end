/*  @type {import('next').NextConfig}  */

const withPWA = require('next-pwa')({
  dest: 'public'
})

const nextConfig = {
  reactStrictMode: true,
  env: {
    'MYSQL_HOST': 'db.unitedwayatlantaefsp.org',
    'MYSQL_DATABASE': 'unitedwayatlantaefsp',
    'MYSQL_USER': 'efsp_mngr',
    'MYSQL_PASSWORD':'TKL72wvu$',
  }
}

module.exports = withPWA(
  nextConfig,
)
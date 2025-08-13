/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://smartslate.io',
  generateRobotsTxt: true,
  exclude: ['/api/*', '/admin/*', '/handler/*'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};



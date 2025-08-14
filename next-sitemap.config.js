/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://smartslate.io',
  generateRobotsTxt: true,
  exclude: ['/api/*', '/admin/*'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};



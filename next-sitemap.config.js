/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || "https://bluepay.ma",
  generateRobotsTxt: false,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/api/*"],
  additionalPaths: async () => [
    { loc: "/", changefreq: "weekly", priority: 1.0 },
    { loc: "/solutions", changefreq: "monthly", priority: 0.8 },
    { loc: "/pricing", changefreq: "monthly", priority: 0.9 },
    { loc: "/simulateur", changefreq: "monthly", priority: 0.8 },
    { loc: "/contact", changefreq: "monthly", priority: 0.7 },
  ],
};

module.exports = config;

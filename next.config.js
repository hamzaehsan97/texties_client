// next.config.js
module.exports = {
  images: {
    domains: ["https://www.github.com/"],
  },
  trailingSlash: false,
  generateBuildId: () => "build",
};

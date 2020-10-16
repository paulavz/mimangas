module.exports = {
    swSrc: 'src/sw-custom.js',
    swDest: 'build/sw.js',
    skipWaiting: true,
    globDirectory: 'build',
    globPatterns: [
        "**/*.{js,css,html}"
    ],
    globIgnores: [
        "**/*.map",
        "**/asset-manifest*.js",
        "**/service-worker.js"
    ],
};
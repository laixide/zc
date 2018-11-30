module.exports = {
    baseUrl: process.env.NODE_ENV === 'production'
        ? '/zc/'
        : '/',
    outputDir: 'dist',
    assetsDir: 'assets'
}
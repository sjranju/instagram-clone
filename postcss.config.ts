// eslint-disable-next-line @typescript-eslint/no-var-requires
const csspath = require('path')

module.exports = {
    plugins: {
        tailwindcss: {
            config: csspath.join(__dirname, 'tailwind.config.ts')
        },
        autoprefixer: {}
    }
}

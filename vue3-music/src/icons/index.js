const request = require.context("./svg",false, /\.svg$/)

request.keys().forEach(src => {
    request(src)
})
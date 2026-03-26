// const http = require("http") //common js
// const cafes = require("../data/productos.js")
// const pages = require("../pages/utils.js")
import http from "http"
import cafes from "../data/productos.js"
// import pages from "../pages/utils.js"
import { createPage, createProductList } from "../pages/utils.js"   //llamo al export
import pages from "../pages/utils.js"                               //llamo al export default

const server = http.createServer((request, response) => {
    console.log(request.url)
    switch (request.url) {
        case "/":
            response.write(createPage("Victor villafane", "Mi nombre"))
            break
        case "/materia":
            response.write(createPage("aplicaciones hibridas", "Materia"))
            break
        case "/profesor":
            response.write(createPage("Victor", "Profesor"))
            break
        case "/productos":
            response.write(createPage(createProductList(cafes), "Listado de productos"))
            break
        default:
            response.write(createPage("404", "Pagina no encontrada"))
            break
    }
    response.end()
})
server.listen(2026, () => console.log("Funcionando..."))
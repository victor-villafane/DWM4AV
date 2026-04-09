export function createPage(content, title) {
    let html = ""
    html += '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">'
    html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<title>' + title + '</title></head><body>'
    html += content
    html += '</body></html>'
    return html
}

export function createProductList(cafes) {
    let html = "<h1>Listado de productos</h1>"
    html += "<a href='/productos/nuevo' >Nuevo producto</a>"
    html += "<ul>"
    cafes.forEach(cafe => html += "<li>" + cafe.nombre + ` <a href='/productos/${cafe.id}' >Ver</a>` + "</li>")
    html += "</ul>"
    return createPage(html, "Listado de productos")
}

export function createProductDetail(cafe) {
    let html = ""
    html += "<h1>Detalle producto</h1>"
    html += `<p>id: ${cafe?.id}</p>`
    html += `<p>Nombre: ${cafe.nombre}</p>`
    html += `<p>Precio: ${cafe.precio}</p>`
    html += `<a href='/productos'>Volver</a>`
    return createPage(html, "Detalle producto")
}

export function productoForm() {
    let html = ""
    html += "<h1>Nuevo producto</h1>"
    html += "<form action='/productos/nuevo' method='post' >"
    html += "<input type='text' name='precio'>"
    html += "<input type='text' name='nombre'>"
    html += "<input type='submit' name='guardar'>"
    html += "</form>"
    return createPage(html, "Detalle producto")
}
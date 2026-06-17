import yup from "yup"

export const productosSchema = yup.object({
    nombre: yup.string().required("El campo nombre es requerido"),
    precio: yup.number()
        .min(500, "El minimo es de 500")
        .positive("El precio debe ser un numero positivo")
        .integer("El precio debe ser un entero")
        .typeError("El campo precio es numerico")
        .required("El campo precio es requerido"),
    _id: yup.string().optional()
})
import yup from "yup"

export const pokemonsSchema = yup.object({
    _id: yup.string().optional(),
    name: yup.string().required("El campo name es requerido"),
    url: yup.string().required("El campo url es requerido").url(),
    cafes: yup.array().optional()
})
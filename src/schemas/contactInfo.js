import { object, string, boolean } from 'yup'

export const ContactInfoSchema = object().shape({
    name: string().required("Required Field"),
    whatsappNo: string().required("Required Field").matches(/^\d{10}$/, "Invalid Mobile Number"),
    tnc: boolean().oneOf([true], "Please accept our terms and conditions"),
})
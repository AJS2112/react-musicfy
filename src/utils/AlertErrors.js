import { toast } from "react-toastify";

export default function alertErrors(type) {
    switch (type) {
        case "auth/wrong-password":
            toast.warning("La contraseña es inválida");
            break;

        default:
            toast.warning("Error del servidor");
            break;
    }
}
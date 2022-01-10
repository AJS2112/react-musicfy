import React from "react";
import { Form, Input, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import firebaseApp from "../../utils/firebase";
import { getAuth, updateProfile } from "firebase/auth";

export default function UserName(props) {
    const { user, setShowModal, setTitleModal, setContentModal } = props;

    const onEdit = () => {
        setTitleModal("Actualizar Email");
        setContentModal(<h3>Formulario Actualizar</h3>);
        setShowModal(true);
    }
    return (
        <div className="user-name">
            <h2>{user.displayName}</h2>
            <Button circular onClick={onEdit}>
                Actualizar
            </Button>
        </div>

    )
}
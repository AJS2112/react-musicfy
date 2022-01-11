import React, { useState } from "react";
import { Form, Input, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import firebaseApp from "../../utils/firebase";
import { getAuth, updateProfile } from "firebase/auth";

export default function UserName(props) {
    const { user, setShowModal, setTitleModal, setContentModal, setReloadApp } = props;

    const onEdit = () => {
        setTitleModal("Actualizar Nombre");
        setContentModal(<ChangeDisplayNameForm user={user} setShowModal={setShowModal} setReloadApp={setReloadApp} />);
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

function ChangeDisplayNameForm(props) {
    const { user, setShowModal, setReloadApp } = props;
    const { displayName } = user;
    const [formData, setFormData] = useState({ displayName: displayName });
    const [isLoading, setIsLoading] = useState(false);

    // console.log(user)
    // console.log('disoka: ' + displayName)

    const onSubmit = () => {
        if (!formData.displayName || formData.displayName === displayName) {
            setShowModal(false);
        } else {
            setIsLoading(true);
            updateProfile(user, { displayName: formData.displayName })
                .then(() => {
                    toast.success("Nombre actualizado");
                    setReloadApp(prevState => !prevState);
                    setIsLoading(false);
                    setShowModal(false);
                })
                .catch((err) => {
                    toast.error("Error al actualizar el nombre");
                    setIsLoading(false);
                })
        }
    }


    return (
        <Form onSubmit={onSubmit}>
            <Form.Field>
                <Input
                    defaultValue={displayName}
                    onChange={e => setFormData({ displayName: e.target.value })}
                />
            </Form.Field>
            <Button type="submit" loading={isLoading}>
                Actualizar nombre
            </Button>
        </Form>
    )
}
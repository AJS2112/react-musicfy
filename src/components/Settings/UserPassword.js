import React, { useState } from "react";
import { toast } from "react-toastify";
import { Form, Button, Input, Icon } from "semantic-ui-react";
import { reauthenticate } from '../../utils/Api';
import alertErrors from "../../utils/AlertErrors";
import firebaseApp from "../../utils/firebase";

import { updatePassword, getAuth, sendEmailVerification } from "firebase/auth";

export default function UserPassword(props) {
    const { setShowModal, setTitleModal, setContentModal } = props;


    const onEdit = () => {
        setTitleModal("Actualizar constraseña");
        setContentModal(<ChangePasswordForm setShowModal={setShowModal} />);
        setShowModal(true);
    }
    return (
        <div className="user-password">
            <h3>Constraseña: *** *** *** ***</h3>
            <Button circular onClick={onEdit}>Actualizar</Button>
        </div>
    )
}

function ChangePasswordForm(props) {
    const { setShowModal } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        repeatNewPassword: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = () => {
        if (!formData.currentPassword || !formData.newPassword || !formData.repeatNewPassword) {
            toast.warning("Las contraseñas no pueden estar vacias");
        } else if (formData.currentPassword === formData.newPassword) {
            toast.warning("Debe ser una nueva contraseña");
        } else if (formData.newPassword !== formData.repeatNewPassword) {
            toast.warning("Las contraseñas no coinciden");
        } else if (formData.newPassword.length < 6) {
            toast.warning("Las contraseñadebe tener al menos 6 caracteres")
        } else {
            setIsLoading(true);
            reauthenticate(formData.currentPassword)
                .then(() => {
                    setIsLoading(false);
                    var currentUser = getAuth(firebaseApp).currentUser;
                    updatePassword(currentUser, formData.newPassword)
                        .then(() => {
                            toast.success("Contraseña actualizada");
                            setIsLoading(false);
                            setShowModal(false);
                            getAuth(firebaseApp).signOut();
                        }).catch((error) => {
                            alertErrors(error?.code);
                            isLoading(false);
                        });
                }).catch((error) => {
                    setIsLoading(false);
                    alertErrors(error?.code)
                });
        }

    }
    return (
        <Form onSubmit={onSubmit}>
            <Form.Field>
                <Input
                    placeholder="Constraseña actual"
                    type={showPassword ? "text" : "password"}
                    onChange={e => setFormData({ ...formData, currentPassword: e.target.value })}
                    icon={
                        <Icon
                            name={showPassword ? "eye slash outline" : "eye"}
                            link
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    }
                />
            </Form.Field>
            <Form.Field>
                <Input
                    placeholder="Nueva Constraseña"
                    type={showPassword ? "text" : "password"}
                    onChange={e => setFormData({ ...formData, newPassword: e.target.value })}
                    icon={
                        <Icon
                            name={showPassword ? "eye slash outline" : "eye"}
                            link
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    }
                />
            </Form.Field>
            <Form.Field>
                <Input
                    placeholder="Repetir nueva constraseña"
                    type={showPassword ? "text" : "password"}
                    onChange={e => setFormData({ ...formData, repeatNewPassword: e.target.value })}
                    icon={
                        <Icon
                            name={showPassword ? "eye slash outline" : "eye"}
                            link
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    }
                />
            </Form.Field>
            <Button type="submit" loading={isLoading}>Actualizar contraseña</Button>
        </Form>
    )
}
import React, { useState } from 'react';
import { Form, Input, Button, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import { reauthenticate } from '../../utils/Api';
import alertErrors from "../../utils/AlertErrors";

export default function UserEmail(props) {
    const { user, setShowModal, setTitleModal, setContentModal } = props;

    const onEdit = () => {
        setTitleModal("Actualizar Email");
        setContentModal(<ChangeEmailForm user={user} setShowModal={setShowModal} />);
        setShowModal(true);
    }

    return (
        <div className='user-email'>
            <h3>Email: {user.email}</h3>
            <Button circular onClick={onEdit}>
                Actualizar
            </Button>
        </div>
    )
}

function ChangeEmailForm(props) {
    const { user, setShowModal } = props;
    const { email } = user;

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const onSubmit = () => {
        if (!formData.email) {
            toast.warning("El email es el mismo");
        } else {
            setIsLoading(true);
            reauthenticate(formData.password)
                .then(() => {
                    console.log('reautenticado con exito')
                }).catch((error) => {
                    console.log(error)
                    alertErrors(error?.code);
                    setIsLoading(false);
                });
        }
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Field>
                <Input
                    defaultValue={email}
                    type="text"
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
            </Form.Field>
            <Form.Field>
                <Input
                    placeholder="contraseña"
                    type={showPassword ? "text" : "password"}
                    icon={
                        <Icon
                            name={showPassword ? "eye slash outline" : "eye"}
                            link
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    }
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                />
            </Form.Field>
            <Button type="submit" loading={isLoading}>
                Actualizar email
            </Button>
        </Form>
    )
}
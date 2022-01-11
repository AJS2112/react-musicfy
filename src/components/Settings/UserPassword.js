import React, { useState } from "react";
import { Form, Button, Input, Icon } from "semantic-ui-react";

export default function UserPassword(props) {
    const { setShowModal, setTitleModal, setContentModal } = props;

    const onEdit = () => {
        setTitleModal("Actualizar constraseña");
        setContentModal(<ChangePasswordForm />);
        setShowModal(true);
    }
    return (
        <div className="user-password">
            <h3>Constraseña: *** *** *** ***</h3>
            <Button circular onClick={onEdit}>Actualizar</Button>
        </div>
    )
}

function ChangePasswordForm() {
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = () => {
        console.log("cambiando pass")
    }
    return (
        <Form onSubmit={onSubmit}>
            <Form.Field>
                <Input
                    placeholder="Constraseña actual"
                    type={showPassword ? "text" : "password"}
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
                    icon={
                        <Icon
                            name={showPassword ? "eye slash outline" : "eye"}
                            link
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    }
                />
            </Form.Field>
            <Button type="submit">Actualizar contraseña</Button>
        </Form>
    )
}
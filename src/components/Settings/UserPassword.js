import React from "react";
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
    const onSubmit = () => {
        console.log("cambiando pass")
    }
    return (
        <Form onSubmit={onSubmit}>
            <Form.Field>
                <Input
                    placeholder="Constraseña actual"
                    type="password"
                    icon={<Icon name="eye" link />}
                />
            </Form.Field>
            <Form.Field>
                <Input
                    placeholder="Nueva Constraseña"
                    type="password"
                    icon={<Icon name="eye" link />}
                />
            </Form.Field>
            <Form.Field>
                <Input
                    placeholder="Repetir nueva constraseña"
                    type="password"
                    icon={<Icon name="eye" link />}
                />
            </Form.Field>
            <Button type="submit">Actualizar contraseña</Button>
        </Form>
    )
}
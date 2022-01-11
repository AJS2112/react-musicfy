import React, { useState } from 'react';
import { Form, Input, Button, Icon } from "semantic-ui-react";


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
    const [formData, setFormData] = useState({ email: email });
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = () => {
        console.log('cambiando email')
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Field>
                <Input
                    defaultValue={email}
                    onChange={e => setFormData({ email: e.target.value })}
                />
            </Form.Field>
            <Form.Field>
                <Input
                    placeholder="contraseña"
                    type="password"
                    icon={<Icon name="eye" link />}
                //onChange={e => setFormData({ email: e.target.value })}
                />
            </Form.Field>
            <Button type="submit" loading={isLoading}>
                Actualizar email
            </Button>
        </Form>
    )
}
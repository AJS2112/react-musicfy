import React from "react";
import { Form, Input, Button, Icon, Dropdown } from "semantic-ui-react";

import "./AddSongForm.scss";

const albums = [
    { key: '1', value: '1', text: 'Opcion 1' },
    { key: '2', value: '2', text: 'Opcion 2' },
    { key: '3', value: '3', text: 'Opcion 3' }
]

export default function AddSongForm(props) {
    const { setShowModal } = props;

    const onSubmit = () => {
        console.log("Enviando formulario");

    }
    return (
        <Form className="add-song-form" onSubmit={onSubmit}>
            <Form.Field>
                <Input placeholder="Nombre de la canción"></Input>
            </Form.Field>
            <Form.Field>
                <Dropdown
                    placeholder="Asigna la canción a un album"
                    search
                    selection
                    lazyLoad
                    options={albums}
                />
            </Form.Field>
            <Form.Field>
                <h3>Upload song</h3>
            </Form.Field>
            <Button type="submit">
                Subir canción
            </Button>
        </Form>
    )
}
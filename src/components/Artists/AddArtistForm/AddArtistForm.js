import React from "react";
import { Form, Input, Button, Image } from "semantic-ui-react";

import "./AddArtistForm.scss";

export default function AddArtistForm() {
    const onSubmit = () => {
        console.log("Creando artista");
    }

    return (
        <Form className="add-artist-form" onSubmit={onSubmit}>
            <Form.Field className="artist-banner">
                <Input type="file" />
            </Form.Field>
            <Form.Field className="artist-avatar">
                <div>
                    Avatar
                </div>
            </Form.Field>
            <Form.Field>
                <Input
                    placeholder="Nombre del Artista"
                />
            </Form.Field>
            <Button type="submit">Crear Artista</Button>
        </Form>
    )
}
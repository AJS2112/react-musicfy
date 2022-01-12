import React, { useState, useCallback } from "react";
import { Form, Input, Button, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { toast } from 'react-toastify';
import NoImage from "../../../assets/png/no-image.png";

import "./AddArtistForm.scss";

export default function AddArtistForm(props) {
    const { setShowModal } = props;
    const [formData, setFormData] = useState(initialValueForm());

    const [banner, setBanner] = useState(null);
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onDrop = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        setFile(file);
        setBanner(URL.createObjectURL(file));
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    });

    const onSubmit = () => {
        if (!formData) {
            toast.warning("Añade el nombre del artista");
        } else if (!file) {
            toast.warning("Añade la imagen del artista");
        } else {
            setIsLoading(true);

        }
        setShowModal(false);
    }

    return (
        <Form className="add-artist-form" onSubmit={onSubmit}>
            <Form.Field className="artist-banner">
                <div
                    {...getRootProps()}
                    className="banner"
                    style={{ backgroundImage: `url('${banner}')` }}
                />
                <input {...getInputProps()} />
                {!banner && <Image src={NoImage} />}
            </Form.Field>
            <Form.Field className="artist-avatar">
                <div
                    className="avatar"
                    style={{ backgroundImage: `url('${banner ? banner : NoImage}')` }}
                />
            </Form.Field>
            <Form.Field>
                <Input
                    placeholder="Nombre del Artista"
                    onChange={e => setFormData({ name: e.target.value })}
                />
            </Form.Field>
            <Button type="submit" loading={isLoading}>Crear Artista</Button>
        </Form>
    )
}

function initialValueForm() {
    return {
        name: ""
    }
}
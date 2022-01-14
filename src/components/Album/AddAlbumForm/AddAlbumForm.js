import React, { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, Image, Dropdown } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { map } from "lodash";
import firebaseApp from "../../../utils/firebase";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import NoImage from "../../../assets/png/no-image.png";

import './AddAlbumForm.scss';

const db = getFirestore(firebaseApp);

export default function AddAlbumForm(props) {
    const { setShowModal } = props;
    const [albumImage, setAlbumImage] = useState(null);
    const [file, setFile] = useState(null);
    const [artists, setArtists] = useState([]);
    const [formData, setFormData] = useState(initialValueForm)
    const [isLoadding, setIsLoadding] = useState(false);

    useEffect(() => {
        getDocs(collection(db, "artists"))
            .then(response => {
                const arrayArtists = [];
                map(response?.docs, artist => {
                    const data = artist.data();
                    data.id = artist.id;
                    arrayArtists.push({
                        key: artist.id,
                        value: artist.id,
                        text: data.name
                    });
                });
                setArtists(arrayArtists);
            });
    }, [])

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        setFile(file);
        setAlbumImage(URL.createObjectURL(file));
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    });

    const onSubmit = () => {
        if (!formData.name || !formData.artist) {
            toast.warning("Datos inválidos")
        } else if (!file) {
            toast.warning("Selecciona una imagen")
        } else {
            setIsLoadding(true);
            console.log("Creando album")
        }
    }

    return (
        <Form className="add-album-form" onSubmit={onSubmit}>
            <Form.Group>
                <Form.Field className="album-avatar" width={5}>
                    <div
                        {...getRootProps()}
                        className="avatar"
                        style={{
                            backgroundImage: `url('${albumImage}')`
                        }}
                    />
                    <input {...getInputProps()} />
                    {!albumImage && <Image src={NoImage} />}
                </Form.Field>
                <Form.Field className="album-inputs" width={11}>
                    <Input
                        placeholder="Nombre del album"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />

                    <Dropdown
                        placeholder="El album pertenece..."
                        search
                        fluid
                        selection
                        lazyLoad
                        options={artists}
                        onChange={(e, data) => setFormData({ ...formData, artist: data.value })}
                    />
                </Form.Field>
            </Form.Group>
            <Button type="submit" loading={isLoadding}>
                Crear album
            </Button>
        </Form>

    )
}

function initialValueForm() {
    return {
        name: "",
        artist: ""
    }
}
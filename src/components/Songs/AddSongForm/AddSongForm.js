import React, { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, Icon, Dropdown } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { map } from "lodash";
import firebaseApp from "../../../utils/firebase";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";


import "./AddSongForm.scss";

// const albums = [
//     { key: '1', value: '1', text: 'Opcion 1' },
//     { key: '2', value: '2', text: 'Opcion 2' },
//     { key: '3', value: '3', text: 'Opcion 3' }
// ]

const db = getFirestore(firebaseApp);

export default function AddSongForm(props) {
    const { setShowModal } = props;

    const [file, setFile] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [songFile, setSongFile] = useState(null);
    const [formData, setFormData] = useState(initialValueForm)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getDocs(collection(db, "albums"))
            .then(response => {
                const arrayArtists = [];
                map(response?.docs, album => {
                    const data = album.data();
                    data.id = album.id;
                    arrayArtists.push({
                        key: album.id,
                        value: album.id,
                        text: data.name
                    });
                });
                setAlbums(arrayArtists);
            });
    }, [])

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        setFile(file);
        setSongFile(URL.createObjectURL(file));
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: ".mp3",
        noKeyboard: true,
        onDrop
    });

    const uploadSong = (fileName) => {
        var storage = getStorage(firebaseApp);
        var storageRefence = ref(storage, `song/${fileName}`);

        const UploadTask = uploadBytesResumable(storageRefence, file);
        return UploadTask;
    }
    const onSubmit = () => {
        if (!formData.name || !formData.album) {
            toast.warning("Faltan datos")
        } else if (!file) {
            toast.warning("Debe seleccionar un archivo")
        } else {
            console.log("sube")
            setIsLoading(true);
            const fileName = uuidv4();
            uploadSong(fileName).then(async () => {
                await addDoc(collection(db, "songs"), {
                    name: formData.name,
                    album: formData.album,
                    fileName: fileName
                }).then(() => {
                    toast.success("Canción creada correctamente");
                    resetForm();
                    setIsLoading(false);
                    setShowModal(false);
                }).catch(() => {
                    toast.error("Error al crear el album");
                    setIsLoading(false);
                });
            }).catch((error) => {
                toast.error("Error al subir la imagen")
                setIsLoading(false);
            })
        }

    }

    const resetForm = () => {
        setFormData(initialValueForm);
        setFile(null);
        setSongFile(null);
    }


    return (
        <Form className="add-song-form" onSubmit={onSubmit}>
            <Form.Field>
                <Input
                    placeholder="Nombre de la canción"
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
            </Form.Field>
            <Form.Field>
                <Dropdown
                    placeholder="Asigna la canción a un album"
                    search
                    selection
                    lazyLoad
                    options={albums}
                    onChange={(e, data) => setFormData({ ...formData, album: data.value })}
                />
            </Form.Field>
            <Form.Field>
                <div className="song-upload" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Icon name="cloud upload" className={file && "load"} />
                    <div>
                        <p>Arrastra tu canción o haz click <span>aqui</span></p>
                        {file && (
                            <p>Canción subida: <span>{file.name}</span></p>
                        )}
                    </div>
                </div>
            </Form.Field>
            <Button type="submit" loading={isLoading}>
                Subir canción
            </Button>
        </Form >
    )
}

function initialValueForm() {
    return {
        name: "",
        album: ""
    }
}
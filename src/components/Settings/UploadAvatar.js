import React, { useState, useCallback } from "react";
import { Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import firebaseApp from "../../utils/firebase";
import { getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

import NoAvatar from "../../assets/png/user.png";

export default function UploadAvatar(props) {
    const { user } = props;
    const [avatarUrl, setAvatarUrl] = useState(user.photoURL);

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        setAvatarUrl(URL.createObjectURL(file));
        uploadImage(file);
    });
    //console.log(user);

    const uploadImage = file => {
        var metaData = {
            contentType: file.type
        }
        var storage = getStorage(firebaseApp);
        var storageRefence = ref(storage, `avatar/${user.uid}`);

        const UploadTask = uploadBytesResumable(storageRefence, file, metaData);

        UploadTask.on('state_changed', (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, (error) => {
            alert("error: image not uploaded")
        }, () => {
            getDownloadURL(UploadTask.snapshot.ref).then((dowloadedURL) => {
                console.log(dowloadedURL);
                const auth = getAuth();
                updateProfile(user, { photoURL: dowloadedURL });
            }).catch(() => {
                toast.error("Error al actualizar el avatar");
            })
        })
    }



    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    })

    return (
        <div className="user-avatar" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <Image src={NoAvatar} />
            ) : (
                <Image src={avatarUrl ? avatarUrl : NoAvatar} />
            )}
        </div>
    )
} 
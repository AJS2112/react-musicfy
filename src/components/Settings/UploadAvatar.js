import React, { useState, useCallback } from "react";
import { Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import firebaseApp from "../../utils/firebase";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import NoAvatar from "../../assets/png/user.png";

export default function UploadAvatar(props) {
    const { user } = props;
    const [avatarUrl, setAvatarUrl] = useState(user.photoURL);

    const onDrop = useCallback(acceptedFiles => {

    });

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
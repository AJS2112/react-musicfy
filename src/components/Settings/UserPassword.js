import React from "react";
import { Form, Button } from "semantic-ui-react";

export default function UserPassword() {
    const onEdit = () => {
        console.log("modificando password")
    }
    return (
        <div className="user-password">
            <h3>Constraseña: *** *** *** ***</h3>
            <Button circular onClick={onEdit}>Actualizar</Button>
        </div>
    )
}
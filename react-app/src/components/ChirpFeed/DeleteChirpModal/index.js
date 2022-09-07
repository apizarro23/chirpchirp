import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteChirp from "./DeleteChirp";

function DeleteChirpModal({ chirp }) {
    const [showModal, setShowModal] = useState(false)

    return (

        <div>
            <div
                className="delete-chirp-button"
                onClick={() => setShowModal(true)}
                >
                Delete
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteChirp chirp={chirp} onClick={() => setShowModal(false)} />
                </Modal>
            )}
        </div>
    )
}


export default DeleteChirpModal
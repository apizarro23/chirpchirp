import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditChirpForm from "./EditChirpForm";

const EditChirpModal = ({ chirp }) => {
    const [showModal, setShowModal] = useState(false)
    
    return (
        <div>
            <div className="edit-chirp-button" onClick={() => setShowModal(true)}>
                Edit
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditChirpForm chirp={chirp} onClick={() => setShowModal(false)} />
                </Modal>
            )}
        </div>

    )
}

export default EditChirpModal
import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditCommentForm from "./EditCommentForm";

const EditCommentModal = ({ comment }) => {
    const [showModal, setShowModal] = useState(false)
    
    return (
        <div>
            <div className="edit-chirp-button" onClick={() => setShowModal(true)}>
                Edit
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditCommentForm comment={comment} onClick={() => setShowModal(false)} />
                </Modal>
            )}
        </div>

    )
}

export default EditCommentModal
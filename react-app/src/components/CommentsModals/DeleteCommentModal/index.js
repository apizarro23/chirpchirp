import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteComment from "./DeleteComment";

function DeleteCommentModal({ comment }) {
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
                    <DeleteComment comment={comment} onClick={() => setShowModal(false)} />
                </Modal>
            )}
        </div>
    )
}


export default DeleteCommentModal
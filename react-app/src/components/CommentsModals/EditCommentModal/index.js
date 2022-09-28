import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditCommentForm from "./EditCommentForm";
import edit from "../../images/icons8-edit-24.png"
import "./EditIndex.css"

const EditCommentModal = ({ comment }) => {
    const [showModal, setShowModal] = useState(false)
    
    return (
        <div>
            <button className="edit-chirp-button" onClick={() => setShowModal(true)}>
                <img alt="edit icon" className="edit-icon" src={edit}/>
            </button>
            {/* <div className="edit-chirp-button" onClick={() => setShowModal(true)}>
                <img alt="edit icon" className="edit-icon" src={edit}/>
            </div> */}
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditCommentForm comment={comment} onClick={() => setShowModal(false)} />
                </Modal>
            )}
        </div>

    )
}

export default EditCommentModal
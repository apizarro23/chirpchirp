import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteComment from "./DeleteComment";
import delIcon from "../../images/icons8-trash-24.png"
import "./DeleteIndex.css"

function DeleteCommentModal({ comment }) {
    const [showModal, setShowModal] = useState(false)

    return (

        <div>
            <button className="delete-chirp-button" onClick={() => setShowModal(true)}>
                <img alt="delete icon" className="delete-icon" src={delIcon}/>
            </button>
            {/* <div className="delete-chirp-button" onClick={() => setShowModal(true)}>
                <img alt="delete icon" className="delete-icon" src={delIcon}/>
            </div> */}
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteComment comment={comment} onClick={() => setShowModal(false)} />
                </Modal>
            )}
        </div>
    )
}


export default DeleteCommentModal
import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ChirpOptions from "./ChirpOptions";

function ChirpOptionsModal({ chirp }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <div className="chirp-options-button" onClick={() => setShowModal(true)}>
                <i>className='fa-solid fa-ellipsis fa-xl'</i>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ChirpOptions chirp={chirp} onClick={() => setShowModal(false)}/>
                </Modal>
            )}
        </div>
    )
}

export default ChirpOptionsModal
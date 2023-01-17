import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
// import { EditUserForm } from "./form/EditUserForm";

const EditUserModal = ({ user }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <div className="user-modal-button" onClick={() => setShowModal(true)}>
                Edit User
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    {/* < EditUserForm user={user} onClick={() => setShowModal(false)}/> */}
                </Modal>
            )}
        </div>
    )
}

export default EditUserModal
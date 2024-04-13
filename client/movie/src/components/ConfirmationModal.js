import React from 'react'

import { Modal } from 'antd';

function ConfirmationModal({handleOk, open, setOpen}) {


    const onCancel = () => {
        setOpen(false)
    }
    return (
        <div>
            <Modal
                title="Confirmation Message"
                open={open}
                onOk={handleOk}
                onCancel={onCancel}
                okText="Yes"
                cancelText="No"
            >
                <p>Are you sure you want to delete?</p>
            </Modal>
        </div>
    )
}

export default ConfirmationModal
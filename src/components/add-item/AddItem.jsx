import React, {useRef, useState} from 'react'
import {PlusCircleOutlined} from "@ant-design/icons";
import {Button, Input, Modal} from "antd";
import './AddItem.css';

export const AddItem = ({onOk}) => {
    const [showModal, setShowModal] = useState(false);
    const ref = useRef('')

    const toggleModal = () => {
        setShowModal(prev => !prev)
    }

    const handleOk = () => {
        onOk(ref.current)
        toggleModal()
    }

    const handleInput = (e) => {
        ref.current = e.target.value
    }

    return <>
        <Modal visible={showModal} onOk={handleOk} onCancel={toggleModal}>
            <Input onChange={handleInput} className={'addInput'} placeholder={'Введите текст'}/>
        </Modal>
        <Button onClick={toggleModal} className={'addButton'} icon={<PlusCircleOutlined className={'addIcon'}/>} />

    </>
};

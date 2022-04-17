import './ListItem.css';

import {Button, Input, List, Typography} from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    SaveOutlined
} from '@ant-design/icons';
import {useEffect, useRef, useState} from "react";

export const ListItem = ({active, text, onDelete, onSave}) => {
    const [isEdit, setIsEdit] = useState(false);
    const ref = useRef(text)

    const handleInput = ({target: {value}}) => {
        ref.current = value
    };

    const handleEditButton = () => {
        if(isEdit) {
            onSave(text, ref.current)
        }
        setIsEdit(!isEdit)
    }

    useEffect(() => {
        ref.current = text
    }, [text])

    return <List.Item>
        <div className={'wrapper'}>
            {isEdit ?
                <Input
                    className={'input'}
                    size={'small'}
                    defaultValue={ref.current}
                    onChange={handleInput}/>
                : <Typography editable className={`${active ? 'active' : ''} text`}>{text}</Typography>}
            <div className={'buttonContainer'}>
                <Button
                    onClick={handleEditButton}
                    className={'button'}
                    icon={isEdit ? <SaveOutlined className={'saveIcon'}/> : <EditOutlined className={'editIcon'}/>}/>
                <Button
                    className={"button"}
                    icon={<DeleteOutlined className={'deleteIcon'}/>}
                    onClick={() => onDelete(text)}
                />
            </div>
        </div>
    </List.Item>
}

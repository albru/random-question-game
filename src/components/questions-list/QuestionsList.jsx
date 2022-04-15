import './QestionsList.css';

import {List} from "antd";
import {ListItem} from "../list-item/ListItem";

export const QuestionsList = ({questions, current, setState}) => {
    const handleDelete = (question) => {
        setState(prev => {
            const copy = [...prev.questions]
            return {...prev, questions: copy.filter(p => p !== question)}
        })
    }

    const handleSave = (prevP, nextP) => {
        setState(prev => {
            const copy = [...prev.questions]
            const index = copy.findIndex(p => p === prevP)
            copy.splice(index, 1, nextP)
            return {...prev, questions: copy}
        })
    }
    return <List
        header={<div>Вопросы:</div>}
        className={'questionsList'}
        bordered
        dataSource={questions}
        renderItem={(item) => (
            <ListItem
                text={item}
                active={item === current}
                onSave={handleSave}
                onDelete={handleDelete}/>
        )}
    />
}

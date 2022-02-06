import './QestionsList.css';

import {List} from "antd";

export const QuestionsList = ({questions, current}) => {
    return <List
        header={<div>Вопросы:</div>}
        bordered
        dataSource={questions}
        renderItem={(item) => (
            <List.Item className={item === current && 'currentQuestion'}>
                {item}
            </List.Item>
        )}
    />
}

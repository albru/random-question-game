import {List, Row} from "antd";

import './Participants.css'

export const Participants = ({participants, current}) => {
    const splitParticipants = (arr) => {
        let id = 0
        const participantsArr = []

        arr.forEach((item, i) => {
            if (i && Number.isInteger((i / 15))) {
                id++
            }

            if (participantsArr[id]) {
                participantsArr[id].push(item)
            } else {
                participantsArr[id] = [item]
            }
        })
        return participantsArr
    }

    return (
        <Row>
            {
                splitParticipants(participants).map((el, i) => {
                    return <List
                        header={<div>Участники:</div>}
                        bordered
                        dataSource={el}
                        key={i}
                        renderItem={(item, i) => (
                            <List.Item className={item === current && 'currentParticipant'}>
                                {item}
                            </List.Item>
                        )}
                    />
                })
            }
        </Row>
    )
}

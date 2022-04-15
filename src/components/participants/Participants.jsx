import {Button, List, Row} from "antd";

import './Participants.css'
import {ListItem} from "../list-item/ListItem";

export const Participants = ({participants, current, setState}) => {
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

    const handleDelete = (participant) => {
        setState(prev => {
            const copy = [...prev.participants]
            console.log(participant)
            return {...prev, participants: copy.filter(p => p !== participant)}
        })
    }

    const handleSave = (prevP, nextP) => {
        setState(prev => {
            const copy = [...prev.participants]
            const index = copy.findIndex(p => p === prevP)
            copy.splice(index, 1, nextP)
            return {...prev, participants: copy}
        })
    }

    const splicedParticipants = splitParticipants(participants);

    return (
        <Row>
            {
                splicedParticipants.map((el, i) => {
                    return <>
                        <List
                            className={'list'}
                            header={<div>Участники:</div>}
                            bordered
                            dataSource={el}
                            key={i}
                            renderItem={(item, i) => (
                                <ListItem
                                    text={item}
                                    active={item === current}
                                    onSave={handleSave}
                                    onDelete={handleDelete}/>
                            )}
                        />
                    </>
                })
            }
        </Row>
    )
}

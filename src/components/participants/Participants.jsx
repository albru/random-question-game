import {List, Row} from "antd";

import './Participants.css'
import {ListItem} from "../list-item/ListItem";
import {AddItem} from "../add-item/AddItem";
import {nanoid} from "nanoid";

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

    const handleAdd = (value) => {
        setState(prev => {
            const copy = [...prev.participants]
            copy.push(value)

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
                            header={<div className={'participantsHeader'}>Участники:  <AddItem onOk={handleAdd}/></div>}
                            bordered
                            dataSource={el}
                            key={nanoid()}
                            renderItem={(item) => (
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

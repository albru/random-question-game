import {useState} from 'react'
import {Typography, Col, Row, Card, Modal} from 'antd';

import {QuestionsList} from "./components/questions-list/QuestionsList";
import {Participants} from "./components/participants/Participants";

import {Button} from "antd";

import './App.css';
import {PEOPLE, QUESTIONS} from "./consts";

const PARTICIPANTS = 'participants';

const getRounds = () => Math.floor(Math.random() * (30 - 25 + 1)) + 25;
const DELAY_BORDER = 15
const DELAY_STEP = 50
const DELAY_BASIC = 100

let maxRounds = getRounds()
let delay = 100
let isRunning = 0

function App() {
    const [state, setState] = useState({
        currentQuestion: null,
        currentParticipant: null,
        active: false,
        showModal: false,
        participants: PEOPLE,
        questions: QUESTIONS
    });

    const setTimers = async (arr) => {
        return await new Promise(res => {
            setTimeout(() => {
                res()
            }, delay)
        }).then(() => {
            const id = Math.floor(Math.random() * (arr.length))
            return arr[id]
        })
    }

    const randomizer = async () => {
        try {
            const [currentParticipant, currentQuestion] = await Promise.all([setTimers(state.participants), setTimers(state.questions)])
            setState(prev => ({...prev, currentQuestion, currentParticipant, active: true}))
            isRunning++

            if (isRunning < maxRounds) {
                if (isRunning > DELAY_BORDER) {
                    delay = delay + DELAY_STEP
                }

                await randomizer()
            } else {
                setState(prev => ({...prev, currentQuestion, currentParticipant}))

                // saveToLocalStorage(currentParticipant)

                setTimeout(() => {
                    setState(prev => ({...prev, currentQuestion, currentParticipant, active: false, showModal: true}))
                }, 800)

                delay = DELAY_BASIC
                maxRounds = getRounds()
            }
        } catch (err) {
            console.log(err)
        }
    }

    const removeParticipants = () => {
        localStorage.removeItem(PARTICIPANTS)
    }

    const saveToLocalStorage = (person) => {
        const participants = localStorage.getItem(PARTICIPANTS)

        if (participants) {
            const updatedParticipants = JSON.parse(participants)

            updatedParticipants.push(person)

            localStorage.setItem(PARTICIPANTS, JSON.stringify(updatedParticipants))
        } else {
            localStorage.setItem(PARTICIPANTS, JSON.stringify([person]))
        }
    }

    const runGame = async () => {
        isRunning = 0
        await randomizer()
    }

    const closeModal = () => {
        setState(prev => ({...prev, showModal: !prev.showModal}))
    }

    return (
        <div className="App">
            <img alt="logo" src={"https://upload.wikimedia.org/wikipedia/commons/d/d4/Leroy_Merlin.svg"}/>
            <div className={"App-title"}>
                <Typography.Title level={2}>R A N D O M I Z E R _ 2.0</Typography.Title>
            </div>

            <Row>
                <Col span={7}>
                    <QuestionsList questions={state.questions} current={state.currentQuestion} setState={setState}/>
                </Col>
                <Col span={15} offset={1}>
                    <Participants participants={state.participants} current={state.currentParticipant} setState={setState}/>
                </Col>

                {/*<Col span={3}>*/}
                {/*    <div className={"App-giphy"}>*/}
                {/*        {state.active ?*/}
                {/*            <img alt={"test"} src={'https://c.tenor.com/GbewYC1zD8UAAAAd/cats-keyboard.gif'}/> :*/}
                {/*            <>*/}
                {/*                <Card><Typography.Title level={2}>Нажмите "Старт", чтобы котики начали*/}
                {/*                    работу</Typography.Title></Card>*/}
                {/*                <Modal title="Результат игры" visible={state.showModal}*/}
                {/*                       className={"App-modal"}*/}
                {/*                       onCancel={closeModal}*/}
                {/*                       footer={[<Button onClick={closeModal} key="back">*/}
                {/*                           Закрыть*/}
                {/*                       </Button>]}>*/}
                {/*                    <div className={"App-success"}>*/}
                {/*                        <img src={"https://c.tenor.com/7f-45XKAZGgAAAAC/jimmy.gif"}/>*/}
                {/*                    </div>*/}
                {/*                    <Typography.Title*/}
                {/*                        level={3}>{state.currentParticipant}</Typography.Title>*/}
                {/*                    <Typography.Title*/}
                {/*                        level={3}>{state.currentQuestion}</Typography.Title>*/}
                {/*                </Modal>*/}
                {/*            </>*/}
                {/*        }*/}

                {/*    </div>*/}
                {/*</Col>*/}
            </Row>

            <div className={'App-button-wrapper'}>
                <Button loading={state.active} size={"large"} onClick={runGame}>СТАРТ</Button>
            </div>
        </div>
    );
}

export default App;

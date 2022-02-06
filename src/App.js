import {useState} from 'react'
import {Typography, Col, Row, Card} from 'antd';

import {QuestionsList} from "./components/questions-list/QuestionsList";
import {Participants} from "./components/participants/Participants";

import {Button} from "antd";

import './App.css';

const QUESTIONS = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

const PEOPLE = [
    'Вася 1',
    'Вася 2',
    'Вася 3',
    'Вася 4',
    'Вася 5',
    'Вася 6',
    'Вася 7',
    'Вася 8',
    'Вася 9',
    'Вася 10',
    'Вася 11',
    'Вася 12',
    'Вася 13',
    'Вася 14',
    'Вася 15',
    'Вася 16',
    'Вася 17',
    'Вася 18',
    'Вася 19',
    'Вася 20',
    'Вася 21',
    'Вася 22'
];

const getRounds = () => Math.floor(Math.random() * (30 - 25 + 1)) + 25;
const DELAY_BORDER = 15
const DELAY_STEP = 50
const DELAY_BASIC = 100

let maxRounds = getRounds()
let delay = 100
let isRunning = 0

function App() {
    console.log(maxRounds)
    const [state, setState] = useState({
        currentQuestion: null,
        currentParticipant: null,
        active: false
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
            const [currentParticipant, currentQuestion] = await Promise.all([setTimers(PEOPLE), setTimers(QUESTIONS)])
            setState({currentQuestion, currentParticipant, active: true})
            isRunning++

            if (isRunning < maxRounds) {
                if (isRunning > DELAY_BORDER) {
                    delay = delay + DELAY_STEP
                }

                await randomizer()
            } else {
                setState({currentQuestion, currentParticipant, active: false})
                delay = DELAY_BASIC
                maxRounds = getRounds()
            }
        } catch (err) {
            console.log(err)
        }
    }

    const runGame = async () => {
        isRunning = 0
        await randomizer()
    }

    return (
        <div className="App">
            <Typography.Title>Игра "Случайный вопрос случайному коллеге"</Typography.Title>

            <Row>
                <Col span={4} offset={2}>
                    <QuestionsList questions={QUESTIONS} current={state.currentQuestion}/>
                </Col>
                <Col span={10} offset={1}>
                    <Participants participants={PEOPLE} current={state.currentParticipant}/>
                </Col>

                <Col span={7}>
                    <div className={"App-giphy"}>
                        {state.active ?
                            <img alt={"test"} src={'https://c.tenor.com/GbewYC1zD8UAAAAd/cats-keyboard.gif'}/> :
                            <Card title="Результат игры" >
                                <Typography.Title
                                    level={3}>{`Кто у микрофона: ${state.currentParticipant || 'Пока никого'}`}</Typography.Title>
                                <Typography.Title
                                    level={3}>{`Вопрос: ${state.currentQuestion || 'Пока нет вопроса'}`}</Typography.Title>
                            </Card>
                        }
                    </div>
                </Col>
            </Row>

            <div className={'App-button-wrapper'}>
                <Button disabled={state.active} size={"large"} type={"primary"} onClick={runGame}>СТАРТ</Button>
            </div>
        </div>
    );
}

export default App;

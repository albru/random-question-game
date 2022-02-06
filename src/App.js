import {useState} from 'react'
import {Typography, Col, Row} from 'antd';

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

const MAX_ROUNDS = 27
const DELAY_BORDER = 15
const DELAY_STEP = 60
const DELAY_BASIC = 100

let delay = 100
let isRunning = 0

function App() {
    const [state, setState] = useState({
        currentQuestion: null,
        currentParticipant: null,
        active: false
    });

    const shuffle = (arr) => {
        return arr
            .map(value => ({value, sort: Math.random()}))
            .sort((a, b) => a.sort - b.sort)
            .map(({value}) => value)
    }

    const setTimers = async (arr) => {
        let promise;

        arr.forEach(() => {
            promise = new Promise(res => {
                setTimeout(() => {
                    res()
                }, delay)
            })
        })

        return await promise.then(() => arr[0])
    }

    const shakeData = async () => {
        const shuffledQuestions = shuffle(QUESTIONS)
        const shuffledParticipants = shuffle(PEOPLE)
        return await Promise.all([setTimers(shuffledQuestions), setTimers(shuffledParticipants)])
    }

    const randomizer = async () => {
       try {
           const [currentQuestion, currentParticipant] = await shakeData()

           setState({currentQuestion, currentParticipant, active: true})
           isRunning++

           return new Promise(() => {
               if (isRunning < MAX_ROUNDS) {
                   if(isRunning > DELAY_BORDER) {
                       delay = delay + DELAY_STEP
                   }
                   randomizer()
               } else {
                   setState({currentQuestion, currentParticipant, active: false})
                   delay = DELAY_BASIC
               }
           })
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
                <Col span={4} offset={1}>
                    <QuestionsList questions={QUESTIONS} current={state.currentQuestion}/>
                </Col>
                <Col span={10} offset={1}>
                    <Participants participants={PEOPLE} current={state.currentParticipant}/>
                </Col>

                <Col span={6} offset={1} flex={1}>
                    <div className={"App-giphy"}>
                        {state.active ?
                            <img alt={"test"} src={'https://c.tenor.com/GbewYC1zD8UAAAAd/cats-keyboard.gif'}/> :
                            state.currentParticipant &&
                            <>
                                <Typography.Title
                                    level={3}>{`Кто у микрофона: ${state.currentParticipant}`}</Typography.Title>
                                <Typography.Title
                                    level={3}>{`Вопрос: ${state.currentQuestion}`}</Typography.Title>
                            </>
                        }
                    </div>
                </Col>
            </Row>

            <div className={'App-button-wrapper'}>
                <Button disabled={state.active} size={"large"} type={"primary"} onClick={runGame}>Найти жертву</Button>
            </div>
        </div>
    );
}

export default App;

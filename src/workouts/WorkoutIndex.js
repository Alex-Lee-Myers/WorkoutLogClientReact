import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'reactstrap';
import WorkoutCreate from './WorkoutCreate';
import WorkoutTable from './WorkoutTable';
import WorkoutEdit from './WorkoutEdit';

const WorkoutIndex = (props) => {
    const [workouts, setWorkouts] = useState([]);
    const [updateActive, setUpdateActive] = useState(false);
    const [workoutToUpdate, setWorkoutToUpdate] = useState({});

    const editUpdateWorkout = (workout) => {
        setWorkoutToUpdate(workout);
        console.log(workout);
    }

    const updateOn = () => {
        setUpdateActive(true);
    }

    const updateOff = () => {
        setUpdateActive(false);
    }

    const fetchWorkouts = () => {
        let propsTokenVariable = props.token
        console.log(propsTokenVariable)
        fetch('http://localhost:3000/log',{
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${propsTokenVariable}`
            })
        }).then((res) => res.json() )
            .then((logData) => {
                setWorkouts(logData)
                console.log(logData)
            })
    }

    useEffect(() => {
        fetchWorkouts();
    }, [])

    return (
        <Container>
            <Row>
                <Col md="3">
                    <WorkoutCreate fetchWorkouts={fetchWorkouts} token={props.token}/>
                </Col>
                <Col md="9">
                    <WorkoutTable workouts={workouts} editUpdateWorkout={editUpdateWorkout} 
                    updateOn={updateOn} fetchWorkouts={fetchWorkouts} token={props.token}/>
                </Col>
                    {updateActive ? <WorkoutEdit workoutToUpdate={workoutToUpdate} 
                    updateOff={updateOff} token={props.token} fetchWorkouts={fetchWorkouts}/> : <></>}
            </Row>
        </Container>
    );
}

export default WorkoutIndex;
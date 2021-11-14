import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const WorkoutCreate = (props) => {
    const [description, setDescription] = useState('');
    const [definition, setDefinition] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("WORKOUTCREATE props.token:", props.token)
        let propsTokenVariable = props.token
        fetch('http://localhost:3000/log/', {
            method: 'POST',
            body: JSON.stringify({ log: { description: description, definition: definition, result: result } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${propsTokenVariable}`
            })
        }).then((res) => res.json())
            .then((logData) => {
                console.log(logData);
                setDescription('');
                setDefinition('');
                setResult('');
                props.fetchWorkouts();
            })
    }

    return (
        <>
            <h3>Log a Workout</h3>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="{description}" />
                    <Input name="description" id="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="{definition}" />
                    <Input name="definition" id="definition" placeholder="Definition" value={definition} onChange={(e) => setDefinition(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="{result}" />
                    <Input name="result" id="result" placeholder="Result" value={result} onChange={(e) => setResult(e.target.value)} />
                </FormGroup>
                <Button type="submit">Click to Submit!</Button>
            </Form>
        </>
    )
};

export default WorkoutCreate;
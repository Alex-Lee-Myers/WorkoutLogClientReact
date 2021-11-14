import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const WorkoutEdit = (props) => {
    const [editDesc, setEditDesc] = useState(props.workoutToUpdate.description);
    const [editDef, setEditDef] = useState(props.workoutToUpdate.definition);
    const [editRes, setEditRes] = useState(props.workoutToUpdate.result);

    const workoutUpdate = (event, workout) => {
        event.preventDefault();
        let propsTokenVariable = props.token
        fetch(`http://localhost:3000/log/${props.workoutToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({ log: { description: editDesc, definition: editDef, result: editRes } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${propsTokenVariable}`
            })
        }).then((res) => {
            props.fetchWorkouts();
            props.updateOff();
        })
    }

    return (
        <Modal isOpen={true}>
            <ModalHeader>Log a Workout</ModalHeader>
            <ModalBody>
                <Form onSubmit={workoutUpdate}>
                    <FormGroup>
                        <Label htmlFor="result">Edit Result</Label>
                        <Input type="text" name="result" id="result" value={editRes} onChange={(event) => setEditRes(event.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="description">Edit Description</Label>
                        <Input type="text" name="description" id="description" value={editDesc} onChange={(event) => setEditDesc(event.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="definition">Edit Definition</Label>
                        <Input type="text" name="definition" id="definition" value={editDef} onChange={(event) => setEditDef(event.target.value)}>
                            <option></option>
                            <option value="Time">Time</option>
                            <option value="Weight">Weight</option>
                            <option value="Distance">Distance</option>
                        </Input>
                    </FormGroup>

                    <Button type="submit" color="primary">Update the workout!</Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default WorkoutEdit;
// ! findReplace all "Gizmo" with "YourNewEntityName" or whatever your new thing is 
// ! THEN do similar find replace for "gizmo" Make sure lower case
import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {Container, Row, Card, Form} from 'react-bootstrap'; 

const GizmoUpdateCmp = (props) => {
    const { id } = useParams(); //this process is identical to the one we used with our Details.js component
    const [stringFieldOne, stringFieldOneSetter ] = useState("");
    const [numberField, numberFieldSetter] = useState("");
    const [isBoolean, isBooleanSetter] = useState(false); 
    const [enumString, enumStringSetter] = useState("");
    const [listField, listFieldSetter] = useState("");

    const [errors, setErrors] = useState([]); //! validation addition

    const navigate = useNavigate(); // retrieve the current values for this person so we can fill in the form with what is in the db currently

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/gizmos/' + id)
            .then(res => {
                stringFieldOneSetter(res.data.stringFieldOne);
                numberFieldSetter(res.data.numberField);
                isBooleanSetter(res.data.isBoolean);
                enumStringSetter(res.data.enumString);
                listFieldSetter(res.data.listField);
            })
            .catch(err => console.log(err))
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put('http://localhost:8000/api/gizmos/' + id, {
            stringFieldOne 
            , numberField
            , isBoolean
            , enumString
            , listField 
            })
            .then(res => {
                console.log(res);
                // navigate("/");  // this navs you to homepage
                navigate(`/gizmos/${id}`); // this navs you back to DetailCmp
            })
            // .catch(err => console.log(err))
            //! validations: above line replaced by below line
            .catch(err=>{setErrors(err.response.data.errors);}) 
    }
    return (
        <main>
            <Container>
            <Row>
                <Card style = {{width: '50rem', padding: '1rem', border: "0.1rem solid grey",  marginBottom: "0.5rem"}} > 
                    <h2>Update Gizmo</h2>
                    <Form onSubmit = {handleSubmit}>
                        <Form.Group className="mb-3 bg-white" controlId="FormGroup_01">
                            <Form.Label>stringFieldOne:</Form.Label>
                            <Form.Control
                                style = {{width: '20rem', height: "2rem"}}
                                type = "textarea"
                                value={stringFieldOne}
                                // placeholder={stringFieldOne}
                                onChange ={(e) => stringFieldOneSetter(e.target.value)}
                                name="stringFieldOne"
                            /> 
                            {/* validation addition */}
                            { errors.stringFieldOne ? 
                                <p style = {{color: "red"}}>{errors.stringFieldOne.message}</p>
                                : null
                            }
                        </Form.Group>

                        <Form.Group className="mb-3 bg-white" controlId="FormGroup_03">
                            <Form.Label>numberField:</Form.Label>
                            <Form.Control
                                style = {{width: '300px', height: "25px"}}
                                type = "number"
                                value={numberField}
                                onChange ={(e) => numberFieldSetter(e.target.value)}
                                name="numberField"
                            />
                            {/* validation addition  */}
                            { errors.numberField ? 
                                <p style = {{color: "red"}}>{errors.numberField.message}</p>
                                : null
                            } 
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="FormGroup_03">
                            <Form.Check
                                type = "checkbox"
                                label="isBoolean"
                                onChange ={(e) => isBooleanSetter(e.target.checked)}
                                // below is required so that the form can be rest
                                checked={isBoolean}
                                name="isBoolean"
                            />
                            {/* NO validation addition here */}
                        </Form.Group>

                        <Form.Group className="mb-3 bg-white" controlId="FormGroup_04">
                            <Form.Label>enumString:</Form.Label>
                            <Form.Select 
                                    style = {{width: '20rem', height: "2.5rem"}}
                                    aria-label="Default select example"
                                    onChange ={(e) => enumStringSetter(e.target.value)}
                                    value={enumString}
                                    >
                                    <option value="noSelection"></option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                            </Form.Select>
                            {/* validation addition */}
                            { errors.enumString ? 
                                <p style = {{color: "red"}}>{errors.enumString.message}</p>
                                : null
                            }
                        </Form.Group>

                        <Form.Group className="mb-3 bg-white" controlId="FormGroup_01">
                            <Form.Label>listField:</Form.Label>
                            <Form.Control
                                style = {{width: '20rem', height: "2rem"}}
                                type = "textarea"
                                value={listField}
                                onChange ={(e) => listFieldSetter(e.target.value.split(', '))}
                                // onChange ={handleChange}
                                name="listField"
                            />
                            {/* validation addition  */}
                            { errors.listField ? 
                                <p style = {{color: "red"}}>{errors.listField.message}</p>
                                : null
                            }
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="ToDo03">
                            <Form.Control style = {{width: "5rem"}} className="btn btn-primary" type = "submit" value="Update"/>
                        </Form.Group>
                    </Form> 
                </Card>
            </Row>
        </Container>
        </main>  
    )
}
export default GizmoUpdateCmp;
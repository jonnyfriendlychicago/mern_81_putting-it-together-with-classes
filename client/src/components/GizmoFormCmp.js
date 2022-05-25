// ! findReplace all "Gizmo" with "YourNewEntityName" or whatever your new thing is 
// ! THEN do similar find replace for "gizmo" Make sure lower case
import React, {useState} from 'react';
import axios from 'axios'; 
import {Container, Row, Card, Form} from 'react-bootstrap'; 


const GizmoFormCmp = (props) => {

    const {gizmoList, gizmoListSetter} = props; 
    const [stringFieldOne, stringFieldOneSetter ] = useState("");
    const [numberField, numberFieldSetter] = useState("");
    const [isBoolean, isBooleanSetter] = useState(false); 
    const [enumString, enumStringSetter] = useState("");
    const [listField, listFieldSetter] = useState("");

    const [errors, setErrors] = useState([]); // validations

    //! below placeholder for now; remainder of present code doesn't support this yet.
    // const handleChange = (e) => {
    //     if (e.target.name === 'isBoolean') {
    //         gizmoListSetter({ ...gizmoList, [e.target.name]: e.target.checked });
    //     // } else if (e.target.name === 'actors') {
    //     //   setMovie({ ...movie, [e.target.name]: e.target.value.split(',') });
    //     } else {
    //         gizmoListSetter({ ...gizmoList, [e.target.name]: e.target.value });
    //     }
    //   };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        axios
            .post("http://localhost:8000/api/gizmos", {
                stringFieldOne
                , numberField
                , isBoolean
                , enumString
                , listField : listField.split(';')
            })
            .then(res=> {
                // gizmoListSetter([...gizmoList, res.data]); 
                //! above replaced by below for sorting
                gizmoListSetter([res.data, ...gizmoList]); 
                stringFieldOneSetter(""); 
                numberFieldSetter(""); 
                isBooleanSetter(false); 
                enumStringSetter(""); 
                listFieldSetter(""); 
                setErrors([]); // remove error msg upon successful submission
            })
            // .catch(err => {
            //     const errorResponse = err.response.data.errors; // Get the errors from err.response.data
            //     const errorArr = []; // Define a temp error array to push the messages in
            //     for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
            //         errorArr.push(errorResponse[key].message)
            //     }
            //     setErrors(errorArr);
            // })
            // ! above catch puts all the errors in one spot at the top
            // ! below catch is part of solution that puts the errors in line with the form group
            .catch(err=>{
                console.log(err.response)
                setErrors(err.response.data.errors); //! this line activates all the back-end validation you've already set up
            }) 

    }; 

    return (
        <Container>
            <Row>
                <Card style = {{width: '50rem', padding: '1rem', border: "0.1rem solid grey",  marginBottom: "0.5rem"}} > 
                    <h2>Enter a New Gizmo</h2>
                    <Form onSubmit = {handleSubmit}>
                        {/* !below puts all the validation errors together, atop the form.  comment it out to allow those items all inline instead  */}
                        {/* {errors.map((err, index) => <p key={index}>{err}</p>)} */}

                        <Form.Group className="mb-3 bg-white" controlId="FormGroup_01">
                            <Form.Label>stringFieldOne:</Form.Label>
                            <Form.Control
                                style = {{width: '20rem', height: "2rem"}}
                                type = "textarea"
                                value={stringFieldOne}
                                onChange ={(e) => stringFieldOneSetter(e.target.value)}
                                // onChange ={handleChange}
                                name="stringFieldOne"
                            /> 
                            { errors.stringFieldOne ? 
                                <p style = {{color: "red"}}>{errors.stringFieldOne.message}</p>
                                : null
                            }
                        </Form.Group>

                        <Form.Group className="mb-3 bg-white" controlId="FormGroup_02">
                            <Form.Label>numberField:</Form.Label>
                            <Form.Control
                                style = {{width: '20rem', height: "2rem"}}
                                type = "number"
                                value={numberField}
                                onChange ={(e) => numberFieldSetter(e.target.value)}
                                // onChange ={handleChange}
                                name="numberField"
                            />
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
                                // onChange ={(e) => listFieldSetter(e.target.value.split(','))}
                                // below swap for above
                                onChange ={(e) => listFieldSetter(e.target.value)}
                                // onChange ={handleChange}
                                name="listField"
                            /> 
                            { errors.listField ? 
                                <p style = {{color: "red"}}>{errors.listField.message}</p>
                                : null
                            }
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="ToDo03">
                            <Form.Control style = {{width: "5rem"}} className="btn btn-primary" type = "submit" value="Submit"/>
                        </Form.Group>
                    </Form> 
                </Card>
            </Row>
        </Container> 

    )

}; 

export default GizmoFormCmp; 
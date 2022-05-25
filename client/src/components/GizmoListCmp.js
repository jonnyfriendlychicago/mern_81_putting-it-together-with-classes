// ! findReplace all "Gizmo" with "YourNewEntityName" or whatever your new thing is 
// ! THEN do similar find replace for "gizmo" Make sure lower case
import React, {useEffect} from 'react'
// import {useState} from 'react';  //! added for onDemand Sort stuff, not working presently
import {Link} from 'react-router-dom'; 
import axios from 'axios';
import {Container, Row, Card, Button
    // , Form //! added for onDemand Sort stuff, not working presently
} from 'react-bootstrap'; 

const GizmoListCmp = (props) => {
    
    const {removeFromDom, gizmoList, gizmoListSetter} = props;

    // const [data, setData] = useState([]); //! added for onDemand Sort stuff, not working presently
    // const [sortType, setSortType] = useState('stringFieldOne');  //! added for onDemand Sort stuff, not working presently

    //! added for onDemand Sort stuff, not working presently
    // useEffect(() => {
    //     const sortArray = type => {
    //       const types = {
    //         stringFieldOne: 'stringFieldOne',
    //         numberField: 'numberField'
    //       };
    //       const sortProperty = types[type];
    //       const sorted = [...gizmoList].sort((a, b) => b[sortProperty] - a[sortProperty]);
    //     //   setData(sorted);
    //     gizmoListSetter(sorted);
    //     };
    
    //     sortArray(sortType);
    //   }, [sortType]
    //   ); 
    
    useEffect(()=>{
    	axios
            .get("http://localhost:8000/api/gizmos")
            .then((res)=>{
                
                gizmoListSetter(res.data);
            })
            .catch((err)=>{console.log(err)})
    }, [gizmoListSetter])

    
    
    const handleDelete = (id) => {
        axios
            .delete('http://localhost:8000/api/gizmos/' + id)
            .then(res => {
                removeFromDom(id)
            })
            .catch(err => console.log(err))
    }
    
    return (
        <Container> 
            {/* <Row>
                
                <Form.Select onChange={(e) => setSortType(e.target.value)}>
                    <option value="stringFieldOne">stringFieldOne</option>
                    <option value="numberField">numberField</option>
                </Form.Select>

                <Form>
                    <Form.Group className="mb-3 bg-white" controlId="FormGroup_04">
                        <Form.Label>Select Field to Sort By:</Form.Label>
                        <Form.Select 
                        style = {{width: '20rem', height: "2.5rem"}}
                        // aria-label="Default select example"
                        // onChange ={(e) => enumStringSetter(e.target.value)}
                        // value={enumString}
                        onChange={(e) => setSortType(e.target.value)}
                        >
                            <option value="stringFieldOne">stringFieldOne</option>
                            <option value="numberField">numberField</option>
                        </Form.Select>
                    </Form.Group>
                </Form>

            </Row> */}
            
            
            <Card style = {{width: '95%', padding: '1rem', border: "0.1rem solid grey",  marginBottom: "0.5rem"}} > 
            <Row>
                <h2>Gizmos</h2>
                {
                    gizmoList.map((gizmoInstance, index)=>{
                    return (
                        <Card key={index} style = {{width: '15rem', padding: '0.5rem', border: "0.1rem solid grey",  margin: "0.25rem"}} >
                            <p>{gizmoInstance.createdAt}</p>
                            <p>{gizmoInstance.stringFieldOne}</p>
                            <p>{gizmoInstance.numberField}</p>
                            {gizmoInstance.isBoolean ? <p>ISboolean</p> : <p>isNOTboolean</p>}
                            <p> {gizmoInstance.enumString}</p>
                            <p>listField:</p>
                            <p>{gizmoInstance.listField && gizmoInstance.listField.join(';')}</p>
                            {/* TRYING AGAIN WITH MAP APPROACH...  */}
                            {/* <ul>
                                {
                                    gizmoInstance.listField.map((listFieldEntry.stringFieldOne, index) => {
                                        <li key={index}>
                                            {listFieldEntry}
                                        </li>
                                    })
                                }
                            </ul> */}
                            <Link to={`/gizmos/${gizmoInstance._id}`}>Details</Link>
                            {/* <Link to={`/gizmos/edit/${gizmoInstance._id}`}>Edit</Link> */}
                            {/* <Button onClick={(e)=>{handleDelete(gizmoInstance._id)}}>Delete</Button> */}
                        </Card>
                    )
                    })
                }
            </Row>
            </Card>
        </Container>
    )
}; 

export default GizmoListCmp;

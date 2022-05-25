// ! findReplace all "Gizmo" with "YourNewEntityName" or whatever your new thing is 
// ! THEN do similar find replace for "gizmo" Make sure lower case
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";// added
import {Container, Row, Card, Button} from 'react-bootstrap'; 
import {Link} from 'react-router-dom'; 

const GizmoDetailCmp = (props) => {

    const [gizmo, gizmoSetter] = useState({}); 
    const {id} = useParams(); 

    //! buttonTry
    const [likeButton, likeButtonSetter] = useState(false); 
    const likedFunc = (e) => {
        likeButton ? likeButtonSetter(false) :  likeButtonSetter(true) 
    }

    const navigate = useNavigate(); // added

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/gizmos/" + id)
            .then( res => {
                console.log(res.data);
                gizmoSetter(res.data);
            })
            .catch( err => console.log(err) )
    }, [id])

    const handleDelete = (id) => {
        axios
            .delete('http://localhost:8000/api/gizmos/' + id)
            .then(res => {
                navigate("/"); 
            })
            .catch(err => console.log(err))
    }

    return (
        <main>
        <Container> 
            <Row>
                <Card style = {{width: '50rem', padding: '1rem', border: "0.1rem solid grey",  marginBottom: "0.5rem"}} > 
                    <div className="cardHeader">
                        <h2>Gizmo Profile</h2>
                        {/* <Link to={`/gizmos/edit/${gizmo._id}`}>Edit</Link> */}
                        <Button onClick={(e)=>{handleDelete(gizmo._id)}}>Delete</Button> 
                    </div>
                    <p>stringFieldOne: {gizmo.stringFieldOne}</p>
                    <p>numberField: {gizmo.numberField}</p>
                    {gizmo.isBoolean ? <p>ISboolean</p> : <p>isNOTboolean</p>}
                    <p>enumString: {gizmo.enumString}</p>
                    <p>listField: {gizmo.listField && gizmo.listField.join(',')}</p>
                    {/* <Button onClick={(e)=>{handleDelete(gizmo._id)}}>Delete</Button>  */}
                    <Link to={`/gizmos/edit/${gizmo._id}`}>Edit</Link>
                    {/* below works one-way! */}
                    {/* { 
                    likeButton ? 
                    <Button >Woof Woof! Thanks!</Button>
                    :
                    <Button onClick ={likedFunc}>Like me!</Button>
                    } */}

                    {/* {below works two-way, but throw the 'disabled' in there to make it oneway */}
                    {
                    likeButton ? 
                    <Button onClick ={likedFunc} disabled>Woof Woof! Thanks!</Button>
                    :
                    <Button onClick ={likedFunc}>Like me!</Button>
                    }
                </Card>
            </Row>
        </Container>
        </main> 
    )
}
export default GizmoDetailCmp;
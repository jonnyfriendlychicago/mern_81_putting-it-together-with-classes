// ! findReplace all "Gizmo" with "YourNewEntityName" or whatever your new thing is 
// ! THEN do similar find replace for "gizmo" Make sure lower case
import React, { useState } from 'react'
import GizmoFormCmp from '../components/GizmoFormCmp';
import GizmoListCmp from '../components/GizmoListCmp';

const MainView = (props) => {
    
    const [gizmoList, gizmoListSetter] = useState([]);

    const removeFromDom = id => {
        gizmoListSetter(gizmoList.filter(gizmo => gizmo._id !== id )); 
    }
    
    return (
        <main>
            <div className="row_flex_left">
                <GizmoFormCmp gizmoList={gizmoList} gizmoListSetter={gizmoListSetter} />
            </div>
            <div className="row_flex_left">
                <GizmoListCmp gizmoList={gizmoList} gizmoListSetter={gizmoListSetter} removeFromDom={removeFromDom} />
            </div>
        </main>
    )
}
export default MainView;

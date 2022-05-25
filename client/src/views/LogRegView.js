import React, {useState, useEffect} from 'react';
import LoginCmp from "../components/LoginCmp";
import RegisterCmp from "../components/RegisterCmp"; 

const LogReg = (props) => {


    return (
        <main>
        <div className="row_flex_left">
            <LoginCmp gizmoList={gizmoList} gizmoListSetter={gizmoListSetter} />
        </div>
        <div className="row_flex_left">
            <RegisterCmp gizmoList={gizmoList} gizmoListSetter={gizmoListSetter} removeFromDom={removeFromDom} />
        </div>
    </main>
    )
}

export default LogRegView; 
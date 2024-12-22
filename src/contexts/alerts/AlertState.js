import React, { useState, useContext } from "react";
import alertContext from "./alertContext";
import { loadingContext } from "../loadingBar/LoadingState";

function AlertState(props) {
    const [alert, setAlert] = useState(null);
    const context = useContext(loadingContext);
    const { setProgress } = context;
    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            tpyeof: type
        })
        setTimeout(() => {
            setProgress(100);
            setAlert(null);
        }, 2000);
    }
    return (
        <alertContext.Provider value={{alert : alert, showAlert : showAlert}}>
            {props.children}
        </alertContext.Provider>
    )
};
export default AlertState;
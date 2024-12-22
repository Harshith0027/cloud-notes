//import loadingContext from "./loadingContext";
import React, { useState } from "react";
export const loadingContext = React.createContext();

const LoadingState = (props) => {
    const [progress, setProgress] = useState(0);
    return(
        <loadingContext.Provider value={{progress : progress, setProgress : setProgress}}>
            {props.children}
        </loadingContext.Provider>
    )
};

export default LoadingState;
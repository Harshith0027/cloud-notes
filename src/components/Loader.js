import React, { useContext ,useEffect } from 'react'
import LoadingBar from 'react-top-loading-bar';
import { loadingContext } from '../contexts/loadingBar/LoadingState';

const Loader = () => {
    const load = useContext(loadingContext);
    const { progress, setProgress } = load;
    useEffect(() => {
        //console.log(progress);
        setProgress(0);
        //eslint-disable-next-line
    },[progress === 100]);
    return (
        <div>
            <LoadingBar
                height={3}
                color='green'
                progress={progress}
            />
        </div>
    )
}

export default Loader
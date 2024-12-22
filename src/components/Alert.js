import React, { useContext } from 'react'
import alertContext from '../contexts/alerts/alertContext'

export default function Alert() {
    const context = useContext(alertContext);
    const { alert } = context;
    return (
        <div style={{height : '60px'}}>
        {alert && 
            <div className="alert alert-success alert-dismissible fade show" role="alert">
                
                <p>{alert.typeof}<strong>{alert.msg}</strong></p>
                {console.log(alert.typeof)}
            </div>}  
        </div>
        
    )
}


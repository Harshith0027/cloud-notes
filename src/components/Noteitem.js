import React, {useContext} from 'react'
import noteContext from '../contexts/notes/noteContext';
import alertContext from '../contexts/alerts/alertContext';

const Noteitem =(props)=> {
    const {notes, updateNotes, setTest} = props;
    const context = useContext(noteContext);
    const context2 = useContext(alertContext);
    const { showAlert } = context2;
    const {deleteNote} = context;
    
    const del =()=>{
        deleteNote(notes._id);
        setTest((prevTest)=> !prevTest);
        showAlert("Note deleted successfully", "success");
    }
    return (
        <div className="col-md-3 pb-3">
        <div className="card">
            <div className="card-body">
                <div className="d-flex">
                    <h5 className="card-title">{notes.title}</h5>
                    <i className="fa-solid fa-trash mx-3" onClick={del}></i>
                    <i className="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => updateNotes(notes)}></i>
                </div>
                <p className="card-text">{notes.description}</p>
            </div>
        </div>
        </div>
    )
}

export default Noteitem

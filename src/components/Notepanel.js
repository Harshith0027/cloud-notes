import React, { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../contexts/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import alertContext from '../contexts/alerts/alertContext';
import {loadingContext} from '../contexts/loadingBar/LoadingState';

const Notepanel = () => { 
    const [test, setTest] = useState(true);
    const context = useContext(noteContext);
    const context2 = useContext(alertContext);
    const context3 = useContext(loadingContext);
    const {/*progress*/ setProgress} = context3;
    const navigate = useNavigate();
    const { showAlert } = context2;
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            //console.log("did i fuck u?");
            //console.log("0%",progress);
            setProgress(70);
            //console.log("50%",progress);
            getNotes();
            setProgress(100);
            //console.log("100%",progress);
        }
        else{
            setProgress(70);
            navigate("/login");
            showAlert("check your credentials", "danger");
            setProgress(100);
        }
        //eslint-disable-next-line
    }, [test]);
    const [note,setNote] = useState({ eid : "", etitle : "", edescription : "", etag : "" })
    
    const ref = useRef(null);
    const refClose = useRef(null);
    const updateNotes = async (notes) => {
        console.log(notes);
        if (notes) {
            await ref.current.click(); // Open the modal
            setNote({
                eid: notes._id ,
                etitle: notes.title ,
                edescription: notes.description ,
                etag: notes.tag 
            });
        } else {
            console.error('note is undefined');
        }
    };
    const handleClick = async ()=> {
        if (note.eid) { // Check if note.id is defined
            console.log('Updating Note:', note); // Log the note values
            await editNote({id : note.eid, title : note.etitle, description :  note.edescription, tag : note.etag});
            showAlert("Note Updatation Completed", "success");
            refClose.current.click(); // Close the modal
            setTest((prevTest)=> !prevTest);
        } else {
            console.error('Note ID is undefined');
        }
    };
    const onChange = (event)=> {
        const { name, value } = event.target;
        setNote(prevNote => ({
            ...prevNote,
            [name]: value
        }));
    };
    return (
        <>
            <AddNote setTest={setTest} />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" onChange={onChange} value={note.etitle} aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name="etag" onChange={onChange} value={note.etag} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                {Array.isArray(notes) && notes.length > 0 ? (
                    notes.map((notes) => {
                        return <Noteitem key={notes._id} updateNotes={updateNotes} notes={notes} setTest={setTest}/>;
                    })) : (<p>No notes available.</p>)}
            </div>
        </>
    )
}
export default Notepanel
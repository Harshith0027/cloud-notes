import React, {useContext, useState} from 'react';
import noteContext from '../contexts/notes/noteContext';

const AddNote = (props) => {
    const {setTest} = props;
    const context = useContext(noteContext);
    const { addNotes } = context;
    
    const [note,setNote] = useState({title : "", description : "", tag : ""})
    const handleClick = (event)=> {
        event.preventDefault();
        addNotes(note.title, note.description, note.tag);
        setTest((prevTest)=> !prevTest);
        setNote({ title : "", description : "", tag : "" });
    }
    const onChange = (event)=> {
        setNote({...note, [event.target.name] : event.target.value});
    };
    return (
        <>
            <h5>Add Note :</h5>
            <div className='container' style={{border : "0.5px dotted black"}}>
            <div className="container my-3">
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" placeholder="Should contain atleast 5 characters" aria-describedby="emailHelp" value={note.title} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" placeholder="Should contain atleast 5 characters" value={note.description} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" placeholder="Should contain atleast 3 characters" value={note.tag} onChange={onChange} />
                    </div>
                    <button disabled={note.title.length < 5 || note.description.length < 5 || note.tag.length < 3} type="submit" className="btn btn-success" onClick={handleClick}>Add Note</button>
                </form>
            </div>
            </div>
            <h5 className="my-3">Your Notes :</h5>
            <hr/>
        </>
    )
}

export default AddNote
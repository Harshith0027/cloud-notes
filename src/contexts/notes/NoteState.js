import React, {useState, useContext} from "react";
import noteContext from "./noteContext";
import { loadingContext } from "../loadingBar/LoadingState";
import alertContext from "../alerts/alertContext";


function NoteState (props) {
    const host = "https://cloud-notes-mjfh.onrender.com"
    const noteInitial = [];
    const [notes,setNotes] = useState(noteInitial);
    const context = useContext(loadingContext);
    const {setProgress} = context;
    const context2 = useContext(alertContext);
    const { showAlert } = context2;

    //get all notes
    const getNotes = async () => {
        try {
            const response = await fetch(`${host}/api/notes/fetchNotes`, {
                method: "GET",
                headers: {
                    "auth-token": localStorage.getItem('token'),
                },
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const json = await response.json();  
            setNotes(json.notes); // Ensure this is an array  of the fetched notes
        } catch (error) {
            console.error("Failed to fetch notes:", error);
        }
    };

    // add note
    const addNotes = async ( title, description, tag )=> {
        //api call
        const response = await fetch(`${host}/api/notes/addNotes`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "auth-token" : localStorage.getItem('token'),
            },
            body : JSON.stringify({title, description, tag})
        })
        const json = await response.json();
        //console.log(json);
        //frontend update
        showAlert("Addition of Note is completed", "success");
        if (response.ok) {
            // Refresh notes from the server
            //setProgress(0);
            //setProgress(50);
            await getNotes();
            //setProgress(100);
        } else {
            console.error("Failed to add note:", json);
        }
    }

    // delete note
    const deleteNote = async (id)=> {
        //api call 
        const response = await fetch(`${host}/api/notes/deleteNotes/${id}`,{
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "auth-token" : localStorage.getItem('token'),
            },
        })
        const json = await response.json();
        console.log(json);
        //frontend delete
        setProgress(0);
        setProgress(50);
        const updatedNotes = notes.filter((note) => note._id !== id);
        setNotes(updatedNotes);
        setProgress(100);
    }

    // edit note
    const editNote = async ({id, title, description, tag})=> {
        console.log({id, title, description, tag});
        //API Call
        const response = await fetch(`${host}/api/notes/updateNotes/${id}`,{
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "auth-token" : localStorage.getItem('token'),
            },
            body : JSON.stringify({title, description, tag})
        })
        const json = await response.json();
        //console.log(json);
        // logic to edit in client
        if (response.ok) {
            // Refresh notes from the server
            getNotes();
        } else {
            console.error("Failed to edit note:", json);
        }
    }
    return(
        <noteContext.Provider value={{notes:notes,addNotes:addNotes,deleteNote:deleteNote,editNote:editNote,getNotes:getNotes}/*{state:state,update:update}*/}>
            {props.children}
        </noteContext.Provider>
    )
};
export default NoteState;

import { useState } from "react";

function Todo(props) {

    const [done, setDone] = useState(false);

    function handleClick() {
        setDone(!done);
    }

    return (
    <div>
        <h3>{props.title}</h3>
        <p>Status: {String(done)}</p>
        <button onClick={handleClick}>{done ? "Undo" : "Done"}</button>
    </div>
    );
}

export default Todo; 
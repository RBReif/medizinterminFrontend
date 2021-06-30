import { useState } from "react";
import { Button } from "react-bootstrap";

function Todo(props) {

    const [done, setDone] = useState(false);

    function handleClick() {
        setDone(!done);
    }

    return (
    <div>
        <h3>{props.title}</h3>
        <p>Status: {String(done)}</p>
        <Button onClick={handleClick}>{done ? "Undo" : "Done"}</Button>
    </div>
    );
}

export default Todo; 
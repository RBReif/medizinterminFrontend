import Todo from "./Todo";
function SEBAList() {

    const todo = [{title: "one"}, {title: "two"}, {title: "three"}];

    return (
    <div> 
        <h2>This is the medizintermin List component</h2>
        {todo.map((todoitem) => {
            return <Todo title={todoitem.title} />;
        })}
    </div>
    );
}

export default SEBAList;
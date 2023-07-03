import React, { useEffect, useState } from "react";


const Home = () => {
	const [ inputValue, setInputValue ] = useState("");
	const [todos, setTodos] = useState();
	
	const updateTodos = () => {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/jide', {
			method: "PUT",
			body: JSON.stringify(todos),
			headers: {      
				"Content-Type": "application/json"
			}
		})
		.then(resp => {
			return resp.json();
		})
		.then(data => {
			setTodos(todos);
		})
		.catch(error => {
			console.log(error);
		});
	}

	const deleteTodos = () => {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/jide', {
			method: "DELETE",
			// body: JSON.stringify(todos),
			headers: {      
				"Content-Type": "application/json"
			}
		})
		.then(resp => {
			return resp.json();
		})
		.then(data => {
			setTodos(data);
		})
		.catch(error => {
			console.log(error);
		});
	}

	const addTodo = (e) => {
		if (e.key === "Enter" && inputValue.trim() !== "") {
		setTodos([...todos, { label: inputValue, done: false }]);
		setInputValue("");
		}
	};

	const deleteTodo = (id) => {
		setTodos(todos.filter((task, index) => index !== id));
	};

	useEffect(() => {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/jide', {
			method: "GET",
			body: JSON.stringify(todos),
			headers: {      
				"Content-Type": "application/json"
			}
		})
		.then(resp => {
		   return resp.json();
	   	})
	   	.then(data => {
		   setTodos(data);
		})
	    .catch(error => {
			console.log(error);
		});
	}, []);

	if(!todos) {
		return <p>Loading todos...</p>;
	}
	console.log(todos);
	
	return (
		<div className="container">
			<h1><i><strong>My Todo List<i className="fa-solid fa-pencil"></i></strong></i></h1>
			<ul>
				<li>
					<input 
						type="text" 
						value={inputValue} 
						onChange={(e) => setInputValue(e.target.value)}
						onKeyUp={addTodo}
						placeholder="What needs to be done?"
					/>
				</li>
				<li>
					{todos.map((item, index) => <p>{item.label} <i className="fa-solid fa-trash-can" onClick={() =>deleteTodo(index)}></i></p>)}
				</li>
			</ul>
			<div className="tasks">
				<p>
					<i>{todos.length} tasks remaining</i>
				</p>
			</div>
			<div className="container d-flex justify-content-around">
				<div><button className="btn btn-outline-info" onClick={updateTodos}>Update Todo List</button></div>
				<div><button className="btn btn-outline-danger" onClick={deleteTodos}>Delete All Tasks</button></div>
			</div>
		</div>
	);
};

export default Home;
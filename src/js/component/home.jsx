import React, { useEffect, useState } from "react";


const Home = () => {

	const [todos, setTodos] = useState();

	const createTodos = () => {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/jide', {
			method: "POST",
			body: JSON.stringify([
				{ label: "Make the bed", done: false },
				{ label: "Walk the dog", done: false },
				{ label: "Do the replits", done: false }
			  ]),
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
			setTodos(data);
		})
		.catch(error => {
			console.log(error);
		});
	}

	/* const deleteTodos = () => {
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
	} */

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
			<h1><i><strong>My Todos<i className="fa-solid fa-pencil"></i></strong></i></h1>
			<ul>
				<li>
					{todos.map(item => <p>{item.label} <i className="fa-solid fa-trash-can"></i></p>)}
				</li>
			</ul>
			<div className="tasks"><p><i>{todos.length} tasks remaining</i></p></div>
			<div className="update">
				<button onClick={updateTodos}>Update Todos</button>
				{/* <button onClick={deleteTodos}>Delete Todos</button> */}
			</div>
		</div>
	);
};

export default Home;
import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
	const [ inputValue, setInputValue ] = useState("");
	const [todos, setTodos ] = useState([]);
	const [data, setData] = useState([]);

	useEffect(() => {
		const createUser = () => {
		  fetch ("https://assets.breatheco.de/apis/fake/todos/user/jide", {
			method: "POST",
			headers: {
			  "Content-Type": "application/json"
			},
			body: JSON.stringify([])
		  });
		}
		createUser();
	}, []);

	useEffect(() => {
		// Fetch initial to-do list from the API
		fetch("https://assets.breatheco.de/apis/fake/todos/user/jide")
			.then(resp => resp.json())
			.then(data => setTodos(data))
			.catch(error => console.log(error));
	}, []);

	useEffect(() => {
		// Update the API with the modified to-do list whenever todos change
		fetch("https://assets.breatheco.de/apis/fake/todos/user/jide", {
		  method: "PUT",
		  body: JSON.stringify(todos),
		  headers: {
			"Content-Type": "application/json"
		  }
		})
		  .then(resp => {
			console.log(resp.ok); // true if the response is successful
			console.log(resp.status); // the status code (e.g., 200, 400, etc.)
			console.log(resp.text()); // the response as text
			return resp.json(); // parse the response as JSON and return a promise
		  })
		  .then(data => {
			console.log(data); // the object received from the server
		  })
		  .catch(error => {
			console.log(error); // error handling
		  });
	  	}, [todos]);

		const addTodo = () => {
			if (inputValue.trim() === "") return;
		
			// Create a new to-do object and update the todos state
			const newTodo = { label: inputValue, done: false };
			setTodos([...todos, newTodo]);
		
			// Clear the input field
			setInputValue("");
		};
		
		const deleteTodo = index => {
			// Remove the selected to-do from the todos state
			const updatedTodos = todos.filter((_, currentIndex) => index !== currentIndex);
			setTodos(updatedTodos);
		};
		
		const cleanAllTasks = () => {
			// Delete the entire list from the server and update the todos state
			fetch("https://assets.breatheco.de/apis/fake/todos/user/jide", {
			  method: "DELETE"
			})
			  .then(resp => resp.json())
			  .then(data => setTodos([]))
			  .catch(error => console.log(error));
		};

	return (
		<div className="container">
			<h1><i>My Todos <i class="fa-solid fa-pencil"></i></i></h1>
			<ul>
				<li><input 
					type="text" 
					onChange={(e) => setInputValue(e.target.value)}
					value={inputValue}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							addTodo();
						}
					}}
					placeholder="What needs to be done?" />
				</li>
				{todos.map((item, index) => (
					<li>
						{item}{" "} 
						<i 
							class="fa-solid fa-trash-can" 
							onClick={() => 
								deleteTodo(index)
							}>
						</i>
					</li>
				))}
			</ul>
			<div className="tasks"><p>{todos.length} tasks</p></div>
			{todos.length > 0 && (
                <button className="btn btn-danger" onClick={cleanAllTasks}>
                  Clean All Tasks
                </button>
            )}
		</div>
	);
};

export default Home;
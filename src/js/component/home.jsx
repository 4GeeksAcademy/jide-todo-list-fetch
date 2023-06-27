import React, { useEffect, useState } from "react";


const Home = () => {

	const [todos, setTodos] = useState();

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
		<div className="text-center">
			{todos.map(item => <p>{item.label}</p>)}
		</div>
	);
};

export default Home;

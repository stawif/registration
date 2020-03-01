import React from 'react';

class MachineDisplay extends React.Component {
	state = {
		todos: []
	}
	componentDidMount() {
		fetch('http://127.0.0.1:8000/list-of-machines/')
		.then(res => res.json())
		.then((data) => {
		this.setState({ todos: data })
		})
	}
	render() {
		return (
			<div>
				<h1>Machine Names </h1>
				{this.state.todos.map((todo) => (
					<h5>{todo.name}</h5>
				))}
			</div>
		);
	}
}
export default MachineDisplay;


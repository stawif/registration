import React from 'react';

class VehiclePartyDisplay extends React.Component {
	state = {
		todos: []
	}
	componentDidMount() {
		fetch('http://127.0.0.1:8000/list-of-vehicleparty/')
		.then(res => res.json())
		.then((data) => {
		this.setState({ todos: data })
		})
	}
	render() {
		return (
			<div>
				<h1>Vehicle Party Names </h1>
				{this.state.todos.map((todo) => (
					<div>
					<h5>{todo.name}</h5>
					</div>
				))}
			</div>
		);
	}
}
export default VehiclePartyDisplay;
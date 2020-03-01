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
				<div>
					<table className="table-borderd">
						<tr>
							<th>Name</th>
							<th>Contact</th>
							<th>Village</th>
						</tr>
						{this.state.todos.map((todo) => (
						<tr>
							<td>{todo.name}</td>
							<td>{todo.contact}</td>
							<td>{todo.village}</td>
						</tr>
						))}
					</table>
				</div>
			</div>
		);
	}
}
export default VehiclePartyDisplay;

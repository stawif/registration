import React from 'react';

class MachinePartyDisplay extends React.Component {
	state = {
		todos: []
	}
	componentDidMount() {
		fetch('http://127.0.0.1:8000/list-of-machineparty/')
		.then(res => res.json())
		.then((data) => {
		this.setState({ todos: data })
		})
	}
	render() {
		return (
			<div>
				<h1>Machine Party Names </h1>
				<div>
					<table className="table-borderd">
						<tr>
							<th>Contact</th>
							<th>Name</th>
							<th>Village</th>
						</tr>
						{this.state.todos.map((todo) => (
						<tr>
							<td>{todo.contact}</td>
							<td>{todo.name}</td>
							<td>{todo.village}</td>
						</tr>
						))}
					</table>
				</div>
			</div>
		);
	}
}
export default MachinePartyDisplay;
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
					<div>
						<table className="table-bordered">
							<tr>
								<th>Owner</th>
								<th>Name</th>
							</tr>
							<tr>
								<td>{todo.owner}</td>
								<td>{todo.name}</td>
							</tr>
						</table>
					</div>
				))}
			</div>
		);
	}
}
export default MachineDisplay;


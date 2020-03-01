import React from 'react';

class ItemDisplay extends React.Component {
	state = {
		todos: []
	}
	componentDidMount() {
		fetch('http://127.0.0.1:8000/list-of-item/')
		.then(res => res.json())
		.then((data) => {
		this.setState({ todos: data })
		})
	}
	render() {
		return (
			<div>
				<h1>Item Names </h1>
				<div>
					<table className="table-borderd">
						<tr>
							<th>Owner</th>
							<th>Name</th>
							<th>Measurement</th>
							<th>Quantity</th>
						</tr>
						{this.state.todos.map((todo) => (
						<tr>
							<td>{todo.owner}</td>
							<td>{todo.name}</td>
							<td>{todo.measurement}</td>
							<td>{todo.quantity}</td>
						</tr>
						))}
					</table>
				</div>
			</div>
		);
	}
}
export default ItemDisplay;

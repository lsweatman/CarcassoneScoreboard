import React from 'react';
import Button from 'react-bootstrap/lib/Button';

export default class Sheep extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			personName: this.props.personName,
			sheepScore: 0
		};
	}
	
	render() {
		return (
			<div>
				<textarea className="standard-button" 
							value={this.state.sheepScore}>
				<Button className="btn btn-primary">Generate</Button>
			</div>
		)
	}
}
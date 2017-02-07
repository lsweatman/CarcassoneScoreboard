/**
 * Created by Schwerve on 1/30/2017.
 */
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

export default class ScoreButtons extends React.Component {
	constructor(props) {
		super(props);
		var propName = this.props.indivName;
		var propScore = this.props.indivScore;

		this.state = {
			name: propName,
			score: propScore
		};
	}

	handleScoreChange(changeFactor) {
		this.setState({
			score: this.state.score + changeFactor
		}, () => {
			this.props.scoreChange(this.state.score, this.props.index);
		});
	}

	handleTextBoxChange(evt) {
		console.log(evt.target);
		this.setState({
			name: evt.target.value.substring(0,10)
		}, () => {
			this.props.nameChange(this.state.name, this.props.index);
		});
		this.props.nameChange(this.state.name, this.props.index);
	}

	remove() {
		this.props.onRemove(this.props.index);
	}

	render() {
		return (
			<div className="person">
				<Button className="btn btn-primary standardButton"
						onClick={this.handleScoreChange.bind(this, -10)}>-10</Button>

				<Button className="btn btn-primary standardButton"
						onClick={this.handleScoreChange.bind(this, -4)}>-4</Button>

				<Button className="btn btn-primary standardButton"
						onClick={this.handleScoreChange.bind(this, -1)}>-1</Button>

				<textarea className="standardButton"
						  style={{"width":"45px","height":"27px"}}
						  value={this.state.score}/>

				<Button className="btn btn-primary standardButton"
						onClick={this.handleScoreChange.bind(this, 1)}>+1</Button>

				<Button className="btn btn-primary standardButton"
						onClick={this.handleScoreChange.bind(this, 4)}>+4</Button>

				<Button className="btn btn-primary standardButton"
						onClick={this.handleScoreChange.bind(this, 10)}>+10</Button>

				<Button onClick={this.remove}
						className="btn btn-danger standardButton">
					<Glyphicon glyph="glyphicon glyphicon-trash"/>
				</Button>

				<input type="text"
					   className="standardTextBox"
					   value={this.state.name}
					   onChange={this.handleTextBoxChange.bind(this)}/>
			</div>
		);
	}
}
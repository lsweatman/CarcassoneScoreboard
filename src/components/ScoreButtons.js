/**
 * Created by Schwerve on 1/30/2017.
 */
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

export default class ScoreButtons extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.indivName,
			score: this.props.indivScore
		};
	}

	handleScoreChange(changeFactor) {
		//Update score in child and parent
		this.setState({
			score: this.state.score + changeFactor
		}, () => {
			this.props.scoreChange(changeFactor, this.props.index);
		});
	}

	handleTextBoxChange(evt) {
		//Takes value of name textbox and sends it to parent
		this.setState({
			name: evt.target.value.substring(0,10)
		}, () => {
			this.props.nameChange(this.state.name, this.props.index);
		});
	}

	remove() {
		this.props.onRemove(this.props.index);
	}

	componentWillReceiveProps(nextProps) {
		//For forced rerendering on props change
		if (nextProps.indivName !== this.state.name) {
			this.setState({
				name: nextProps.indivName
			});
		}
		if (nextProps.indivScore !== this.state.score) {
			this.setState({
				score: nextProps.indivScore
			});
		}
	}

	render() {
		return (
			<div className="person">
				<Button className="btn btn-primary score-buttons"
						onClick={this.handleScoreChange.bind(this, -10)}>-10</Button>

				<Button className="btn btn-primary score-buttons"
						onClick={this.handleScoreChange.bind(this, -4)}>-4</Button>

				<Button className="btn btn-primary score-buttons"
						onClick={this.handleScoreChange.bind(this, -1)}>-1</Button>

				<input type="text"
					   className="score-buttons"
					   style={{"width":"90px"}}
					   value={this.state.score}/>

				<Button className="btn btn-primary score-buttons"
						onClick={this.handleScoreChange.bind(this, 1)}>+1</Button>

				<Button className="btn btn-primary score-buttons"
						onClick={this.handleScoreChange.bind(this, 4)}>+4</Button>

				<Button className="btn btn-primary score-buttons"
						onClick={this.handleScoreChange.bind(this, 10)}>+10</Button>

				<Button onClick={this.remove.bind(this)}
						className="btn btn-danger score-buttons">
					<Glyphicon glyph="glyphicon glyphicon-trash"/>
				</Button>

				<input type="text"
					   className="standardTextBox score-buttons"
					   value={this.state.name}
					   onChange={this.handleTextBoxChange.bind(this)}/>
			</div>
		);
	}
}
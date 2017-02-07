/**
 * Created by Schwerve on 1/30/2017.
 */
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ScoreButtons from './ScoreButtons';

export default class IndexPage extends React.Component {
	constructor(props) {
		super();
		this.scores = [0,0,0];
		this.names = ["test","test2","test3"];
		this.state = {
			sheepEnabled: false
		}
	}

	nameUpdate(newName, i) {
		var namesArr = this.names;
		namesArr[i] = newName;
		this.names = namesArr;
	}

	scoreUpdate(newScore, i) {
		var scoresArr = this.scores;
		scoresArr[i] = newScore;
		this.scores = scoresArr;
	}

	addPerson() {
		var namesArr = this.names;
		namesArr.push("");
		this.names = namesArr;

		var scoresArr = this.scores;
		scoresArr.push(0);
		this.scores = scoresArr;
	}

	removePerson(i) {
		var namesArr = this.names;
		namesArr.splice(i, 1);
		this.names = namesArr;

		var scoresArr = this.scores;
		scoresArr.splice(i, 1);
		this.scores = scoresArr;
	}

	eachPerson(score, i) {
		console.log(this.scores[i]);
		console.log(this.names[i]);
		var personName = this.names[i];
		var personScore = this.scores[i];
		return (
			<ScoreButtons key={i}
						  index={i}
						  onRemove={this.removePerson.bind(this)}
						  nameChange={this.nameUpdate.bind(this)}
						  scoreChange={this.scoreUpdate.bind(this)}
						  indivName={personName}
						  indivScore={personScore}/>
		)
	}

	renderNoSheep() {
		return (
			<div className="board">
				{this.names.map(this.eachPerson, this)}
				<Button className="btn btn-sm btn-success"
						onClick={this.addPerson.bind(null)}>
					<Glyphicon glyph="glyphicon glyphicon-plus"/>
				</Button>
				<Button className="btn btn-sm btn-info">
					<Glyphicon glyph="glyphicon glyphicon-piggy-bank"/>
				</Button>
			</div>
		)
	}

	render() {
		if(this.state.sheepEnabled){
			console.log("sheep hit");
			//TODO
		}
		else {
			console.log("no sheep hit");
			return(this.renderNoSheep())
		}
	}
}
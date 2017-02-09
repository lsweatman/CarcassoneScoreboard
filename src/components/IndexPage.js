/**
 * Created by Schwerve on 1/30/2017.
 */
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ScoreButtons from './ScoreButtons';
import Sheep from './Sheep';

export default class IndexPage extends React.Component {
	constructor(props) {
		super();
		this.scores = [0,0,0];
		this.names = ["test","test2","test3"];
		this.state = {
			sheepEnabled: false,
			numOfPeople: this.scores.length
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

		var currentNum = this.state.numOfPeople;
		this.setState({
			numOfPeople: currentNum+1
		});
	}

	toggleSheep() {
		var currentSheepState = this.state.sheepEnabled;
		this.setState({
			sheepEnabled: !currentSheepState
		});
	}
	
	removePerson(i) {
		var namesArr = this.names;
		namesArr.splice(i, 1);
		this.names = namesArr;

		var scoresArr = this.scores;
		scoresArr.splice(i, 1);
		this.scores = scoresArr;

		var currentNum = this.state.numOfPeople;
		this.setState({
			numOfPeople: currentNum-1
		});
	}

	eachPerson(score, i) {
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
						onClick={this.addPerson.bind(this)}>
					<Glyphicon glyph="glyphicon glyphicon-plus"/>
				</Button>
				<Button className="btn btn-sm btn-info">
					<Glyphicon glyph="glyphicon glyphicon-piggy-bank"/>
				</Button>
			</div>
		)
	}
	
	eachSheepPerson(score, i) {
		var personName = this.names[i];
		return (
			<Sheep personName={this.names[i]}/>
		)
	}
	
	renderWithSheep() {
		return (
			<div className="board">
				{this.names.map(this.eachPerson, this)}
				
				<div className="sheep-div">
					{this.names.map(this.eachSheepPerson, this)}
				</div
				
				<Button className="btn btn-sm btn-success"
						onClick={this.addPerson.bind(this)}>
					<Glyphicon glyph="glyphicon glyphicon-plus"/>
				</Button>
				
				<Button className="btn btn-sm btn-info" 
						onClick={this.toggleSheep.bind(this)>
					<Glyphicon glyph="glyphicon glyphicon-piggy-bank"/>
				</Button>
				
			</div>
		)
	}
	
	render() {
		if(this.state.sheepEnabled){
			//TODO
		}
		else {
			console.log("no sheep hit");
			return(this.renderNoSheep())
		}
	}
}
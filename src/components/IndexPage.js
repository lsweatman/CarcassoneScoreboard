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

		this.state = {
			scores: [0,0,0],
			names: ["","",""],
			sheepEnabled: false,
			numOfPeople: 3,
			remainingSheep: [0,0,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4]
		}
	}

	nameUpdate(newName, i) {
		var namesArr = this.state.names;
		namesArr[i] = newName;
		this.setState({
			names: namesArr
		});
		this.forceUpdate();
	}

	scoreUpdate(newScore, i) {
		var scoresArr = this.state.scores;
		scoresArr[i] = newScore;
		this.setState({
			scores: scoresArr
		})
	}

	addPerson() {
		var namesArr = this.state.names;
		namesArr.push("");

		var scoresArr = this.state.scores;
		scoresArr.push(0);

		var currentNum = this.state.numOfPeople;

		this.setState({
			numOfPeople: currentNum+1,
			names: namesArr,
			scores: scoresArr
		});
	}

	toggleSheep() {
		var currentSheepState = this.state.sheepEnabled;
		this.setState({
			sheepEnabled: !currentSheepState
		});
	}
	
	returnSheep(array) {
		var currentSheep = this.state.remainingSheep;
		array.map((index) => {
			remainingSheep.push(array[i]);
		},this);
	}
	
	removePerson(i) {
		var namesArr = this.state.names;
		namesArr.splice(i, 1);
		this.state.names = namesArr;

		var scoresArr = this.state.scores;
		scoresArr.splice(i, 1);
		this.state.scores = scoresArr;

		var currentNum = this.state.numOfPeople;
		this.setState({
			numOfPeople: currentNum-1
		});
	}

	eachPerson(score, i) {
		return (
			<ScoreButtons key={i}
						  index={i}
						  onRemove={this.removePerson.bind(this)}
						  nameChange={this.nameUpdate.bind(this)}
						  scoreChange={this.scoreUpdate.bind(this)}
						  indivName={this.state.names[i]}
						  indivScore={this.state.scores[i]}/>
		)
	}

	renderNoSheep() {
		return (
			<div className="board">
				{this.state.names.map(this.eachPerson, this)}
				<Button className="btn btn-sm btn-success"
						onClick={this.addPerson.bind(this)}>
					<Glyphicon glyph="glyphicon glyphicon-plus"/>
				</Button>
				<Button className="btn btn-sm btn-info"
						onClick={this.toggleSheep.bind(this)}>
					<Glyphicon glyph="glyphicon glyphicon-piggy-bank"/>
				</Button>
			</div>
		)
	}
	
	eachSheepPerson(score, i) {
		return (
			<Sheep key={i}
				   index={i}
				   indivName={this.state.names[i]}
				   nameChange={this.nameUpdate.bind(this)}
				   scoreChange={this.scoreUpdate.bind(this)} 
				   remainingSheep={this.state.remainingSheep} 
				   returnSheep={this.returnSheep.bind(this)}/>
		)
	}
	
	renderWithSheep() {
		return (
			<div className="board">
				{this.state.names.map(this.eachPerson, this)}
				<div className="sheep-div">
					{this.state.names.map(this.eachSheepPerson, this)}
				</div>

				<div className="misc-div">
					<Button className="btn btn-sm btn-success"
							onClick={this.addPerson.bind(this)}>
						<Glyphicon glyph="glyphicon glyphicon-plus"/>
					</Button>

					<Button className="btn btn-sm btn-info"
							onClick={this.toggleSheep.bind(this)}>
						<Glyphicon glyph="glyphicon glyphicon-piggy-bank"/>
					</Button>
				</div>
				
			</div>
		)
	}
	
	render() {
		if(this.state.sheepEnabled){
			return(this.renderWithSheep())
		}
		else {
			return(this.renderNoSheep())
		}
	}
}
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

	scoreUpdate(changeFactor, i) {
		//Update the person's score based on a factor of change
		var scoresArr = this.state.scores;
		scoresArr[i] = scoresArr[i] + changeFactor;
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
	
	removePerson(i) {
		var namesArr = this.state.names;
		namesArr.splice(i, 1);

		var scoresArr = this.state.scores;
		scoresArr.splice(i, 1);

		var currentNum = this.state.numOfPeople;
		this.setState({
			numOfPeople: currentNum-1,
			names: namesArr,
			scores: scoresArr
		});
	}
	
	openLink() {
		//Opens when button is clicked
		window.open("https://github.com/lsweatman/CarcassonneScoreboard");
	}

	toggleSheep() {
		var currentSheepState = this.state.sheepEnabled;
		this.setState({
			sheepEnabled: !currentSheepState
		});
	}

	handleUpdateRemaining(newArray) {
		//Updates remain sheep from child component
		this.setState({
			remainingSheep: newArray
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

	//Only used when sheepEnabled is true
	eachSheepPerson(score, i) {
		return (
			<Sheep key={i}
				   index={i}
				   indivName={this.state.names[i]}
				   nameChange={this.nameUpdate.bind(this)}
				   scoreChange={this.scoreUpdate.bind(this)} 
				   remainingSheep={this.state.remainingSheep} 
				   updateRemaining={this.handleUpdateRemaining.bind(this)}/>
		)
	}
	
	renderWithSheep() {
		return (
			<div className="subboard">
				{this.state.names.map(this.eachPerson, this)}
				<div className="sheep-div">
					{this.state.names.map(this.eachSheepPerson, this)}
				</div>
			</div>
		)
	}
	
	render() {
		if(this.state.sheepEnabled){
			return(
				<div className="board">

					{this.renderWithSheep()}

					<div className="misc-div">
						<Button className="btn btn-sm btn-success misc-buttons"
								onClick={this.addPerson.bind(this)}>
							<Glyphicon glyph="glyphicon glyphicon-plus"/>
						</Button>

						<Button className="btn btn-sm btn-info misc-buttons sheep-icon"
								onClick={this.toggleSheep.bind(this)}>
						</Button>
					</div>

					<button className="footer-pin"
							onClick={this.openLink.bind(this)}>
						View on GitHub
					</button>
					
				</div>
			)
		}
		else {
			return (
				<div className="board">
					{this.state.names.map(this.eachPerson, this)}

					<div className="misc-div">
						<Button className="btn btn-sm btn-success misc-buttons"
								onClick={this.addPerson.bind(this)}>
							<Glyphicon glyph="glyphicon glyphicon-plus"/>
						</Button>

						<Button className="btn btn-sm btn-info misc-buttons sheep-icon"
								onClick={this.toggleSheep.bind(this)}>
						</Button>
					</div>

					<button className="footer-pin"
							onClick={this.openLink.bind(this)}>
						View on GitHub
					</button>

				</div>
			)
		}
	}
}
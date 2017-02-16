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
			remainingSheep: [0,0,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4],
			subSheepArray: [[],[],[]]
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
		//TODO: Rename stuff
		var namesArr = this.state.names;
		namesArr.push("");

		var scoresArr = this.state.scores;
		scoresArr.push(0);

		var subSheepArr = this.state.subSheepArray;
		subSheepArr.push([]);
		
		var currentNum = this.state.numOfPeople;

		this.setState({
			numOfPeople: currentNum+1,
			names: namesArr,
			scores: scoresArr,
			subSheepArray: subSheepArr
		});
	}

	toggleSheep() {
		var currentSheepState = this.state.sheepEnabled;
		this.setState({
			sheepEnabled: !currentSheepState
		});
	}
	
	returnSheep(array) {
		console.log(array);
		var currentSheep = this.state.remainingSheep;
		array.map((index) => {
			/*console.log(index);
			console.log(array[index]);*/
			this.state.remainingSheep.push(index);
			console.log(this.state.remainingSheep);
		},this);
	}
	
	handleSheepGenerate(i) {
		if (this.state.remainingSheep.length == 0) {
			window.alert("All sheep used. Gather only");
		}
		else {
			var randomVal = Math.floor(Math.random() * this.state.remainingSheep.length);
			//console.log(this.state.captiveSheep);
			
			if (this.state.remainingSheep[randomVal] !== 0) {
				//console.log(randomVal);
				
				//console.log(this.state.remainingSheep[randomVal]);
				
				var subSheepUpdater = this.state.subSheepArray;

				subSheepUpdater[i].push(this.state.remainingSheep[randomVal]);

				//console.log(this.state.subSheepArray[i]);
				//console.log(subSheepUpdater[i]);
				
				var updateRemaining = this.state.remainingSheep;
				updateRemaining.splice(randomVal, 1);
				
				this.setState({
					subSheepArray: subSheepUpdater,
					remainingSheep: updateRemaining
				});
				//Change
				//this.handleScoreChange(this.state.remainingSheep[randomVal]);
			}
			else {
				window.alert("A wolf has eaten your flock!");
				this.returnSheep(this.state.subSheepArray[i]);

                var subSheepWiper = this.state.subSheepArray;
                subSheepWiper[i] = [];

				this.setState({
					subSheepArray: subSheepWiper
				});
			}
		}
	}

	handleSheepGather(i) {
        this.returnSheep(this.state.subSheepArray[i]);
        var subSheepWiper = this.state.subSheepArray;
        subSheepWiper[i] = [];

        this.setState({
            subSheepArray: subSheepWiper
        });
	}

	removePerson(i) {
		var namesArr = this.state.names;
		namesArr.splice(i, 1);

		var scoresArr = this.state.scores;
		scoresArr.splice(i, 1);

		var subSheepArr = this.state.subSheepArray;
		subSheepArr.splice(i, 1);

		var currentNum = this.state.numOfPeople;
		this.setState({
			numOfPeople: currentNum-1,
			names: namesArr,
			scores: scoresArr,
            subSheepArray: subSheepArr
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
				   returnSheep={this.returnSheep.bind(this)}
				   handleGenerate={this.handleSheepGenerate.bind(this)}
				   handleGather={this.handleSheepGather.bind(this)}
				   subSheepArray={this.state.subSheepArray[i]}/>
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
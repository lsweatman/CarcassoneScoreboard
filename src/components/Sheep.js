import React from 'react';
import Button from 'react-bootstrap/lib/Button';

export default class Sheep extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			remainingSheep: this.props.remainingSheep,
			indivName: this.props.indivName,
			currentSheepArray: [],
			sheepScore: 0
		};
	}

	componentWillReceiveProps(nextProps) {
		//Rerendering on remaining sheep array prop change
		if (nextProps.indivName !== this.state.indivName) {
			this.setState({
				indivName: nextProps.indivName
			});
		}

		if (nextProps.remainingSheep !== this.state.remainingSheep) {
			this.setState({
				remainingSheep: nexpProps.remainingSheep
			});
		}
	}
	
	handleNameChange(evt) {
		//Updates name textbox and sends to parent
		this.setState({
			indivName: evt.target.value.substring(0,10)
		}, () => {
			this.props.nameChange(this.state.indivName, this.props.index);
		});
	}

	handleGather() {
		//Sends changefactor of sheepScore to parent function
		this.props.scoreChange(this.state.sheepScore, this.props.index);
		
		//Returns Sheep
        var updateRemaining = this.state.remainingSheep;
		this.state.currentSheepArray.map((indexValue) => {
			updateRemaining.push(indexValue);
		},this);
				
		this.props.updateRemaining(updateRemaining);
		
		//Resets values
		this.setState({
			sheepScore: 0,
			currentSheepArray: []
		});
	}

	handleGenerate() {
		
		if (this.state.remainingSheep.length == 0) {
			window.alert("All sheep used. Gather only");
		}
		else {
			var randomVal = Math.floor(Math.random() * this.state.remainingSheep.length);
			
			if (this.state.remainingSheep[randomVal] !== 0) {
				//Update state with generated sheep
				var currentSheepUpdate = this.state.currentSheepArray;
				currentSheepUpdate.push(this.state.remainingSheep[randomVal]);
				
				this.setState({
					currentSheepArray: currentSheepUpdate,
					sheepScore: this.state.sheepScore + this.state.remainingSheep[randomVal]
				});
				
				//Report sheep taken to parent
				var updateRemaining = this.state.remainingSheep;
				updateRemaining.splice(randomVal, 1);
				this.props.updateRemaining(updateRemaining);
			}
			else {
				window.alert("A wolf has eaten your flock!");
				
				//Return sheep to parent
				var updateRemaining = this.state.remainingSheep;
				this.state.currentSheepArray.map((indexValue) => {
					updateRemaining.push(indexValue);
				},this);
				
				this.props.updateRemaining(updateRemaining);
				
				//Reset component
				this.setState({
					sheepScore: 0,
					currentSheepArray: []
				});
			}
		}
	}
	
	render() {
		return (
			<div className="sub-sheep">
				<input type="text"
					   value={this.state.indivName}
					   onChange={this.handleNameChange.bind(this)}
					   className="sheep-element"/>

				<input type="text"
					   value={this.state.sheepScore}
					   className="sheep-element"/>

				<Button className="btn btn-primary sheep-element"
						onClick={this.handleGenerate.bind(this)}>
					Generate
				</Button>

				<Button className="btn btn-primary sheep-element"
								onClick={this.handleGather.bind(this)}>
							Gather
				</Button>
			</div>
		)
	}
}
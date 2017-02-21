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
		
        /*var totalSheep = nextProps.subSheepArray.reduce((a, b) => a + b, 0);
		this.setState({
			sheepScore: totalSheep
		});*/
	}
	
	handleNameChange(evt) {
		this.setState({
			indivName: evt.target.value.substring(0,10)
		}, () => {
			this.props.nameChange(this.state.indivName, this.props.index);
		});
	}

	handleGather() {
		this.props.scoreChange(this.state.sheepScore, this.props.index);
		
		//Returns Sheep
        var updateRemaining = this.state.remainingSheep;
		this.state.currentSheepArray.map((indexValue) => {
			updateRemaining.push(indexValue);
		},this);
				
		this.props.updateRemaining(updateRemaining);
				
		this.setState({
			sheepScore: 0,
			currentSheepArray: []
		});
	}

	handleGenerate() {
		//this.props.handleGenerate(this.props.index);
		
		if (this.state.remainingSheep.length == 0) {
			window.alert("All sheep used. Gather only");
		}
		else {
			var randomVal = Math.floor(Math.random() * this.state.remainingSheep.length);
			
			if (this.state.remainingSheep[randomVal] !== 0) {
				var currentSheepUpdate = this.state.currentSheepArray;

				currentSheepUpdate.push(this.state.remainingSheep[randomVal]);

				
				this.setState({
					currentSheepArray: currentSheepUpdate,
					sheepScore: this.state.sheepScore + this.state.remainingSheep[randomVal]
				});
				
				var updateRemaining = this.state.remainingSheep;
				updateRemaining.splice(randomVal, 1);
				this.props.updateRemaining(updateRemaining);
			}
			else {
				window.alert("A wolf has eaten your flock!");
				var updateRemaining = this.state.remainingSheep;
				this.state.currentSheepArray.map((indexValue) => {
					updateRemaining.push(indexValue);
				},this);
				
				this.props.updateRemaining(updateRemaining);
				
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
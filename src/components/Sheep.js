import React from 'react';
import Button from 'react-bootstrap/lib/Button';

export default class Sheep extends React.Component {
	constructor(props) {
		super(props);
		//var parentName = this.props.indivName;
		this.captiveSheep = this.props.subSheepArray;
		this.state = {
			indivName: this.props.indivName,
			remainingSheep: this.props.remainingSheep,
			sheepScore: 0
		};
	}

	handleNameChange(evt) {
		this.setState({
			indivName: evt.target.value.substring(0,10)
		}, () => {
			this.props.nameChange(this.state.indivName, this.props.index);
		});
	}

	handleGatherClick() {
		this.props.scoreChange(this.state.sheepScore, this.props.index);
		this.setState({
			sheepScore: 0
		});
		this.props.returnSheep(this.captiveSheep);
		this.captiveSheep = [];
	}
	
	//TODO change this to be in willrecieve
	handleScoreChange(changeFactor) {
		this.setState({
			sheepScore: this.state.sheepScore + changeFactor
		});
	}

	/*handleGenerateClick() {
		if (this.state.remainingSheep.length == 0) {
			window.alert("All sheep used. Gather only");
		}
		else {
			var randomVal = Math.floor(Math.random() * this.state.remainingSheep.length);
			console.log(this.captiveSheep);
			console.log(this.state.remainingSheep[randomVal]);
			
			if (randomVal !== 0) {
				this.captiveSheep.push(this.state.remainingSheep[randomVal]);
				this.handleScoreChange(this.state.remainingSheep[randomVal]);
			}
			else {	
				window.alert("A wolf has eaten your flock!");
				this.props.returnSheep(this.captiveSheep);
				this.setState({
					sheepScore: 0
				});
				this.captiveSheep = [];
			}
		}
	}*/
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.indivName !== this.state.indivName) {
			this.setState({
				indivName: nextProps.indivName
			});
		}
		/*if (nextProps.subSheepArray !== this.props.subSheepArray) {
			var addSheep = this.state.sheepScore + this.props.subSheepArray[this.props.subSheepArray.length - 1];
			this.setState({
				sheepScore: addSheep
			});
		}*/
	}

	handleGenerate() {
		this.props.handleGenerate(this.props.index);
	}
	
	render() {
		return (
			<div className="sub-sheep">
				<table style={{"width":"100px","height":"150px"}}>
					<tbody>
						<tr>
							<td className="tableAlign">
								<input type="text"
									   value={this.state.indivName}
									   style={{"width":"75px","height":"27px"}}
									   onChange={this.handleNameChange.bind(this)}/>
							</td>
						</tr>

						<tr>
							<td className="tableAlign">
								<input type="text"
									   value={this.state.sheepScore}
									   style={{"width":"45px","height":"27px"}}/>
							</td>
						</tr>

						<tr>
							<td className="tableAlign">
								<Button className="btn btn-primary" 
										onClick={this.handleGenerate.bind(this)}>
									Generate
								</Button>
							</td>
						</tr>

						<tr>
							<td className="tableAlign">
								<Button className="btn btn-primary" 
										onClick={this.handleGatherClick.bind(this)}>
									Gather
								</Button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
}
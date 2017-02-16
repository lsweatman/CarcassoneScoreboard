import React from 'react';
import Button from 'react-bootstrap/lib/Button';

export default class Sheep extends React.Component {
	constructor(props) {
		super(props);
		//var parentName = this.props.indivName;
		this.captiveSheep = this.props.subSheepArray;
		this.state = {
			indivName: this.props.indivName,
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
		this.props.handleGather(this.props.index);
	}
	
	//TODO change this to be in willrecieve
	handleScoreChange(changeFactor) {
		this.setState({
			sheepScore: this.state.sheepScore + changeFactor
		});
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.indivName !== this.state.indivName) {
			this.setState({
				indivName: nextProps.indivName
			});
		}

        var totalSheep = nextProps.subSheepArray.reduce((a, b) => a + b, 0);
		this.setState({
			sheepScore: totalSheep
		});
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
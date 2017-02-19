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
		this.props.handleGather(this.props.index);
	}
	
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
								onClick={this.handleGatherClick.bind(this)}>
							Gather
				</Button>
			</div>
		)
	}
}
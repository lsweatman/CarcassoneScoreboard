import React from 'react';
import Button from 'react-bootstrap/lib/Button';

export default class Sheep extends React.Component {
	constructor(props) {
		super(props);
		//var parentName = this.props.indivName;
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

	handleScoreChange(changeFactor) {
		this.setState({
			sheepScore: this.state.sheepScore + changeFactor
		}, () => {
			this.props.scoreChange(this.state.sheepScore, this.props.index);
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.indivName !== this.state.indivName) {
			this.setState({
				indivName: nextProps.indivName
			});
		}
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
								<Button className="btn btn-primary">Generate</Button>
							</td>
						</tr>

						<tr>
							<td className="tableAlign">
								<Button className="btn btn-primary"
										onClick={this.handleScoreChange.bind(this, 5)}>
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
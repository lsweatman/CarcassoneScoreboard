import React from 'react';
import Button from 'react-bootstrap/lib/Button';

export default class Sheep extends React.Component {
	constructor(props) {
		super(props);
		this.personName = this.props.personName;
		this.state = {
			sheepScore: 0
		};
	}
	
	render() {
		return (
			<div className="sub-sheep">
				<table style={{"width":"100px","height":"120px"}}>
					<tr>
						<td className="tableAlign">
							<textarea value={this.personName}
									  style={{"width":"75px","height":"27px"}}/>
						</td>
					</tr>

					<tr>
						<td className="tableAlign">
							<textarea value={this.state.sheepScore}
									  style={{"width":"45px","height":"27px"}}/>
						</td>
					</tr>

					<tr>
						<td className="tableAlign">
							<Button className="btn btn-danger">Generate</Button>
						</td>
					</tr>

				</table>
			</div>
		)
	}
}
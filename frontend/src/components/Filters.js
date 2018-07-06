import React from 'react';
import { connect } from 'react-redux';
import { Glyphicon, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

class Filters extends React.Component {
    state = {
		valueSelected: false,
		spicySelected: false,
		instaSelected: false,
		worstSelected: false,
    }

    componentDidMount() {
    }

	render() {
		return (
			<div className="filters-container">
				<div className="characteristic-icons">
					<div className="ot">
						<OverlayTrigger 
							overlay={<Tooltip>Good value for the $$</Tooltip>}
							delayHide={150}
						>
							<Button>
								<Glyphicon glyph="usd" />
							</Button>
						</OverlayTrigger>
					</div>
					<div className="ot">
						<OverlayTrigger 
							overlay={<Tooltip>Spicy!</Tooltip>}
							delayHide={150}
						>
							<Button>
								<Glyphicon glyph="fire" />
							</Button>
						</OverlayTrigger>
					</div>
					<div className="ot">
						<OverlayTrigger 
							overlay={<Tooltip>Instagrammable</Tooltip>}
							delayHide={150}
						>
							<Button>
								<Glyphicon glyph="camera" />
							</Button>
						</OverlayTrigger>
					</div>
					<div className="ot">
						<OverlayTrigger 
							overlay={<Tooltip>Inedible!</Tooltip>}
							delayHide={150}
						>
							<Button>
								<Glyphicon glyph="trash" />
							</Button>
						</OverlayTrigger>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	} 
}

export default connect(mapStateToProps, {  })(Filters);
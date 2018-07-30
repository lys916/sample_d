import React from 'react';
import { connect } from 'react-redux';
import { Glyphicon, Button } from 'react-bootstrap';
import styled, { css } from 'styled-components'
import { setRating } from '../actions';

const StyledGlyph = styled(Glyphicon)`
    color: white;
`;

const StyledButton = styled(Button)`
    background: lightgrey;
    ${props => props.chosen && css`
        background: palevioletred;
        :focus {
            background: palevioletred;
        }
    `}
`

class Rate extends React.Component {
    state = {
        chosen: [0, 0, 0, 0, 0],
        rated: 0,
        venueId: this.props.venueId,
        itemId: this.props.itemId,
    }

    handleClick = e => {
        e.stopPropagation();
        const { venueId, itemId } = this.state;
        const newChosen = this.state.chosen;
        const rating = +e.target.id + 1;
        for (let i = 0; i < rating; i++) {
            newChosen[i] = 1;
        }
        this.setState({ chosen: newChosen, rated : rating }, () => {
            const rated = this.state.rated;
            this.props.setRating({ itemId, venueId, rated });
        });
    }

	render() {
		return (
			<div className="rate-container">
                {this.state.chosen.map((e, i) => {
                    return (
                        <StyledButton key={i} id={i} onClick={this.handleClick} chosen={e} bsSize='xsmall'>
                            <StyledGlyph id={i} onClick={this.handleClick} glyph='star' />
                        </StyledButton>
                    )
                })}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {

	} 
}

export default connect(mapStateToProps, { setRating })(Rate);
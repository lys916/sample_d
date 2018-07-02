import React from 'react';
import { connect } from 'react-redux';
import { Glyphicon, Button } from 'react-bootstrap';
import styled, { css } from 'styled-components'

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
    }

    handleClick = e => {
        e.preventDefault();
        const newChosen = this.state.chosen;
        for (let i = 0; i < +e.target.id + 1; i++) {
            newChosen[i] = 1;
        }
        this.setState({ chosen: newChosen, rated : e.target.id });
    }

	render() {
		return (
			<div className="rate-container">
                {this.state.chosen.map((e, i) => {
                    return (
                        <StyledButton onClick={this.handleClick} key={i} id={i} chosen={e} bsSize='xsmall'>
                            <StyledGlyph onClick={this.handleClick} id={i} glyph='star' />
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

export default connect(mapStateToProps, {  })(Rate);
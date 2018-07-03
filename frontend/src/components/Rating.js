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
    ${props => props.chosen === 0.5 && css`
        background-image: 
            linear-gradient(
                to right,
                palevioletred,
                lightgrey 65%
            );
    `}
`

class Rating extends React.Component {
    state = {
        chosen: [0, 0, 0, 0, 0],
        rated: 3.43,
    }

    componentDidMount() {
        let rating = this.state.rated;
        const newChosen = this.state.chosen;
        for (let i = 0; i < newChosen.length; i++) {
            if (rating > 0.75) newChosen[i] = 1;
            else if (rating > 0.25) newChosen[i] = 0.5;
            else break;
            rating -= 1;
        }
        this.setState({ chosen: newChosen });
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

export default connect(mapStateToProps, {  })(Rating);
// External dependencies
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import i18n from 'i18n-calypso';

// Internal dependencies
import { redirect } from 'actions/routes';
import { isLoggedIn, isLoggedOut } from 'reducers/user/selectors';

function getDisplayName( WrappedComponent ) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default ( WrappedComponent, redirectTo ) => {
	class SignupEnforcer extends Component {
		componentWillMount() {
			// Redirect to signup page when logged out user wants to access the current page
			if ( this.props.isLoggedOut ) {
				this.props.redirectToSignup();
			}
		}

		componentWillReceiveProps( nextProps ) {
			// Redirect to home page when user gets logged out from the current page
			if ( ! this.props.isLoggedOut && nextProps.isLoggedOut ) {
				this.props.redirectToHome();
			}
		}

		render() {
			if ( ! this.props.isLoggedIn && ! this.props.isLoggedOut ) {
				return i18n.translate( 'Loading account information…' );
			}

			if ( this.props.isLoggedOut ) {
				return null;
			}

			return <WrappedComponent { ...this.props } />;
		}
	}

	SignupEnforcer.propTypes = {
		isLoggedIn: PropTypes.bool.isRequired,
		isLoggedOut: PropTypes.bool.isRequired,
		redirectToHome: PropTypes.func.isRequired,
		redirectToSignup: PropTypes.func.isRequired
	};

	SignupEnforcer.displayName = `SignupEnforcer(${ getDisplayName( WrappedComponent ) })`;

	return connect(
		state => ( {
			isLoggedIn: isLoggedIn( state ),
			isLoggedOut: isLoggedOut( state )
		} ),
		dispatch => ( {
			redirectToHome() {
				dispatch( redirect( 'home' ) );
			},
			redirectToSignup() {
				dispatch( redirect( 'signupUser', {
					queryParams: {
						redirect_to: redirectTo
					}
				} ) );
			}
		} )
	)( SignupEnforcer );
};

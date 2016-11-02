// External dependencies
import find from 'lodash/find';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const Suggestion = React.createClass( {
	propTypes: {
		isBestMatch: PropTypes.bool.isRequired,
		selectDomain: PropTypes.func.isRequired,
		suggestion: PropTypes.object.isRequired
	},

	selectDomain() {
		this.props.selectDomain( this.props.suggestion );
	},

	render() {
		const domainDetails = find( this.props.suggestion.details, { productSlug: 'delphin-domain' } );
		const { cost } = domainDetails;
		const applicationDetails = find( this.props.suggestion.details, { productSlug: 'delphin-domain-app' } );

		let applicationFee;
		if ( applicationDetails ) {
			applicationFee = applicationDetails.cost;
		}

		return (
			<li className={ styles.suggestion } onClick={ this.selectDomain }>
				<div className={ styles.suggestionInfo }>
					{ this.props.isBestMatch && (
						<div className={ styles.exactMatch }>{ i18n.translate( 'Best match' ) }</div>
					) }
					<div className={ styles.suggestionTitle } title={ this.props.suggestion.domainName }>
						{ this.props.suggestion.domainName }
					</div>
					<hr />
					<div className={ styles.cost }>
						{ i18n.translate( '%(cost)s per year', {
							args: { cost }
						} ) }
					</div>
					{ applicationFee && (
						<div className={ styles.applicationFeeMessage }>
							{ i18n.translate( '+ %(applicationFee)s early application fee', {
								args: { applicationFee }
							} ) }
						</div>
					) }
				</div>
				<div className={ styles.buyButton }>
					{ i18n.translate( 'Get started' ) }
				</div>
			</li>
		);
	}
} );

export default withStyles( styles )( Suggestion );

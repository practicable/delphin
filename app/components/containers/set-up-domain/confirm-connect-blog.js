// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import ConfirmConnectBlog from 'components/ui/set-up-domain/confirm-connect-blog';
import { getBlogType } from 'reducers/form/selectors';
import { logInToWpcom } from 'actions/wpcom-log-in';

export default connect(
	( state, ownProps ) => ( {
		blogType: getBlogType( state ),
		domainName: ownProps.params.domainName,
		hostName: ownProps.params.hostName,
	} ),
	dispatch => bindActionCreators( {
		logInToWpcom,
	}, dispatch )
)( ConfirmConnectBlog );
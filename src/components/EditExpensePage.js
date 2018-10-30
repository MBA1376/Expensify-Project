import React from 'react';

const EditExpensePage = (props) => {
	
	return (
		<div>
			this is from edit expense component {props.match.params.id}
		</div>
	);
}

export default EditExpensePage;
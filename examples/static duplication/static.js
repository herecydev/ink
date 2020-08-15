'use strict';
const React = require('react');
const {createStore} = require('redux');
const {render, Static, Box, Text} = require('../..');

const reducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_ITEM':
			return state.concat([action.text]);
		default:
			return state;
	}
};

const store = createStore(reducer);

const Example = ({items}) => (
	<Static items={items}>
		{(item, index) => (
			<Box key={index}>
				<Text color="green">✔ {item}</Text>
			</Box>
		)}
	</Static>
);

const Provider = () => {
	const [items, setItems] = React.useState([]);

	React.useEffect(() => {
		store.subscribe(() => {
			setItems(store.getState());
		});
	});

	return <Example items={items} />;
};

const instance = render(<Provider />);

store.dispatch({
	type: 'ADD_ITEM',
	text: 'foo'
});

setTimeout(() => {
	store.dispatch({
		type: 'ADD_ITEM',
		text: 'bar'
	});

	instance.unmount();
}, 1000);

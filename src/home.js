module.exports = [
	{
		type: 'header',
		text: {
			type: 'plain_text',
			text: 'Hi and welcome to Beacon :rotating_light:',
		},
	},
	{
		type: 'divider',
	},
	{
		type: 'section',
		text: {
			type: 'mrkdwn',
			text:
				`*Beacon* is an app that helps you flag that you're unwell when you can't hold a conversation or just don't have the energy.\n` +
				`It's a one-way communication tool that makes it easier for you to tell work you're out of action without having to worry about someone asking you questions by sending an automated message to people you select.\n\n\n` +
				`_Note: Beacon is the very *last resort* for you to let people know you're sick. If you can let them know directly: *Please do!*_\n\n\n` +
				`*What will happen when you click the _Send this out!_ button?*\n` +
				`*Beacon* will send a message to all the people you have tagged so they can be there for you and help you communicate.\n` +
				`_(Tip: select yourself in the list to see what is being sent out as a message)_\n` +
				`If you can, provide an optional message below to give context about your well-being.\n\n\n` +
				`We hope you feel better soon :chd:`,
		},
	},
	{
		type: 'input',
		element: {
			type: 'multi_users_select',
			placeholder: {
				type: 'plain_text',
				text: 'Select users',
				emoji: true,
			},
			action_id: 'users',
		},
		label: {
			type: 'plain_text',
			text: 'Squad Leader / Line Manager',
			emoji: true,
		},
	},
	{
		type: 'section',
		text: {
			type: 'mrkdwn',
			text: '_(Tag everyone who can help you communicate your absence like your Squad Leader)_',
		},
	},
	{
		type: 'input',
		element: {
			type: 'plain_text_input',
			multiline: true,
			action_id: 'text',
		},
		label: {
			type: 'plain_text',
			text: 'Provide context (optional)',
			emoji: true,
		},
	},
	{
		type: 'section',
		text: {
			type: 'mrkdwn',
			text: '_(Maybe include when you aim to be back or what the context is etc)_',
		},
	},
	{
		type: 'section',
		text: {
			type: 'plain_text',
			text: ' ',
			emoji: true,
		},
	},
	{
		type: 'actions',
		elements: [
			{
				type: 'button',
				style: 'primary',
				text: {
					type: 'plain_text',
					text: 'Send this out!',
					emoji: true,
				},
				action_id: 'submit_form',
			},
		],
	},
];

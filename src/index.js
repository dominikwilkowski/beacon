const { App } = require('@slack/bolt');
const cfonts = require('cfonts');
const path = require('path');

const pkg = require('../package.json');
const home = require('./home');

require('dotenv').config({ path: path.normalize(`${__dirname}/../.env`) });
const TOKEN = process.env.TOKEN;
const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;
const DEFAULT_USER = JSON.parse(process.env.DEFAULT_USER);
const PORT = process.env.PORT || 3000;

const app = new App({
	token: TOKEN,
	signingSecret: SLACK_SIGNING_SECRET,
});

// clone home and create a home view for when the message was sent successfully
const homeSuccess = JSON.parse(JSON.stringify(home));
homeSuccess[7].text.text = 'Signal sent. :feel-better:';

// Set the home page of the bot
app.event('app_home_opened', async ({ event, client }) => {
	try {
		await client.views.publish({
			user_id: event.user,
			view: {
				type: 'home',
				blocks: home,
			},
		});
		console.log(`[${new Date().toISOString()}] homepage requested`);
	} catch (error) {
		console.error(error);
	}
});

// handle form submit
app.action('submit_form', async ({ body, ack, client }) => {
	const sender = body.user;
	const values = body.view.state.values;
	let users;
	let text;

	Object.keys(values).forEach((key) => {
		if (values[key].users) {
			users = values[key].users.selected_users;
		}
		if (values[key].text) {
			text = values[key].text.value;
		}
	});

	await ack();
	console.log(
		`[${new Date().toISOString()}] alert from ${
			sender.name
		} received for ${users}`
	);

	await Promise.all(
		DEFAULT_USER.map(({ name, id }) =>
			client.chat.postMessage({
				text:
					`Hello ${name}, ${sender.name} (${sender.username}) has just used *The Beacon* :rotating_light: to alert you of their troubles.` +
					`\n\n` +
					(text ? `They added the below message:\n\n>>> ${text}` : ''),
				mrkdwn: true,
				channel: id,
			})
		)
	);

	await Promise.all(
		users.map((user) =>
			client.chat.postMessage({
				text:
					`${sender.name} (${sender.username}) has just used *The Beacon* :rotating_light: to alert you of their troubles.\n\n` +
					`Please follow up with:\n` +
					`- Their line manager\n` +
					`- Their Squad Leader\n` +
					`- Their project/client\n\n` +
					`_(Please don't reach out to them right now and give them space for now)_\n\n` +
					(text ? `They added the below message:\n\n>>> ${text}` : ''),
				mrkdwn: true,
				channel: user,
			})
		)
	);

	await client.views.update({
		view_id: body.view.id,
		hash: body.view.hash,
		view: {
			type: 'home',
			blocks: homeSuccess,
		},
	});

	setTimeout(async () => {
		await client.views.update({
			view_id: body.view.id,
			view: {
				type: 'home',
				blocks: home,
			},
		});
	}, 5000);
});

// Starts server
(async () => {
	await app.start(PORT || 3000);

	cfonts.say('Beacon', {
		font: 'simple',
		gradient: ['red', 'yellow'],
		space: false,
		align: 'center',
	});
	cfonts.say(`Beacon v${pkg.version} is running and listening on ${PORT}`, {
		font: 'console',
		gradient: ['red', 'yellow'],
		space: false,
		align: 'center',
	});
	console.log();
})();

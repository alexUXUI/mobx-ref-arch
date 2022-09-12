const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

try {
  // `who-to-greet` input defined in action metadata file
  console.log(`Hello!`);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);

  // run git log in exec
  const options = {};
  const output = '';
  options.listeners = {
    stdout: (data) => {
      console.log(data.toString());
      output += data.toString();
    },
  };
  await exec.exec(
    'git',
    ['log', '--name-only', '--pretty=format:"%H"'],
    options
  );
  core.setOutput('logs', output);
} catch (error) {
  core.setFailed(error.message);
}

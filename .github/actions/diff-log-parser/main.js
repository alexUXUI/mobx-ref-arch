const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

try {
  // `who-to-greet` input defined in action metadata file
  console.log(`Hello!`);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);

  const beforeCommit = github.context.payload.before;
  const afterCommit = github.context.payload.after;

  // run git log in exec
  const generateLog = async () => {
    let options = {};
    let output = '';
    options.listeners = {
      stdout: (data) => {
        console.log(data.toString());
        output += data.toString();
      },
    };

    const diffString = `${afterCommit}...${beforeCommit}`;

    await exec.exec(
      'git',
      ['log', diffString, '--pretty=format:"%s"'],
      options
    );
    core.setOutput('logs', output);
    console.log(output);
  };

  generateLog();
} catch (error) {
  core.setFailed(error.message);
}

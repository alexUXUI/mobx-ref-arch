const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

async function run() {
  try {
    // core.setOutput('commits', github.context.payload.commits);

    const beforeCommit = github.context.payload.before;
    const afterCommit = github.context.payload.after;
    const diffString = `${beforeCommit}..${afterCommit}`;

    const generateLog = async () => {
      let options = {};
      let output = '';
      options.listeners = {
        stdout: (data) => {
          console.log(data.toString());
          output += data.toString();
        },
      };

      console.log('COMMITS');
      console.log(github.context.payload.commits);

      let commitString = '';

      github.context.payload.commits.forEach((commit) => {});

      await exec.exec(
        'git',
        ['log', '--pretty=format:"%s %n %b"', diffString],
        options
      );

      core.setOutput('execLog', output);
      core.debug(`beforeCommit: ${beforeCommit}`);
      core.debug(`afterCommit: ${afterCommit}`);
      console.log(
        `github.context.payload: ${JSON.stringify(github.context.payload)}`
      );
      core.debug('execLog');
      core.debug(output);

      core.setOutput('commits', output);
    };

    generateLog();
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

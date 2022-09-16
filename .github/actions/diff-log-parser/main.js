const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

async function run() {
  try {
    core.setOutput('commits', JSON.stringify(github.context.payload.commits));

    const generateLog = async () => {
      let options = {};
      let output = '';
      options.listeners = {
        stdout: (data) => {
          console.log(data.toString());
          output += data.toString();
        },
      };

      const beforeCommit = github.context.payload.before;
      const afterCommit = github.context.payload.after;
      const diffString = `${beforeCommit}..${afterCommit}`;

      console.log('COMMITS');
      console.log(github.context.payload.commits);

      github.context.payload.commits.forEach((commit) => {
        console.log('commit 🔥');
        console.log(commit);
      });

      await exec.exec(
        'git',
        ['log', '--pretty=format:%h - %an - %s', diffString],
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
    };

    generateLog();
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

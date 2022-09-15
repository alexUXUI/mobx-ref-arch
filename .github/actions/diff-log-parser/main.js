const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');
const simpleGit = require('simple-git');

async function run() {
  try {
    const git = simpleGit();

    const tags = await git.tags();

    const previousTag =
      tags.all.length < 2 ? undefined : tags.all[tags.all.length - 2];
    const latestTag =
      tags.all.length < 1 ? undefined : tags.all[tags.all.length - 1];

    const commits = await git.log({
      from: previousTag,
      to: latestTag,
      format: {
        abbrev: '%h',
        author: '@%an',
        message: '%s',
      },
      splitter: '\n',
      multiLine: false,
    });

    let textLog = '';
    let markdownLog = '';

    for (const commit of commits.all) {
      textLog += `${commit.abbrev} - ${commit.author} - ${commit.message}\n`;
      markdownLog += `[\`${commit.abbrev}\`](${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/commit/${commit.abbrev}) ${commit.author} - ${commit.message}\n`;
    }

    core.info(`previousTag: ${previousTag}`);
    core.info(`latestTag: ${latestTag}`);
    core.info(textLog);

    core.setOutput('previousTag', previousTag);
    core.setOutput('latestTag', latestTag);
    core.setOutput('log', textLog);
    core.setOutput('markdownLog', markdownLog);
    core.setOutput('commits', JSON.stringify(commits));

    /// other appraoch

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

      const beforeCommit = github.context.payload.before;
      const afterCommit = github.context.payload.after;
      console.log(`beforeCommit: ${beforeCommit}`);
      console.log(`afterCommit: ${afterCommit}`);
      console.log(
        `github.context.payload: ${JSON.stringify(github.context.payload)}`
      );
      console.log(github.context);
      core.debug(`beforeCommit: ${beforeCommit}`);
      core.debug(`afterCommit: ${afterCommit}`);
      core.debug(github.context.payload);
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
      console.log(output);
    };

    generateLog();
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

// try {
//   // `who-to-greet` input defined in action metadata file
//   console.log(`Hello!`);
//   // Get the JSON webhook payload for the event that triggered the workflow
//   const payload = JSON.stringify(github.context.payload, undefined, 2);
//   console.log(`The event payload: ${payload}`);

//   const beforeCommit = github.context.payload.before;
//   const afterCommit = github.context.payload.after;

//   // run git log in exec
//   const generateLog = async () => {
//     let options = {};
//     let output = '';
//     options.listeners = {
//       stdout: (data) => {
//         console.log(data.toString());
//         output += data.toString();
//       },
//     };

//     const diffString = `${afterCommit}...${beforeCommit}`;

//     await exec.exec('git', ['log', '-n 5 --pretty=format:"%s"'], options);
//     core.setOutput('logs', output);
//     console.log(output);
//   };

//   generateLog();
// } catch (error) {
//   core.setFailed(error.message);
// }

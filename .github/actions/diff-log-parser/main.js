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
    core.setOutput('commits', commits);
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

const chalk = require('chalk');

function delay(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

setInterval(() => {}, 10000); // Keep node from exiting

const NODEMON_SIGNAL = 'SIGUSR2';
function bindToShutdownSignals() {

  process.once(NODEMON_SIGNAL, async () => {
    console.log(chalk.yellow('Recieved signal...'));
    await delay(5000);
    console.log(chalk.yellow('Sending kill...'));
    process.kill(process.pid, NODEMON_SIGNAL);
  });

  process.on('exit', (code) => {
    process.stdout.write(chalk.red(`Process stopped with code ${code}.\n`));
  });
}

console.log(chalk.greenBright('Process started.'));

bindToShutdownSignals();

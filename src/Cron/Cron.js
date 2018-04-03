const CronJob = require('cron').CronJob;

const job = new CronJob({
  cronTime: '0 */4 * * *',
  onTick: function() {
    // Func to execute
  },
  start: true,
  timezone: 'Eastern European Summer Time'
});
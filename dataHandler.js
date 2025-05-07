const DB = require('./data/logs.js')

function cleanupOldRecords() {
    const tenMinutesAgo = Date.now() - 10 * 60 * 1000
    
    DB.deleteMany({ When: { $lte: tenMinutesAgo } })
      .then(result => {
        console.log(`Deleted ${result.deletedCount} records older than 10 minutes`)
      })
      .catch(err => {
        console.error('Error cleaning up old records:', err)
    })
}

setInterval(cleanupOldRecords, 300000)
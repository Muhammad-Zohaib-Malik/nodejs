const { workerData, parentPort, threadId } = require("worker_threads");
const threadData = { workerData, parentPort, threadId };
console.log("c file started");
for (let i = 0; i < 10000000000; i++) {
  if (i % 4000000000 == 0) {
    console.log(`Running loop 3 ${i}`);
  }
}

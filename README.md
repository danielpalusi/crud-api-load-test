This repos is for load test project, local server using node.js, load test using k6

How to run:
- Install k6, if you are using macOS try install it using brew (so you dont have to set the PATH)
- Clone the repo
- Open terminal, run "npm install"
- Run "node ./node-server/server.js" to run the local server
- Open other terminal, run "k6 run ./k6-scripts/load-test.js"
- Done

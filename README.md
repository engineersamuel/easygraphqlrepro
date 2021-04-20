# Introduction

This repository reproduces the [easygraphql-test issues/142](https://github.com/EasyGraphQL/easygraphql-tester/issues/142) where when providing a fixture the error is thrown `TypeError: Cannot read property 'type' of undefined`.

## Reproducing

Node v15 is being used, but likely doesn't matter

```text
npm i
npm run test
```

### Output

```text
(base) ➜  easygraphqlrepro npm run test

> easygraphqlrepro@1.0.0 test
> env TS_NODE_COMPILER_OPTIONS='{"module": "commonjs" }' mocha -r ts-node/register '*.test.ts'



  query directories
    ✓ valid directories query
    1) valid directories query response


  1 passing (36ms)
  1 failing

  1) query directories
       valid directories query response:
     TypeError: Cannot read property 'type' of undefined
      at validateFixture (node_modules/easygraphql-tester/utils/fixture.js:46:27)
      at validateFixture (node_modules/easygraphql-tester/utils/fixture.js:95:19)
      at /Users/smendenh/projects/easygraphqlrepro/node_modules/easygraphql-tester/utils/fixture.js:54:16
      at Array.map (<anonymous>)
      at validateFixture (node_modules/easygraphql-tester/utils/fixture.js:50:22)
      at validateFixture (node_modules/easygraphql-tester/utils/fixture.js:72:21)
      at /Users/smendenh/projects/easygraphqlrepro/node_modules/easygraphql-tester/utils/fixture.js:14:31
      at Array.forEach (<anonymous>)
      at setFixture (node_modules/easygraphql-tester/utils/fixture.js:7:17)
      at mock (node_modules/easygraphql-tester/utils/mock.js:63:17)
      at Tester.mock (node_modules/easygraphql-tester/lib/tester.js:52:12)
      at Context.<anonymous> (repro.test.ts:109:33)
      at processImmediate (node:internal/timers:463:21)
```

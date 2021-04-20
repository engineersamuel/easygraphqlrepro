// 'use strict' 

// import EasyGraphQLTester from 'easygraphql-tester';
// import fs from 'fs';
// import path from 'path';

// const userSchema = fs.readFileSync(path.join(__dirname, 'schema.gql'), 'utf8')

// const tester = new EasyGraphQLTester(userSchema)

import { expect } from 'chai';
import EasyGraphQLTester from 'easygraphql-tester';
import fs from 'fs';
import path from 'path';
// import { StorageAccount } from '../../src/models/storageAccount';

// export type DataFixture<T> = {
//     data: {[name: string]: T};
// }
const visualizerSchema = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')

const storageAccounts = [
    {
        name: 'Storage Account 1'
    }
];
const resolvers = {
  Query: {
    storageAccounts: () => {
      return storageAccounts;
    },
    storageAccount: (_, args) => {
      return storageAccounts.find((storageAccount) => storageAccount.name === args.storageAccountName);
    },
  },
  StorageAccount: {
    directories: (storageAccount, args, context) => {
        return [
            {
                name: 'a'
            },
            {
                name: 'a/b'
            }
        ]
    },
  },
};

const directoriesFixture = {
    data: {
        storageAccount: {
            name: 'Storage Account 1',
            directories: [
                {
                    name: 'a',
                    storageAccountName: 'Storage Account 1'
                },
                {
                    name: 'a/b',
                    storageAccountName: 'Storage Account 1'
                }
            ]
        }
    }
}
// https://github.com/EasyGraphQL/easygraphql-tester
describe('query directories', () => { // the tests container

    let tester: EasyGraphQLTester;

    before(() => {
        tester = new EasyGraphQLTester(visualizerSchema, resolvers);
    })

    it(`valid directories query`, () => {

        const query = `
            query Query($storageAccountName: String!, $pathName: String) {
                storageAccount(storageAccountName: $storageAccountName) {
                    name
                    directories(matches: $pathName) {
                        name
                    }
                }
            }
        `;

        tester.test(true, query, {
            storageAccountName: 'Storage Account 1',
            pathName: ''
        });
    });

    it('valid directories query response', () => {

        const query = `
            query Query($storageAccountName: String!, $pathName: String) {
                storageAccount(storageAccountName: $storageAccountName) {
                    name
                    directories(matches: $pathName) {
                        name
                    }
                }
            }
        `

        tester.setFixture(directoriesFixture, { autoMock: false});
        const { data } = tester.mock({ 
            query, 
            variables: {
                storageAccountName: 'Storage Account A',
                pathName: 'a/b'
            }
        });
        expect(data.storageAccount.directories).to.have.lengthOf(3);
        expect(data.storageAccount.directories[0].name).to.equal('a');
        expect(data.storageAccount.directories[1].name).to.equal('a/b');
        tester.clearFixture();
    });

});
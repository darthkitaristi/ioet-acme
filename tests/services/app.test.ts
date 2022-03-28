import { expect } from 'chai';
let AppService = require('../../src/services/app');

describe('App test', () => {
    it('it should show the correct result of first result', async() => {
        const app = new AppService(); 
        await app.generateTable(); 
        const table = app.outputTable;
        const tableExpect = 'RENE-ASTRID=2'
        expect(table[0]).to.equal(tableExpect);
    });

    it('it should show the correct of second result', async() => {
        const app = new AppService(); 
        await app.generateTable(); 
        const table = app.outputTable;
        const tableExpect = 'RENE-ANDRES=2'
        expect(table[1]).to.equal(tableExpect);
    });

    it('it should show the correct of the last result', async() => {
        const app = new AppService(); 
        await app.generateTable(); 
        const table = app.outputTable;
        const tableExpect = 'ASTRID-ANDRES=3'
        expect(table[2]).to.equal(tableExpect);
    });
});
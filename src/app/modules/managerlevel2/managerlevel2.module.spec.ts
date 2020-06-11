import { Managerlevel2Module } from './managerlevel2.module';

describe('Managerlevel2Module', () => {
  let managerlevel2Module: Managerlevel2Module;

  beforeEach(() => {
    managerlevel2Module = new Managerlevel2Module();
  });

  it('should create an instance', () => {
    expect(managerlevel2Module).toBeTruthy();
  });
});

import { HrManagerModule } from './hr-manager.module';

describe('HrManagerModule', () => {
  let hrManagerModule: HrManagerModule;

  beforeEach(() => {
    hrManagerModule = new HrManagerModule();
  });

  it('should create an instance', () => {
    expect(hrManagerModule).toBeTruthy();
  });
});

import { DeviceConfiguarationPage } from './app.po';

describe('device-configuaration App', () => {
  let page: DeviceConfiguarationPage;

  beforeEach(() => {
    page = new DeviceConfiguarationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

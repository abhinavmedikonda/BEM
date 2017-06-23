import { browser, element, by } from 'protractor';

export class DeviceConfiguarationPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}

import { WachtplanerPage } from './app.po';

describe('wachtplaner App', function() {
  let page: WachtplanerPage;

  beforeEach(() => {
    page = new WachtplanerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

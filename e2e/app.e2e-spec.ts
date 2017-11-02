import { CampusOnlinePage } from './app.po';

describe('campus-online App', function() {
  let page: CampusOnlinePage;

  beforeEach(() => {
    page = new CampusOnlinePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

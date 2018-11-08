import PageLayout from '@/layouts/PageLayout'
import content from './view';

const PAGE_NAME = 'about';

const render = data => {
  return content(data);
}

export default new PageLayout({
  pageTitle: PAGE_NAME,
  current: `${PAGE_NAME}.html`
}).render(render);
import {
  parseWords,
  parseAddition,
  parseOrder,
  parseCombination,
} from './utils.js';

export default {
  async fetch(request) {
    const requestUrl = new URL(request.url);

    if (requestUrl.pathname === '/favicon.ico') {
      const response = await fetch(
        'https://static-assets.dev.boise.vacasait.com/icon/favicon-light/favicon.ico',
      );
      return new Response(response.body, { status: 200 });
    }

    const { searchParams } = requestUrl;
    const qParam = searchParams.get('q') || '';
    const { length, 0: first, [length - 1]: last } = qParam;

    if (!qParam)
      return Response.redirect(
        'https://github.com/THernandez03/vacasa.test',
        303,
      );

    if (qParam === 'PING') return new Response('PONG', { status: 200 });
    if (qParam === 'What is your name?')
      return new Response('Tomás Hernández', { status: 200 });
    if (qParam === 'What is your quest?')
      return new Response('coding', { status: 200 });
    if (qParam === 'Source code for this exercise?')
      return new Response('https://github.com/THernandez03/vacasa.test', {
        status: 200,
      });

    if (last === '?')
      return new Response(parseAddition(qParam), { status: 200 });
    if (first === '<' && last === '>')
      return new Response(parseCombination(qParam), { status: 200 });
    if (/[=-><]/gimu.test(qParam))
      return new Response(parseOrder(qParam), { status: 200 });

    return new Response(parseWords(qParam), { status: 200 });
  },
};

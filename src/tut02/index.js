import * as Rx from 'rxjs';
import $ from 'jquery';
import { buffer } from 'rxjs/operators';

const bufferApp = () => {
  const interval$ = Rx.Observable.interval(1000);
  const buttonEl = $('#tut02')
    .children('button')
    .get(0);
  const bufferBy = Rx.Observable.fromEvent(buttonEl, 'click');
  const bufferedInterval$ = interval$.pipe(buffer(bufferBy));

  const subscribe = bufferedInterval$.subscribe(val => console.log(' Buffered Values:', val));
};
const App = () => {
  bufferApp();
  const buttonEl = $('#tut02')
    .children('button')
    .get(0);

  const label = $('#tut02')
    .children('label')
    .get(0);

  const clickStream$ = Rx.Observable.fromEvent(buttonEl, 'click');

  const doubleClickStream$ = clickStream$.buffer(() => clickStream$.throttle(250)).map(arr => {
    console.log('arr', arr);
    return arr.length;
  });

  doubleClickStream$.subscribe(event => {
    label.textContent = 'Double Click';
  });
  doubleClickStream$.throttle(1000).subscribe(suggestion => {
    label.textContent = '-';
  });
};

export default App;

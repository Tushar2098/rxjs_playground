import * as Rx from 'rxjs';
import $ from 'jquery';
import logger from '../utils/logger';

const App = () => {
  const startBtn = $('#tut05 #start').get(0);
  const halfBtn = $('#tut05 #half').get(0);
  const quarterBtn = $('#tut05 #quarter').get(0);
  const stopBtn = $('#tut05 #stop').get(0);
  const resetBtn = $('#tut05 #reset').get(0);
  const inputEl = $('#tut05 input').get(0);

  const startStream$ = Rx.Observable.fromEvent(startBtn, 'click');
  const halfStream$ = Rx.Observable.fromEvent(halfBtn, 'click');
  const quarterStream$ = Rx.Observable.fromEvent(quarterBtn, 'click');
  const stopStream$ = Rx.Observable.fromEvent(stopBtn, 'click');
  const resetStream$ = Rx.Observable.fromEvent(resetBtn, 'click');

  const initialData = { count: 0 };

  const inc = acc => ({ count: acc.count + 1 });
  const onReset = () => initialData;
  const intervalActions$ = time =>
    Rx.Observable.merge(
      Rx.Observable.interval(time)
        .takeUntil(stopStream$)
        .mapTo(inc),
      resetStream$.mapTo(onReset)
    );

  const starter$ = Rx.Observable.merge(startStream$.mapTo(1000), halfStream$.mapTo(500), quarterStream$.mapTo(250));
  const inputEvt$ = Rx.Observable.fromEvent(inputEl, 'input');

  const timer$ = starter$
    .switchMap(time => intervalActions$(time))
    .startWith(initialData)
    .scan((acc, curr) => curr(acc));
  const input$ = inputEvt$.map(e => e.target.value);

  // One way
  // Rx.Observable.combineLatest(timer$, input$)
  //   .map(arr => ({ count: arr[0].count, text: arr[1] }))
  //   .subscribe(x => logger(x));

  // Another way
  // Getting rid of `map`, and pass xformer fn as a third arg
  Rx.Observable.combineLatest(timer$, input$, (timer, text) => ({ count: timer.count, text })).subscribe(x =>
    logger(x)
  );
};
export default App;

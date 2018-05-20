import * as Rx from 'rxjs';
import $ from 'jquery';
import logger from '../utils/logger';

const App = () => {
  const startBtn = $('#tut04 #start').get(0);
  const halfBtn = $('#tut04 #half').get(0);
  const quarterBtn = $('#tut04 #quarter').get(0);
  const stopBtn = $('#tut04 #stop').get(0);
  const resetBtn = $('#tut04 #reset').get(0);

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

  starter$
    .switchMap(time => intervalActions$(time))
    .startWith(initialData)
    .scan((acc, curr) => curr(acc))
    .subscribe(x => logger(x), err => logger(err, undefined, 'ERROR'), () => logger('Completed!!'));
};

export default App;

// NOTES
/*--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
1.  What if we want to show inital value on pageLoad?
    Line 56
2.  StopWatch code                                       
    Line 23
3.  What if I want to switch back to different strems conditionally?
    Line 21
--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---*/

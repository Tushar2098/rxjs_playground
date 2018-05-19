import * as Rx from 'rxjs';
import $ from 'jquery';

const App = () => {
  const startBtn = $('#tut03 #start').get(0);
  const stopBtn = $('#tut03 #stop').get(0);
  const resetBtn = $('#tut03 #reset').get(0);

  const startStream$ = Rx.Observable.fromEvent(startBtn, 'click');
  const stopStream$ = Rx.Observable.fromEvent(stopBtn, 'click');
  const resetStream$ = Rx.Observable.fromEvent(resetBtn, 'click');

  const initialData = { count: 0 };

  const dateInterval$ = Rx.Observable.interval(1000).map(() => new Date());
  const countInterval$ = Rx.Observable.interval(1000);
  const intervalThatStops$ = countInterval$.takeUntil(stopStream$);

  const inc = acc => ({ count: acc.count + 1 });
  const onReset = () => initialData;
  const incOrReset$ = () => Rx.Observable.merge(intervalThatStops$.mapTo(inc), resetStream$.mapTo(onReset));

  // startStream$
  //   .switchMap(() => dateInterval$.takeUntil(stopStream$))
  //   .subscribe(x => console.log(x), err => console.log('Error ', err), () => console.log('Completed!!'));

  /*
  ---------00---------01---------02---------03---------04---------05...
                            mapTo(inc)
  ---------Fn---------Fn---------Fn---------Fn---------Fn---------Fn..
                            startWith({count:0})
  ---------D---------Fn---------Fn---------Fn---------Fn---------Fn---------Fn..
                            scan
  ---------{count:0}---------{count:1}---------{count:2}---------{count:3}---------{count:4}---------{count:5}...

  */

  /*
  ---------00---------01---------02---------03---------04---------05... 
                              mapTo(inc)
  ---------IN---------IN--------------------IN---------IN---------IN...
                              mapTo(reset)
  -------------------------------RT--------------------RT-----------...
                              merge(inc,reset)
  ---------IN---------IN---------RT----------IN--------RT---------IN...
                              startWith
  ---------D---------IN---------IN---------RT----------IN--------RT---------IN...
                              scan
  ---------{count:0}---------{count:1}---------{count:2}---------{count:0}---------{count:1}---------{count:0}..
  
  */

  // persisting the count value using `scan` on start and stop
  startStream$
    .switchMap(incOrReset$)
    .startWith(initialData)
    .scan((acc, curr) => curr(acc))
    // no need to provide the seed value to scan. Since startWith
    // will pass the initialData to acc.
    .subscribe(x => console.log(x), err => console.log('Error ', err), () => console.log('Completed!!'));
};

/*
Before adding reset Functionality
----------------------------------
startStream$
    .switchMap(() => countInterval$.takeUntil(stopStream$))
    .mapTo(inc)
    .startWith(initialData)
    .scan((acc, curr) => curr(acc))
*/
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

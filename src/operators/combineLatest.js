import * as Rx from 'rxjs';

const App = () => {
  const foo = Rx.Observable
                .interval(500)
                .take(4);

  const more = Rx.Observable
                .interval(300)
                .take(5);
  /*
  ------0------1------2------(3|)         => foo
  ---0---1---2---3---(4|)                 => more 
  combineLatest((x,y)=>x+y)               => functions as AND
  -----0-1---2-3-4---56------(7|)         => bar    
  */

  const bar = Rx.Observable.combineLatest(foo, more, (x, y) => x + y);
  bar.subscribe(
      x => console.log('next ', x), 
      err => console.log('error ', error), 
      () => console.log('Completed')
    );
};

export default App;

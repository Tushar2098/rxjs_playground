import * as Rx from 'rxjs';

const App = () => {
  const foo = Rx.Observable
                .interval(400)
                .take(10)
                .skipLast(3);

  const bar = Rx.Observable
                .interval(400)
                .take(10)
                .takeLast(3);
/*  
    Rx.Observable.interval(400).takeLast(1);
                ===
    Rx.Observable.interval(400).last();
*/

/*
--0--1--2--3--4--5--6--7--8--9|
    skipLast(3)
--0--1--2--3--4--5--6--7------|    => foo
    takeLast(3)
-----------------------7--8--9|   => bar
*/

  bar.subscribe(
      x => console.log('next ', x), 
      err => console.log('error ', error), 
      () => console.log('Completed')
    );
};

export default App;

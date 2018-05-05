import * as Rx from 'rxjs';

const App = () => {
  const foo = Rx.Observable
                .interval(400)
                .take(4);

  const more = Rx.Observable.of(4, 5, 6, 7, 8, 9);
                
/*  
    bar = Rx.Observable.concat(foo, bar);
                ===
    bar = foo.concat(bar);
*/

/*
--0--1--2--3--4--5--6--7--8--9... 
    take(4)
--0--1--2--3|           => foo
            (456789|)   => more
    concat
--0--1--2--3(456789|)   => bar {concatinating at last}
(456789|)
        startWith
(456789|)--0--1--2--3   => prefix {concatinating at beginning}

*/

  const bar = foo.concat(more);
  const prefix = more.concat(foo); // foo.startWith(more)
  bar.subscribe(
      x => console.log('next ', x), 
      err => console.log('error ', error), 
      () => console.log('Completed')
    );
};

export default App;

import * as Rx from 'rxjs';

const App = () => {
  const foo = Rx.Observable.interval(400).take(10);
/*  Rx.Observable.interval(400).take(1);
                ===
    Rx.Observable.interval(400).first();
*/

/*
--0--1--2--3--4--5--6--7--8--9--10|
    filter(x => x % 2 === 0)
--0-----2-----4-----6-----8-----10|    
*/
  const bar = foo.filter(x => x % 2 === 0);
  bar.subscribe(
      x => console.log('next ', x), 
      err => console.log('error ', error), 
      () => console.log('Completed')
    );

  // const foo = Rx.Observable.interval(400).skip(5);
/*
--0--1--2--3--4--5--6--7--8--9--10|
        skip(5)
--------------------6--7--8--9--10|    
*/
};

export default App;

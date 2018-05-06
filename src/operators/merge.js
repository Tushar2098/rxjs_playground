import * as Rx from 'rxjs';

const App = () => {
  const foo = Rx.Observable
                .interval(500)
                .take(4);

  const more = Rx.Observable
                .interval(300)
                .take(5);
  // Merge is used for parallel execution of multiple observable

  /*
  ----0----1----2----(3|)         => foo
  --0--1--2--3--(4|)              => more 
        merge(OR operator)        => functions as OR
  --0-01--21--3--(24|)-(3|)       => bar    
  */

  const bar = foo.merge(more);
 
  /*  
    bar = Rx.Observable.merge(foo, more);
                ===
    bar = foo.merge(more);
  */
  bar.subscribe(
      x => console.log('next ', x), 
      err => console.log('error ', error), 
      () => console.log('Completed')
    );
};

export default App;

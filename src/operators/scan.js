import * as Rx from 'rxjs';

const App = () => {
  const greet = Rx.Observable
                .interval(500)
                .take(5)
                .zip(Rx.Observable.of('h', 'e', 'l', 'l', 'o'), (_,c) => c)
                .scan((acc, value) => acc + value, '');
                
// combineLatest -----| 
// merge              |--> Vertical Ops 
// withLatestFrom ----|

// scan --------------|--> Horizontal Ops
  greet.subscribe(
      x => console.log('next ', x), 
      err => console.log('error ', err), 
      () => console.log('Completed')
    );
};

export default App;

import * as Rx from 'rxjs';

const App = () => {
  const greet = Rx.Observable
                .interval(500)
                .take(5)
                .zip(Rx.Observable.of('h', 'e', 'l', 'l', 'o'),(_,c)=>c);

  const binary = Rx.Observable
                  .interval(300)
                  .take(7)
                  .zip(Rx.Observable.of(1, 0, 0, 1, 0, 0, 1, 0, 1, 0),(_,x)=>x);
                
  /*
  ------h------e------l------l------o|      => greet
  ----1----0----0----1----0----0----1|      => binary 
  combineLatest((x,y)=>x+y)                 => functions as AND
  -----H-h---h-e-E---el--l---lL-0           => bar    

  withLatestFrom
  ---H--------e-------L------l------O|      => bar 
  */

  const bar = greet.withLatestFrom(binary, (char,val) => val ? char.toUpperCase() : char );
  bar.subscribe(
      x => console.log('next ', x), 
      err => console.log('error ', err), 
      () => console.log('Completed')
    );
};

export default App;

import * as rx from 'rxjs';
const App = () => {
  const source$ = rx.Observable.interval(400)
    .take(7)
    .map(i => ['1', '4', '15', 'foo', '77', 'bar', '81'][i])
    .map(i => parseInt(i))
    .filter(i => !isNaN(i))
    .reduce((acc, value) => acc + value);
  source$.subscribe(x => console.log(x));
};

export default App;

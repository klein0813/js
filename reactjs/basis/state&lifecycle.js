/**
 * Demo
 */
class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {date: new Date()}
  }
    
  componentDidMount () { //在组件已经被渲染到 DOM 中后运行
    this.timerID = setInterval(() => this.setState({
      date: new Date()
    }), 1000);
  }
    
  componentWillUnmount () { // 在组件从 DOM 中被移除后运行
    clearInterval(this.timerID);
  }
  
  render () {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
  
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);

/**
  * 因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态
 */
class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 0
    }
  }
  
  componentDidMount () {
// this.setState({  wrong
//   counter: this.state.counter + this.props.increment,
// });

// Correct
  this.setState((state, props) => Object({counter: state.counter + props.increment}))

  // Correct
// this.setState(function(state, props) {
//   return {
//     counter: state.counter + props.increment
//   };
// });
  }

  render() {
    return (
      <h1>{this.state.counter}</h1>
    )
  }
}

ReactDOM.render(<Demo increment={4} />, document.getElementById("root"))

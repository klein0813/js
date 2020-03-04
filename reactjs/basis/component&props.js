function Welcome (props) {
    return (
      <h1>Hello {props.name}</h1>
    )
  }
  
  // function App () {
  //   return (
  //     <div>
  //         <Welcome name="Sara" />
  //     <Welcome name="Dam" />
  //     <Welcome name="kalay" />
  //     </div>
  //   )
  // }
  
  class App extends React.Component {
    render() {
      console.log(this.props)
      return (
        <div>
          <h2>{this.props.date.toLocaleTimeString()}</h2>
          {Welcome({name: 'Sala'})}
          {Welcome({name: 'Dam'})}
          {Welcome({name: 'Kalay'})}
        </div>
      )
    }
  }
  
  ReactDOM.render(<App date={new Date()}/>, document.getElementById("root"))
  
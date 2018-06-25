import React from 'react'
import Header from './Header.js'
import MainSection from './MainSection.js'
import Footer from './Footer.js'

class App extends React.Component {
  render() {
    return (
      <div className="todolist-wrap">
        <Header></Header>
        <MainSection></MainSection>
        <Footer></Footer>
      </div>
    )
  }
}

export default App
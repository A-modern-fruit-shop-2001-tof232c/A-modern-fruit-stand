import React from 'react'

class SidebarNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  render() {
    if (!this.state.open)
      return (
        <div id="sidebarNav">
          <div>
            <h6>modern fruit</h6>
          </div>
          <div>
            <ul>
              <li>shop fruit</li>
              <ul>
                <li>stone fruit</li>
                <li>tropical fruit</li>
                <li>berries</li>
                <li>melons</li>
                <li>citrus</li>
              </ul>
              <li>checkout</li>
              <li>log in</li>
              <li>create account</li>
            </ul>
          </div>
        </div>
      )
  }
}

// var Parent = React.createClass({
//   getInitialState: function(){
//     return {sidebarOpen: false};
//   },
//   handleViewSidebar: function(){
//     this.setState({sidebarOpen: !this.state.sidebarOpen});
//   },
//   render: function() {
//     return (
//       <div>
//         <Header onClick={this.handleViewSidebar} />
//         <SideBar isOpen={this.state.sidebarOpen} toggleSidebar={this.handleViewSidebar} />
//         <Content isOpen={this.state.sidebarOpen} />
//       </div>
//     );
//   }
// });

export default SidebarNav

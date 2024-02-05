import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[];
  showGraph: boolean; // Add this line to the interface
}

/**
 * The parent element of the react app.
 * It renders title, button, and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as an element property
      data: [],
      showGraph: false, // Add this line to initialize showGraph
    };
  }

  /**
   * Render Graph react component with state.data parsed as property data
   */
  renderGraph() {
    // Add a condition to render the graph only if showGraph is true
    return this.state.showGraph ? <Graph data={this.state.data} /> : null;
  }

  /**
   * Get new data from the server and update the state with the new data
   */
  getDataFromServer() {
    // Use setInterval to continuously fetch data
    const intervalId = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        // Update the state with the new data
        this.setState({ data: [...this.state.data, ...serverResponds] });

        // If there is no more data from the server, stop the interval
        if (serverResponds.length === 0) {
          clearInterval(intervalId);
        }
      });
    }, 100); // Fetch data every 100ms
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when the button is clicked, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return any more data.
            onClick={() => { this.getDataFromServer() }}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
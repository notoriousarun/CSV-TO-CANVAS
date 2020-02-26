import React from "react";
import { fabric } from "fabric";
import FileHandlingForm from "./FileHandler/FileHandlingForm";
import colors from "./constants";
import "./App.css";

class App extends React.Component {
  state = {
    canvasPoints: []
  };

  componentDidUpdate() {
    let canvas = new fabric.Canvas("paper");
    canvas.on("mouse:up", function(obj) {
      alert(
        `Type: ${obj.target.type} ` +
          `x: ${obj.target.left} ` +
          `y: ${obj.target.top} ` +
          `color: ${obj.target.stroke ? obj.target.stroke : obj.target.fill}`
      );
    });
    this.state.canvasPoints.forEach(Point => {
      if (Point.Type === "tree") {
        canvas.add(
          new fabric.Triangle({
            left: Point.x,
            top: Point.y,
            width: 10,
            height: 10,
            fill: "transparent",
            stroke: colors[Point.Property],
            strokeWidth: 5
          })
        );
      } else if (Point.Type === "flower") {
        canvas.add(
          new fabric.Circle({
            left: Point.x,
            top: Point.y,
            radius: 10,
            fill: "transparent",
            stroke: colors[Point.Property],
            strokeWidth: 5
          })
        );
      } else if (Point.Type === "fruit") {
        canvas.add(
          new fabric.Rect({
            left: Point.x,
            top: Point.y,
            fill: colors[Point.Property],
            width: 10,
            height: 10,
            angle: 45
          })
        );
      }
    });
    canvas.loadFromJSON(JSON.stringify(canvas));
  }

  canvasObjsArray = lines => {
    let canvasObjs = [];
    for (let index = 0; index <= lines.length; index++) {
      if (lines[index]) {
        canvasObjs.push({
          x: lines[index][0],
          y: lines[index][1],
          Type: lines[index][2],
          Property: lines[index][3]
        });
      }
    }
    this.setState({
      canvasPoints: [...canvasObjs]
    });
  };

  processData = csv => {
    let allTextLines = csv.split(/\r\n|\n/);
    let lines = [];
    while (allTextLines.length) {
      lines.push(allTextLines.shift().split(","));
    }
    this.canvasObjsArray(lines);
  };

  laodHandler = event => {
    let csv = event.target.result;
    this.processData(csv);
  };

  errorHandler = event => {
    if (event.target.error.name === "Not Readable Error") {
      alert("Canno't Read File");
    }
  };

  getAsText = fileToRead => {
    let reader = new FileReader();
    reader.onload = this.laodHandler;
    reader.onerror = this.errorHandler;
    reader.readAsText(fileToRead);
  };

  handleFiles = event => {
    if (window.FileReader) {
      this.getAsText(event.target.files[0]);
    } else {
      alert("FileReader are not supported in this browser.");
    }
  };

  render() {
    return (
      <div className="App">
        <FileHandlingForm handleFiles={this.handleFiles} />
        <canvas width="1000" height="1000" id="paper" />
      </div>
    );
  }
}

export default App;

'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroScene,
  ViroText,
  Viro360Image,
  ViroCamera,
  ViroBox,
  ViroMaterials,
  ViroAnimations,
  ViroUtils,
} from 'react-viro';

let polarToCartesian = ViroUtils.polarToCartesian;

export default class DresserScene extends Component {

  constructor() {
    super();
      this.state = {
          frontDoorCurrentAnim:"loopRotate",
          tableCurrentAnim:"loopRotate",
          denCornerCurrentAnim:"loopRotate",
      }

      this._onFrontDoorHover = this._onFrontDoorHover.bind(this);
      this._showFrontDoorScene = this._showFrontDoorScene.bind(this);
      this._onTableHover = this._onTableHover.bind(this);
      this._showTableScene = this._showTableScene.bind(this);
      this._onDenCornerHover = this._onDenCornerHover.bind(this);
      this._showDenCornerScene = this._showDenCornerScene.bind(this);

  }

  render() {
    return (
      <ViroScene>
        <ViroCamera position={[0, 0, 0]} rotation={[0, -75, 0]} active={true} />
        <Viro360Image source={require('./res/dresser_corner_360.jpg')} />

        {/*FrontDoor Button*/}
        <ViroBox position={polarToCartesian([30, 59, -4])} scale={[1,1,1]} materials={["grid"]} rotation={[0,0,0]} onHover={this._onFrontDoorHover} onClick={this._showFrontDoorScene}
         animation={{
             name:this.state.frontDoorCurrentAnim,
                 run:true,
                 loop:true,
                 interruptible: true
         }}/>

        {/*Table Button*/}
        <ViroBox position={polarToCartesian([15, 134, -4])} scale={[1,1,1]} materials={["grid"]} rotation={[0,0,0]} onHover={this._onTableHover} onClick={this._showTableScene}
         animation={{
             name:this.state.tableCurrentAnim,
                 run:true,
                 loop:true,
                 interruptible: true
         }}/>

        {/*Den Corner Button*/}
        <ViroBox position={polarToCartesian([30, 23, -4])} scale={[1,1,1]} materials={["grid"]} rotation={[0,0,0]} onHover={this._onDenCornerHover} onClick={this._showDenCornerScene}
        animation={{
            name:this.state.denCornerCurrentAnim,
                run:true,
                loop:true,
                interruptible: true
        }}/>

      </ViroScene>
    );
  }

    _onFrontDoorHover(isHovering) {
        if(isHovering){
            this.setState({
                frontDoorCurrentAnim:"bounce",
            });
        } else {
            this.setState({
                frontDoorCurrentAnim:"loopRotate",
            });
        }
    }

    _onTableHover(isHovering) {
        if(isHovering){
            this.setState({
                tableCurrentAnim:"bounce",
            });
        } else {
            this.setState({
                tableCurrentAnim:"loopRotate",
            });
        }
    }

    _onDenCornerHover(isHovering) {
        if(isHovering){
            this.setState({
                denCornerCurrentAnim:"bounce",
            });
        } else {
            this.setState({
                denCornerCurrentAnim:"loopRotate",
            });
        }
    }

    _showDenCornerScene() {
        this.props.sceneNavigator.push({scene:require("./DenCornerScene.js")});
    }
    _showTableScene() {
        this.props.sceneNavigator.push({scene:require("./TableScene.js")});
    }
    _showFrontDoorScene() {
        this.props.sceneNavigator.push({scene:require("./FrontDoorScene.js")});
    }

}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 60,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
});

ViroAnimations.registerAnimations({
  loopRotate:{properties:{rotateY:"+=45"}, duration:1000},
  bounceUp:{properties:{positionY:"+=0.1"}, duration:100},
  bounceDown:{properties:{positionY:"-=0.1"}, duration:100},
  bounce:[
      ["bounceUp", "bounceDown"]
  ]
});
module.exports = DresserScene;

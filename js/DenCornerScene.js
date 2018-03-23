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

export default class DenCornerScene extends Component {

  constructor() {
    super();
      this.state = {
          dresserCurrentAnim:"loopRotate",
          tableCurrentAnim:"loopRotate",
          frontDoorCurrentAnim:"loopRotate",
      }

      this._onDresserHover = this._onDresserHover.bind(this);
      this._showDresserScene = this._showDresserScene.bind(this);
      this._onTableHover = this._onTableHover.bind(this);
      this._showTableScene = this._showTableScene.bind(this);
      this._onFrontDoorHover = this._onFrontDoorHover.bind(this);
      this._showFrontDoorScene = this._showFrontDoorScene.bind(this);

  }

  render() {
    return (
      <ViroScene>
        <ViroCamera position={[0, 0, 0]} rotation={[0, -75, 0]} active={true} />
        <Viro360Image source={require('./res/den_corner_360.jpg')} />

        {/*Dresser Button*/}
        <ViroBox position={polarToCartesian([30, 126, -1])} scale={[1,1,1]} materials={["grid"]} rotation={[0,0,0]} onHover={this._onDresserHover} onClick={this._showDresserScene}
         animation={{
             name:this.state.dresserCurrentAnim,
                 run:true,
                 loop:true,
                 interruptible: true
         }}/>

        {/*Table Button*/}
        <ViroBox position={polarToCartesian([30, 98, -1])} scale={[1,1,1]} materials={["grid"]} rotation={[0,0,0]} onHover={this._onTableHover} onClick={this._showTableScene}
         animation={{
             name:this.state.tableCurrentAnim,
                 run:true,
                 loop:true,
                 interruptible: true
         }}/>

        {/*Front Door Button*/}
        <ViroBox position={polarToCartesian([15, 38, -4])} scale={[1,1,1]} materials={["grid"]} rotation={[0,0,0]} onHover={this._onFrontDoorHover} onClick={this._showFrontDoorScene}
        animation={{
            name:this.state.frontDoorCurrentAnim,
                run:true,
                loop:true,
                interruptible: true
        }}/>

      </ViroScene>
    );
  }

    _onDresserHover(isHovering) {
        if(isHovering){
            this.setState({
                dresserCurrentAnim:"bounce",
            });
        } else {
            this.setState({
                dresserCurrentAnim:"loopRotate",
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

    _showFrontDoorScene() {
        this.props.sceneNavigator.push({scene:require("./FrontDoorScene.js")});
    }
    _showTableScene() {
        this.props.sceneNavigator.push({scene:require("./TableScene.js")});
    }
    _showDresserScene() {
        this.props.sceneNavigator.push({scene:require("./DresserScene.js")});
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
module.exports = DenCornerScene;

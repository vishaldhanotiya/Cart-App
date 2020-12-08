import React, { Component } from "react";
import {
  View,
  Image,
  Text,
} from "react-native";

export default class SingleImage extends Component {
  // Nav options can be defined as a function of the screen's props:
  static navigationOptions = ({ navigation }) => ({
    title: `Single Image`,
  });
  render() {
    const { params } = this.props.route;
    return (
      <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <Image
          style={{
            height: 250,
            marginTop: 10,
            alignSelf: "center",
            width: 250,
          }}
          source={{ uri: params.image }}
          resizeMode="cover"
        />
        <Text style={{ textAlign: "center", color: "#3c4477", fontSize: 20 }}>
          {params.name}
        </Text>
        <Text style={{ textAlign: "center", color: "#000000", margin: 10 }}>
          {params.description}
        </Text>
      </View>
    );
  }
}

module.exports = SingleImage;

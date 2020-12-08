import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Button,
  AppState,
  TouchableHighlight,
  Text,
  ToastAndroid,
} from 'react-native';
import GridView from 'react-native-super-grid';
import SingleImage from './SingleImage';
import CardView from 'react-native-cardview';

var Datastore = require('react-native-local-mongodb'),
  db = new Datastore({filename: 'asyncStorageKey', autoload: true});

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: 0,
      appState: AppState.currentState,
    };
    this.minusClick = this.minusClick.bind(this);
    this.plusClick = this.plusClick.bind(this);
    //this.handleClick = this.handleClick.bind(this);
  }

  static navigationOptions = {
    title: '                       Welcome',
    //Remove header
    header: null,

    headerRight: (
      <Image
        style={{
          height: 35,
          alignItems: 'flex-end',
          alignSelf: 'center',
          width: 35,
          marginRight: 15,
        }}
        source={require('./img/cart.png')}
      />
    ),
    //change header text color
    headerTintColor: 'blue',
    //Change Headerstyle(headerbackground width,shadow)
    headerStyle: {
      elevation: 0,
      //backgroundColor: '#fff000',
      shadowOpacity: 0,
    },
  };

  minusClick(vv, image, description) {
    const This = this;
    db.count({}, function (err, count) {
      // count equals to 4
      if (count == 0) {
        /* var doc ={ _id: vv, planet: image, count:1};
 db.insert(doc, function (err, newDoc) {   // Callback is optional
   
 });*/
      } else {
        // The same rules apply when you want to only find one document
        db.findOne({_id: vv}, function (err, doc) {
          // doc is the document Mars
          // If no document is found, doc is null

          if (doc == null) {
            /* var doc ={ _id: vv, planet: image, count:1};
db.insert(doc, function (err, newDoc) {   // Callback is optional
   
});*/
          } else {
            var counttt = JSON.stringify(doc.count);

            if (counttt > 0) {
              var cc = --counttt;

              // alert('Count='+cc);
              // Set an existing field's value
              db.update(
                {_id: vv},
                {$set: {count: cc}},
                {multi: true},
                function (err, numReplaced) {
                  // numReplaced = 3
                  // Field 'system' on Mars, Earth, Jupiter now has value 'solar system'
                },
              );
            } else {
              if (counttt == 0) {
                cc = 0;
                // options set to {} since the default for multi is false
                db.remove({_id: vv}, {}, function (err, numRemoved) {
                  // numRemoved = 1
                });
              } else {
                cc = counttt;

                // alert('Count='+cc);
                // Set an existing field's value
                db.update(
                  {_id: vv},
                  {$set: {count: cc}},
                  {multi: true},
                  function (err, numReplaced) {
                    // numReplaced = 3
                    // Field 'system' on Mars, Earth, Jupiter now has value 'solar system'
                  },
                );
              }
            }

            // Find all documents in the collection
            db.find({}, function (err, doc) {
              console.log(JSON.stringify(doc));
              //alert('length'+doc.length);

              let str = JSON.stringify(doc);

              var total = 0;

              let obj = JSON.parse(str);
              for (var i = 0; i < obj.length; i++) {
                total = total + obj[i].count;
              }
              This.setState({data: total});
            });
          }
        });
      }
    });
  }

  plusClick(vv, image, description) {
    const This = this;
    db.count({}, function (err, count) {
      // count equals to 4

      if (count == 0) {
        var doc = {_id: vv, planet: image, descr: description, count: 1};

        db.insert(doc, function (err, newDoc) {
          // Callback is optional
        });
      } else {
        // The same rules apply when you want to only find one document
        db.findOne({_id: vv}, function (err, doc) {
          // doc is the document Mars
          // If no document is found, doc is null

          if (doc == null) {
            var doc = {_id: vv, planet: image, descr: description, count: 1};
            db.insert(doc, function (err, newDoc) {
              // Callback is optional
            });
          } else {
            var counttt = JSON.stringify(doc.count);

            var cc = ++counttt;

            //alert('Count='+cc);
            // Set an existing field's value
            db.update(
              {_id: vv},
              {$set: {count: cc}},
              {multi: true},
              function (err, numReplaced) {
                // numReplaced = 3
                // Field 'system' on Mars, Earth, Jupiter now has value 'solar system'
              },
            );

            // Find all documents in the collection
            db.find({}, function (err, doc) {
              let str = JSON.stringify(doc);

              /* ToastAndroid.showWithGravity(str,
  ToastAndroid.SHORT,
  ToastAndroid.BOTTOM
  );*/

              var total = 0;
              //try {
              let obj = JSON.parse(str);
              for (var i = 0; i < obj.length; i++) {
                total = total + obj[i].count;
              }
              This.setState({data: total});
            });
          }
        });
      }
    });
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    const This = this;

    // Find all documents in the collection
    db.find({}, function (err, doc) {
      console.log(JSON.stringify(doc));

      let str = JSON.stringify(doc);
      /*
  ToastAndroid.showWithGravity(str,
  ToastAndroid.SHORT,
  ToastAndroid.BOTTOM
  );
*/

      var total = 0;
      //try {
      let obj = JSON.parse(str);
      for (var i = 0; i < obj.length; i++) {
        total = total + obj[i].count;
      }
      This.setState({data: total});
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
    }
    ToastAndroid.showWithGravity(
      nextAppState,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
    this.setState({appState: nextAppState});
  };

  render() {
    const items = [
      {
        name: 'Tommy Hilfiger Belt',
        uri:
          'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F14%2F2018%2F09%2F06%2Fgucci-belt-gg-net-a-porter.jpg',
        code:
          'Elevate your fashion quotient with this brown coloured belt by Woodland. Made for today’s style-conscious men, this belt has a sleek design and a classy buckle. Made from leather, it will serve you for years to come.',
      },
      {
        name: 'Glasses for Lady',
        uri:
          'https://cdn-images.farfetch-contents.com/12/10/24/06/12102406_9867545_255.jpg',
        code:
          'Gold-tone metal and Swarovski Crystal Cat Eye Glasses from Gucci featuring cat eye frames, a logo at the temple, straight arms with angled tips and skinny arms. This item comes with a protective case.',
      },
      {
        name: 'Tommy Hilfiger Belt',
        uri:
          'https://assets.myntassets.com/h_307,q_90,w_230/v1/assets/images/1378114/2016/6/22/11466577728467-Tommy-Hilfiger-Men-Red-Patterned-Genuine-Leather-Belt-7241466577728344-1_mini.jpg',
        code:
          'Black and brown textured reversible genuine leather belt Secured with a tang clasp Has holes for a customised fit Disclaimer: This product is made from genuine leather which gives it a unique texture. This is why the product you receive may vary slightly from the image.',
      },
      {
        name: 'Tommy Hilfiger',
        uri: 'https://staticimg.titan.co.in/Titan/Catalog/TB177LM1R2_1.jpg',
        code:
          'Gold-tone metal and Swarovski Crystal Cat Eye Glasses from Gucci featuring cat eye frames, a logo at the temple, straight arms with angled tips and skinny arms. This item comes with a protective case.',
      },
      {
        name: 'Tommy Hilfiger Bag Packs Mens',
        uri:
          'https://assets.myntassets.com/h_307,q_90,w_230/v1/assets/images/2053523/2017/9/19/11505805803639-Tommy-Hilfiger-Unisex-Navy-Blue--Red-Colourblocked-Backpack-151505805803402-1_mini.jpg',
        code:
          'Gold-tone metal and Swarovski Crystal Cat Eye Glasses from Gucci featuring cat eye frames, a logo at the temple, straight arms with angled tips and skinny arms. This item comes with a protective case.',
      },
      {
        name: 'Mast & Harbour Blue Handheld Bag',
        uri:
          'https://assets.myntassets.com/h_307,q_90,w_230/v1/assets/images/2238086/2017/12/21/11513851337988-Mast--Harbour-Blue-Solid-Handheld-Bag-5271513851337900-1_mini.jpg',
        code:
          'Gold-tone metal and Swarovski Crystal Cat Eye Glasses from Gucci featuring cat eye frames, a logo at the temple, straight arms with angled tips and skinny arms. This item comes with a protective case.',
      },
      {
        name: 'Lisa Haydon HandBag ',
        uri:
          'https://assets.myntassets.com/h_307,q_90,w_230/v1/assets/images/2033235/2017/8/8/11502170644946-Yelloe-blue-Synthetic-Leather-Hand-Bag-with-multicolored-tassel-9381502170644769-1_mini.jpg',
        code:
          'Gold-tone metal and Swarovski Crystal Cat Eye Glasses from Gucci featuring cat eye frames, a logo at the temple, straight arms with angled tips and skinny arms. This item comes with a protective case.',
      },
      {
        name: 'Blue Handheld Bag',
        uri:
          'https://assets.myntassets.com/h_307,q_90,w_230/v1/assets/images/1281076/2016/3/28/11459162598274-yelloe-Brown-Handbag-1221459162597616-1_mini.jpg',
        code:
          'Gold-tone metal and Swarovski Crystal Cat Eye Glasses from Gucci featuring cat eye frames, a logo at the temple, straight arms with angled tips and skinny arms. This item comes with a protective case.',
      },
      {
        name: 'Brown-Leather-Belt',
        uri:
          'https://sslimages.shoppersstop.com/sys-master/images/h8c/h84/12795964981278/205328946_9212.jpg_1088Wx1632H',
        code:
          'Gold-tone metal and Swarovski Crystal Cat Eye Glasses from Gucci featuring cat eye frames, a logo at the temple, straight arms with angled tips and skinny arms. This item comes with a protective case.',
      },
      {
        name: 'Party Glasses',
        uri:
          'https://cdn-images.farfetch-contents.com/12/10/24/06/12102406_9867545_255.jpg',
        code:
          'Gold-tone metal and Swarovski Crystal Cat Eye Glasses from Gucci featuring cat eye frames, a logo at the temple, straight arms with angled tips and skinny arms. This item comes with a protective case.',
      },
      {
        name: 'Brown Belt',
        uri:
          'https://rukminim1.flixcart.com/image/312/312/jave1zk0/belt/y/b/s/34-inches-34-ms17bt006-belt-brown-ms17bt006-belt-metronaut-original-imaeve8fjkxg3ezf.jpeg?q=70',
        code:
          'Gold-tone metal and Swarovski Crystal Cat Eye Glasses from Gucci featuring cat eye frames, a logo at the temple, straight arms with angled tips and skinny arms. This item comes with a protective case.',
      },
      {
        name: 'WoodLand Belts',
        uri:
          'https://sslimages.shoppersstop.com/sys-master/images/h8c/h84/12795964981278/205328946_9212.jpg_1088Wx1632H',
        code:
          'Gold-tone metal and Swarovski Crystal Cat Eye Glasses from Gucci featuring cat eye frames, a logo at the temple, straight arms with angled tips and skinny arms. This item comes with a protective case.',
      },
      {
        name: 'Tommy Hilfiger Navy Blue Backpack',
        uri:
          'https://assets.myntassets.com/h_307,q_90,w_230/v1/assets/images/2053523/2017/9/19/11505805803639-Tommy-Hilfiger-Unisex-Navy-Blue--Red-Colourblocked-Backpack-151505805803402-1_mini.jpg',
        code:
          'Gold-tone metal and Swarovski Crystal Cat Eye Glasses from Gucci featuring cat eye frames, a logo at the temple, straight arms with angled tips and skinny arms. This item comes with a protective case.',
      },
      {
        name: 'CLOUDS',
        uri:
          'https://assets.myntassets.com/h_307,q_90,w_230/v1/assets/images/2238086/2017/12/21/11513851337988-Mast--Harbour-Blue-Solid-Handheld-Bag-5271513851337900-1_mini.jpg',
        code:
          'Gold-tone metal and Swarovski Crystal Cat Eye Glasses from Gucci featuring cat eye frames, a logo at the temple, straight arms with angled tips and skinny arms. This item comes with a protective case.',
      },
      {
        name: 'Fox Belts',
        uri:
          'https://rukminim1.flixcart.com/image/312/312/jave1zk0/belt/y/b/s/34-inches-34-ms17bt006-belt-brown-ms17bt006-belt-metronaut-original-imaeve8fjkxg3ezf.jpeg?q=70',
        code:
          'Gold-tone metal and Swarovski Crystal Cat Eye Glasses from Gucci featuring cat eye frames, a logo at the temple, straight arms with angled tips and skinny arms. This item comes with a protective case.',
      },
      {
        name: 'ORANGE',
        uri:
          'https://sslimages.shoppersstop.com/sys-master/images/h8c/h84/12795964981278/205328946_9212.jpg_1088Wx1632H',
        code:
          'Gold-tone metal and Swarovski Crystal Cat Eye Glasses from Gucci featuring cat eye frames, a logo at the temple, straight arms with angled tips and skinny arms. This item comes with a protective case.',
      },
      {
        name: 'American BackPacks',
        uri:
          'https://assets.myntassets.com/h_307,q_90,w_230/v1/assets/images/2053523/2017/9/19/11505805803639-Tommy-Hilfiger-Unisex-Navy-Blue--Red-Colourblocked-Backpack-151505805803402-1_mini.jpg',
        code:
          'Gold-tone metal and Swarovski Crystal Cat Eye Glasses from Gucci featuring cat eye frames, a logo at the temple, straight arms with angled tips and skinny arms. This item comes with a protective case.',
      },
      {
        name: 'Blue Handheld Bag',
        uri:
          'https://assets.myntassets.com/h_307,q_90,w_230/v1/assets/images/1281076/2016/3/28/11459162598274-yelloe-Brown-Handbag-1221459162597616-1_mini.jpg',
        code:
          'Gold-tone metal and Swarovski Crystal Cat Eye Glasses from Gucci featuring cat eye frames, a logo at the temple, straight arms with angled tips and skinny arms. This item comes with a protective case.',
      },
      {
        name: 'Tommy Hilfiger Belt',
        uri:
          'https://sslimages.shoppersstop.com/sys-master/images/h8c/h84/12795964981278/205328946_9212.jpg_1088Wx1632H',
        code:
          'Gold-tone metal and Swarovski Crystal Cat Eye Glasses from Gucci featuring cat eye frames, a logo at the temple, straight arms with angled tips and skinny arms. This item comes with a protective case.',
      },
      {
        name: 'Tommy Hilfiger Belt',
        uri:
          'https://assets.myntassets.com/h_307,q_90,w_230/v1/assets/images/1378114/2016/6/22/11466577728467-Tommy-Hilfiger-Men-Red-Patterned-Genuine-Leather-Belt-7241466577728344-1_mini.jpg',
        code:
          'Gold-tone metal and Swarovski Crystal Cat Eye Glasses from Gucci featuring cat eye frames, a logo at the temple, straight arms with angled tips and skinny arms. This item comes with a protective case.',
      },
    ];

    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            height: 60,
            backgroundColor: '#a8a8a8',
            justifyContent: 'flex-end',
            backgroundColor: '#F5FCFF',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              flex: 1,
              marginRight:-35,
              justifyContent: 'center',
              alignSelf: 'center',
              fontWeight: 'bold',
              color: '#000000',
            }}>
            Welcome to RN Market
          </Text>
          <View style={{width: 50, height: 35, marginRight: 13}}>
            <TouchableHighlight
              underlayColor="rgba(0,0,0,0.1)"
              onPress={() => this.props.navigation.navigate('CartDetail')}>
              <Image
                style={{
                  height: 55,
                  alignItems: 'flex-end',
                  alignSelf: 'center',
                  width: 25,
                  resizeMode: 'contain',
                  marginRight: 10,
                }}
                source={require('./img/cart.png')}
              />
            </TouchableHighlight>
            <View
              style={{
                position: 'absolute',
                alignSelf: 'center',
                top:5,
                right:10,
                borderRadius: 20,
                backgroundColor: 'rgba(255, 0, 0, 0.8)',
                width: 20,
                height: 20,
              }}>
              <TouchableHighlight
                underlayColor="rgba(0,0,0,0.1)"
                onPress={() => this.props.navigation.navigate('CartDetail')}>
                <Text
                  style={{
                    height: 20,
                    textAlign: 'center',
                    fontSize: 13,
                    color: '#ffffff',
                    width: 20,
                    marginRight: -5,
                  }}>
                  {this.state.data}
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>

        <GridView
          itemDimension={120}
          data={items}
          style={styles.gridView}
          renderItem={(item) => (
            <CardView cornerRadius={5}>
              <View style={{marginBottom: 5, justifyContent: 'center'}}>
                <View>
                  <TouchableHighlight
                    underlayColor="rgba(0,0,0,0.1)"
                    onPress={() =>
                      this.props.navigation.navigate('SingleImage', {
                        image: item.item.uri,
                        name: item.item.name,
                        description: item.item.code,
                      })
                    }>
                    <Image
                      style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        resizeMode: 'contain',
                        height: 150,
                        width: 220,
                      }}
                      source={{uri: item.item.uri}}
                    />
                  </TouchableHighlight>
                  <Text
                    style={{
                      color: '#3c4477',
                      textAlign: 'center',
                      fontSize: 10,
                    }}>
                    {item.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      flex: 1,
                    }}>
                    <View style={styles.inputView}>
                      <TouchableHighlight
                        underlayColor="rgba(0,0,0,0.1)"
                        onPress={() =>
                          this.minusClick(
                            item.item.name,
                            item.item.uri,
                            item.item.code,
                          )
                        }>
                        <Image
                          style={styles.addMinusBtn}
                          source={require('./img/minus-symbol.png')}
                        />
                      </TouchableHighlight>

                      <Image
                        style={{height: 20, width: 20}}
                        source={require('./img/cart.png')}
                      />
                      <TouchableHighlight
                        underlayColor="rgba(0,0,0,0.1)"
                        onPress={this.plusClick.bind(
                          this,
                          item.item.name,
                          item.item.uri,
                          item.item.code,
                        )}>
                        <Image
                          style={styles.addMinusBtn}
                          source={require('./img/adds.png')}
                        />
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
              </View>
            </CardView>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    margin: 0,
  },

  inputView: {
    flex: 1,
    margin: 0,
    marginBottom:10,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  addMinusBtn:{
    height: 25,
    width: 25,
    resizeMode:'contain',
    alignSelf: 'center',
    marginLeft:10,
    marginRight: 5,
  }
});
module.exports = HomeScreen;


import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import ListView from 'deprecated-react-native-listview';

import ViewMoreText from 'react-native-view-more-text';

let items = '';
var Datastore = require('react-native-local-mongodb'),
  db = new Datastore({filename: 'asyncStorageKey', autoload: true});
db.loadDatabase(function (err) {});

export default class CartDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  static navigationOptions = {
    title: 'Cart Detail',

    headerTintColor: 'black',
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
    },
  };

  componentDidMount() {
    this.setState({isLoading: true});
    db.loadDatabase(function (err) {});

    // Find all documents in the collection
    db.find({}, function (err, doc) {
      console.log(JSON.stringify(doc));

      let str = JSON.stringify(doc);
      items = str;

      let obj = JSON.parse(str);
      items = obj;
    });
    setTimeout(() => {
      let ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      });
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(items),
      });
    }, 1000);
  }
  GetItem(student_name) {
    alert(student_name);
  }

  GetItemDelete(student_name) {
    // options set to {} since the default for multi is false
    db.remove({_id: student_name}, {}, function (err, numRemoved) {
      // numRemoved = 1
    });
    // Find all documents in the collection
    db.find({}, function (err, doc) {
      console.log(JSON.stringify(doc));

      let str = JSON.stringify(doc);
      items = str;

      let obj = JSON.parse(str);
      items = obj;
    });

    setTimeout(() => {
      let ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      });
      this.setState(
        {
          isLoading: false,
          dataSource: ds.cloneWithRows(items),
        },
        function () {
          // In this block you can do something with new state.
        },
      );
    }, 1000);
    alert('Delete Successfully');
  }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#000',
        }}
      />
    );
  };

  minusClick(vv, image, description) {
    var that = this;
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
          } else {
            var counttt = JSON.stringify(doc.count);

            if (counttt > 0) {
              var cc = --counttt;
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
              let str = JSON.stringify(doc);

              var total = 0;

              let obj = JSON.parse(str);
              items = obj;
              for (var i = 0; i < obj.length; i++) {
                total = total + obj[i].count;
              }
              let ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
              });
              that.setState(
                {
                  isLoading: false,
                  dataSource: ds.cloneWithRows(items),
                },
                function () {
                  // In this block you can do something with new state.
                },
              );
            });
          }
        });
      }
    });
  }

  plusClick(vv, image, description) {
    var that = this;
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
            // Set an existing field's value
            db.update(
              {_id: vv},
              {$set: {count: cc}},
              {multi: true},
              function (err, numReplaced) {},
            );

            // Find all documents in the collection
            db.find({}, function (err, doc) {
              let str = JSON.stringify(doc);
              items = str;
              var total = 0;
              let obj = JSON.parse(str);
              items = obj;
              for (var i = 0; i < obj.length; i++) {
                total = total + obj[i].count;
              }

              let ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
              });
              that.setState(
                {
                  isLoading: false,
                  dataSource: ds.cloneWithRows(items),
                },
                function () {
                  // In this block you can do something with new state.
                },
              );
            });
          }
        });
      }
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
        <View  style={{height: 55, backgroundColor:'white', padding:15,justifyContent:'center'}}>
        <TouchableOpacity onPress={()=>{this.props.navigation.goBack('');}}>
          <Image
          resizeMode={'contain'}
            size={{width: 25, height: 25, backgroundColor: 'black'}}
            source={require('./img/back.png')}
          />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator color={'blue'} size={'large'} />
        </View>
        </View>
      );
    }

    return (
      <View style={styles.mainContainer}>
        <View  style={{height: 55, backgroundColor:'white', padding:15,justifyContent:'center'}}>
        <TouchableOpacity onPress={()=>{this.props.navigation.goBack('');}}>
          <Image
          resizeMode={'contain'}
            size={{width: 25, height: 25, backgroundColor: 'black'}}
            source={require('./img/back.png')}
          />
          </TouchableOpacity>
        </View>
        <ListView
          style={{padding: 10}}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderSeparator={this.ListViewItemSeparator}
          renderRow={(rowData) => (
            <View style={{flex: 1, flexDirection: 'row', margin: 10}}>
              <View style={{width: 60, height: 60}}>
                <Image
                  style={{
                    borderRadius: 500,
                    alignSelf: 'center',
                    height: 60,
                    resizeMode: 'contain',
                    width: 60,
                  }}
                  source={{uri: rowData.planet}}
                  resizeMode="stretch"
                />
              </View>

              <View style={{marginLeft: 10, width: 150}}>
                <Text style={styles.textViewContainer}>{'' + rowData._id}</Text>
                <ViewMoreText
                  numberOfLines={2}
                  renderViewMore={this.renderViewMore}
                  renderViewLess={this.renderViewLess}
                  textStyle={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  renderTimeout={100}>
                  <Text style={styles.textViewContainer}>
                    {'Detail: ' + rowData.descr}
                  </Text>
                </ViewMoreText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'flex-end',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    underlayColor="rgba(0,0,0,0.1)"
                    onPress={() =>
                      this.minusClick(
                        rowData._id,
                        rowData.planet,
                        rowData.descr,
                      )
                    }>
                    <Image
                      style={{
                        height: 20,
                        width: 20,
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        padding: 10,
                      }}
                      source={require('./img/minus-symbol.png')}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      textAlign: 'center',
                      marginTop: 5,
                      fontSize: 12,
                      color: '#000000',
                    }}>
                    {'' + rowData.count}
                  </Text>
                  <TouchableOpacity
                    underlayColor="rgba(0,0,0,0.1)"
                    onPress={() =>
                      this.plusClick(rowData._id, rowData.planet, rowData.descr)
                    }>
                    <Image
                      style={{
                        height: 20,
                        width: 20,
                        marginTop: 10,
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        padding: 10,
                      }}
                      source={require('./img/adds.png')}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  underlayColor="rgba(0,0,0,0.1)"
                  onPress={this.GetItemDelete.bind(this, rowData._id)}>
                  <Image
                    style={{
                      height: 30,
                      width: 30,
                      marginTop: 25,
                      justifyContent: 'center',
                    }}
                    source={require('./img/rubbish.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    flex: 1,
  },

  textViewContainer: {
    textAlignVertical: 'center',
    fontSize: 12,
    color: '#000000',
  },
});
module.exports = CartDetail;

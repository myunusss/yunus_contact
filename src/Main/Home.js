import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity, Modal, Image } from "react-native";
import { connect } from 'react-redux';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import { createContact, getContact } from '../Redux/Actions/ContactActions';
import { LoadingIndicator } from '../Components';
import FormContact from './FormContact/FormContact';
import * as _ from 'lodash';

const mapStateToProps = (state, props) => {
  return {
    counter: state.counter,
    contacts: state.contactReducer.contacts,
    loading: state.contactReducer.loading
  }
};

const mapDispatchToProps = (dispatch) => {
  return{
    getDataContact : () => {
      return new Promise((resolve) => {
        dispatch(getContact());
        resolve(true)
      })
    },

    createNewContact : (payload) => {
      return new Promise((resolve) => {
        dispatch(createContact(payload));
        resolve(true)
      })
    },
  }
}

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      refresh: false,
      loadingForm: false,
      visibleModalCreateContact: false
    }
  }

  componentDidMount() {
    this.props.getDataContact()
  }

  render() {
    return(
      <View style={styles.container}>
        <FlatList
          data={_.get(this.props,'contacts')}
          keyExtractor={(item, index) => index.toString()}
          keyboardShouldPersistTaps={'handled'}
          initialNumToRender={20}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={this.props.getDataContact.bind(this)}
              colors={['#2d9fff']}
              tintColor={'#2d9fff'}
            />
          }
          ListHeaderComponent={
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, flexDirection: 'row', height: 60}}>
                <View style={{width: 60, height: 60, alignItems: 'center', justifyContent: 'center'}}>
                  <IconMI name="contacts" size={24} />
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text style={{fontSize: 20, color: '#000', fontWeight: 'bold'}}>MY Contact</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => this.setState({
                  visibleModalCreateContact: true
                })}
                style={{width: 60, height: 60, alignItems: 'center', justifyContent: 'center'}}>
                <IconMI name="add-circle-outline" size={30} />
              </TouchableOpacity>
            </View>
          }
          ListEmptyComponent={() => {
            if (this.props.loading) {
              return(
                <LoadingIndicator/>
              )
            } else {
              return(
                <View style={{padding: 20, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{textAlign: 'center', color: '#ccc', fontSize: 12}}>
                    Data Kosong
                  </Text>
                </View>
              )
            }
          }
          }
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{backgroundColor: '#fff', borderRadius: 10, elevation: 1, alignSelf: 'center', width: '94%', marginTop: 5, marginBottom: 5, padding: 13, flexDirection: 'row'}}
                onPress={() => Actions.contact({"contact": item})}>
                <Image
                  source={{uri: item.photo}}
                  style={{width: 60, height: 60, resizeMode: 'cover', borderRadius: 50, marginRight: 10}}
                />
                <View style={{justifyContent: 'center', paddingLeft: 10, paddingRight: 10}}>
                  <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>{item.firstName} {item.lastName}</Text>
                  <Text style={{fontSize: 14, color: '#000'}}>{item.age} Yo</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <Modal
          style={{flex: 1}}
          visible={this.state.visibleModalCreateContact}
          animationType="fade"
          transparent
          onRequestClose={() => this.setState({visibleModalCreateContact: false})}>
          <FormContact
            title={'Create Contact'}
            contact={{firstName: '', lastName: '', age: '0', photo: null}}
            loading={this.props.loading}
            onSubmit={(val) => {
              this.props.createNewContact(val).then((res) => {
                setTimeout(() => {
                  if (this.props.loading === false) {
                    this.setState({
                      visibleModalCreateContact: false
                    }, () => this.props.getDataContact())
                  }
                }, 300);
              })
            }}
            onCancel={() => this.setState({visibleModalCreateContact: false})}
          />
        </Modal>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f7fb'
  },
})
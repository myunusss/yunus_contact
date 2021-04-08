import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from "react-native";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import IconAws from 'react-native-vector-icons/FontAwesome';
import { getDetailContact, deleteContact, editContact } from '../Redux/Actions/ContactActions';
import { Divider, Header, LoadingIndicator } from '../Components';
import FormContact from './FormContact/FormContact';

const mapStateToProps = (state, props) => {
  return {
    counter: state.counter,
    detail: state.contactReducer.detail,
    loading: state.contactReducer.loading
  }
};

const mapDispatchToProps = (dispatch) => {
  return{
    actionDeleteContact : (id) => {
      dispatch(deleteContact({id}));
    },

    getDetailContact : async (item) => {
      return new Promise((resolve) => {
        dispatch(getDetailContact({id: item.id}));
        resolve(true)
      })
    },

    editContact : async (payload) => {
      return new Promise((resolve) => {
        dispatch(editContact(payload));
        resolve(true)
      })
    },

    deleteContact : async (payload) => {
      return new Promise((resolve) => {
        dispatch(deleteContact(payload));
        resolve(true)
      })
    },
  }
}

class Contact extends Component {
  formik; 

  constructor(props){
    super(props)
    this.state = {
      visibleModalEditContact: false,
      loadingForm: false
    }
  }

  componentDidMount() {
    this.props.getDetailContact(this.props.contact)
  }

  render() {
    return(
      <View style={styles.container}>
        <Header
          actionBackPress={() => Actions.pop()}
          componentTitle={
            <Text style={{flex: 1, alignSelf: 'center', textAlign: 'center', fontSize: 20, color: '#000', fontWeight: '500'}}>
              {_.get(this.props,'detail.firstName')}
            </Text>
          }
          componentRight={
            <TouchableOpacity
              onPress={() => this.setState({visibleModalEditContact: true})}
              style={{padding: 13, paddingBottom: 5, width: 50}}>
              <IconAws
                style={{color: '#000'}}
                name={'pencil'}
                size={24}
              />
            </TouchableOpacity>
          }
        />
        {
          this.props.loading && <LoadingIndicator/>
        }
        <View style={{backgroundColor: '#fff', borderRadius: 5, padding: 16, marginVertical: 10, marginHorizontal: 16}}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: 100, height: 100, borderRadius: 50}}
              resizeMode={'cover'}
              source={{uri: _.get(this.props,'detail.photo')}}
            />
            <View style={{flex: 1, paddingLeft: 13}}>
              <Text style={{fontSize: 20, color: '#000', fontWeight: 'bold'}}>
                {_.get(this.props,'detail.firstName')} {_.get(this.props,'detail.lastName')}
              </Text>
              <Text style={{fontSize: 14, color: '#000'}}>
                {_.get(this.props,'detail.age')}
              </Text>
              <Divider/>
              <View style={{marginTop: 10}}>
                <Text style={{fontSize: 12, color: '#afafaf'}}>
                  First name:
                </Text>
                <Text style={{fontSize: 14, color: '#000', marginLeft: 5}}>
                  {_.get(this.props,'detail.firstName')}
                </Text>
                <Text style={{fontSize: 12, color: '#afafaf'}}>
                  Last name:
                </Text>
                <Text style={{fontSize: 14, color: '#000', marginLeft: 5}}>
                  {_.get(this.props,'detail.lastName')}
                </Text>
                <Text style={{fontSize: 12, color: '#afafaf'}}>
                  Age:
                </Text>
                <Text style={{fontSize: 14, color: '#000', marginLeft: 5}}>
                  {_.get(this.props,'detail.age')}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Modal
          style={{flex: 1}}
          visible={this.state.visibleModalEditContact}
          animationType="fade"
          transparent
          onRequestClose={() => this.setState({visibleModalEditContact: false})}>
          <FormContact
            title={'Edit Contact'}
            contact={this.props.detail}
            loading={this.props.loading}
            onSubmit={(val) => {
              this.props.editContact(val).then((res) => {
                setTimeout(() => {
                  if (this.props.loading === false) {
                    this.setState({
                      visibleModalEditContact: false
                    }, () => this.props.getDetailContact(val))
                  }
                }, 300);
              })
            }}
            onCancel={() => this.setState({visibleModalEditContact: false})}
            deleteContact={(val) => {
              this.props.deleteContact(val).then((res) => {
                Actions.reset('home')
              })
            }}
          />
        </Modal>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f7fb'
  }
})
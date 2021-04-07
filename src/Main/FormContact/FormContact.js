import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { Actions } from 'react-native-router-flux';
import {Formik} from 'formik';
import * as _ from 'lodash';
import { FormInput, Header } from '../../Components';
import contactValidation from './FormContactValidation';
import IconAws from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class FormContact extends Component {
  formik; 

  constructor(props){
    super(props)
    this.state = {
      loading: false,
      loadingImg: false,

      contact: this.props.contact
    }
  }

  generateImage() {
    let date = new Date()
    let newName = date.getTime()
    let url = `https://avatars.dicebear.com/api/avataaars/${newName.toString()}.png?background=%230000ff`;
    return url
  }

  render() {
    return(
      <View style={styles.container}>
        <Header
          actionBackPress={() => this.props.onCancel()}
          componentTitle={
            <Text style={{flex: 1, alignSelf: 'center', textAlign: 'center', fontSize: 20, color: '#000', fontWeight: '500'}}>
              {this.props.title}
            </Text>
          }
          componentRight={
            this.props.title === 'Edit Contact' ?
            <TouchableOpacity
              onPress={() => Alert.alert('Hold on','Are you sure to delete this contact?', [
                {text: 'No', onPress: () => {}},
                {text: 'Yes', onPress: () => this.props.deleteContact(this.props.contact)}
              ])}
              style={{padding: 13, paddingBottom: 5, width: 50}}>
              <IconAws
                style={{color: '#000'}}
                name={'trash'}
                size={24}
              />
            </TouchableOpacity>
            :
            null
          }
        />
        <Formik
          initialValues={_.get(this.state,'contact')}
          onSubmit={(val) => this.props.onSubmit(val)}
          enableReinitialize
          innerRef={(p) => (this.formik = p)}
          validationSchema={contactValidation}
        >
          {(props) => (
            <KeyboardAwareScrollView
              style={{backgroundColor: '#fff', borderRadius: 5, padding: 16, marginVertical: 10, marginHorizontal: 16}}
              keyboardShouldPersistTaps={'handled'}
              showsVerticalScrollIndicator={false}>
              <Image
                style={{width: 100, height: 100, borderRadius: 50, alignSelf: 'center', borderWidth: 1, borderColor: '#dedede'}}
                resizeMode={'cover'}
                source={{uri: props.values.photo}}
              />
              <TouchableOpacity
                onPress={() => {
                  let url = this.generateImage(props.values)
                  console.log(url)
                  props.setFieldValue('photo', url)
                }}
                style={{paddingHorizontal: 5, height: 35, borderRadius: 5, marginTop: 10, borderWidth: 1, borderColor: '#000', alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{textAlign: 'center'}}>Get New Avatar</Text>
              </TouchableOpacity>
              <FormInput
                label={'Nama depan'}
                p={props}
                name={'firstName'}
                value={props.values.firstName}
                defaultValue={''}
                placeholder={'Nama depan'}
              />
              <FormInput
                label={'Nama belakang'}
                p={props}
                name={'lastName'}
                value={props.values.lastName}
                defaultValue={''}
                placeholder={'Nama belakang'}
              />
              <FormInput
                label={'Usia'}
                p={props}
                name={'age'}
                value={_.get(props.values,'age').toString()}
                defaultValue={'17'}
                placeholder={'Usia'}
                keyboardType={'numeric'}
              />
              <TouchableOpacity
                onPress={props.handleSubmit}
                style={{height: 40, width: '90%', backgroundColor: '#000', marginTop: 30, borderRadius: 5, alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}
              >
                <Text style={{color: '#fff'}}>SUBMIT</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.onCancel()}
                style={{height: 40, width: '90%', backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 5, marginVertical: 20, alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}
              >
                <Text>CANCEL</Text>
              </TouchableOpacity>
            </KeyboardAwareScrollView>
          )}
        </Formik>
      </View>
    )
  }
}

export default FormContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f7fb'
  },

  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'green',
    borderRadius: 10,
    height: 40,
    width: '80%',
    marginVertical: 10
  }
})
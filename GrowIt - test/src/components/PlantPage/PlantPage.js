import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Image } from 'react-native';
import { Container, Content, Card, CardItem, Text, Button, Left, Body, Toast } from 'native-base';
import { addToMyPlants } from '../../redux/actions/plantActions';
import styles from './style';

function PlantPage({ navigation, route }) {
  const { plantObj ,buttonFlag } = route.params;
  const dispatch = useDispatch();

  async function buttonEvent() {
    await dispatch(addToMyPlants(plantObj));
    Toast.show({
      text: `${plantObj.name} added to your garden ! 🥳`,
      textStyle: { fontFamily: 'Comfortaa_600SemiBold' },
      buttonText: 'Okay',
      buttonTextStyle: { fontFamily: 'Comfortaa_600SemiBold', color: 'blue' },
      type: 'success',
      duration: 2500,
      onClose() {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }]
        });
        navigation.navigate('myPlantsPage');
      }
    });
  }

  return (
    <Container>
      <Content>
        <Card style={styles.mainCard}>
          <CardItem style={styles.cardItem}>
            <Left>
              <Body>
                <Text style={styles.font}>Treatment:</Text>
                <Text note style={styles.font}>
                  {plantObj.howToITreat}
                </Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem style={styles.cardItem}>
            <Body>
              <Image source={{ uri: plantObj.imgUrl }} style={styles.img} />
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Body>
                <Text style={styles.font}>Some words on it:</Text>
                <Text note style={styles.font}>
                  {plantObj.description}
                </Text>
              </Body>
            </Left>
          </CardItem>
         {buttonFlag ? (<CardItem style={styles.justify}>
            <Button bordered onPress={() => buttonEvent()}>
              <Text style={styles.font}>Start Grow !</Text>
            </Button>
          </CardItem>): null} 
        </Card>
      </Content>
    </Container>
  );
}

PlantPage.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object
};

export default PlantPage;

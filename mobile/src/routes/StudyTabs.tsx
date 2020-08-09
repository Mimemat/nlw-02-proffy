import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Favorites from '../pages/Favorites';
import TeacherList from '../pages/TeacherList';

const { Navigator, Screen } = createBottomTabNavigator();

const StudyTabs: React.FC = () => (
  <Navigator
    lazy={true}
    tabBarOptions={{
      style: {
        elavation: 0,
        shadowOpacity: 0,
        height: 64,
      },
      tabStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      iconStyle: {
        flex: 0,
        width: 20,
        height: 20,
      },
      labelStyle: {
        fontFamily: 'Archivo_700Bold',
        fontSize: 13,
        marginLeft: 16,
      },
      inactiveBackgroundColor: '#fafafc',
      activeBackgroundColor: '#ebebf5',
      inactiveTintColor: '#c1bccc',
      activeTintColor: '#32264d',
    }}
  >
    <Screen
      name="TeacherList"
      component={TeacherList}
      options={{
        tabBarLabel: 'Proffys',
        unmountOnBlur: true, // Necessary for favorites refreshing when changing tabs
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name="ios-easel"
            size={size}
            color={focused ? '#8257e5' : color}
          />
        ),
      }}
    />
    <Screen
      name="Favorites"
      options={{
        tabBarLabel: 'Favoritos',
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name="ios-heart"
            size={size}
            color={focused ? '#8257e5' : color}
          />
        ),
      }}
      component={Favorites}
    />
  </Navigator>
);

export default StudyTabs;

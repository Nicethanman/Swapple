import {View, Text, Image, ImageSourcePropType} from 'react-native'
import React from 'react'
import {Tabs, Redirect} from 'expo-router';
import icons from '../../constants/icons';

interface TabIconProps {
    icon: ImageSourcePropType;
    color: string;
    name: string;
    focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({icon, color, name, focused}) => {
    return (
      <View className="items-center justify-center">
        <Image
            source={icon}
            tintColor={color}
            resizeMode="contain"
            className="w-8 h-8"
        />
        <Text className={`${focused ? 'font-psemibold': 'font-pregular'} text-xs`} style={{color: color}}>{name}</Text>
      </View>
    );
}

const TabsLayout= () => {

    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#B4CDA5',
                    tabBarStyle: {
                        height: 75
                    }
                }}>
                <Tabs.Screen name="home"
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({color, focused}) => (
                            <TabIcon 
                                icon={icons.home}
                                color={color}
                                name="Home"
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen name="trade"
                    options={{
                        title: 'Trade',
                        headerShown: false,
                        tabBarIcon: ({color, focused}) => (
                            <TabIcon 
                                icon={icons.plus}
                                color={color}
                                name="Trade"
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen name="profile"
                    options={{
                        title: 'Profile',
                        headerShown: false,
                        tabBarIcon: ({color, focused}) => (
                            <TabIcon 
                                icon={icons.profile}
                                color={color}
                                name="Profile"
                                focused={focused}
                            />
                        )
                    }}
                />
            </Tabs>
        </>
    )
}

export default TabsLayout
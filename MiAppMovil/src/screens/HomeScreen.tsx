import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { RootStackParamList } from "../navigation/StackNavigator";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../components/CustomButton";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({route, navigation}: Props){
    const { email } = route.params;
    const handleLoadSettings = () => {
        navigation.navigate('UserTabs');
    }
    return(
        <View>
            <StatusBar style="auto" />
          <Text> Hola {email}, Bienvenido a Home </Text> 
          <CustomButton title={"Ir a User Settings"} onPress={handleLoadSettings}/>
        </View>
    )
}
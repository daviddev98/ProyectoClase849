import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { RootStackParamList } from "../navigation/StackNavigator";
import { StatusBar } from "expo-status-bar";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({route}: Props){
    const { email } = route.params;

    return(
        <View>
            <StatusBar style="auto" />
          <Text> Hola {email}, Bienvenido a Home </Text> 
        </View>
    )
}
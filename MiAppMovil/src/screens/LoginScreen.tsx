// src/screens/LoginScreen.tsx
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import CustomButton from '../components/CustomButton';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from '../services/supabaseClient';

const LoginScreen = ({ navigation }: any) => {
  const { colors } = useTheme();

  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    // Supabase abre automáticamente el navegador para autenticarse con Google
    console.log('Redirigiendo a Google...', data);
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Iniciar sesión</Text>

        {/* Botón SSO Google */}
        <CustomButton
          title="Continuar con Google"
          variant="secondary"
          onPress={handleGoogleLogin}
        />

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={[styles.link, { color: colors.primary }]}>
            ¿No tienes cuenta? Regístrate
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  link: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 15,
  },
});

export default LoginScreen;
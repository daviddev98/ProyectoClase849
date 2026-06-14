import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from '../services/supabaseClient';

const RegisterScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !phoneNumber.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los campos.');
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password.trim(),
    });

    setLoading(false);

    if (error) {
      Alert.alert('Error al registrarse', error.message);
      return;
    }

    if (data.user) {
      Alert.alert(
        '¡Registro exitoso!',
        'Tu cuenta fue creada correctamente.',
        [
          {
            text: 'Iniciar sesión',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Crear cuenta</Text>

        <CustomInput
          placeholder="Nombre completo"
          value={name}
          onChange={setName}
        />

        <CustomInput
          placeholder="Número de teléfono"
          value={phoneNumber}
          onChange={setPhoneNumber}
          type="number"
        />

        <CustomInput
          placeholder="Correo electrónico"
          value={email}
          onChange={setEmail}
          type="email"
        />

        <CustomInput
          placeholder="Contraseña"
          value={password}
          onChange={setPassword}
          type="password"
        />

        <CustomButton
          title={loading ? 'Registrando...' : 'Registrarse'}
          variant="primary"
          onPress={handleRegister}
        />

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.link, { color: colors.primary }]}>
            ¿Ya tienes cuenta? Inicia sesión
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

export default RegisterScreen;

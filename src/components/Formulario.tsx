import React, {PropsWithChildren, useEffect, useState} from 'react';
import {
  View,
  Modal,
  Text,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import uuid from 'react-native-uuid';
import IPacienteInfo from '../interfaces/IPacienteInfo';

interface IProps {
  isVisible: boolean;
  onDismissModal: () => void;
  agregarOEditarPaciente: (paciente: IPacienteInfo, isEdit: boolean) => void;
  isEdit: boolean;
  pacienteEdit?: IPacienteInfo;
}

const pacienteInit = {
  id: '',
  nombrePaciente: '',
  nombrePropietario: '',
  emailPropietario: '',
  telefono: '',
  sintomas: '',
  fechaAlta: new Date(),
};

const Formulario = ({
  isVisible,
  onDismissModal,
  agregarOEditarPaciente,
  isEdit,
  pacienteEdit,
}: PropsWithChildren<IProps>) => {
  const [pacienteInfo, setPacienteInfo] = useState<IPacienteInfo>(pacienteInit);

  const onChangeNombrePaciente = (text: string) => {
    const pacienteInfoTemp: IPacienteInfo = {
      ...pacienteInfo,
      nombrePaciente: text,
    };
    setPacienteInfo(pacienteInfoTemp);
  };

  const onChangeNombrePropietario = (text: string) => {
    const pacienteInfoTemp: IPacienteInfo = {
      ...pacienteInfo,
      nombrePropietario: text,
    };
    setPacienteInfo(pacienteInfoTemp);
  };

  const onChangeEmail = (text: string) => {
    const pacienteInfoTemp: IPacienteInfo = {
      ...pacienteInfo,
      emailPropietario: text,
    };
    setPacienteInfo(pacienteInfoTemp);
  };

  const onChangeTelefono = (text: string) => {
    const pacienteInfoTemp: IPacienteInfo = {...pacienteInfo, telefono: text};
    setPacienteInfo(pacienteInfoTemp);
  };

  const onDateChange = (date: Date) => {
    const pacienteInfoTemp: IPacienteInfo = {...pacienteInfo, fechaAlta: date};
    setPacienteInfo(pacienteInfoTemp);
  };

  const onChangeSintomas = (text: string) => {
    const pacienteInfoTemp: IPacienteInfo = {...pacienteInfo, sintomas: text};
    setPacienteInfo(pacienteInfoTemp);
  };

  const onAgregarOEditarPaciente = (event: GestureResponderEvent) => {
    const {
      nombrePaciente,
      nombrePropietario,
      telefono,
      emailPropietario,
      sintomas,
    } = pacienteInfo;
    const valuesEmpty = Object.values({
      nombrePaciente,
      nombrePropietario,
      //telefono, //optional
      emailPropietario,
      sintomas,
    }).includes('');

    if (!valuesEmpty) {
      const paciente: IPacienteInfo = {
        ...pacienteInfo,
        id: isEdit ? pacienteInfo.id : uuid.v4().toString(),
      };
      agregarOEditarPaciente(paciente, isEdit);
      setPacienteInfo({...pacienteInit});
      onDismissModal();
    } else {
      Alert.alert('Error', 'Todos los campos son obligatorios', [
        {text: 'Cerrar'},
      ]);
    }
  };

  useEffect(() => {
    if (isVisible && !isEdit) {
      setPacienteInfo({...pacienteInit, fechaAlta: new Date()});
    } else if (isVisible && isEdit && pacienteEdit !== undefined) {
      setPacienteInfo({...pacienteEdit});
    }
  }, [isVisible, isEdit, pacienteEdit]);
  return (
    <Modal animationType="slide" visible={isVisible}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.titulo}>
            Nueva {''}
            <Text style={styles.tituloBold}>Cita</Text>
          </Text>

          <Pressable
            style={styles.btnCancelar}
            onLongPress={(event: GestureResponderEvent) => {
              onDismissModal();
            }}>
            <Text style={styles.btnCancelarText}>Cancelar</Text>
          </Pressable>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del paciente"
              placeholderTextColor={'#666'}
              value={pacienteInfo?.nombrePaciente}
              onChangeText={onChangeNombrePaciente}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del propietario"
              placeholderTextColor={'#666'}
              value={pacienteInfo?.nombrePropietario}
              onChangeText={onChangeNombrePropietario}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Email Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Email Propietario"
              placeholderTextColor={'#666'}
              keyboardType="email-address"
              value={pacienteInfo?.emailPropietario}
              onChangeText={onChangeEmail}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Telefono Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Telefono Propietario"
              placeholderTextColor={'#666'}
              keyboardType="number-pad"
              value={pacienteInfo?.telefono}
              onChangeText={onChangeTelefono}
              maxLength={10}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Fecha Alta</Text>
            <View style={styles.fechaContenedor}>
              <DatePicker
                date={pacienteInfo.fechaAlta}
                onDateChange={onDateChange}
              />
            </View>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Sintomas</Text>
            <TextInput
              style={[styles.input, styles.sintomasInput]}
              placeholder="Sintomas pacientes"
              placeholderTextColor={'#666'}
              multiline={true}
              numberOfLines={5}
              value={pacienteInfo?.sintomas}
              onChangeText={onChangeSintomas}
            />
          </View>

          <Pressable
            style={isEdit ? styles.btnEditar : styles.btnAgregar}
            onPress={onAgregarOEditarPaciente}>
            <Text style={isEdit ? styles.btnEditarText : styles.btnAgregarText}>
              {isEdit ? 'Editar Paciente' : 'Agregar Paciente'}
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6D28D9',
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: 'white',
  },
  tituloBold: {
    fontWeight: '900',
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30,
    marginBottom: 10,
  },
  label: {
    color: '#fff',
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
  },
  sintomasInput: {
    height: 100,
    marginBottom: 10,
  },
  fechaContenedor: {
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  btnCancelar: {
    backgroundColor: '#5827A4',
    padding: 20,
    marginVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnCancelarText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 15,
    fontWeight: '900',
    textTransform: 'uppercase',
  },

  btnAgregar: {
    backgroundColor: '#F59E0B',
    padding: 20,
    marginVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnAgregarText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 15,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  btnEditar: {
    backgroundColor: 'green',
    padding: 20,
    marginVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnEditarText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 15,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
});

export default Formulario;

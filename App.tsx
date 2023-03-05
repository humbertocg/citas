/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  GestureResponderEvent,
  Alert,
  Pressable,
  Modal,
  View,
  FlatList,
} from 'react-native';

import Formulario from './src/components/Formulario';
import PacienteItem from './src/components/PacienteItem';
import IPacienteInfo from './src/interfaces/IPacienteInfo';

const App = () => {
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [pacientes, setPacientes] = useState<IPacienteInfo[]>([]);
  const [pacienteSelected, setPacienteSelected] = useState<IPacienteInfo>();
  const [isEditPaciente, setIsEditPaciente] = useState(false);
  const veterinaria = 'Veterinaria';
  const titulo = 'Administrador de citas';

  const onPress = (event: GestureResponderEvent) => {
    setVisibleModal(true);
  };

  const onDismissModal = () => {
    setPacienteSelected(undefined);
    setIsEditPaciente(false);
    setVisibleModal(false);
  };

  const agregarOEditarPaciente = (paciente: IPacienteInfo, isEdit: boolean) => {
    if (!isEdit) {
      setPacientes([...pacientes, paciente]);
    } else {
      const filteredPacientes = pacientes.map(item => {
        if (item.id === paciente.id) {
          return {...paciente};
        }
        return item;
      });
      setPacienteSelected(undefined);
      setPacientes(filteredPacientes);
      setIsEditPaciente(false);
    }
  };

  const eliminarPaciente = (id: string) => {
    const filteredPaciente = pacientes.filter(p => p.id !== id);
    setPacientes(filteredPaciente);
  };

  const editarPaciente = (paciente: IPacienteInfo) => {
    setPacienteSelected(paciente);
    setIsEditPaciente(true);
    setVisibleModal(true);
  };

  /*useEffect(() => {
    if (!visibleModal) {
      setPacienteSelected(undefined);
    }
  }, [visibleModal]);*/

  //useEffect(() => {}, [pacientes]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        {titulo} {''}
        <Text style={styles.tituloBold}>{veterinaria}</Text>
      </Text>
      <Pressable style={styles.btnNuevaCita} onPress={onPress}>
        <Text style={styles.btnTextNuevaCita}>Nueva cita</Text>
      </Pressable>

      {pacientes.length > 0 ? (
        <FlatList
          style={styles.pacienteLista}
          data={pacientes}
          keyExtractor={item => item.id}
          renderItem={item => (
            <PacienteItem
              paciente={item.item}
              handlerEliminarItem={eliminarPaciente}
              handleEditarItem={editarPaciente}
            />
          )}
        />
      ) : (
        <Text style={styles.noPacientes}>No hay pacientes</Text>
      )}
      <Formulario
        isVisible={visibleModal}
        isEdit={isEditPaciente}
        pacienteEdit={pacienteSelected}
        onDismissModal={onDismissModal}
        agregarOEditarPaciente={agregarOEditarPaciente}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1,
  },
  titulo: {
    textAlign: 'center',
    textTransform: 'none',
    fontSize: 30,
    fontWeight: '600',
    color: '#374151',
  },
  tituloBold: {
    fontWeight: '900',
    color: '#6D28D9',
  },
  btnNuevaCita: {
    backgroundColor: '#6D28D9',
    padding: 20,
    marginVertical: 15,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnTextNuevaCita: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '400',
  },
  pacienteLista: {
    marginHorizontal: 30,
    marginVertical: 30,
  },
});

export default App;

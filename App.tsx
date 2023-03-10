/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  GestureResponderEvent,
  Pressable,
  FlatList,
  useColorScheme,
  Alert,
} from 'react-native';

import Formulario from './src/components/Formulario';
import PacienteDetail from './src/components/PacienteDetail';
import PacienteItem from './src/components/PacienteItem';
import IPacienteInfo from './src/interfaces/IPacienteInfo';

const App = () => {
  const [isVisibleModal, setVisibleModal] = useState<boolean>(false);
  const [pacientes, setPacientes] = useState<IPacienteInfo[]>([]);
  const [pacienteSelected, setPacienteSelected] = useState<IPacienteInfo>();
  const [isVisibleDetailModal, setVisibleDetailModal] =
    useState<boolean>(false);
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const veterinaria = 'Veterinaria';
  const titulo = 'Administrador de citas';

  const onPress = (event: GestureResponderEvent) => {
    setVisibleModal(true);
  };

  const onDismissModal = () => {
    setPacienteSelectedAndModalState(setVisibleModal, false, undefined);
  };

  const onDismissDetailModal = () => {
    setPacienteSelectedAndModalState(setVisibleDetailModal, false, undefined);
  };

  const agregarOEditarPaciente = (paciente: IPacienteInfo, isEdit: boolean) => {
    if (isEdit) {
      const filteredPacientes = pacientes.map(item => {
        if (item.id === paciente.id) {
          return {...paciente};
        }
        return item;
      });
      setPacienteSelected(undefined);
      setPacientes(filteredPacientes);
    } else {
      setPacientes([...pacientes, paciente]);
    }
  };

  const eliminarPaciente = (id: string) => {
    Alert.alert(
      '¿Desea eliminar cita?',
      'una cita eliminada no se puede recuperar',
      [
        {text: 'cancelar'},
        {
          text: 'Si, elminar',
          onPress: () => {
            const filteredPaciente = pacientes.filter(p => p.id !== id);
            setPacientes(filteredPaciente);
          },
        },
      ],
    );
  };

  const openDetails = (paciente: IPacienteInfo) => {
    setPacienteSelectedAndModalState(setVisibleDetailModal, true, paciente);
  };

  const editarPaciente = (paciente: IPacienteInfo) => {
    setPacienteSelectedAndModalState(setVisibleModal, true, paciente);
  };

  const setPacienteSelectedAndModalState = (
    setStateModal: (value: React.SetStateAction<boolean>) => void,
    isVisible: boolean,
    paciente?: IPacienteInfo,
  ) => {
    setPacienteSelected(paciente);
    setStateModal(isVisible);
  };

  const setActionVisible = (id: string) => {
    const filteredPacientes = pacientes.map(item => {
      if (item.id === id) {
        const pacienteModified = {...item};
        pacienteModified.isActionsVisible = !pacienteModified.isActionsVisible;
        return pacienteModified;
      }
      return item;
    });
    setPacientes(filteredPacientes);
  };

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
            <Pressable
              style={styles.container}
              onLongPress={() => {
                setActionVisible(item.item.id);
              }}
              onPress={() => {
                openDetails(item.item);
              }}>
              <PacienteItem
                paciente={item.item}
                handlerEliminarItem={eliminarPaciente}
                handleEditarItem={editarPaciente}
                isActionsVisible={item.item.isActionsVisible}
              />
            </Pressable>
          )}
        />
      ) : (
        <Text style={styles.noPacientes}>No hay pacientes</Text>
      )}

      {isVisibleModal && (
        <Formulario
          isVisible={isVisibleModal}
          pacienteEdit={pacienteSelected}
          onDismissModal={onDismissModal}
          agregarOEditarPaciente={agregarOEditarPaciente}
        />
      )}

      {isVisibleDetailModal && (
        <PacienteDetail
          isVisible={isVisibleDetailModal}
          pacienteInfo={pacienteSelected}
          onDismissModal={onDismissDetailModal}
        />
      )}
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

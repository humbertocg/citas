import React, {PropsWithChildren, useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, useColorScheme, View} from 'react-native';
import {formatearFecha} from '../helpers';
import IPacienteInfo from '../interfaces/IPacienteInfo';

interface IProps {
  paciente: IPacienteInfo;
  handlerEliminarItem: (id: string) => void;
  handleEditarItem: (paciente: IPacienteInfo) => void;
  isActionsVisible: boolean;
}

let isDarkTheme1 = false;

const PacienteItem = ({
  paciente,
  handlerEliminarItem,
  handleEditarItem,
  isActionsVisible,
}: PropsWithChildren<IProps>) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const theme = useColorScheme();
  //isDarkTheme = theme === 'dark';
  console.log(isDarkTheme);

  useEffect(() => {
    setIsDarkTheme(theme === 'dark');
    isDarkTheme1 = theme === 'dark';
  }, [isDarkTheme, theme]);

  return (
    <View style={styles.container}>
      <View style={styles.propiedad}>
        <Text style={styles.labelTitulo}>Paciente:</Text>
        <Text style={styles.labelValor}>{paciente.nombrePaciente}</Text>
      </View>
      <View style={styles.propiedad}>
        <Text style={styles.labelTitulo}>Fecha de ingreso:</Text>
        <Text style={styles.labelValor}>
          {formatearFecha(paciente.fechaAlta)}
        </Text>
      </View>
      {isActionsVisible && (
        <View style={styles.btnContainer}>
          <Pressable
            style={[styles.btnBase, styles.btnEditar]}
            onPress={() => {
              handleEditarItem(paciente);
            }}>
            <Text style={styles.btnTexto}>Editar</Text>
          </Pressable>
          <Pressable
            style={[styles.btnBase, styles.btnEliminar]}
            onPress={() => {
              handlerEliminarItem(paciente.id);
            }}>
            <Text style={styles.btnTexto}>Eliminar</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 0,
    marginVertical: 7.5,
    padding: 10,
    marginHorizontal: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  propiedad: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  labelTitulo: {
    fontSize: 15,
    fontWeight: '600',
  },

  labelValor: {
    marginLeft: 15,
    fontSize: 15,
    fontWeight: '300',
    flex: 1,
  },
  btnContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  btnBase: {
    padding: 10,
    borderRadius: 10,
  },
  btnEliminar: {
    backgroundColor: '#EF4444',
  },
  btnEditar: {
    backgroundColor: '#F59E0B',
  },
  btnTexto: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

export default PacienteItem;

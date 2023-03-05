import React, {PropsWithChildren} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import IPacienteInfo from '../interfaces/IPacienteInfo';

interface IProps {
  paciente: IPacienteInfo;
  handlerEliminarItem: (id: string) => void;
  handleEditarItem: (paciente: IPacienteInfo) => void;
}

const PacienteItem = ({
  paciente,
  handlerEliminarItem,
  handleEditarItem,
}: PropsWithChildren<IProps>) => {
  const formatearFecha = (fecha: Date) => {
    const nuevaFecha = new Date(fecha);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return nuevaFecha.toLocaleDateString('es-MX', options);
  };
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
      <View style={styles.btnContainer}>
        <Pressable
          style={styles.btnEliminar}
          onLongPress={() => {
            handlerEliminarItem(paciente.id);
          }}>
          <Text style={styles.btnEliminarText}>Eliminar Paciente</Text>
        </Pressable>
        <Pressable
          style={styles.btnEditar}
          onLongPress={() => {
            handleEditarItem(paciente);
          }}>
          <Text style={styles.btnEditarText}>Editar Paciente</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 7.5,
    padding: 10,
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
  btnEliminar: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
  },
  btnEliminarText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },

  btnEditar: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
  },
  btnEditarText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
});

export default PacienteItem;

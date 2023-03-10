import React, {PropsWithChildren} from 'react';
import {
  GestureResponderEvent,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {formatearFecha} from '../helpers';
import IPacienteInfo from '../interfaces/IPacienteInfo';

interface IProps {
  pacienteInfo?: IPacienteInfo;
  isVisible: boolean;
  onDismissModal: () => void;
}

const PacienteDetail = ({
  pacienteInfo,
  isVisible,
  onDismissModal,
}: PropsWithChildren<IProps>) => {
  return (
    <Modal animationType="slide" visible={isVisible}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.titulo}>
            Información {''}
            <Text style={styles.tituloBold}>Cita</Text>
          </Text>

          <Pressable
            style={styles.btnCerrar}
            onPress={(event: GestureResponderEvent) => {
              onDismissModal();
            }}>
            <Text style={styles.btnCerrarText}>Cerrar</Text>
          </Pressable>

          <View style={styles.cardPacienteInfo}>
            <View style={styles.campo}>
              <Text style={styles.label}>Nombre Paciente</Text>
              <Text style={styles.labelValue}>
                {pacienteInfo?.nombrePaciente}
              </Text>
            </View>

            <View style={styles.campo}>
              <Text style={styles.label}>Nombre Propietario</Text>
              <Text style={styles.labelValue}>
                {pacienteInfo?.nombrePropietario}
              </Text>
            </View>

            <View style={styles.campo}>
              <Text style={styles.label}>Email Propietario</Text>
              <Text style={styles.labelValue}>
                {pacienteInfo?.emailPropietario}
              </Text>
            </View>

            <View style={styles.campo}>
              <Text style={styles.label}>Telefono Propietario</Text>
              <Text style={styles.labelValue}>{pacienteInfo?.telefono}</Text>
            </View>

            <View style={styles.campo}>
              <Text style={styles.label}>Fecha Alta</Text>
              <Text style={styles.labelValue}>
                {formatearFecha(
                  pacienteInfo !== undefined
                    ? pacienteInfo.fechaAlta
                    : new Date(),
                )}
              </Text>
            </View>

            <View style={styles.campo}>
              <Text style={styles.label}>Sintomas</Text>
              <Text style={styles.labelValue}>{pacienteInfo?.sintomas}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F59E0B',
    flex: 1,
  },
  cardPacienteInfo: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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
    marginTop: 0,
    marginHorizontal: 30,
    marginBottom: 10,
  },
  label: {
    color: '#202020',
    marginTop: 7.5,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  labelValue: {
    color: '#8e8e8e',
    marginBottom: 7.5,
    fontSize: 15,
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
  btnCerrar: {
    backgroundColor: '#E06900',
    padding: 20,
    marginVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnCerrarText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 15,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
});

export default PacienteDetail;

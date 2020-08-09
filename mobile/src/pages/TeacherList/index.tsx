import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { TouchableOpacity, RectButton } from 'react-native-gesture-handler';

import { Feather, MaterialIcons } from '@expo/vector-icons';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { useFavorites } from '../../hooks/favorites';
import { api } from '../../services/api';

import { styles } from './styles';

const TeacherList: React.FC = () => {
  const { favorites } = useFavorites();
  const [isFiltersVisible, setIsFiltersVisible] = useState<boolean>(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const [subject, setSubject] = useState<string>('');
  const [week_day, setWeek_day] = useState<string>('');
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    api.get<Teacher[]>('allClasses').then(({ data }) => {
      setTeachers(data);
    });
  }, []);

  const handleFiltersSubmit = useCallback(async () => {
    const { data } = await api.get<Teacher[]>('classes', {
      params: {
        subject,
        week_day,
        time,
      },
    });
    setIsFiltersVisible(false);
    setTeachers(data);
  }, [subject, time, week_day]);

  return (
    <View style={styles.container}>
      <PageHeader title="Proffys disponíveis">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsFiltersVisible(oldState => !oldState)}
        >
          <View style={styles.filter}>
            <View style={styles.filterGroup}>
              <Feather name="filter" size={20} color="#04D361" />
              <Text style={styles.filterText}>
                Filtrar por dia, hora e matéria
              </Text>
            </View>
            <MaterialIcons
              name={
                isFiltersVisible ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
              }
              size={20}
              color="#A380F6"
            />
          </View>
        </TouchableOpacity>
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              placeholderTextColor="#c1bccc"
              style={styles.input}
              placeholder="Qual a matéria?"
              value={subject}
              onChangeText={text => setSubject(text)}
            />
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  placeholder="Qual o dia da semana?"
                  value={week_day}
                  onChangeText={text => setWeek_day(text)}
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  placeholder="Qual o horário?"
                  value={time}
                  onChangeText={text => setTime(text)}
                />
              </View>
            </View>
            <RectButton
              onPress={handleFiltersSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map(teacher => (
          <TeacherItem
            favorited={favorites.includes(teacher.id)}
            key={teacher.id}
            teacher={teacher}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TeacherList;

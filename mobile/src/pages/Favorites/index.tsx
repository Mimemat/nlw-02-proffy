import React, { useCallback, useState } from 'react';
import { View, ScrollView } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { useFavorites } from '../../hooks/favorites';
import { useGet } from '../../hooks/swr/useGet';

import { styles } from './styles';

const Favorites: React.FC = () => {
  const { favorites } = useFavorites();
  const { data } = useGet<Teacher[]>('allClasses');
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const loadFavoriteTeachers = useCallback(() => {
    if (data) {
      setTeachers(data.filter(({ id }) => favorites.includes(id)));
    }
  }, [favorites, data]);

  useFocusEffect(
    useCallback(() => {
      loadFavoriteTeachers();
    }, [loadFavoriteTeachers]),
  );

  return (
    <View style={styles.container}>
      <PageHeader title="Meus Proffys favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map(teacher => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Favorites;

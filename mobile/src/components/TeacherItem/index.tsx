import React, { useCallback, useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { mutate as mutateGlobal } from 'swr';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import { useFavorites } from '../../hooks/favorites';
import { api } from '../../services/api';

import { styles } from './styles';

export interface Teacher {
  id: number;
  name: string;
  subject: string;
  cost: number;
  avatar: string;
  whatsapp: string;
  bio: string;
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  const { favorites, changeFavorites } = useFavorites();
  const [isFavorited, setIsFavorited] = useState<boolean>(
    favorites.includes(teacher.id),
  );

  async function handleLinkToWhatsApp() {
    const response = await api.post<number[]>('connections', {
      userId: teacher.id,
    });
    console.log(response.data);
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
    mutateGlobal('connections', response.data[0]);
  }

  const handleToggleFavorite = useCallback(async () => {
    let favoritesArray = [...favorites];

    if (isFavorited) {
      favoritesArray = favoritesArray.filter(id => id !== teacher.id);

      setIsFavorited(false);
    } else {
      favoritesArray.push(teacher.id);

      setIsFavorited(true);
    }

    changeFavorites(favoritesArray);
  }, [isFavorited, teacher.id, changeFavorites, favorites]);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{ uri: teacher.avatar }} />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>
      <Text style={styles.bio}>{teacher.bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'   '}
          <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text>
        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={handleToggleFavorite}
            style={[styles.favoriteButton, isFavorited && styles.favorited]}
          >
            {isFavorited ? (
              <Image source={unfavoriteIcon} />
            ) : (
              <Image source={heartOutlineIcon} />
            )}
          </RectButton>
          <RectButton
            style={styles.contactButton}
            onPress={handleLinkToWhatsApp}
          >
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;

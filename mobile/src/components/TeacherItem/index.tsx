import React, { useCallback, useState, useEffect } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import { useFavorites } from '../../hooks/favorites';

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
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
  const { favorites, changeFavorites } = useFavorites();
  const [isFavorited, setIsFavorited] = useState<boolean>(favorited);

  function handleLinkToWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
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
import React from 'react';

import { mutate as mutateGlobal } from 'swr';

import whatsAppIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';
import { api } from '../../services/api';

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
  async function createNewConnection() {
    const { data } = await api.post<number[]>('connections', {
      userId: teacher.id,
    });
    mutateGlobal('connections', data[0]);
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name} />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ {teacher.cost}</strong>
        </p>
        <a
          onClick={createNewConnection}
          href={`https://wa.me/${teacher.whatsapp}`}
          rel="noreferrer"
          target="_blank"
        >
          <img src={whatsAppIcon} alt="Whatsapp" />
          Entrar em contanto
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;

import React, { useState, FormEvent } from 'react';

import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import './styles.css';
import { useGet } from '../../hooks/swr/useGet';
import { api } from '../../services/api';

const TeacherList: React.FC = () => {
  const { data: teacherData, error } = useGet<Teacher[]>('allClasses');

  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();

    const { data } = await api.get<Teacher[]>('classes', {
      params: {
        subject,
        week_day,
        time,
      },
    });
    setIsFiltered(true);
    setFilteredTeachers(data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            options={[
              {
                value: 'Artes',
                label: 'Artes',
              },
              {
                value: 'Física',
                label: 'Física',
              },
              {
                value: 'Matemática',
                label: 'Matemática',
              },
              {
                value: 'Biologia',
                label: 'Biologia',
              },
              {
                value: 'Educação Física',
                label: 'Educação Física',
              },
              {
                value: 'Português',
                label: 'Português',
              },
            ]}
            label="Matéria"
          />
          <Select
            name="week_day"
            value={week_day}
            onChange={e => setWeekDay(e.target.value)}
            options={[
              {
                value: '0',
                label: 'Domingo',
              },
              {
                value: '1',
                label: 'Segunda-feira',
              },
              {
                value: '2',
                label: 'Terça-feira',
              },
              {
                value: '3',
                label: 'Quarta-feira',
              },
              {
                value: '4 Física',
                label: 'Quinta-feira',
              },
              {
                value: '5',
                label: 'Sexta-feira',
              },
              {
                value: '6',
                label: 'Sábado',
              },
            ]}
            label="Dia da semana"
          />
          <Input
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={e => setTime(e.target.value)}
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {isFiltered
          ? filteredTeachers.map(teacher => (
              <TeacherItem key={teacher.id} teacher={teacher} />
            ))
          : teacherData &&
            teacherData.map(teacher => (
              <TeacherItem key={teacher.id} teacher={teacher} />
            ))}
      </main>
    </div>
  );
};

export default TeacherList;

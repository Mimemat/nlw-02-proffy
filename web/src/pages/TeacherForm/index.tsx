import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import warningIcon from '../../assets/images/icons/warning.svg';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';
import TextArea from '../../components/Textarea';
import './styles.css';
import { api } from '../../services/api';

interface Schedule {
  week_day: number;
  from: string;
  to: string;
}

const TeacherForm: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [bio, setBio] = useState<string>('');

  const [subject, setSubject] = useState<string>('');
  const [cost, setCost] = useState<string>('');

  const [scheduleItems, setSheduleItems] = useState<Schedule[]>([
    {
      week_day: 0,
      from: '',
      to: '',
    },
  ]);

  function addNewSchedeItem() {
    setSheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }]);
  }

  function handleCreateClass(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const sentData = {
      name,
      schedule: scheduleItems,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
    };
    api
      .post('/classes', sentData)
      .then(() => {
        alert('Cadastro realizado com sucesso');
        history.push('/');
      })
      .catch(err => {
        console.error(err);
        alert('Algo deu errado');
      });
  }

  function setScheduleItemValue(
    position: number,
    field: keyof Schedule,
    value: string,
  ) {
    const dupArray = scheduleItems.map(
      (scheduleItem, index): Schedule => {
        if (index === position) return { ...scheduleItem, [field]: value };

        return scheduleItem;
      },
    );

    setSheduleItems(dupArray);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo, é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              onChange={e => setName(e.target.value)}
              value={name}
              label="Nome completo"
            />
            <Input
              onChange={e => setAvatar(e.target.value)}
              value={avatar}
              name="avatar"
              label="Avatar"
            />
            <Input
              onChange={e => setWhatsapp(e.target.value)}
              value={whatsapp}
              name="whatsapp"
              label="Whatsapp"
            />
            <TextArea
              onChange={e => setBio(e.target.value)}
              value={bio}
              name="bio"
              label="Biografia"
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

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
            <Input
              value={cost}
              onChange={e => setCost(e.target.value)}
              name="cost"
              label="Custo da sua hora por aula"
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewSchedeItem}>
                + Novo horário
              </button>
            </legend>
            {scheduleItems.map((item, index) => (
              <div key={index} className="schedule-item">
                <Select
                  name="week_day"
                  value={item.week_day}
                  onChange={e =>
                    setScheduleItemValue(index, 'week_day', e.target.value)
                  }
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
                  onChange={e =>
                    setScheduleItemValue(index, 'from', e.target.value)
                  }
                  name="from"
                  value={item.from}
                  label="Das"
                  type="time"
                />
                <Input
                  onChange={e =>
                    setScheduleItemValue(index, 'to', e.target.value)
                  }
                  name="to"
                  value={item.to}
                  label="Até"
                  type="time"
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default TeacherForm;

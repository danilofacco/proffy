import React, {useState, FormEvent} from 'react';
import "./styles.css";
import Input from '../../components/Input';
import warningIcon from "../../assets/images/icons/warning.svg";
import PageHeader from '../../components/PageHeader';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
function TeacherForm() {

  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [bio, setBio] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [subject, setSubject] = useState('')
  const [cost, setCost] = useState('')

  const [scheduleItems, setScheduleItems] = useState([
    { week_day:'', from:'', to:''}
  ])
  
  const history = useHistory()

  function setScheduleItemValue(position: Number, field:string, value:string){
    const updatedScheduleItens = scheduleItems.map((scheduleItem, index) => {
      if (index === position){
        return {...scheduleItem, [field] : value }
      }
      return scheduleItem
    })
    setScheduleItems(updatedScheduleItens )
  }

  function handleCreateClass(e: FormEvent){
    e.preventDefault()

    api.post('classes',{
      name,
      avatar,
      bio,
      whatsapp,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() =>{
      alert("Cadastro realizado com sucesso!")
      history.push("/")
    }).catch(()=>{
      alert("Erro no cadastro.")
    })
    console.log({
      name,
      avatar,
      bio,
      whatsapp,
      subject,
      cost,
      scheduleItems
    }    )
  }

  function addNewScheduleItem(){
    setScheduleItems([
      ...scheduleItems,
      { week_day:'', from:'', to:''}
    ])

  }
  return (
    <div id="page-teacher-form" className="container">
    <PageHeader title="Que incrível que você quer dar aulas."
    description= "O primeiro passo é preencher esse formulario de inscrição."/>
   
    <main>
      <form onSubmit={handleCreateClass}>
    <fieldset>
      <legend>Seus dados</legend>
      <Input name="name" label="Nome Completo" value={name} onChange={(e) => {setName(e.target.value)}}/>
      <Input name="avatar-day" label="Avatar" value={avatar} onChange={(e) => {setAvatar(e.target.value)}}/>
      <Input name="whatsapp" label="Whatsapp" value={whatsapp} onChange={(e) => {setWhatsapp(e.target.value)}}/>
      <Textarea name="bio" label="Biografia" value={bio} onChange={(e) => {setBio(e.target.value)}}/>
    </fieldset>

 
    <fieldset>
      <legend>Sobre a aula</legend>
      <Select 
      name="subject" 
      label="Matéria"
      value={subject} onChange={(e) => {setSubject(e.target.value)}}
      options = {[
        {value: "Artes", label: "Artes"},
        {value: "Biologia", label: "Biologia"},
        {value: "História", label: "História"},
        {value: "Geografia", label: "Geografia"},
        {value: "Educação Física", label: "Educação Física"},
        {value: "Física", label: "Física"},
        {value: "Matemática", label: "Matemática"},
        {value: "Química", label: "Química"},
        {value: "Ciências", label: "Ciências"},
        {value: "Português", label: "Português"}

      ]
      }
      />
      <Input name="cost"  value={cost} onChange={(e) => {setCost(e.target.value)}} label="Custo da sua hora por aula"/>
    </fieldset>

    <fieldset>
      <legend>Horários Disponíveis 
        <button type="button" onClick={addNewScheduleItem}>
      + Novo horário
      </button></legend>

      {scheduleItems.map((scheduleItem, index) => {
        return(
          <div key={scheduleItem.week_day} className="schedule-item">
      <Select 
      name="week-day" 
      label="Dia da Semana"
      value={scheduleItem.week_day}
      onChange={e => setScheduleItemValue(index,'week_day', e.target.value)}
      options = {[
        {value: "0", label: "Domingo"},
        {value: "1", label: "Segunda-feira"},
        {value: "2", label: "Terça-feira"},
        {value: "3", label: "Quarta-feira"},
        {value: "4", label: "Quinta-feira"},
        {value: "5", label: "Sexta-feira"},
        {value: "6", label: "Sábado"}

      ]
      }
      />
      <Input value={scheduleItem.from} onChange={e => setScheduleItemValue(index,'from', e.target.value)} type="time" name="from" label="Das"/>
      <Input value={scheduleItem.to} onChange={e => setScheduleItemValue(index,'to', e.target.value)} type="time" name="to" label="Até"/>
      </div>

        )
      })}      
      </fieldset>
      
    <footer>
      <p>
        <img src={warningIcon} alt="Aviso Importante"/>
        Importante! <br/>
        Preencha todos os dados.
        </p>
        <button type="submit">Salvar</button>
    </footer>
    </form>
  </main>
  </div>
  )
}

export default TeacherForm;
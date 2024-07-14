
let allTask = [
  {
    name: 'Lunch',
    date: new Date('2024-07-08 10:00'),
    completed: true
  },
  {
    name: 'Academia em grupo',
    date: new Date("2024-07-09 19:00"),
    completed: false
  },
  {
    name: 'Gaming session',
    date: new Date("2024-07-09 23:00"),
    completed: false
  },
]

const format = (data) => {
  return {
    day: {
      number: dayjs(data).format('DD'),
      week: {
        short: dayjs(data).format('ddd'),
        long: dayjs(data).format('dddd')
      }
    },
    month: dayjs(data).format('MMMM'),
    hour: dayjs(data).format('HH:mm')
  }
}

const createTask = (task) =>  {

  let input = `
  <input 
  onchange="completeTask(event)"
  value="${task.date}"
  type="checkbox"
  `

  if(task.completed) {
    input += "checked"
  }

  input += ">"

  const formatData = format(task.date)

  return `
    <div class="card-bg">
      ${input}
      
      <div>
        <svg class="active" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.50008 10L9.16675 11.6667L12.5001 8.33335M18.3334 10C18.3334 14.6024 14.6025 18.3334 10.0001 18.3334C5.39771 18.3334 1.66675 14.6024 1.66675 10C1.66675 5.39765 5.39771 1.66669 10.0001 1.66669C14.6025 1.66669 18.3334 5.39765 18.3334 10Z" stroke="#BEF264" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        <svg class="inactive" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.41664 1.81836C9.46249 1.61597 10.5374 1.61597 11.5833 1.81836M11.5833 18.1817C10.5374 18.3841 9.46249 18.3841 8.41664 18.1817M14.6741 3.10086C15.5587 3.70022 16.3197 4.46409 16.9158 5.35086M1.8183 11.5834C1.6159 10.5375 1.6159 9.46255 1.8183 8.4167M16.8991 14.6742C16.2998 15.5588 15.5359 16.3198 14.6491 16.9159M18.1816 8.4167C18.384 9.46255 18.384 10.5375 18.1816 11.5834M3.1008 5.32586C3.70016 4.44131 4.46403 3.68026 5.3508 3.0842M5.3258 16.8992C4.44124 16.2998 3.6802 15.536 3.08414 14.6492" stroke="#A1A1AA" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        <span>${task.name}</span>
      </div>

      <time class="short">
        ${formatData.day.week.short},
        ${formatData.day.number} <br>
        ${formatData.hour}
      </time>
      <time class="full">
        ${formatData.day.week.long},
        dia ${formatData.day.number}
        de ${formatData.month}
        às ${formatData.hour}h
      </time>
    </div>
  `
}

const updateTask = () => {
  const section = document.querySelector('section')
  section.innerHTML = ''

  if(allTask.length == 0) {
    section.innerHTML = `<p>Nenhuma atividade encontrada.</p>`
    return
  }

  for(let task of allTask) {
    section.innerHTML += createTask(task)
  }
}

const saveTask = (event) => {
  event.preventDefault()
  const formData = new FormData(event.target)
  const name = formData.get('task')
  const day = formData.get('day')
  const hour = formData.get('hour')
  const date = `${day} ${hour}`
  const newTask = {
    name,
    date,
    completed: false
  }

  const checkTask = allTask.find((task) => {
    return task.date == newTask.date
  })

  if(checkTask) {
    return alert('Atividade já existente.')
  }

  allTask = [newTask, ...allTask]
  updateTask()
}

const completeTask = (event) => {
  const input = event.target

  const inputDate = input.value


  const task = allTask.find((task) => {
    return task.date == inputDate
  })

  if(!task) {
    return
  }

  task.completed = !task.completed
}

const daySelect = () => {
  const days = [
    "2024-02-28",
    "2024-02-29",
    "2024-03-01",
    "2024-03-02",
    "2024-03-03",
  ]

  let allDaysSelect = ''

  for(let day of days) {
    const formatData = format(day)
    const display = `
    ${formatData.day.number} de
    ${formatData.month}
    `
    allDaysSelect += `
    <option value="${day}">${display}</option>
    `
  }

  document
  .querySelector('select[name="day"]')
  .innerHTML = allDaysSelect
}

const hourSelect = () => {
  let hours = ``

  for(let i = 6; i < 23; i++) {
    const hour = String(i).padStart(2, '0')
    hours += `<option value="${hour}:00">${hour}:00</option>`
    hours += `<option value="${hour}:30">${hour}:30</option>`
  }

  document
  .querySelector('select[name="hour"]')
  .innerHTML = hours
}

updateTask()
daySelect()
hourSelect()
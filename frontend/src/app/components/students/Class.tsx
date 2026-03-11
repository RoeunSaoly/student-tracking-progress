// app/schedule/page.tsx
import { CalendarDays, Clock, MapPin, BookOpen, User } from 'lucide-react';

const classes = [
  {
    id: 1,
    subject: 'Algebra II',
    period: 'Period 1',
    teacher: 'Ms. Johnson',
    time: '8:00 AM - 9:30 AM',
    room: 'Room 204',
    assignments: 18,
    nextClass: 'Monday, 8:00 AM',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700'
  },
  {
    id: 2,
    subject: 'English Literature',
    period: 'Period 2',
    teacher: 'Mr. Thompson',
    time: '9:45 AM - 11:15 AM',
    room: 'Room 310',
    assignments: 15,
    nextClass: 'Monday, 9:45 AM',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700'
  },
  {
    id: 3,
    subject: 'Chemistry',
    period: 'Period 3',
    teacher: 'Dr. Martinez',
    time: '11:30 AM - 1:00 PM',
    room: 'Lab 102',
    assignments: 20,
    nextClass: 'Tuesday, 11:30 AM',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-700'
  },
  {
    id: 4,
    subject: 'World History',
    period: 'Period 4',
    teacher: 'Ms. Davis',
    time: '1:45 PM - 3:15 PM',
    room: 'Room 215',
    assignments: 16,
    nextClass: 'Monday, 1:45 PM',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700'
  },
  {
    id: 5,
    subject: 'Spanish III',
    period: 'Period 5',
    teacher: 'Señora Lopez',
    time: '8:00 AM - 9:30 AM',
    room: 'Room 118',
    assignments: 14,
    nextClass: 'Tuesday, 8:00 AM',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-700'
  },
  {
    id: 6,
    subject: 'Physical Education',
    period: 'Period 6',
    teacher: 'Coach Williams',
    time: '10:00 AM - 11:30 AM',
    room: 'Gymnasium',
    assignments: 5,
    nextClass: 'Wednesday, 10:00 AM',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    textColor: 'text-indigo-700'
  }
]

export default function SchedulePage() {
  const totalAssignments = classes.reduce((sum, cls) => sum + cls.assignments, 0)
  const mostAssignments = Math.max(...classes.map(cls => cls.assignments))
  const fewestAssignments = Math.min(...classes.map(cls => cls.assignments))
  const mostAssignmentsClass = classes.find(cls => cls.assignments === mostAssignments)
  const fewestAssignmentsClass = classes.find(cls => cls.assignments === fewestAssignments)

  const nextClassesByDay = {
    'Monday': classes.filter(cls => cls.nextClass.includes('Monday')),
    'Tuesday': classes.filter(cls => cls.nextClass.includes('Tuesday')),
    'Wednesday': classes.filter(cls => cls.nextClass.includes('Wednesday'))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">My Classes</h1>
          <p className="text-lg text-gray-600 mt-2">Spring Semester 2025</p>
          <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-700">Assignments</span>
            </div>
            <p className="text-gray-600 mt-1">Messages</p>
          </div>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-700 mb-2">Total Assignments</h3>
            <p className="text-3xl font-bold text-blue-600">{totalAssignments}</p>
            <p className="text-sm text-gray-500 mt-1">Across all classes</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-700 mb-2">Most Assignments</h3>
            <p className="text-2xl font-bold text-purple-600">{mostAssignmentsClass?.subject}</p>
            <p className="text-sm text-gray-500 mt-1">{mostAssignments} assignments</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-700 mb-2">Fewest Assignments</h3>
            <p className="text-2xl font-bold text-indigo-600">{fewestAssignmentsClass?.subject}</p>
            <p className="text-sm text-gray-500 mt-1">{fewestAssignments} assignments</p>
          </div>
        </div>

        {/* Class Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className={`${cls.bgColor} border ${cls.borderColor} rounded-xl p-5 shadow-sm transition-all duration-200 hover:shadow-md`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className={`text-xl font-bold ${cls.textColor}`}>{cls.subject}</h2>
                  <p className="text-gray-600 font-medium">{cls.period}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${cls.bgColor} ${cls.textColor} border ${cls.borderColor}`}>
                  {cls.assignments} assignments
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{cls.teacher}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{cls.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{cls.room}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Next class</p>
                    <p className="font-semibold text-gray-800">{cls.nextClass}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Classes by Day */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📅 Next Classes by Day</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(nextClassesByDay).map(([day, dayClasses]) => (
              <div key={day} className="border rounded-lg p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-3">{day}</h3>
                <div className="space-y-2">
                  {dayClasses.map((cls) => (
                    <div key={cls.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                      <span className="font-medium text-gray-700">{cls.subject}</span>
                      <span className="text-sm text-gray-500">{cls.nextClass.split(', ')[1]}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Class Button */}
        <div className="flex justify-center">
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow">
            <span className="text-xl">+</span>
            Add Class
          </button>
        </div>
      </div>
    </div>
  )
}
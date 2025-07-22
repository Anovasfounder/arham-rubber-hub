import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Users, 
  BookOpen,
  GraduationCap,
  Calendar,
  Clock,
  UserCheck,
  TrendingUp
} from 'lucide-react'

const ClassesPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGrade, setSelectedGrade] = useState('all')
  const [showAddDialog, setShowAddDialog] = useState(false)

  // Sample class data
  const classes = [
    {
      id: '1',
      name: 'Grade 9A',
      gradeLevel: 9,
      section: 'A',
      classTeacher: {
        name: 'Ms. Sarah Wilson',
        avatar: '',
        id: 'TCH001'
      },
      totalStudents: 28,
      maxStudents: 30,
      subjects: ['Mathematics', 'Science', 'English', 'History', 'PE'],
      averageAttendance: 94,
      academicYear: '2024-2025',
      room: 'Room 101',
      schedule: [
        { day: 'Monday', periods: 6 },
        { day: 'Tuesday', periods: 6 },
        { day: 'Wednesday', periods: 5 },
        { day: 'Thursday', periods: 6 },
        { day: 'Friday', periods: 5 }
      ]
    },
    {
      id: '2',
      name: 'Grade 9B',
      gradeLevel: 9,
      section: 'B',
      classTeacher: {
        name: 'Mr. John Davis',
        avatar: '',
        id: 'TCH002'
      },
      totalStudents: 25,
      maxStudents: 30,
      subjects: ['Mathematics', 'Science', 'English', 'History', 'PE'],
      averageAttendance: 91,
      academicYear: '2024-2025',
      room: 'Room 102',
      schedule: [
        { day: 'Monday', periods: 6 },
        { day: 'Tuesday', periods: 6 },
        { day: 'Wednesday', periods: 5 },
        { day: 'Thursday', periods: 6 },
        { day: 'Friday', periods: 5 }
      ]
    },
    {
      id: '3',
      name: 'Grade 10A',
      gradeLevel: 10,
      section: 'A',
      classTeacher: {
        name: 'Dr. Emily Brown',
        avatar: '',
        id: 'TCH003'
      },
      totalStudents: 30,
      maxStudents: 30,
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'English', 'Computer Science'],
      averageAttendance: 96,
      academicYear: '2024-2025',
      room: 'Room 201',
      schedule: [
        { day: 'Monday', periods: 7 },
        { day: 'Tuesday', periods: 7 },
        { day: 'Wednesday', periods: 6 },
        { day: 'Thursday', periods: 7 },
        { day: 'Friday', periods: 6 }
      ]
    },
    {
      id: '4',
      name: 'Grade 11A',
      gradeLevel: 11,
      section: 'A',
      classTeacher: {
        name: 'Mr. Michael Garcia',
        avatar: '',
        id: 'TCH004'
      },
      totalStudents: 22,
      maxStudents: 25,
      subjects: ['Advanced Mathematics', 'Physics', 'Chemistry', 'English', 'Biology'],
      averageAttendance: 93,
      academicYear: '2024-2025',
      room: 'Room 301',
      schedule: [
        { day: 'Monday', periods: 7 },
        { day: 'Tuesday', periods: 7 },
        { day: 'Wednesday', periods: 6 },
        { day: 'Thursday', periods: 7 },
        { day: 'Friday', periods: 6 }
      ]
    }
  ]

  const grades = ['all', '9', '10', '11', '12']

  const filteredClasses = classes.filter(classItem => {
    const matchesSearch = classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         classItem.classTeacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         classItem.room.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGrade = selectedGrade === 'all' || classItem.gradeLevel.toString() === selectedGrade
    return matchesSearch && matchesGrade
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const getCapacityColor = (current: number, max: number) => {
    const percentage = (current / max) * 100
    if (percentage >= 90) return 'text-red-600'
    if (percentage >= 75) return 'text-orange-600'
    return 'text-green-600'
  }

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 95) return 'text-green-600'
    if (attendance >= 90) return 'text-blue-600'
    if (attendance >= 85) return 'text-orange-600'
    return 'text-red-600'
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Classes</h1>
          <p className="text-gray-600 mt-1">Manage class schedules and student assignments</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Class
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Class</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="className">Class Name</Label>
                <Input id="className" placeholder="Grade 9A" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gradeLevel">Grade Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.slice(1).map(grade => (
                      <SelectItem key={grade} value={grade}>Grade {grade}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="section">Section</Label>
                <Input id="section" placeholder="A" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="room">Room Number</Label>
                <Input id="room" placeholder="Room 101" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="classTeacher">Class Teacher</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TCH001">Ms. Sarah Wilson</SelectItem>
                    <SelectItem value="TCH002">Mr. John Davis</SelectItem>
                    <SelectItem value="TCH003">Dr. Emily Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxStudents">Maximum Students</Label>
                <Input id="maxStudents" type="number" placeholder="30" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="academicYear">Academic Year</Label>
                <Input id="academicYear" placeholder="2024-2025" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                Create Class
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search classes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by grade" />
                </SelectTrigger>
                <SelectContent>
                  {grades.map(grade => (
                    <SelectItem key={grade} value={grade}>
                      {grade === 'all' ? 'All Grades' : `Grade ${grade}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Classes Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClasses.map((classItem, index) => (
          <motion.div
            key={classItem.id}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="group"
          >
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 h-full">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{classItem.name}</h3>
                    <p className="text-sm text-gray-500">{classItem.room}</p>
                  </div>
                  <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                    {classItem.academicYear}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Class Teacher */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={classItem.classTeacher.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                      {classItem.classTeacher.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{classItem.classTeacher.name}</p>
                    <p className="text-sm text-gray-500">Class Teacher</p>
                  </div>
                </div>

                {/* Student Capacity */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Student Capacity</span>
                    <span className={`font-medium ${getCapacityColor(classItem.totalStudents, classItem.maxStudents)}`}>
                      {classItem.totalStudents}/{classItem.maxStudents}
                    </span>
                  </div>
                  <Progress 
                    value={(classItem.totalStudents / classItem.maxStudents) * 100} 
                    className="h-2"
                  />
                </div>

                {/* Attendance */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Average Attendance</span>
                    <span className={`font-medium ${getAttendanceColor(classItem.averageAttendance)}`}>
                      {classItem.averageAttendance}%
                    </span>
                  </div>
                  <Progress 
                    value={classItem.averageAttendance} 
                    className="h-2"
                  />
                </div>

                {/* Subjects */}
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Subjects ({classItem.subjects.length})</p>
                  <div className="flex flex-wrap gap-1">
                    {classItem.subjects.slice(0, 3).map((subject, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                    {classItem.subjects.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{classItem.subjects.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 pt-3 border-t">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-lg font-bold text-blue-600">{classItem.totalStudents}</span>
                    </div>
                    <p className="text-xs text-gray-500">Students</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <BookOpen className="w-4 h-4 text-green-600" />
                      <span className="text-lg font-bold text-green-600">{classItem.subjects.length}</span>
                    </div>
                    <p className="text-xs text-gray-500">Subjects</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <span className="text-lg font-bold text-purple-600">
                        {classItem.schedule.reduce((acc, day) => acc + day.periods, 0)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Periods/Week</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Users className="w-4 h-4 mr-1" />
                    Manage
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    Schedule
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Statistics */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Class Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{classes.length}</div>
                <div className="text-sm text-gray-500">Total Classes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {classes.reduce((acc, c) => acc + c.totalStudents, 0)}
                </div>
                <div className="text-sm text-gray-500">Total Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {Math.round(classes.reduce((acc, c) => acc + c.averageAttendance, 0) / classes.length)}%
                </div>
                <div className="text-sm text-gray-500">Avg Attendance</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {Math.round((classes.reduce((acc, c) => acc + c.totalStudents, 0) / 
                              classes.reduce((acc, c) => acc + c.maxStudents, 0)) * 100)}%
                </div>
                <div className="text-sm text-gray-500">Capacity Used</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default ClassesPage

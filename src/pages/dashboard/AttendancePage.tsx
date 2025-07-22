import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { 
  Calendar as CalendarIcon,
  Search, 
  CheckCircle, 
  XCircle, 
  Clock,
  AlertTriangle,
  Users,
  TrendingUp,
  Download,
  Filter
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

const AttendancePage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedClass, setSelectedClass] = useState('all')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('mark')

  // Sample attendance data
  const attendanceData = [
    {
      id: '1',
      studentId: 'STU001',
      name: 'Alice Johnson',
      class: 'Grade 10A',
      avatar: '',
      attendance: {
        '2024-12-16': 'present',
        '2024-12-15': 'present',
        '2024-12-14': 'absent',
        '2024-12-13': 'present',
        '2024-12-12': 'late',
      },
      monthlyStats: {
        present: 18,
        absent: 2,
        late: 1,
        excused: 0,
        total: 21
      }
    },
    {
      id: '2',
      studentId: 'STU002',
      name: 'Bob Smith',
      class: 'Grade 10A',
      avatar: '',
      attendance: {
        '2024-12-16': 'present',
        '2024-12-15': 'late',
        '2024-12-14': 'present',
        '2024-12-13': 'present',
        '2024-12-12': 'present',
      },
      monthlyStats: {
        present: 19,
        absent: 1,
        late: 1,
        excused: 0,
        total: 21
      }
    },
    {
      id: '3',
      studentId: 'STU003',
      name: 'Carol Davis',
      class: 'Grade 10A',
      avatar: '',
      attendance: {
        '2024-12-16': 'absent',
        '2024-12-15': 'present',
        '2024-12-14': 'present',
        '2024-12-13': 'excused',
        '2024-12-12': 'present',
      },
      monthlyStats: {
        present: 17,
        absent: 2,
        late: 0,
        excused: 2,
        total: 21
      }
    },
    {
      id: '4',
      studentId: 'STU004',
      name: 'David Wilson',
      class: 'Grade 10A',
      avatar: '',
      attendance: {
        '2024-12-16': 'present',
        '2024-12-15': 'present',
        '2024-12-14': 'present',
        '2024-12-13': 'present',
        '2024-12-12': 'present',
      },
      monthlyStats: {
        present: 21,
        absent: 0,
        late: 0,
        excused: 0,
        total: 21
      }
    }
  ]

  const classes = ['all', 'Grade 9A', 'Grade 9B', 'Grade 10A', 'Grade 10B', 'Grade 11A']
  const subjects = ['all', 'Mathematics', 'English', 'Science', 'History', 'PE']

  const filteredStudents = attendanceData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesClass = selectedClass === 'all' || student.class === selectedClass
    return matchesSearch && matchesClass
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

  const getAttendanceColor = (status: string) => {
    switch (status) {
      case 'present': return 'text-green-600 bg-green-100'
      case 'absent': return 'text-red-600 bg-red-100'
      case 'late': return 'text-orange-600 bg-orange-100'
      case 'excused': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getAttendanceIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4" />
      case 'absent': return <XCircle className="w-4 h-4" />
      case 'late': return <Clock className="w-4 h-4" />
      case 'excused': return <AlertTriangle className="w-4 h-4" />
      default: return <Users className="w-4 h-4" />
    }
  }

  const calculateAttendancePercentage = (stats: any) => {
    const presentDays = stats.present + stats.late + stats.excused
    return Math.round((presentDays / stats.total) * 100)
  }

  const markAttendance = (studentId: string, status: string) => {
    console.log(`Marking ${studentId} as ${status} for ${format(selectedDate, 'yyyy-MM-dd')}`)
    // In real app, this would update the backend
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
          <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
          <p className="text-gray-600 mt-1">Track and manage student attendance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("justify-start text-left font-normal")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="mark">Mark Attendance</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mark" className="space-y-6 mt-6">
            {/* Filters */}
            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search students..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map(cls => (
                        <SelectItem key={cls} value={cls}>
                          {cls === 'all' ? 'All Classes' : cls}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map(subject => (
                        <SelectItem key={subject} value={subject}>
                          {subject === 'all' ? 'All Subjects' : subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Attendance Marking */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Attendance for {format(selectedDate, "EEEE, MMMM d, yyyy")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-900">{student.name}</h3>
                          <p className="text-sm text-gray-500">{student.studentId} • {student.class}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {['present', 'absent', 'late', 'excused'].map((status) => (
                          <Button
                            key={status}
                            variant="outline"
                            size="sm"
                            className={cn(
                              "min-w-20 capitalize",
                              student.attendance[format(selectedDate, 'yyyy-MM-dd')] === status && getAttendanceColor(status)
                            )}
                            onClick={() => markAttendance(student.id, status)}
                          >
                            {getAttendanceIcon(status)}
                            <span className="ml-1">{status}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6 mt-6">
            {/* Monthly Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {filteredStudents.map((student) => {
                const percentage = calculateAttendancePercentage(student.monthlyStats)
                return (
                  <Card key={student.id} className="border-0 shadow-md">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-900">{student.name}</h3>
                          <p className="text-sm text-gray-500">{student.studentId}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-center">
                        <div className={`text-3xl font-bold ${percentage >= 90 ? 'text-green-600' : percentage >= 75 ? 'text-orange-600' : 'text-red-600'}`}>
                          {percentage}%
                        </div>
                        <p className="text-sm text-gray-500">Attendance Rate</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>{student.monthlyStats.present} Present</span>
                        </div>
                        <div className="flex items-center gap-1 text-red-600">
                          <XCircle className="w-4 h-4" />
                          <span>{student.monthlyStats.absent} Absent</span>
                        </div>
                        <div className="flex items-center gap-1 text-orange-600">
                          <Clock className="w-4 h-4" />
                          <span>{student.monthlyStats.late} Late</span>
                        </div>
                        <div className="flex items-center gap-1 text-blue-600">
                          <AlertTriangle className="w-4 h-4" />
                          <span>{student.monthlyStats.excused} Excused</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            {/* Overall Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{filteredStudents.length}</div>
                    <div className="text-sm text-gray-500">Total Students</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {Math.round(filteredStudents.reduce((acc, s) => acc + calculateAttendancePercentage(s.monthlyStats), 0) / filteredStudents.length)}%
                    </div>
                    <div className="text-sm text-gray-500">Avg Attendance</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">
                      {filteredStudents.reduce((acc, s) => acc + s.monthlyStats.absent, 0)}
                    </div>
                    <div className="text-sm text-gray-500">Total Absences</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">
                      {filteredStudents.reduce((acc, s) => acc + s.monthlyStats.late, 0)}
                    </div>
                    <div className="text-sm text-gray-500">Late Arrivals</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Attendance Trends */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Attendance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Attendance chart would be displayed here</p>
                    <p className="text-sm">Integration with Chart.js for detailed analytics</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}

export default AttendancePage

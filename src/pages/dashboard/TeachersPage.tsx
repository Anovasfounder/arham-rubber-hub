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
import { Textarea } from '@/components/ui/textarea'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  BookOpen,
  Users,
  GraduationCap,
  Award
} from 'lucide-react'

const TeachersPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [showAddDialog, setShowAddDialog] = useState(false)

  // Sample teacher data
  const teachers = [
    {
      id: '1',
      teacherId: 'TCH001',
      name: 'Dr. Sarah Wilson',
      email: 'sarah.wilson@school.edu',
      department: 'Mathematics',
      phone: '+1-555-0201',
      avatar: '',
      status: 'active',
      experience: '8 years',
      qualification: 'Ph.D. in Mathematics',
      subjects: ['Algebra', 'Calculus', 'Statistics'],
      classes: ['Grade 10A', 'Grade 11A'],
      joiningDate: '2020-08-15',
      salary: 75000
    },
    {
      id: '2',
      teacherId: 'TCH002',
      name: 'Mr. John Davis',
      email: 'john.davis@school.edu',
      department: 'Science',
      phone: '+1-555-0202',
      avatar: '',
      status: 'active',
      experience: '12 years',
      qualification: 'M.Sc. in Physics',
      subjects: ['Physics', 'Chemistry'],
      classes: ['Grade 9A', 'Grade 10B'],
      joiningDate: '2018-08-15',
      salary: 68000
    },
    {
      id: '3',
      teacherId: 'TCH003',
      name: 'Ms. Emily Brown',
      email: 'emily.brown@school.edu',
      department: 'English',
      phone: '+1-555-0203',
      avatar: '',
      status: 'active',
      experience: '6 years',
      qualification: 'M.A. in English Literature',
      subjects: ['English Literature', 'Grammar'],
      classes: ['Grade 9B', 'Grade 10A'],
      joiningDate: '2021-08-15',
      salary: 62000
    },
    {
      id: '4',
      teacherId: 'TCH004',
      name: 'Mr. Michael Garcia',
      email: 'michael.garcia@school.edu',
      department: 'History',
      phone: '+1-555-0204',
      avatar: '',
      status: 'on_leave',
      experience: '15 years',
      qualification: 'M.A. in History',
      subjects: ['World History', 'Geography'],
      classes: ['Grade 11B'],
      joiningDate: '2015-08-15',
      salary: 70000
    }
  ]

  const departments = ['all', 'Mathematics', 'Science', 'English', 'History', 'Physical Education', 'Arts']

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teacher.teacherId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = selectedDepartment === 'all' || teacher.department === selectedDepartment
    return matchesSearch && matchesDepartment
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'on_leave': return 'bg-orange-100 text-orange-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
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
          <h1 className="text-3xl font-bold text-gray-900">Teachers</h1>
          <p className="text-gray-600 mt-1">Manage teaching staff and their information</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Teacher
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Teacher</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter teacher name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="teacher@school.edu" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teacherId">Teacher ID</Label>
                <Input id="teacherId" placeholder="TCH001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.slice(1).map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+1-555-0000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience (years)</Label>
                <Input id="experience" type="number" placeholder="5" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="qualification">Qualification</Label>
                <Input id="qualification" placeholder="M.Sc. in Mathematics" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Textarea id="specialization" placeholder="Areas of expertise..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary</Label>
                <Input id="salary" type="number" placeholder="50000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="joiningDate">Joining Date</Label>
                <Input id="joiningDate" type="date" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                Add Teacher
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
                    placeholder="Search teachers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>
                      {dept === 'all' ? 'All Departments' : dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Teachers Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher, index) => (
          <motion.div
            key={teacher.id}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="group"
          >
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 h-full">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={teacher.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                        {teacher.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">{teacher.name}</h3>
                      <p className="text-sm text-gray-500">{teacher.teacherId}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(teacher.status)}>
                    {teacher.status.replace('_', ' ')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BookOpen className="w-4 h-4" />
                    <span>{teacher.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{teacher.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{teacher.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Award className="w-4 h-4" />
                    <span>{teacher.qualification}</span>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Experience:</span>
                      <span className="font-medium">{teacher.experience}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Classes:</span>
                      <span className="font-medium">{teacher.classes.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subjects:</span>
                      <span className="font-medium">{teacher.subjects.length}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {teacher.subjects.slice(0, 2).map((subject, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                    {teacher.subjects.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{teacher.subjects.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
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
            <CardTitle>Teacher Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{teachers.length}</div>
                <div className="text-sm text-gray-500">Total Teachers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {teachers.filter(t => t.status === 'active').length}
                </div>
                <div className="text-sm text-gray-500">Active</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {teachers.filter(t => t.status === 'on_leave').length}
                </div>
                <div className="text-sm text-gray-500">On Leave</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {Math.round(teachers.reduce((acc, t) => acc + parseInt(t.experience), 0) / teachers.length)}
                </div>
                <div className="text-sm text-gray-500">Avg Experience (Years)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default TeachersPage

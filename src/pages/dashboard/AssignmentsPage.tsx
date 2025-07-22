import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  FileText, 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  BookOpen,
  Download,
  Upload
} from 'lucide-react'

const AssignmentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [activeTab, setActiveTab] = useState('all')

  // Sample assignment data
  const assignments = [
    {
      id: '1',
      title: 'Algebra Problem Set 1',
      description: 'Complete exercises 1-20 from Chapter 3',
      subject: 'Mathematics',
      class: 'Grade 10A',
      teacher: 'Ms. Sarah Wilson',
      dueDate: '2024-12-20',
      maxMarks: 50,
      status: 'active',
      submitted: 22,
      totalStudents: 28,
      instructions: 'Show all working steps. Calculator is allowed for complex calculations.',
      attachments: ['algebra_chapter3.pdf'],
      createdDate: '2024-12-10'
    },
    {
      id: '2',
      title: 'English Essay - Shakespeare',
      description: 'Write a 500-word essay on Hamlet\'s character development',
      subject: 'English',
      class: 'Grade 11A',
      teacher: 'Dr. Emily Brown',
      dueDate: '2024-12-25',
      maxMarks: 100,
      status: 'active',
      submitted: 18,
      totalStudents: 25,
      instructions: 'Use MLA format. Minimum 3 references required.',
      attachments: ['hamlet_guide.pdf', 'essay_template.docx'],
      createdDate: '2024-12-08'
    },
    {
      id: '3',
      title: 'Physics Lab Report',
      description: 'Pendulum experiment analysis and conclusions',
      subject: 'Physics',
      class: 'Grade 11B',
      teacher: 'Mr. John Davis',
      dueDate: '2024-12-15',
      maxMarks: 75,
      status: 'graded',
      submitted: 20,
      totalStudents: 20,
      instructions: 'Include graphs and error analysis. Submit both digital and printed copies.',
      attachments: ['lab_instructions.pdf'],
      createdDate: '2024-12-01'
    },
    {
      id: '4',
      title: 'History Timeline Project',
      description: 'Create a detailed timeline of World War II events',
      subject: 'History',
      class: 'Grade 9B',
      teacher: 'Mr. Michael Garcia',
      dueDate: '2024-12-18',
      maxMarks: 60,
      status: 'overdue',
      submitted: 15,
      totalStudents: 25,
      instructions: 'Use visual aids and include at least 20 major events.',
      attachments: ['timeline_template.pptx'],
      createdDate: '2024-11-28'
    }
  ]

  const subjects = ['all', 'Mathematics', 'English', 'Physics', 'History', 'Chemistry', 'Biology']
  const statuses = ['all', 'active', 'graded', 'overdue']

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assignment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assignment.teacher.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = selectedSubject === 'all' || assignment.subject === selectedSubject
    const matchesStatus = selectedStatus === 'all' || assignment.status === selectedStatus
    const matchesTab = activeTab === 'all' || assignment.status === activeTab
    return matchesSearch && matchesSubject && matchesStatus && matchesTab
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
      case 'active': return 'bg-blue-100 text-blue-800'
      case 'graded': return 'bg-green-100 text-green-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="w-4 h-4" />
      case 'graded': return <CheckCircle className="w-4 h-4" />
      case 'overdue': return <AlertCircle className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString()
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
          <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
          <p className="text-gray-600 mt-1">Manage and track assignment progress</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Assignment Title</Label>
                  <Input id="title" placeholder="Enter assignment title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.slice(1).map(subject => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grade-9a">Grade 9A</SelectItem>
                      <SelectItem value="grade-9b">Grade 9B</SelectItem>
                      <SelectItem value="grade-10a">Grade 10A</SelectItem>
                      <SelectItem value="grade-10b">Grade 10B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Assignment description..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructions">Instructions</Label>
                <Textarea id="instructions" placeholder="Detailed instructions for students..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxMarks">Maximum Marks</Label>
                  <Input id="maxMarks" type="number" placeholder="100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="attachments">Attachments</Label>
                  <Input id="attachments" type="file" multiple />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                Create Assignment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All ({assignments.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({assignments.filter(a => a.status === 'active').length})</TabsTrigger>
            <TabsTrigger value="graded">Graded ({assignments.filter(a => a.status === 'graded').length})</TabsTrigger>
            <TabsTrigger value="overdue">Overdue ({assignments.filter(a => a.status === 'overdue').length})</TabsTrigger>
          </TabsList>
        </Tabs>
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
                    placeholder="Search assignments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
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
      </motion.div>

      {/* Assignments List */}
      <motion.div variants={itemVariants} className="space-y-4">
        {filteredAssignments.map((assignment, index) => (
          <motion.div
            key={assignment.id}
            variants={itemVariants}
            whileHover={{ y: -2 }}
            className="group"
          >
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{assignment.title}</h3>
                      <Badge className={getStatusColor(assignment.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(assignment.status)}
                          {assignment.status}
                        </div>
                      </Badge>
                      {isOverdue(assignment.dueDate) && assignment.status === 'active' && (
                        <Badge className="bg-red-100 text-red-800">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Overdue
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{assignment.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {assignment.subject}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {assignment.class}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Due: {formatDate(assignment.dueDate)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{assignment.maxMarks}</p>
                    <p className="text-sm text-gray-500">Max Marks</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Submission Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Submission Progress</span>
                    <span className="font-medium text-gray-900">
                      {assignment.submitted}/{assignment.totalStudents} ({Math.round((assignment.submitted / assignment.totalStudents) * 100)}%)
                    </span>
                  </div>
                  <Progress 
                    value={(assignment.submitted / assignment.totalStudents) * 100} 
                    className="h-2"
                  />
                </div>

                {/* Instructions */}
                {assignment.instructions && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-1">Instructions:</p>
                    <p className="text-sm text-gray-600">{assignment.instructions}</p>
                  </div>
                )}

                {/* Attachments */}
                {assignment.attachments && assignment.attachments.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Attachments:</p>
                    <div className="flex flex-wrap gap-2">
                      {assignment.attachments.map((file, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm">
                          <FileText className="w-4 h-4" />
                          {file}
                          <Download className="w-3 h-3 cursor-pointer hover:text-blue-900" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-3 border-t">
                  <Button variant="outline" size="sm">
                    <Users className="w-4 h-4 mr-1" />
                    View Submissions
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  {assignment.status === 'active' && (
                    <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Grade
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 ml-auto">
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
            <CardTitle>Assignment Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{assignments.length}</div>
                <div className="text-sm text-gray-500">Total Assignments</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {assignments.filter(a => a.status === 'active').length}
                </div>
                <div className="text-sm text-gray-500">Active</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {Math.round(assignments.reduce((acc, a) => acc + ((a.submitted / a.totalStudents) * 100), 0) / assignments.length)}%
                </div>
                <div className="text-sm text-gray-500">Avg Submission Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">
                  {assignments.filter(a => a.status === 'overdue').length}
                </div>
                <div className="text-sm text-gray-500">Overdue</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default AssignmentsPage

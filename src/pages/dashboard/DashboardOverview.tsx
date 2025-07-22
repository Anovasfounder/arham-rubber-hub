import React from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  GraduationCap,
  FileText,
  BarChart3,
  Plus
} from 'lucide-react'

const DashboardOverview = () => {
  const { profile } = useAuth()

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

  // Sample data - in real app, this would come from API
  const adminStats = [
    { title: 'Total Students', value: '1,247', change: '+12%', icon: GraduationCap, color: 'blue' },
    { title: 'Total Teachers', value: '89', change: '+3%', icon: Users, color: 'green' },
    { title: 'Active Classes', value: '45', change: '+5%', icon: BookOpen, color: 'purple' },
    { title: 'Attendance Rate', value: '94.2%', change: '+2.1%', icon: CheckCircle, color: 'emerald' },
  ]

  const teacherStats = [
    { title: 'My Classes', value: '6', change: '', icon: BookOpen, color: 'blue' },
    { title: 'Students', value: '180', change: '', icon: GraduationCap, color: 'green' },
    { title: 'Assignments', value: '23', change: '5 pending', icon: FileText, color: 'purple' },
    { title: 'Avg. Attendance', value: '92%', change: '', icon: CheckCircle, color: 'emerald' },
  ]

  const studentStats = [
    { title: 'Subjects', value: '8', change: '', icon: BookOpen, color: 'blue' },
    { title: 'Assignments', value: '12', change: '3 due soon', icon: FileText, color: 'orange' },
    { title: 'Attendance', value: '96%', change: '', icon: CheckCircle, color: 'green' },
    { title: 'Average Grade', value: 'A-', change: '+0.2', icon: BarChart3, color: 'purple' },
  ]

  const getStatsForRole = () => {
    switch (profile?.role) {
      case 'admin': return adminStats
      case 'teacher': return teacherStats
      case 'student': return studentStats
      default: return studentStats
    }
  }

  const recentActivities = [
    { type: 'assignment', title: 'Math Assignment Due', time: '2 hours ago', status: 'pending' },
    { type: 'grade', title: 'Science Test Graded', time: '4 hours ago', status: 'completed' },
    { type: 'announcement', title: 'School Event Announcement', time: '1 day ago', status: 'info' },
    { type: 'attendance', title: 'Attendance Marked', time: '2 days ago', status: 'completed' },
  ]

  const upcomingEvents = [
    { title: 'Parent-Teacher Meeting', date: 'Tomorrow', time: '10:00 AM' },
    { title: 'Science Fair', date: 'Dec 15', time: '9:00 AM' },
    { title: 'Winter Break Starts', date: 'Dec 20', time: '' },
    { title: 'Semester Exams', date: 'Jan 8', time: '9:00 AM' },
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Quick Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getStatsForRole().map((stat, index) => (
          <Card key={index} className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 border-0 shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`w-4 h-4 text-${stat.color}-600`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              {stat.change && (
                <p className="text-xs text-gray-500 mt-1">
                  <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-orange-600'}>
                    {stat.change}
                  </span>
                  {stat.change.includes('%') ? ' from last month' : ''}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates and notifications</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`p-2 rounded-lg ${
                      activity.status === 'completed' ? 'bg-green-100' :
                      activity.status === 'pending' ? 'bg-orange-100' :
                      'bg-blue-100'
                    }`}>
                      {activity.type === 'assignment' && <FileText className="w-4 h-4 text-orange-600" />}
                      {activity.type === 'grade' && <BarChart3 className="w-4 h-4 text-green-600" />}
                      {activity.type === 'announcement' && <AlertCircle className="w-4 h-4 text-blue-600" />}
                      {activity.type === 'attendance' && <CheckCircle className="w-4 h-4 text-green-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                    <Badge variant={
                      activity.status === 'completed' ? 'default' :
                      activity.status === 'pending' ? 'destructive' :
                      'secondary'
                    }>
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Don't miss these important dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Calendar className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{event.title}</p>
                      <p className="text-sm text-gray-500">{event.date} {event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      {profile?.role === 'admin' && (
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto flex flex-col gap-2 p-4">
                  <Users className="w-6 h-6" />
                  <span>Add Student</span>
                </Button>
                <Button variant="outline" className="h-auto flex flex-col gap-2 p-4">
                  <BookOpen className="w-6 h-6" />
                  <span>Create Class</span>
                </Button>
                <Button variant="outline" className="h-auto flex flex-col gap-2 p-4">
                  <FileText className="w-6 h-6" />
                  <span>New Announcement</span>
                </Button>
                <Button variant="outline" className="h-auto flex flex-col gap-2 p-4">
                  <BarChart3 className="w-6 h-6" />
                  <span>View Reports</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Performance Chart */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Academic performance trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Math</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Science</span>
                  <span>92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>English</span>
                  <span>78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>History</span>
                  <span>88%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default DashboardOverview

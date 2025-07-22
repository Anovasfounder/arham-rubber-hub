import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell,
  Search,
  ChevronDown
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface DashboardLayoutProps {
  children: React.ReactNode
  currentPage?: string
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, currentPage = 'Dashboard' }) => {
  const { profile, signOut } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const navigationItems = {
    admin: [
      { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
      { name: 'Students', icon: GraduationCap, href: '/students' },
      { name: 'Teachers', icon: Users, href: '/teachers' },
      { name: 'Classes', icon: BookOpen, href: '/classes' },
      { name: 'Subjects', icon: FileText, href: '/subjects' },
      { name: 'Attendance', icon: Calendar, href: '/attendance' },
      { name: 'Grades', icon: BarChart3, href: '/grades' },
      { name: 'Reports', icon: BarChart3, href: '/reports' },
      { name: 'Settings', icon: Settings, href: '/settings' },
    ],
    teacher: [
      { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
      { name: 'My Classes', icon: BookOpen, href: '/my-classes' },
      { name: 'Students', icon: GraduationCap, href: '/students' },
      { name: 'Assignments', icon: FileText, href: '/assignments' },
      { name: 'Attendance', icon: Calendar, href: '/attendance' },
      { name: 'Grades', icon: BarChart3, href: '/grades' },
      { name: 'Schedule', icon: Calendar, href: '/schedule' },
    ],
    student: [
      { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
      { name: 'My Subjects', icon: BookOpen, href: '/subjects' },
      { name: 'Assignments', icon: FileText, href: '/assignments' },
      { name: 'Grades', icon: BarChart3, href: '/grades' },
      { name: 'Attendance', icon: Calendar, href: '/attendance' },
      { name: 'Schedule', icon: Calendar, href: '/schedule' },
    ],
    parent: [
      { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
      { name: 'My Children', icon: GraduationCap, href: '/children' },
      { name: 'Grades', icon: BarChart3, href: '/grades' },
      { name: 'Attendance', icon: Calendar, href: '/attendance' },
      { name: 'Communication', icon: Users, href: '/communication' },
    ]
  }

  const currentNavItems = navigationItems[profile?.role || 'student']

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800'
      case 'teacher': return 'bg-blue-100 text-blue-800'
      case 'student': return 'bg-green-100 text-green-800'
      case 'parent': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : -320,
        }}
        className={cn(
          "fixed top-0 left-0 z-50 w-80 h-full bg-white shadow-xl lg:translate-x-0 lg:static lg:inset-0",
          "lg:block border-r border-gray-200"
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">EduManage</h1>
              <p className="text-sm text-gray-500">School Management</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={profile?.avatar_url || ''} />
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                {profile?.full_name?.split(' ').map(n => n[0]).join('') || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {profile?.full_name || 'User'}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className={getRoleColor(profile?.role || 'student')}>
                  {profile?.role || 'Student'}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {currentNavItems.map((item) => (
              <li key={item.name}>
                <motion.a
                  href={item.href}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                    currentPage === item.name
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </motion.a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleSignOut}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="lg:ml-80">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{currentPage}</h2>
                <p className="text-sm text-gray-500">
                  Welcome back, {profile?.full_name?.split(' ')[0] || 'User'}!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2 min-w-0 w-64">
                <Search className="w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none text-sm flex-1 min-w-0"
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>

              {/* Profile dropdown */}
              <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-xl p-2 transition-colors">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={profile?.avatar_url || ''} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-xs">
                    {profile?.full_name?.split(' ').map(n => n[0]).join('') || 'U'}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout

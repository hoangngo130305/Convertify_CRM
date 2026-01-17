import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';
import { 
  UserPlus, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye,
  MessageSquare,
  FileText,
  CalendarCheck,
  Target,
  TrendingUp,
  Zap,
  Search,
  Filter,
  MoreVertical,
  X,
  Save
} from 'lucide-react';

interface WorkAssignmentPopupProps {
  onClose: () => void;
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  dueDate: Date;
  createdDate: Date;
  completedDate?: Date;
  tags: string[];
  category: string;
  estimatedHours: number;
  actualHours?: number;
  progress: number;
  attachments?: string[];
  comments: Comment[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  authorAvatar?: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
  department: string;
  workload: number; // Percentage
  activeTasksCount: number;
  completedTasksCount: number;
  skills: string[]; // Added skills field
}

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    role: 'Senior Sales',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    email: 'nguyenvana@company.com',
    department: 'Sales',
    workload: 85,
    activeTasksCount: 7,
    completedTasksCount: 23,
    skills: ['B2B Sales', 'CRM', 'Lead Generation']
  },
  {
    id: '2',
    name: 'Trần Thị B',
    role: 'Marketing Specialist',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612c08c?w=150&h=150&fit=crop&crop=face',
    email: 'tranthib@company.com',
    department: 'Marketing',
    workload: 65,
    activeTasksCount: 4,
    completedTasksCount: 31,
    skills: ['Content Marketing', 'SEO', 'Social Media']
  },
  {
    id: '3',
    name: 'Lê Văn C',
    role: 'Project Manager',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    email: 'levanc@company.com',
    department: 'Operations',
    workload: 92,
    activeTasksCount: 9,
    completedTasksCount: 45,
    skills: ['Agile', 'Team Leadership', 'Planning']
  },
  {
    id: '4',
    name: 'Phạm Thị D',
    role: 'Customer Success',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    email: 'phamthid@company.com',
    department: 'Support',
    workload: 70,
    activeTasksCount: 5,
    completedTasksCount: 28,
    skills: ['Customer Service', 'Problem Solving', 'Communication']
  }
];

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Gọi điện follow-up khách hàng VIP',
    description: 'Liên hệ với 15 khách hàng VIP để theo dõi tình hình và nhu cầu mới',
    assignedTo: 'Nguyễn Văn A',
    assignedBy: 'Admin',
    priority: 'high',
    status: 'in-progress',
    dueDate: new Date(2024, 11, 25),
    createdDate: new Date(2024, 11, 20),
    tags: ['Sales', 'VIP', 'Follow-up'],
    category: 'Customer Care',
    estimatedHours: 4,
    actualHours: 2.5,
    progress: 60,
    comments: [
      {
        id: '1',
        author: 'Nguyễn Văn A',
        content: 'Đã hoàn thành 9/15 cuộc gọi. Khách hàng phản hồi tích cực.',
        timestamp: new Date(2024, 11, 22, 14, 30),
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      }
    ]
  },
  {
    id: '2',
    title: 'Thiết kế campaign email marketing Q1',
    description: 'Tạo chiến dịch email marketing cho quý 1/2025, bao gồm 3 templates và automation flow',
    assignedTo: 'Trần Thị B',
    assignedBy: 'Admin',
    priority: 'medium',
    status: 'pending',
    dueDate: new Date(2024, 11, 30),
    createdDate: new Date(2024, 11, 18),
    tags: ['Marketing', 'Email', 'Campaign'],
    category: 'Marketing',
    estimatedHours: 8,
    progress: 0,
    comments: []
  },
  {
    id: '3',
    title: 'Báo cáo hiệu suất sales tháng 12',
    description: 'Phân tích và tổng hợp báo cáo hiệu suất bán hàng tháng 12/2024',
    assignedTo: 'Lê Văn C',
    assignedBy: 'Admin',
    priority: 'high',
    status: 'completed',
    dueDate: new Date(2024, 11, 20),
    createdDate: new Date(2024, 11, 15),
    completedDate: new Date(2024, 11, 19),
    tags: ['Report', 'Analytics', 'Sales'],
    category: 'Reporting',
    estimatedHours: 6,
    actualHours: 5.5,
    progress: 100,
    comments: [
      {
        id: '2',
        author: 'Lê Văn C',
        content: 'Báo cáo đã hoàn thành và gửi cho leadership team.',
        timestamp: new Date(2024, 11, 19, 16, 0),
        authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      }
    ]
  },
  {
    id: '4',
    title: 'Training onboarding nhân viên mới',
    description: 'Đào tạo và hướng dẫn 2 nhân viên mới về quy trình làm việc và sử dụng CRM',
    assignedTo: 'Phạm Thị D',
    assignedBy: 'Admin',
    priority: 'medium',
    status: 'overdue',
    dueDate: new Date(2024, 11, 15),
    createdDate: new Date(2024, 11, 10),
    tags: ['Training', 'Onboarding', 'HR'],
    category: 'Training',
    estimatedHours: 12,
    actualHours: 8,
    progress: 75,
    comments: [
      {
        id: '3',
        author: 'Phạm Thị D',
        content: 'Đã hoàn thành session 1 và 2. Session 3 sẽ thực hiện vào tuần tới.',
        timestamp: new Date(2024, 11, 17, 10, 15),
        authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      }
    ]
  }
];

const priorityColors = {
  high: 'destructive',
  medium: 'secondary', 
  low: 'outline'
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  overdue: 'bg-red-100 text-red-800'
};

const statusLabels = {
  pending: 'Chờ xử lý',
  'in-progress': 'Đang thực hiện',
  completed: 'Hoàn thành',
  overdue: 'Quá hạn'
};

export function WorkAssignmentPopup({ onClose }: WorkAssignmentPopupProps) {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [teamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(false);

  // New task form
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    dueDate: '',
    category: '',
    estimatedHours: 0,
    tags: [] as string[]
  });

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Calculate stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const overdueTasks = tasks.filter(t => t.status === 'overdue').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleCreateTask = () => {
    if (!newTask.title || !newTask.assignedTo) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      assignedTo: newTask.assignedTo,
      assignedBy: 'Admin',
      priority: newTask.priority,
      status: 'pending',
      dueDate: new Date(newTask.dueDate),
      createdDate: new Date(),
      tags: newTask.tags,
      category: newTask.category,
      estimatedHours: newTask.estimatedHours,
      progress: 0,
      comments: []
    };

    setTasks(prev => [task, ...prev]);
    setShowCreateTask(false);
    setNewTask({
      title: '',
      description: '',
      assignedTo: '',
      priority: 'medium',
      dueDate: '',
      category: '',
      estimatedHours: 0,
      tags: []
    });

    alert('Đã tạo công việc mới thành công!');
  };

  const handleUpdateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            status: newStatus,
            completedDate: newStatus === 'completed' ? new Date() : undefined,
            progress: newStatus === 'completed' ? 100 : task.progress
          }
        : task
    ));
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    }).format(date);
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0 pb-4 border-b border-border/50">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                <UserPlus className="h-6 w-6 text-blue-600" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                <Zap className="h-2.5 w-2.5 text-white" />
              </div>
            </div>
            <div>
              <DialogTitle className="text-2xl text-foreground flex items-center gap-2">
                Quản lý công việc
                <Badge variant="secondary" className="text-xs">Management</Badge>
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Giao việc, theo dõi tiến độ và quản lý hiệu suất làm việc của team
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
          <div className="flex-shrink-0 mb-6">
            <TabsList className="grid grid-cols-4 w-full gap-2 p-1 bg-muted/50 rounded-xl h-14">
              <TabsTrigger value="overview" className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs font-medium">Tổng quan</span>
              </TabsTrigger>
              <TabsTrigger value="tasks" className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-xs font-medium">Công việc</span>
              </TabsTrigger>
              <TabsTrigger value="team" className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <Users className="h-4 w-4" />
                <span className="text-xs font-medium">Nhân sự</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <Target className="h-4 w-4" />
                <span className="text-xs font-medium">Báo cáo</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6 mt-0">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Tổng công việc</p>
                        <p className="text-2xl font-medium">{totalTasks}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Target className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Hoàn thành</p>
                        <p className="text-2xl font-medium">{completedTasks}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Quá hạn</p>
                        <p className="text-2xl font-medium">{overdueTasks}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Tỷ lệ hoàn thành</p>
                        <p className="text-2xl font-medium">{completionRate}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Tasks */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Công việc gần đây</CardTitle>
                  <CardDescription>
                    Các công việc được cập nhật trong 7 ngày qua
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {filteredTasks.slice(0, 5).map(task => (
                      <div key={task.id} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{task.title}</h4>
                            <Badge variant={priorityColors[task.priority]} className="text-xs">
                              {task.priority === 'high' ? 'Cao' : task.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{task.assignedTo} • {formatDate(task.dueDate)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`px-2 py-1 rounded-md text-xs ${statusColors[task.status]}`}>
                            {statusLabels[task.status]}
                          </div>
                          <Progress value={task.progress} className="w-20" />
                          <span className="text-xs text-muted-foreground">{task.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tasks Tab */}
            <TabsContent value="tasks" className="space-y-6 mt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Tìm kiếm công việc..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả trạng thái</SelectItem>
                      <SelectItem value="pending">Chờ xử lý</SelectItem>
                      <SelectItem value="in-progress">Đang thực hiện</SelectItem>
                      <SelectItem value="completed">Hoàn thành</SelectItem>
                      <SelectItem value="overdue">Quá hạn</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả mức độ</SelectItem>
                      <SelectItem value="high">Cao</SelectItem>
                      <SelectItem value="medium">Trung bình</SelectItem>
                      <SelectItem value="low">Thấp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={() => setShowCreateTask(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Tạo công việc mới
                </Button>
              </div>

              {/* Tasks List */}
              <div className="space-y-3">
                {filteredTasks.map(task => (
                  <Card key={task.id} className="border-border/50 hover:border-primary/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{task.title}</h3>
                            <Badge variant={priorityColors[task.priority]} className="text-xs">
                              {task.priority === 'high' ? 'Cao' : task.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                            </Badge>
                            <div className={`px-2 py-1 rounded-md text-xs ${statusColors[task.status]}`}>
                              {statusLabels[task.status]}
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                          
                          {/* Tags Section */}
                          <div className="flex items-center gap-2 mb-3">
                            {task.tags.map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>{task.assignedTo}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(task.dueDate)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{task.estimatedHours}h</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-2">
                            <Progress value={task.progress} className="w-24" />
                            <span className="text-sm text-muted-foreground">{task.progress}%</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedTask(task);
                                setShowTaskDetails(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit3 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Team Tab */}
            <TabsContent value="team" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teamMembers.map(member => (
                  <Card key={member.id} className="border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{member.name}</h3>
                            <Badge variant="outline" className="text-xs">{member.role}</Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">{member.department} • {member.email}</p>
                          
                          {/* Skills Section */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {member.skills.map(skill => (
                              <Badge key={skill} variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Workload</span>
                              <span className={`font-medium ${member.workload > 80 ? 'text-red-600' : member.workload > 60 ? 'text-yellow-600' : 'text-green-600'}`}>
                                {member.workload}%
                              </span>
                            </div>
                            <Progress value={member.workload} className="h-2" />
                            
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <span>Đang thực hiện: {member.activeTasksCount}</span>
                              <span>Hoàn thành: {member.completedTasksCount}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Hiệu suất theo nhân viên</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {teamMembers.map(member => (
                        <div key={member.id} className="flex items-center gap-4">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback className="text-xs">{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">{member.name}</span>
                              <span className="text-sm text-muted-foreground">{member.completedTasksCount} tasks</span>
                            </div>
                            <Progress value={(member.completedTasksCount / 50) * 100} className="h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Phân bố theo trạng thái</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Chờ xử lý</span>
                        <span className="text-sm font-medium">{tasks.filter(t => t.status === 'pending').length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Đang thực hiện</span>
                        <span className="text-sm font-medium">{inProgressTasks}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Hoàn thành</span>
                        <span className="text-sm font-medium">{completedTasks}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Quá hạn</span>
                        <span className="text-sm font-medium">{overdueTasks}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        {/* Create Task Modal */}
        {showCreateTask && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Tạo công việc mới</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowCreateTask(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 overflow-y-auto">
                <div className="space-y-2">
                  <Label htmlFor="title">Tiêu đề công việc *</Label>
                  <Input
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Nhập tiêu đề công việc..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea
                    id="description"
                    value={newTask.description}
                    onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Mô tả chi tiết công việc..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="assignedTo">Giao cho *</Label>
                    <Select value={newTask.assignedTo} onValueChange={(value) => setNewTask(prev => ({ ...prev, assignedTo: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn nhân viên" />
                      </SelectTrigger>
                      <SelectContent>
                        {teamMembers.map(member => (
                          <SelectItem key={member.id} value={member.name}>
                            {member.name} - {member.role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Mức độ ưu tiên</Label>
                    <Select value={newTask.priority} onValueChange={(value: 'high' | 'medium' | 'low') => setNewTask(prev => ({ ...prev, priority: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Thấp</SelectItem>
                        <SelectItem value="medium">Trung bình</SelectItem>
                        <SelectItem value="high">Cao</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Hạn hoàn thành</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estimatedHours">Thời gian ước tính (giờ)</Label>
                    <Input
                      id="estimatedHours"
                      type="number"
                      value={newTask.estimatedHours}
                      onChange={(e) => setNewTask(prev => ({ ...prev, estimatedHours: parseInt(e.target.value) || 0 }))}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Danh mục</Label>
                  <Input
                    id="category"
                    value={newTask.category}
                    onChange={(e) => setNewTask(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="Ví dụ: Sales, Marketing, Support..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleCreateTask} className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Tạo công việc
                  </Button>
                  <Button variant="outline" onClick={() => setShowCreateTask(false)}>
                    Hủy
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Task Details Modal */}
        {showTaskDetails && selectedTask && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-4xl mx-4 max-h-[80vh] overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {selectedTask.title}
                      <Badge variant={priorityColors[selectedTask.priority]} className="text-xs">
                        {selectedTask.priority === 'high' ? 'Cao' : selectedTask.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {selectedTask.assignedTo} • {formatDate(selectedTask.dueDate)}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setShowTaskDetails(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 overflow-y-auto">
                <div>
                  <h4 className="font-medium mb-2">Mô tả</h4>
                  <p className="text-muted-foreground">{selectedTask.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Thông tin cơ bản</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Người giao:</span>
                          <span>{selectedTask.assignedBy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Ngày tạo:</span>
                          <span>{formatDate(selectedTask.createdDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Danh mục:</span>
                          <span>{selectedTask.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Thời gian ước tính:</span>
                          <span>{selectedTask.estimatedHours}h</span>
                        </div>
                        {selectedTask.actualHours && (
                          <div className="flex justify-between">
                            <span>Thời gian thực tế:</span>
                            <span>{selectedTask.actualHours}h</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Tiến độ</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Hoàn thành</span>
                          <span className="text-sm font-medium">{selectedTask.progress}%</span>
                        </div>
                        <Progress value={selectedTask.progress} />
                        <div className={`inline-block px-2 py-1 rounded-md text-xs ${statusColors[selectedTask.status]}`}>
                          {statusLabels[selectedTask.status]}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Bình luận ({selectedTask.comments.length})</h4>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {selectedTask.comments.map(comment => (
                        <div key={comment.id} className="flex gap-3 p-3 bg-muted/30 rounded-lg">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={comment.authorAvatar} alt={comment.author} />
                            <AvatarFallback className="text-xs">{comment.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">{comment.author}</span>
                              <span className="text-xs text-muted-foreground">{formatDateTime(comment.timestamp)}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{comment.content}</p>
                          </div>
                        </div>
                      ))}

                      {selectedTask.comments.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">Chưa có bình luận nào</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => handleUpdateTaskStatus(selectedTask.id, 'in-progress')}
                    disabled={selectedTask.status === 'in-progress'}
                  >
                    Bắt đầu
                  </Button>
                  <Button
                    onClick={() => handleUpdateTaskStatus(selectedTask.id, 'completed')}
                    disabled={selectedTask.status === 'completed'}
                  >
                    Hoàn thành
                  </Button>
                  <Button variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Thêm bình luận
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer */}
        <div className="flex-shrink-0 flex justify-between items-center pt-6 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Quản lý hiệu quả - Tối ưu productivity
            </span>
          </div>
          <Button variant="outline" onClick={onClose} className="gap-2">
            <X className="h-4 w-4" />
            Đóng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
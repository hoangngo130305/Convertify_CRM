import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Plus, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  AlertCircle,
  Edit,
  Trash2,
  ClipboardList,
  X,
  CheckCircle2
} from 'lucide-react';
import { cn } from './ui/utils';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  assignor: string; // Người giao việc
  deadline: Date;
  daysLeft: number;
  status: 'Chưa bắt đầu' | 'Đang thực hiện' | 'Hoàn thành' | 'Quá hạn';
  reminder: boolean;
}

interface Reminder {
  id: string;
  content: string;
  date: Date;
  time: string;
  remindBefore: number; // minutes
}

interface TaskPopupProps {
  onClose: () => void;
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Liên hệ khách hàng ABC',
    description: 'Gọi điện tư vấn sản phẩm mới',
    assignee: 'Nguyễn Văn A',
    assignor: 'Trần Thị B',
    deadline: new Date(2024, 11, 25),
    daysLeft: 3,
    status: 'Đang thực hiện',
    reminder: true
  },
  {
    id: '2',
    title: 'Chuẩn bị báo cáo tháng',
    description: 'Tổng hợp dữ liệu bán hàng tháng 12',
    assignee: 'Trần Thị B',
    assignor: 'Nguyễn Văn A',
    deadline: new Date(2024, 11, 30),
    daysLeft: 8,
    status: 'Chưa bắt đầu',
    reminder: false
  }
];

const mockReminders: Reminder[] = [
  {
    id: '1',
    content: 'Họp team buổi sáng',
    date: new Date(2024, 11, 23),
    time: '09:00',
    remindBefore: 15
  }
];

export function TaskPopup({ onClose }: TaskPopupProps) {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [reminders, setReminders] = useState<Reminder[]>(mockReminders);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [activeTab, setActiveTab] = useState('tasks');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignee: '',
    assignor: '',
    deadline: new Date(),
    reminder: false
  });
  const [newReminder, setNewReminder] = useState({
    content: '',
    date: new Date(),
    time: '09:00',
    remindBefore: 15
  });

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'Chưa bắt đầu': return 'bg-gray-100 text-gray-800';
      case 'Đang thực hiện': return 'bg-blue-100 text-blue-800';
      case 'Hoàn thành': return 'bg-green-100 text-green-800';
      case 'Quá hạn': return 'bg-red-100 text-red-800';
    }
  };

  const getDaysLeftColor = (daysLeft: number) => {
    if (daysLeft < 0) return 'text-red-600';
    if (daysLeft <= 2) return 'text-orange-600';
    return 'text-green-600';
  };

  const handleAddTask = () => {
    if (!newTask.title.trim() || !newTask.assignee) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
      daysLeft: Math.ceil((newTask.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
      status: 'Chưa bắt đầu'
    };
    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      assignee: '',
      assignor: '',
      deadline: new Date(),
      reminder: false
    });
    setShowAddTask(false);
    alert('Đã tạo task mới thành công!');
  };

  const handleAddReminder = () => {
    if (!newReminder.content.trim()) {
      alert('Vui lòng nhập nội dung reminder!');
      return;
    }

    const reminder: Reminder = {
      id: Date.now().toString(),
      ...newReminder
    };
    setReminders([...reminders, reminder]);
    setNewReminder({
      content: '',
      date: new Date(),
      time: '09:00',
      remindBefore: 15
    });
    setShowAddReminder(false);
    alert('Đã tạo reminder thành công!');
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa task này?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
      alert('Đã xóa task thành công!');
    }
  };

  const handleDeleteReminder = (reminderId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa reminder này?')) {
      setReminders(reminders.filter(reminder => reminder.id !== reminderId));
      alert('Đã xóa reminder thành công!');
    }
  };

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const updatedTask = { ...task, status: newStatus };
        if (newStatus === 'Hoàn thành') {
          alert(`🎉 Task "${task.title}" đã được hoàn thành!`);
        }
        return updatedTask;
      }
      return task;
    }));
  };

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-5xl w-[95vw] max-h-[85vh] flex flex-col m-2">
          <DialogHeader className="pb-3 border-b border-border flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <ClipboardList className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-lg text-foreground">
                  Quản lý công việc
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-sm">
                  Theo dõi task và reminder cho team
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="tasks" className="flex items-center gap-2 text-sm">
                <ClipboardList className="h-4 w-4" />
                Danh sách Task
              </TabsTrigger>
              <TabsTrigger value="reminders" className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                Reminder
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 min-h-0">
              <TabsContent value="tasks" className="mt-0 h-full flex flex-col">
                <div className="space-y-4 flex-1 min-h-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base text-foreground">Danh sách Task</h3>
                      <p className="text-xs text-muted-foreground">Theo dõi và quản lý công việc được giao</p>
                    </div>
                    <Button 
                      onClick={() => setShowAddTask(true)} 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 text-sm"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm Task
                    </Button>
                  </div>

                  {/* Task Table */}
                  <div className="bg-card rounded-lg border border-border overflow-hidden flex-1 min-h-0">
                    <div className="overflow-auto h-full">
                      <table className="w-full">
                        <thead className="bg-muted/50 border-b border-border sticky top-0">
                          <tr>
                            <th className="px-3 py-2 text-left text-xs text-muted-foreground uppercase tracking-wider min-w-[200px]">Tên công việc</th>
                            <th className="px-3 py-2 text-left text-xs text-muted-foreground uppercase tracking-wider min-w-[120px]">Người phụ trách</th>
                            <th className="px-3 py-2 text-left text-xs text-muted-foreground uppercase tracking-wider min-w-[120px]">Người giao việc</th>
                            <th className="px-3 py-2 text-left text-xs text-muted-foreground uppercase tracking-wider min-w-[90px]">Deadline</th>
                            <th className="px-3 py-2 text-left text-xs text-muted-foreground uppercase tracking-wider min-w-[80px]">Còn lại</th>
                            <th className="px-3 py-2 text-left text-xs text-muted-foreground uppercase tracking-wider min-w-[120px]">Trạng thái</th>
                            <th className="px-3 py-2 text-left text-xs text-muted-foreground uppercase tracking-wider min-w-[70px]">Nhắc nhở</th>
                            <th className="px-3 py-2 text-left text-xs text-muted-foreground uppercase tracking-wider min-w-[80px]">Thao tác</th>
                          </tr>
                        </thead>
                        <tbody className="bg-card divide-y divide-border">
                          {tasks.map((task) => (
                            <tr key={task.id} className="hover:bg-muted/30">
                              <td className="px-3 py-3">
                                <div className="space-y-1">
                                  <div className="text-sm text-foreground font-medium truncate max-w-[180px]" title={task.title}>
                                    {task.title}
                                  </div>
                                  <div className="text-xs text-muted-foreground truncate max-w-[180px]" title={task.description}>
                                    {task.description}
                                  </div>
                                </div>
                              </td>
                              <td className="px-3 py-3">
                                <div className="flex items-center space-x-2">
                                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <User className="h-3 w-3 text-primary" />
                                  </div>
                                  <span className="text-xs text-foreground truncate max-w-[90px]" title={task.assignee}>
                                    {task.assignee}
                                  </span>
                                </div>
                              </td>
                              <td className="px-3 py-3">
                                <div className="flex items-center space-x-2">
                                  <div className="w-6 h-6 bg-secondary/50 rounded-full flex items-center justify-center flex-shrink-0">
                                    <User className="h-3 w-3 text-secondary-foreground" />
                                  </div>
                                  <span className="text-xs text-foreground truncate max-w-[90px]" title={task.assignor}>
                                    {task.assignor}
                                  </span>
                                </div>
                              </td>
                              <td className="px-3 py-3 text-xs text-foreground">
                                {task.deadline.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
                              </td>
                              <td className="px-3 py-3">
                                <span className={`text-xs ${getDaysLeftColor(task.daysLeft)}`}>
                                  {task.daysLeft >= 0 ? `${task.daysLeft}d` : `${Math.abs(task.daysLeft)}d`}
                                </span>
                              </td>
                              <td className="px-3 py-3">
                                <Select 
                                  value={task.status} 
                                  onValueChange={(value) => handleStatusChange(task.id, value as Task['status'])}
                                >
                                  <SelectTrigger className="w-full max-w-[110px] h-7">
                                    <Badge className={`${getStatusColor(task.status)} border-0 text-[10px] px-2 py-0`}>
                                      {task.status}
                                    </Badge>
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Chưa bắt đầu">Chưa bắt đầu</SelectItem>
                                    <SelectItem value="Đang thực hiện">Đang thực hiện</SelectItem>
                                    <SelectItem value="Hoàn thành">Hoàn thành</SelectItem>
                                    <SelectItem value="Quá hạn">Quá hạn</SelectItem>
                                  </SelectContent>
                                </Select>
                              </td>
                              <td className="px-3 py-3">
                                {task.reminder ? (
                                  <div className="flex items-center text-orange-600">
                                    <AlertCircle className="h-3 w-3 mr-1" />
                                    <span className="text-xs">Có</span>
                                  </div>
                                ) : (
                                  <span className="text-xs text-muted-foreground">Không</span>
                                )}
                              </td>
                              <td className="px-3 py-3">
                                <div className="flex items-center gap-1">
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-primary/10">
                                    <Edit className="h-3 w-3 text-muted-foreground" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-6 w-6 p-0 hover:bg-destructive/10"
                                    onClick={() => handleDeleteTask(task.id)}
                                  >
                                    <Trash2 className="h-3 w-3 text-destructive" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {tasks.length === 0 && (
                      <div className="text-center py-8">
                        <ClipboardList className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
                        <p className="text-muted-foreground text-sm mb-1">Chưa có task nào</p>
                        <p className="text-muted-foreground/70 text-xs">Nhấp "Thêm Task" để tạo task mới</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reminders" className="mt-0 h-full flex flex-col">
                <div className="space-y-4 flex-1 min-h-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base text-foreground">Danh sách Reminder</h3>
                      <p className="text-xs text-muted-foreground">Quản lý các lời nhắc quan trọng</p>
                    </div>
                    <Button 
                      onClick={() => setShowAddReminder(true)} 
                      className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 text-sm"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm Reminder
                    </Button>
                  </div>

                  {/* Reminder Table */}
                  <div className="bg-card rounded-lg border border-border overflow-hidden flex-1 min-h-0">
                    <div className="overflow-auto h-full">
                      <table className="w-full">
                        <thead className="bg-muted/50 border-b border-border sticky top-0">
                          <tr>
                            <th className="px-3 py-2 text-left text-xs text-muted-foreground uppercase tracking-wider min-w-[200px]">Nội dung</th>
                            <th className="px-3 py-2 text-left text-xs text-muted-foreground uppercase tracking-wider min-w-[100px]">Ngày nhắc</th>
                            <th className="px-3 py-2 text-left text-xs text-muted-foreground uppercase tracking-wider min-w-[80px]">Thời gian</th>
                            <th className="px-3 py-2 text-left text-xs text-muted-foreground uppercase tracking-wider min-w-[90px]">Nhắc trước</th>
                            <th className="px-3 py-2 text-left text-xs text-muted-foreground uppercase tracking-wider min-w-[80px]">Thao tác</th>
                          </tr>
                        </thead>
                        <tbody className="bg-card divide-y divide-border">
                          {reminders.map((reminder) => (
                            <tr key={reminder.id} className="hover:bg-muted/30">
                              <td className="px-3 py-3">
                                <div className="flex items-center space-x-2">
                                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Clock className="h-3 w-3 text-orange-600" />
                                  </div>
                                  <span className="text-sm text-foreground truncate max-w-[160px]" title={reminder.content}>
                                    {reminder.content}
                                  </span>
                                </div>
                              </td>
                              <td className="px-3 py-3 text-xs text-foreground">
                                {reminder.date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
                              </td>
                              <td className="px-3 py-3 text-xs text-foreground">
                                {reminder.time}
                              </td>
                              <td className="px-3 py-3">
                                <Badge className="bg-orange-100 text-orange-800 text-[10px] px-2 py-0">
                                  {reminder.remindBefore}p
                                </Badge>
                              </td>
                              <td className="px-3 py-3">
                                <div className="flex items-center gap-1">
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-orange-50">
                                    <Edit className="h-3 w-3 text-muted-foreground" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-6 w-6 p-0 hover:bg-destructive/10"
                                    onClick={() => handleDeleteReminder(reminder.id)}
                                  >
                                    <Trash2 className="h-3 w-3 text-destructive" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {reminders.length === 0 && (
                      <div className="text-center py-8">
                        <Clock className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
                        <p className="text-muted-foreground text-sm mb-1">Chưa có reminder nào</p>
                        <p className="text-muted-foreground/70 text-xs">Tạo reminder để không bỏ lỡ việc quan trọng</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Add Task Dialog */}
      {showAddTask && (
        <Dialog open={showAddTask} onOpenChange={setShowAddTask}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Thêm Task mới</DialogTitle>
              <DialogDescription>
                Tạo một công việc mới và gán cho thành viên team
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-5">
              <div>
                <Label htmlFor="task-title">Tiêu đề <span className="text-red-500">*</span></Label>
                <Input
                  id="task-title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Nhập tiêu đề công việc"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="task-description">Mô tả</Label>
                <Textarea
                  id="task-description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Nhập mô tả chi tiết"
                  rows={3}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="task-assignee">Người phụ trách <span className="text-red-500">*</span></Label>
                <Select value={newTask.assignee} onValueChange={(value) => setNewTask({ ...newTask, assignee: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Chọn người phụ trách" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nguyễn Văn A">Nguyễn Văn A</SelectItem>
                    <SelectItem value="Trần Thị B">Trần Thị B</SelectItem>
                    <SelectItem value="Lê Văn C">Lê Văn C</SelectItem>
                    <SelectItem value="Phạm Thị D">Phạm Thị D</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="task-assignor">Người giao việc</Label>
                <Select value={newTask.assignor} onValueChange={(value) => setNewTask({ ...newTask, assignor: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Chọn người giao việc" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nguyễn Văn A">Nguyễn Văn A</SelectItem>
                    <SelectItem value="Trần Thị B">Trần Thị B</SelectItem>
                    <SelectItem value="Lê Văn C">Lê Văn C</SelectItem>
                    <SelectItem value="Phạm Thị D">Phạm Thị D</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Quản lý">Quản lý</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Deadline</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start mt-1">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newTask.deadline.toLocaleDateString('vi-VN')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newTask.deadline}
                      onSelect={(date) => date && setNewTask({ ...newTask, deadline: date })}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center space-x-3">
                <Switch
                  id="task-reminder"
                  checked={newTask.reminder}
                  onCheckedChange={(checked) => setNewTask({ ...newTask, reminder: checked })}
                />
                <Label htmlFor="task-reminder">Bật nhắc nhở</Label>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setShowAddTask(false)}>
                  Hủy
                </Button>
                <Button onClick={handleAddTask} className="bg-blue-600 hover:bg-blue-700">
                  Lưu
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Reminder Dialog */}
      {showAddReminder && (
        <Dialog open={showAddReminder} onOpenChange={setShowAddReminder}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Thêm Reminder mới</DialogTitle>
              <DialogDescription>
                Tạo nhắc nhở để không bỏ lỡ các sự kiện quan trọng
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-5">
              <div>
                <Label htmlFor="reminder-content">Nội dung <span className="text-red-500">*</span></Label>
                <Input
                  id="reminder-content"
                  value={newReminder.content}
                  onChange={(e) => setNewReminder({ ...newReminder, content: e.target.value })}
                  placeholder="Nhập nội dung nhắc nhở"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Ngày nhắc nhở</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start mt-1">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newReminder.date.toLocaleDateString('vi-VN')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newReminder.date}
                      onSelect={(date) => date && setNewReminder({ ...newReminder, date })}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="reminder-time">Thời gian</Label>
                <Input
                  id="reminder-time"
                  type="time"
                  value={newReminder.time}
                  onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="reminder-before">Nhắc trước</Label>
                <Select 
                  value={newReminder.remindBefore.toString()} 
                  onValueChange={(value) => setNewReminder({ ...newReminder, remindBefore: parseInt(value) })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 phút</SelectItem>
                    <SelectItem value="15">15 phút</SelectItem>
                    <SelectItem value="30">30 phút</SelectItem>
                    <SelectItem value="60">1 giờ</SelectItem>
                    <SelectItem value="120">2 giờ</SelectItem>
                    <SelectItem value="1440">1 ngày</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setShowAddReminder(false)}>
                  Hủy
                </Button>
                <Button onClick={handleAddReminder} className="bg-orange-600 hover:bg-orange-700">
                  Lưu
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
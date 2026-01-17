import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Plus, 
  Edit,
  Trash2,
  Calendar as CalendarIcon,
  StickyNote,
  Search,
  Filter,
  Star,
  StarOff,
  Clock,
  Archive,
  Pin,
  PinOff
} from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  createdDate: Date;
  isPinned?: boolean;
  isFavorite?: boolean;
  category?: string;
  color?: string;
}

interface NotesPopupProps {
  onClose: () => void;
}

const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Ghi chú cuộc họp team',
    content: 'Thảo luận về chiến lược marketing Q1 2025. Cần tập trung vào social media và content marketing để tăng độ nhận diện thương hiệu.',
    createdDate: new Date(2024, 11, 20),
    isPinned: true,
    isFavorite: true,
    category: 'Cuộc họp',
    color: 'primary'
  },
  {
    id: '2',
    title: 'Ý tưởng campaign Tết 2025',
    content: 'Campaign Tết 2025: Focus vào gia đình, truyền thống. Collaborate với influencers địa phương để tăng tính xác thực.',
    createdDate: new Date(2024, 11, 19),
    isPinned: false,
    isFavorite: false,
    category: 'Ý tưởng',
    color: 'orange'
  },
  {
    id: '3',
    title: 'Feedback khách hàng ABC',
    content: 'Khách hàng ABC phản hồi tích cực về sản phẩm mới. Đề xuất mở rộng dòng sản phẩm tương tự và cải thiện UX.',
    createdDate: new Date(2024, 11, 18),
    isPinned: false,
    isFavorite: true,
    category: 'Khách hàng',
    color: 'green'
  },
  {
    id: '4',
    title: 'Task tuần này',
    content: 'Hoàn thành báo cáo, update website, liên hệ đối tác mới, review proposal từ agency.',
    createdDate: new Date(2024, 11, 17),
    isPinned: false,
    isFavorite: false,
    category: 'Task',
    color: 'blue'
  },
  {
    id: '5',
    title: 'Nghiên cứu competitor',
    content: 'Phân tích chiến lược của 3 đối thủ chính, đánh giá điểm mạnh/yếu, tìm cơ hội phát triển.',
    createdDate: new Date(2024, 11, 16),
    isPinned: false,
    isFavorite: false,
    category: 'Nghiên cứu',
    color: 'purple'
  },
  {
    id: '6',
    title: 'Budget Q1 2025',
    content: 'Lập kế hoạch ngân sách Q1, phân bổ budget cho marketing, development, và operations.',
    createdDate: new Date(2024, 11, 15),
    isPinned: true,
    isFavorite: false,
    category: 'Tài chính',
    color: 'red'
  }
];

const categories = ['Tất cả', 'Cuộc họp', 'Ý tưởng', 'Khách hàng', 'Task', 'Nghiên cứu', 'Tài chính'];
const colors = {
  primary: 'bg-primary/10 border-primary/20 text-primary',
  orange: 'bg-orange-50 border-orange-200 text-orange-900',
  green: 'bg-green-50 border-green-200 text-green-900',
  blue: 'bg-blue-50 border-blue-200 text-blue-900',
  purple: 'bg-purple-50 border-purple-200 text-purple-900',
  red: 'bg-red-50 border-red-200 text-red-900'
};

export function NotesPopup({ onClose }: NotesPopupProps) {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [showAddNote, setShowAddNote] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    category: 'Task',
    color: 'primary'
  });

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tất cả' || note.category === selectedCategory;
    const matchesFavorite = !showOnlyFavorites || note.isFavorite;
    
    return matchesSearch && matchesCategory && matchesFavorite;
  });

  const pinnedNotes = filteredNotes.filter(note => note.isPinned);
  const regularNotes = filteredNotes.filter(note => !note.isPinned);

  const handleAddNote = () => {
    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      category: newNote.category,
      color: newNote.color,
      createdDate: new Date(),
      isPinned: false,
      isFavorite: false
    };
    setNotes([note, ...notes]);
    setNewNote({ title: '', content: '', category: 'Task', color: 'primary' });
    setShowAddNote(false);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setNewNote({ 
      title: note.title, 
      content: note.content,
      category: note.category || 'Task',
      color: note.color || 'primary'
    });
    setShowAddNote(true);
  };

  const handleUpdateNote = () => {
    if (editingNote) {
      setNotes(notes.map(note => 
        note.id === editingNote.id 
          ? { 
              ...note, 
              title: newNote.title, 
              content: newNote.content,
              category: newNote.category,
              color: newNote.color
            }
          : note
      ));
      setEditingNote(null);
      setNewNote({ title: '', content: '', category: 'Task', color: 'primary' });
      setShowAddNote(false);
    }
  };

  const handleDeleteNote = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa ghi chú này?')) {
      setNotes(notes.filter(note => note.id !== id));
    }
  };

  const togglePin = (id: string) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    ));
  };

  const toggleFavorite = (id: string) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
    ));
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hôm nay';
    if (diffDays === 1) return 'Hôm qua';
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-[90vw] max-h-[80vh] flex flex-col">
        <DialogHeader className="pb-3 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <StickyNote className="h-4 w-4 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-lg text-foreground">
                  Ghi chú nhanh
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-sm">
                  Quản lý và tổ chức ghi chú công việc
                </DialogDescription>
              </div>
            </div>
            <Button 
              onClick={() => setShowAddNote(true)} 
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 text-sm px-3 py-2"
            >
              <Plus className="h-4 w-4" />
              Tạo ghi chú
            </Button>
          </div>
        </DialogHeader>

        {/* Filters & Search */}
        <div className="flex-shrink-0 space-y-3 py-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm ghi chú..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-9"
              />
            </div>
            <Button
              variant={showOnlyFavorites ? "default" : "outline"}
              size="sm"
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className="gap-2 h-9 px-3"
            >
              <Star className="h-4 w-4" />
              Yêu thích
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="text-xs h-7 px-2"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Notes Content */}
        <div className="flex-1 overflow-auto">
          <div className="space-y-4">
            {/* Pinned Notes */}
            {pinnedNotes.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Pin className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-medium text-foreground">Ghi chú đã ghim</h3>
                  <Badge variant="secondary" className="text-xs">{pinnedNotes.length}</Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
                  {pinnedNotes.map((note) => (
                    <NoteCard 
                      key={note.id} 
                      note={note} 
                      onEdit={handleEditNote}
                      onDelete={handleDeleteNote}
                      onTogglePin={togglePin}
                      onToggleFavorite={toggleFavorite}
                      formatDate={formatDate}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Regular Notes */}
            {regularNotes.length > 0 && (
              <div>
                {pinnedNotes.length > 0 && (
                  <div className="flex items-center gap-2 mb-3">
                    <StickyNote className="h-4 w-4 text-muted-foreground" />
                    <h3 className="text-sm font-medium text-foreground">Ghi chú khác</h3>
                    <Badge variant="outline" className="text-xs">{regularNotes.length}</Badge>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
                  {regularNotes.map((note) => (
                    <NoteCard 
                      key={note.id} 
                      note={note} 
                      onEdit={handleEditNote}
                      onDelete={handleDeleteNote}
                      onTogglePin={togglePin}
                      onToggleFavorite={toggleFavorite}
                      formatDate={formatDate}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {filteredNotes.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-12 h-12 bg-muted/50 rounded-full flex items-center justify-center mb-3">
                  <StickyNote className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-base font-medium text-foreground mb-2">
                  {searchQuery || selectedCategory !== 'Tất cả' || showOnlyFavorites ? 
                    'Không tìm thấy ghi chú nào' : 'Chưa có ghi chú nào'}
                </h3>
                <p className="text-muted-foreground text-sm mb-3 max-w-sm">
                  {searchQuery || selectedCategory !== 'Tất cả' || showOnlyFavorites ?
                    'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm' : 
                    'Tạo ghi chú đầu tiên để bắt đầu quản lý ý tưởng và công việc'}
                </p>
                {!searchQuery && selectedCategory === 'Tất cả' && !showOnlyFavorites && (
                  <Button onClick={() => setShowAddNote(true)} className="gap-2" size="sm">
                    <Plus className="h-4 w-4" />
                    Tạo ghi chú đầu tiên
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Add/Edit Note Dialog */}
        {showAddNote && (
          <Dialog open={showAddNote} onOpenChange={() => {
            setShowAddNote(false);
            setEditingNote(null);
            setNewNote({ title: '', content: '', category: 'Task', color: 'primary' });
          }}>
            <DialogContent className="max-w-xl w-[90vw]">
              <DialogHeader>
                <DialogTitle className="text-base">
                  {editingNote ? 'Chỉnh sửa ghi chú' : 'Tạo ghi chú mới'}
                </DialogTitle>
                <DialogDescription className="text-sm">
                  {editingNote ? 'Cập nhật thông tin ghi chú của bạn' : 'Thêm ghi chú mới vào bộ sưu tập'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="note-category" className="text-sm">Danh mục</Label>
                    <select
                      id="note-category"
                      value={newNote.category}
                      onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
                      className="w-full mt-1 px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground h-9"
                    >
                      {categories.slice(1).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="note-color" className="text-sm">Màu sắc</Label>
                    <div className="flex gap-1 mt-1">
                      {Object.entries(colors).map(([key, className]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setNewNote({ ...newNote, color: key })}
                          className={`w-6 h-6 rounded border-2 ${className} ${
                            newNote.color === key ? 'ring-2 ring-primary ring-offset-1' : ''
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="note-title" className="text-sm">Tiêu đề <span className="text-destructive">*</span></Label>
                  <Input
                    id="note-title"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    placeholder="Nhập tiêu đề ghi chú..."
                    className="mt-1 h-9"
                  />
                </div>
                <div>
                  <Label htmlFor="note-content" className="text-sm">Nội dung <span className="text-destructive">*</span></Label>
                  <Textarea
                    id="note-content"
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    placeholder="Viết nội dung ghi chú..."
                    rows={4}
                    className="mt-1 text-sm"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setShowAddNote(false);
                      setEditingNote(null);
                      setNewNote({ title: '', content: '', category: 'Task', color: 'primary' });
                    }}
                  >
                    Hủy
                  </Button>
                  <Button 
                    size="sm"
                    onClick={editingNote ? handleUpdateNote : handleAddNote}
                    disabled={!newNote.title.trim() || !newNote.content.trim()}
                  >
                    {editingNote ? 'Cập nhật' : 'Lưu ghi chú'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Note Card Component
function NoteCard({ 
  note, 
  onEdit, 
  onDelete, 
  onTogglePin, 
  onToggleFavorite, 
  formatDate 
}: {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  formatDate: (date: Date) => string;
}) {
  const colorClass = colors[note.color as keyof typeof colors] || colors.primary;

  return (
    <Card className={`group hover:shadow-lg transition-all duration-200 h-fit ${colorClass} border-2 relative`}>
      {/* Top Action Icons - Absolutely positioned */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-white/70 hover:backdrop-blur-sm rounded-md transition-all duration-200 shadow-sm"
          onClick={() => onToggleFavorite(note.id)}
          title={note.isFavorite ? "Bỏ yêu thích" : "Yêu thích"}
        >
          {note.isFavorite ? (
            <Star className="h-3 w-3 fill-current text-orange-500" />
          ) : (
            <StarOff className="h-3 w-3 text-muted-foreground hover:text-orange-500 transition-colors" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-white/70 hover:backdrop-blur-sm rounded-md transition-all duration-200 shadow-sm"
          onClick={() => onTogglePin(note.id)}
          title={note.isPinned ? "Bỏ ghim" : "Ghim"}
        >
          {note.isPinned ? (
            <Pin className="h-3 w-3 text-primary fill-current" />
          ) : (
            <PinOff className="h-3 w-3 text-muted-foreground hover:text-primary transition-colors" />
          )}
        </Button>
      </div>

      <CardHeader className="pb-3 pr-16">
        <div className="w-full">
          <h4 className="font-medium text-sm leading-tight line-clamp-2 mb-2 pr-1">
            {note.title}
          </h4>
          {note.category && (
            <Badge variant="secondary" className="text-xs">
              {note.category}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-xs leading-relaxed line-clamp-4 mb-3 text-current/90 break-words">
          {note.content}
        </p>
        
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-xs opacity-70 min-w-0 flex-shrink">
            <Clock className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{formatDate(note.createdDate)}</span>
          </div>
          
          {/* Bottom Action Icons */}
          <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-white/70 hover:backdrop-blur-sm rounded-md transition-all duration-200 shadow-sm"
              onClick={() => onEdit(note)}
              title="Chỉnh sửa"
            >
              <Edit className="h-3 w-3 text-muted-foreground hover:text-primary transition-colors" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-destructive hover:bg-red-100/70 hover:backdrop-blur-sm rounded-md transition-all duration-200 shadow-sm"
              onClick={() => onDelete(note.id)}
              title="Xóa"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
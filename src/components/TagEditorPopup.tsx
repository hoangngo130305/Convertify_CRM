import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { X, Plus, Trash2 } from 'lucide-react';

interface Tag {
  id: string;
  name: string;
  color: string;
}

interface TagEditorPopupProps {
  isOpen: boolean;
  onClose: () => void;
  tags: Tag[];
  onSave: (tags: Tag[]) => void;
  customerId: string;
  customerName: string;
}

const TAG_COLORS = [
  { name: 'blue', label: 'Xanh dương', class: 'bg-blue-500 hover:bg-blue-600', badgeClass: 'bg-blue-100 text-blue-800 hover:bg-blue-200' },
  { name: 'green', label: 'Xanh lá', class: 'bg-green-500 hover:bg-green-600', badgeClass: 'bg-green-100 text-green-800 hover:bg-green-200' },
  { name: 'red', label: 'Đỏ', class: 'bg-red-500 hover:bg-red-600', badgeClass: 'bg-red-100 text-red-800 hover:bg-red-200' },
  { name: 'yellow', label: 'Vàng', class: 'bg-yellow-500 hover:bg-yellow-600', badgeClass: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' },
  { name: 'purple', label: 'Tím', class: 'bg-purple-500 hover:bg-purple-600', badgeClass: 'bg-purple-100 text-purple-800 hover:bg-purple-200' },
  { name: 'indigo', label: 'Chàm', class: 'bg-indigo-500 hover:bg-indigo-600', badgeClass: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200' },
  { name: 'orange', label: 'Cam', class: 'bg-orange-500 hover:bg-orange-600', badgeClass: 'bg-orange-100 text-orange-800 hover:bg-orange-200' },
  { name: 'gray', label: 'Xám', class: 'bg-gray-500 hover:bg-gray-600', badgeClass: 'bg-gray-100 text-gray-800 hover:bg-gray-200' },
];

export function TagEditorPopup({ isOpen, onClose, tags, onSave, customerId, customerName }: TagEditorPopupProps) {
  const [currentTags, setCurrentTags] = useState<Tag[]>(tags);
  const [newTagName, setNewTagName] = useState('');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [isAddingTag, setIsAddingTag] = useState(false);

  if (!isOpen) return null;

  const getTagColorClasses = (color: string) => {
    const colorConfig = TAG_COLORS.find(c => c.name === color);
    return colorConfig?.badgeClass || 'bg-gray-100 text-gray-800';
  };

  const handleAddTag = () => {
    if (!newTagName.trim()) return;

    // Check if tag with same name already exists
    const existingTag = currentTags.find(tag => 
      tag.name.toLowerCase() === newTagName.trim().toLowerCase()
    );

    if (existingTag) {
      alert('Tag này đã tồn tại!');
      return;
    }

    const newTag: Tag = {
      id: `tag_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: newTagName.trim(),
      color: selectedColor
    };

    setCurrentTags(prev => [...prev, newTag]);
    setNewTagName('');
    setSelectedColor('blue');
    setIsAddingTag(false);
  };

  const handleRemoveTag = (tagId: string) => {
    setCurrentTags(prev => prev.filter(tag => tag.id !== tagId));
  };

  const handleSave = () => {
    onSave(currentTags);
    onClose();
  };

  const handleCancel = () => {
    setCurrentTags(tags); // Reset to original tags
    setNewTagName('');
    setSelectedColor('blue');
    setIsAddingTag(false);
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    } else if (e.key === 'Escape') {
      setIsAddingTag(false);
      setNewTagName('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl border border-border max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h3 className="text-lg font-medium">Chỉnh sửa Tag</h3>
            <p className="text-sm text-muted-foreground">{customerName}</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleCancel}
            className="p-1 hover:bg-accent rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Current Tags */}
          <div>
            <Label className="text-sm font-medium">Tags hiện tại</Label>
            <div className="mt-2 min-h-[60px] p-3 border border-dashed border-border rounded-lg bg-muted/30">
              {currentTags.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-2">
                  Chưa có tag nào
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {currentTags.map((tag) => (
                    <div
                      key={tag.id}
                      className="group relative"
                    >
                      <Badge 
                        className={`${getTagColorClasses(tag.color)} cursor-pointer transition-all duration-200 hover:scale-105 pr-6`}
                      >
                        {tag.name}
                        <button
                          onClick={() => handleRemoveTag(tag.id)}
                          className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/10 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Add New Tag */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Thêm tag mới</Label>
              {!isAddingTag && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddingTag(true)}
                  className="h-7 px-2 text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Thêm
                </Button>
              )}
            </div>

            {isAddingTag && (
              <div className="space-y-3 p-3 border border-border rounded-lg bg-muted/20">
                {/* Tag Name Input */}
                <div className="space-y-2">
                  <Label htmlFor="tagName" className="text-xs">Tên tag</Label>
                  <Input
                    id="tagName"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Nhập tên tag..."
                    className="h-8 text-sm"
                    autoFocus
                  />
                </div>

                {/* Color Picker */}
                <div className="space-y-2">
                  <Label className="text-xs">Chọn màu</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {TAG_COLORS.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${color.class} ${
                          selectedColor === color.name 
                            ? 'border-gray-800 shadow-lg scale-110' 
                            : 'border-gray-300 hover:border-gray-500'
                        }`}
                        title={color.label}
                      />
                    ))}
                  </div>
                </div>

                {/* Preview */}
                {newTagName.trim() && (
                  <div className="space-y-1">
                    <Label className="text-xs">Xem trước</Label>
                    <div>
                      <Badge className={getTagColorClasses(selectedColor)}>
                        {newTagName.trim()}
                      </Badge>
                    </div>
                  </div>
                )}

                {/* Add Tag Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleAddTag}
                    disabled={!newTagName.trim()}
                    className="h-7 px-3 text-xs"
                  >
                    Thêm tag
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsAddingTag(false);
                      setNewTagName('');
                      setSelectedColor('blue');
                    }}
                    className="h-7 px-3 text-xs"
                  >
                    Hủy
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-4 border-t border-border bg-muted/20">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            className="h-8 px-3 text-sm"
          >
            Hủy
          </Button>
          <Button 
            onClick={handleSave}
            className="h-8 px-3 text-sm"
          >
            Lưu
          </Button>
        </div>
      </div>
    </div>
  );
}
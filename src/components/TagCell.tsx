import { useState } from 'react';
import { Badge } from './ui/badge';
import { Plus } from 'lucide-react';
import { TagEditorPopup } from './TagEditorPopup';

interface Tag {
  id: string;
  name: string;
  color: string;
}

interface TagCellProps {
  tags: Tag[];
  customerId: string;
  customerName: string;
  onTagsUpdate: (customerId: string, tags: Tag[]) => void;
}

const getTagColorClasses = (color: string) => {
  const colorMap = {
    blue: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    green: 'bg-green-100 text-green-800 hover:bg-green-200',
    red: 'bg-red-100 text-red-800 hover:bg-red-200',
    yellow: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    purple: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
    indigo: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
    orange: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
    gray: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  };
  return colorMap[color as keyof typeof colorMap] || 'bg-gray-100 text-gray-800 hover:bg-gray-200';
};

export function TagCell({ tags, customerId, customerName, onTagsUpdate }: TagCellProps) {
  const [showTagEditor, setShowTagEditor] = useState(false);

  const handleOpenEditor = () => {
    setShowTagEditor(true);
  };

  const handleCloseEditor = () => {
    setShowTagEditor(false);
  };

  const handleSaveTags = (newTags: Tag[]) => {
    onTagsUpdate(customerId, newTags);
  };

  return (
    <>
      <div 
        className="flex flex-wrap gap-1 items-center min-h-[32px] py-1 px-2 rounded cursor-pointer hover:bg-muted/50 transition-colors group"
        onClick={handleOpenEditor}
      >
        {tags.length === 0 ? (
          <div className="flex items-center gap-1 text-muted-foreground group-hover:text-foreground transition-colors">
            <Plus className="h-3 w-3" />
            <span className="text-xs">Thêm tag</span>
          </div>
        ) : (
          <>
            {tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag.id}
                className={`${getTagColorClasses(tag.color)} text-xs py-0.5 px-2 transition-all duration-200 hover:scale-105`}
              >
                {tag.name}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge 
                variant="outline" 
                className="text-xs py-0.5 px-2 border-dashed hover:bg-muted transition-colors"
              >
                +{tags.length - 3}
              </Badge>
            )}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Plus className="h-3 w-3 text-muted-foreground" />
            </div>
          </>
        )}
      </div>

      <TagEditorPopup
        isOpen={showTagEditor}
        onClose={handleCloseEditor}
        tags={tags}
        onSave={handleSaveTags}
        customerId={customerId}
        customerName={customerName}
      />
    </>
  );
}
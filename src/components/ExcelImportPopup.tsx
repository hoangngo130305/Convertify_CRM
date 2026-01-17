import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  X, 
  Upload, 
  FileSpreadsheet, 
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Download,
  Eye,
  FileDown,
  Plus,
  User,
  Users
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { PostImportAssignmentPopup } from './PostImportAssignmentPopup';

interface ExcelImportPopupProps {
  onClose: () => void;
  onImport: (customers: any[]) => void;
}

type ImportStep = 'upload' | 'map' | 'preview' | 'finish';
type MainMode = 'excel' | 'manual';

interface ColumnMapping {
  excelColumn: string;
  crmField: string;
  excelHeader: string;
}

const CRM_FIELDS = [
  { value: 'name', label: 'Tên khách hàng *' },
  { value: 'phone', label: 'Số điện thoại *' },
  { value: 'email', label: 'Email' },
  { value: 'products', label: 'Sản phẩm/Dịch vụ' },
  { value: 'source', label: 'Nguồn Data' },
  { value: 'status', label: 'Trạng thái' },
  { value: 'assignedSale', label: 'Sale phụ trách' },
  { value: 'notes', label: 'Ghi chú' },
  { value: 'address', label: 'Địa chỉ' },
  { value: 'skip', label: '-- Bỏ qua cột này --' }
];

const SAMPLE_DATA = {
  headers: ['Tên', 'Điện thoại', 'Email', 'Sản phẩm', 'Nguồn', 'Trạng thái'],
  rows: [
    ['Nguyễn Văn A', '0123456789', 'a@example.com', 'Website Design', 'Facebook', 'Mới'],
    ['Trần Thị B', '0987654321', 'b@example.com', 'SEO Service', 'Google', 'Đang xử lý'],
    ['Lê Văn C', '0912345678', 'c@example.com', 'Digital Marketing', 'TikTok', 'Thành công']
  ]
};

const STATUSES = ['Mới', 'Đang xử lý', 'Thành công', 'Thất bại'];
const SOURCES = ['Facebook', 'Google', 'TikTok', 'Zalo', 'Hotline', 'Website', 'Giới thiệu'];
const SALES = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Chưa phân bổ'];
const PRODUCTS = ['Website Design', 'SEO Service', 'Digital Marketing', 'E-commerce'];

export function ExcelImportPopup({ onClose, onImport }: ExcelImportPopupProps) {
  const [mode, setMode] = useState<MainMode>('excel');
  const [currentStep, setCurrentStep] = useState<ImportStep>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [excelData, setExcelData] = useState(SAMPLE_DATA);
  const [columnMappings, setColumnMappings] = useState<ColumnMapping[]>([]);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [importResults, setImportResults] = useState({ success: 0, errors: 0 });
  
  // New states for assignment popup
  const [showAssignmentPopup, setShowAssignmentPopup] = useState(false);
  const [importedCustomersData, setImportedCustomersData] = useState<any[]>([]);
  
  // Manual form data
  const [manualForm, setManualForm] = useState({
    name: '',
    phone: '',
    email: '',
    products: '',
    source: '',
    status: 'Mới',
    assignedSale: 'Chưa phân bổ',
    notes: '',
    address: ''
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Simulate file processing - in real app, you'd parse the Excel file here
      setTimeout(() => {
        // Auto-create initial mappings based on header similarity
        const initialMappings: ColumnMapping[] = excelData.headers.map((header, index) => {
          let suggestedField = 'skip';
          
          // Simple mapping suggestions based on header names
          if (header.toLowerCase().includes('tên') || header.toLowerCase().includes('name')) {
            suggestedField = 'name';
          } else if (header.toLowerCase().includes('điện thoại') || header.toLowerCase().includes('phone') || header.toLowerCase().includes('sdt')) {
            suggestedField = 'phone';
          } else if (header.toLowerCase().includes('email')) {
            suggestedField = 'email';
          } else if (header.toLowerCase().includes('sản phẩm') || header.toLowerCase().includes('product') || header.toLowerCase().includes('dịch vụ')) {
            suggestedField = 'products';
          } else if (header.toLowerCase().includes('nguồn') || header.toLowerCase().includes('source')) {
            suggestedField = 'source';
          } else if (header.toLowerCase().includes('trạng thái') || header.toLowerCase().includes('status')) {
            suggestedField = 'status';
          }
          
          return {
            excelColumn: `column_${index}`,
            crmField: suggestedField,
            excelHeader: header
          };
        });
        
        setColumnMappings(initialMappings);
        setCurrentStep('map');
      }, 1500);
    }
  };

  const handleMappingChange = (columnIndex: number, newField: string) => {
    setColumnMappings(prev => prev.map((mapping, index) => 
      index === columnIndex ? { ...mapping, crmField: newField } : mapping
    ));
  };

  const generatePreviewData = () => {
    const validMappings = columnMappings.filter(m => m.crmField !== 'skip');
    const preview = excelData.rows.slice(0, 5).map((row, rowIndex) => {
      const customer: any = { id: `preview_${rowIndex}` };
      
      validMappings.forEach((mapping, mappingIndex) => {
        const columnIndex = columnMappings.findIndex(m => m.excelColumn === mapping.excelColumn);
        if (columnIndex !== -1 && row[columnIndex]) {
          customer[mapping.crmField] = row[columnIndex];
        }
      });
      
      return customer;
    });
    
    setPreviewData(preview);
    setCurrentStep('preview');
  };

  const handleImport = () => {
    // Simulate import process
    setTimeout(() => {
      const results = { success: excelData.rows.length, errors: 0 };
      setImportResults(results);
      setCurrentStep('finish');
      
      // Create actual customer data for import
      const importedCustomers = excelData.rows.map((row, index) => {
        const customer: any = { 
          id: `imported_${Date.now()}_${index}`,
          createdDate: new Date(),
          quality: 1,
          revenue: 0,
          customFields: {}
        };
        
        columnMappings.forEach((mapping, mappingIndex) => {
          const columnIndex = columnMappings.findIndex(m => m.excelColumn === mapping.excelColumn);
          if (columnIndex !== -1 && mapping.crmField !== 'skip' && row[columnIndex]) {
            if (mapping.crmField === 'products') {
              customer[mapping.crmField] = [row[columnIndex]];
            } else {
              customer[mapping.crmField] = row[columnIndex];
            }
          }
        });
        
        // Set default values for required fields
        if (!customer.name) customer.name = `Customer ${index + 1}`;
        if (!customer.phone) customer.phone = '';
        if (!customer.status) customer.status = 'Mới'; // Always default to "Mới" for new customers
        if (!customer.source) customer.source = 'Import';
        if (!customer.assignedSale) customer.assignedSale = 'Chưa phân bổ';
        if (!customer.notes) customer.notes = '';
        if (!customer.email) customer.email = '';
        if (!customer.products) customer.products = [];
        if (!customer.address) customer.address = '';
        if (!customer.questions) customer.questions = '';
        
        return customer;
      });
      
      setImportedCustomersData(importedCustomers);
      setShowAssignmentPopup(true);
    }, 2000);
  };

  // Handle manual form submission
  const handleManualFormSubmit = () => {
    if (!manualForm.name.trim() || !manualForm.phone.trim()) {
      alert('Vui lòng nhập tên và số điện thoại khách hàng!');
      return;
    }

    const newCustomer = {
      id: `manual_${Date.now()}`,
      name: manualForm.name.trim(),
      phone: manualForm.phone.trim(),
      email: manualForm.email.trim(),
      products: manualForm.products ? [manualForm.products] : [],
      source: manualForm.source || 'Manual',
      status: manualForm.status,
      assignedSale: manualForm.assignedSale,
      notes: manualForm.notes.trim(),
      address: manualForm.address.trim(),
      createdDate: new Date(),
      quality: 1,
      revenue: 0,
      questions: '',
      customFields: {}
    };

    onImport([newCustomer]);
    
    // Reset form
    setManualForm({
      name: '',
      phone: '',
      email: '',
      products: '',
      source: '',
      status: 'Mới',
      assignedSale: 'Chưa phân bổ',
      notes: '',
      address: ''
    });
    
    alert('Đã thêm khách hàng mới thành công!');
  };

  const handleManualFormChange = (field: string, value: string) => {
    setManualForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderManualForm = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-medium mb-2">Thêm khách hàng mới</h2>
        <p className="text-muted-foreground mb-6">
          Nhập thông tin khách hàng thủ công
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Required Fields */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Tên khách hàng *</Label>
            <Input
              id="name"
              value={manualForm.name}
              onChange={(e) => handleManualFormChange('name', e.target.value)}
              placeholder="Nhập tên khách hàng"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Số điện thoại *</Label>
            <Input
              id="phone"
              value={manualForm.phone}
              onChange={(e) => handleManualFormChange('phone', e.target.value)}
              placeholder="Nhập số điện thoại"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={manualForm.email}
              onChange={(e) => handleManualFormChange('email', e.target.value)}
              placeholder="Nhập email"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="products">Sản phẩm/Dịch vụ</Label>
            <Select
              value={manualForm.products}
              onValueChange={(value) => handleManualFormChange('products', value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Chọn sản phẩm/dịch vụ" />
              </SelectTrigger>
              <SelectContent>
                {PRODUCTS.map(product => (
                  <SelectItem key={product} value={product}>
                    {product}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Optional Fields */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="source">Nguồn Data</Label>
            <Select
              value={manualForm.source}
              onValueChange={(value) => handleManualFormChange('source', value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Chọn nguồn data" />
              </SelectTrigger>
              <SelectContent>
                {SOURCES.map(source => (
                  <SelectItem key={source} value={source}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="status">Trạng thái</Label>
            <Select
              value={manualForm.status}
              onValueChange={(value) => handleManualFormChange('status', value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map(status => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="assignedSale">Sale phụ trách</Label>
            <Select
              value={manualForm.assignedSale}
              onValueChange={(value) => handleManualFormChange('assignedSale', value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SALES.map(sale => (
                  <SelectItem key={sale} value={sale}>
                    {sale}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="address">Địa chỉ</Label>
            <Input
              id="address"
              value={manualForm.address}
              onChange={(e) => handleManualFormChange('address', e.target.value)}
              placeholder="Nhập địa chỉ"
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Notes - Full width */}
      <div>
        <Label htmlFor="notes">Ghi chú</Label>
        <Textarea
          id="notes"
          value={manualForm.notes}
          onChange={(e) => handleManualFormChange('notes', e.target.value)}
          placeholder="Nhập ghi chú..."
          className="mt-1"
          rows={3}
        />
      </div>

      <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
        <AlertCircle className="h-5 w-5 text-blue-600" />
        <span className="text-sm text-blue-800">
          Các trường có dấu * là bắt buộc phải nhập.
        </span>
      </div>
    </div>
  );

  const renderStepIndicator = () => {
    const steps = [
      { key: 'upload', label: 'Upload file', number: 1 },
      { key: 'map', label: 'Map', number: 2 },
      { key: 'preview', label: 'Preview', number: 3 },
      { key: 'finish', label: 'Finish', number: 4 }
    ];

    return (
      <div className="flex items-center justify-center mb-6">
        {steps.map((step, index) => (
          <div key={step.key} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
              currentStep === step.key ? 'bg-primary border-primary text-primary-foreground' :
              steps.findIndex(s => s.key === currentStep) > index ? 'bg-green-500 border-green-500 text-white' :
              'border-border text-muted-foreground'
            }`}>
              {steps.findIndex(s => s.key === currentStep) > index ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <span className="text-sm font-medium">{step.number}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-0.5 mx-2 ${
                steps.findIndex(s => s.key === currentStep) > index ? 'bg-green-500' : 'bg-border'
              }`} />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderUploadStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-medium mb-2">Upload your spreadsheet</h2>
        <p className="text-muted-foreground mb-6">
          Upload an Excel file (.xlsx, .csv) containing your customer data
        </p>
      </div>

      <div 
        className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="w-16 h-16 mx-auto mb-4 bg-green-50 rounded-lg flex items-center justify-center">
          <FileSpreadsheet className="h-8 w-8 text-green-600" />
        </div>
        
        <div className="mb-4">
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload spreadsheet (.XLSX, .CSV)
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Or drag and drop the file here
        </p>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {uploadedFile && (
        <div className="flex items-center justify-center p-4 bg-green-50 rounded-lg">
          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
          <span className="text-sm font-medium">
            {uploadedFile.name} uploaded successfully
          </span>
        </div>
      )}
    </div>
  );

  const renderMapStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-medium mb-2">Map your columns</h2>
        <p className="text-muted-foreground mb-6">
          Match your Excel columns with CRM fields
        </p>
      </div>

      <div className="grid gap-4">
        {columnMappings.map((mapping, index) => (
          <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
            <div className="flex-1">
              <div className="font-medium text-sm mb-1">Excel Column</div>
              <div className="text-sm text-muted-foreground bg-muted px-3 py-2 rounded">
                {mapping.excelHeader}
              </div>
            </div>
            
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            
            <div className="flex-1">
              <div className="font-medium text-sm mb-1">CRM Field</div>
              <Select
                value={mapping.crmField}
                onValueChange={(value) => handleMappingChange(index, value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CRM_FIELDS.map(field => (
                    <SelectItem key={field.value} value={field.value}>
                      {field.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
        <AlertCircle className="h-5 w-5 text-blue-600" />
        <span className="text-sm text-blue-800">
          Fields marked with * are required. Make sure to map them properly.
        </span>
      </div>
    </div>
  );

  const renderPreviewStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-medium mb-2">Preview import data</h2>
        <p className="text-muted-foreground mb-6">
          Review the first 5 rows before importing
        </p>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted p-3 border-b">
          <div className="flex items-center justify-between">
            <span className="font-medium">Preview (5 of {excelData.rows.length} rows)</span>
            <Badge variant="secondary">
              {excelData.rows.length} total records
            </Badge>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                {columnMappings
                  .filter(m => m.crmField !== 'skip')
                  .map(mapping => (
                    <th key={mapping.excelColumn} className="text-left p-3 text-sm font-medium">
                      {CRM_FIELDS.find(f => f.value === mapping.crmField)?.label || mapping.crmField}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {previewData.map((customer, index) => (
                <tr key={index} className="border-t">
                  {columnMappings
                    .filter(m => m.crmField !== 'skip')
                    .map(mapping => (
                      <td key={mapping.excelColumn} className="p-3 text-sm">
                        {customer[mapping.crmField] || '-'}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg">
        <CheckCircle className="h-5 w-5 text-green-600" />
        <span className="text-sm text-green-800">
          Data looks good! Ready to import {excelData.rows.length} customers.
        </span>
      </div>
    </div>
  );

  const renderFinishStep = () => (
    <div className="space-y-6 text-center">
      <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      
      <div>
        <h2 className="text-xl font-medium mb-2">Import completed!</h2>
        <p className="text-muted-foreground mb-6">
          Your customer data has been successfully imported
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        <Card className="p-4">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {importResults.success}
          </div>
          <div className="text-sm text-muted-foreground">
            Successfully imported
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="text-2xl font-bold text-red-600 mb-1">
            {importResults.errors}
          </div>
          <div className="text-sm text-muted-foreground">
            Errors
          </div>
        </Card>
      </div>

      <div className="space-y-3">
        <Button onClick={onClose} className="w-full">
          View imported customers
        </Button>
        <Button 
          variant="outline" 
          onClick={() => setMode('manual')} 
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm khách hàng mới
        </Button>
        <Button variant="outline" onClick={() => setCurrentStep('upload')} className="w-full">
          Import more data
        </Button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    if (mode === 'manual') {
      return renderManualForm();
    }
    
    switch (currentStep) {
      case 'upload': return renderUploadStep();
      case 'map': return renderMapStep();
      case 'preview': return renderPreviewStep();
      case 'finish': return renderFinishStep();
      default: return renderUploadStep();
    }
  };

  const getNextStepEnabled = () => {
    if (mode === 'manual') {
      return manualForm.name.trim() !== '' && manualForm.phone.trim() !== '';
    }
    
    switch (currentStep) {
      case 'upload': return uploadedFile !== null;
      case 'map': return columnMappings.some(m => m.crmField === 'name' || m.crmField === 'phone');
      case 'preview': return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (mode === 'manual') {
      handleManualFormSubmit();
      return;
    }
    
    switch (currentStep) {
      case 'map':
        generatePreviewData();
        break;
      case 'preview':
        handleImport();
        break;
    }
  };

  const handleBack = () => {
    if (mode === 'manual') {
      setMode('excel');
      return;
    }
    
    switch (currentStep) {
      case 'map': setCurrentStep('upload'); break;
      case 'preview': setCurrentStep('map'); break;
      case 'finish': setCurrentStep('preview'); break;
    }
  };

  const renderModeSelector = () => {
    if (mode === 'manual') {
      return (
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
            <Button
              variant={mode === 'excel' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setMode('excel')}
              className="flex items-center gap-2"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Import Excel
            </Button>
            <Button
              variant={mode === 'manual' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setMode('manual')}
              className="flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              Manual Input
            </Button>
          </div>
        </div>
      );
    }
    
    return renderStepIndicator();
  };

  // Handle assignment from PostImportAssignmentPopup
  const handleAssignmentComplete = (assignments: any[]) => {
    // Apply assignments to imported customers
    const updatedCustomers = importedCustomersData.map(customer => {
      const assignment = assignments.find(a => a.customerId === customer.id);
      if (assignment) {
        const updatedCustomer = { ...customer };
        
        // Apply sale assignment
        if (assignment.assignedSale) {
          updatedCustomer.assignedSale = assignment.assignedSale;
        }
        
        // Apply group assignments (this would be handled by parent component)
        if (assignment.assignedGroups && assignment.assignedGroups.length > 0) {
          // Store group assignments for parent to handle
          updatedCustomer._groupAssignments = assignment.assignedGroups;
        }
        
        return updatedCustomer;
      }
      return customer;
    });
    
    // Pass the updated customers to parent
    onImport(updatedCustomers);
    
    // Close popups
    setShowAssignmentPopup(false);
    onClose();
    
    // Show success message
    alert(`✅ Đã import thành công ${updatedCustomers.length} khách hàng và áp dụng phân bổ!`);
  };

  const handleAssignmentSkip = () => {
    // Skip assignment, just import the customers as-is
    onImport(importedCustomersData);
    setShowAssignmentPopup(false);
    onClose();
    alert(`✅ Đã import thành công ${importedCustomersData.length} khách hàng!`);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-background rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h1 className="text-lg font-medium">Import data</h1>
              <p className="text-sm text-muted-foreground">
                Tools and apps / Import data
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Step Indicator */}
          <div className="p-6 border-b">
            {renderModeSelector()}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {renderCurrentStep()}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t bg-muted/20">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={(mode === 'excel' && (currentStep === 'upload' || currentStep === 'finish')) || (mode === 'manual')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {mode === 'manual' ? 'Back to Excel' : 'Back'}
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              
              {((mode === 'excel' && currentStep !== 'finish') || mode === 'manual') && (
                <Button
                  onClick={handleNext}
                  disabled={!getNextStepEnabled()}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {mode === 'manual' ? 'Thêm khách hàng' : (currentStep === 'preview' ? 'Import' : 'Next')}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Post Import Assignment Popup */}
      <PostImportAssignmentPopup
        isOpen={showAssignmentPopup}
        onClose={handleAssignmentSkip}
        importedCustomers={importedCustomersData}
        onAssign={handleAssignmentComplete}
      />
    </>
  );
}
import { FormComponent } from '../types';

/**
 * Tính toán phần trăm hoàn thành form
 * @param data Dữ liệu đã nhập
 * @param components Danh sách components của form
 * @returns Phần trăm hoàn thành (0-100)
 */
export const calculateProgress = (data: any, components: FormComponent[]): number => {
  if (!components || components.length === 0) return 0;
  
  // Đếm tổng số trường cần nhập và số trường đã có dữ liệu
  let totalFields = 0;
  let filledFields = 0;
  
  // Hàm đệ quy để xử lý các components lồng nhau
  const processComponents = (comps: FormComponent[], path: string = '') => {
    comps.forEach((comp: FormComponent) => {
      // Xử lý các component input cơ bản
      if (['textfield', 'textarea', 'number', 'email', 'select', 'checkbox', 'radio', 'datetime'].includes(comp.type)) {
        totalFields++;
        
        // Kiểm tra nếu field này đã có dữ liệu
        const fieldKey = comp.key || '';
        const fieldData = path ? getNestedValue(data, `${path}.${fieldKey}`) : data[fieldKey];
        if (fieldData !== undefined && fieldData !== null && 
            (typeof fieldData !== 'string' || fieldData.trim() !== '')) {
          filledFields++;
        }
      }
      // Xử lý datagrid components
      else if (comp.type === 'datagrid' && comp.key) {
        // Lấy dữ liệu của datagrid (là một mảng các hàng)
        const gridData = path ? getNestedValue(data, `${path}.${comp.key}`) : data[comp.key];
        
        if (Array.isArray(gridData) && gridData.length > 0) {
          // Đếm số components trong mỗi hàng của datagrid
          const rowComponents = comp.components || [];
          const fieldsPerRow = rowComponents.filter((c: FormComponent) => 
            ['textfield', 'textarea', 'number', 'email', 'select', 'checkbox', 'radio', 'datetime'].includes(c.type)
          ).length;
          
          // Thêm số trường tổng cộng: số hàng × số trường trên mỗi hàng
          totalFields += gridData.length * fieldsPerRow;
          
          // Đếm số trường đã điền trong tất cả các hàng
          gridData.forEach((row: any) => {
            rowComponents.forEach((rowComp: FormComponent) => {
              const rowCompKey = rowComp.key || '';
              if (['textfield', 'textarea', 'number', 'email', 'select', 'checkbox', 'radio', 'datetime'].includes(rowComp.type)) {
                if (row[rowCompKey] !== undefined && row[rowCompKey] !== null &&
                    (typeof row[rowCompKey] !== 'string' || row[rowCompKey].trim() !== '')) {
                  filledFields++;
                }
              }
            });
          });
        } else {
          // Nếu datagrid trống, chỉ tính là một trường và chưa được điền
          totalFields++;
        }
      }
      // Xử lý container, panel, và các components có thể chứa components con
      else if (comp.components && Array.isArray(comp.components)) {
        processComponents(comp.components, path ? `${path}.${comp.key || ''}` : (comp.key || ''));
      }
      // Xử lý fieldset, columns, và tabs (có cấu trúc khác)
      else if (comp.type === 'columns' && comp.columns) {
        comp.columns.forEach((column: {components?: FormComponent[]}) => {
          if (column.components) {
            processComponents(column.components, path);
          }
        });
      }
      else if ((comp.type === 'fieldset' || comp.type === 'panel' || comp.type === 'tab') && comp.components) {
        processComponents(comp.components, path);
      }
    });
  };
  
  // Hàm lấy giá trị từ đường dẫn lồng nhau, ví dụ "address.street"
  const getNestedValue = (obj: any, path: string): any => {
    if (!obj) return undefined;
    const keys = path.split('.');
    return keys.reduce((o: any, key: string) => (o && o[key] !== undefined) ? o[key] : undefined, obj);
  };
  
  // Bắt đầu xử lý tất cả components
  processComponents(components);
  
  // Tính phần trăm hoàn thành
  return totalFields === 0 ? 0 : Math.round((filledFields / totalFields) * 100);
};

/**
 * Lấy components từ schema
 * @param schema Schema của form
 * @returns Mảng các components hoặc null nếu không có
 */
export const getSchemaComponents = (schema: any): FormComponent[] | null => {
  if (!schema) return null;
  
  const schemaObj = typeof schema === 'string' 
    ? JSON.parse(schema)
    : schema;
  
  return schemaObj.components || null;
};
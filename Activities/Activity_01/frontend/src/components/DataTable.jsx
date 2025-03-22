import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/lara-dark-blue/theme.css';  // Ensure correct theme is imported
import 'primereact/resources/primereact.min.css';


const PostTableComponent = ({ data }) => { 
  return (
    <div className="table-container">
      <DataTable 
        value={data} 
        className="custom-table"
        stripedRows
        showGridlines
      >
        <Column field="id" header="ID" style={{ width: '10%', textAlign: 'center' }} />
        <Column field="title" header="Title" style={{ width: '40%', textAlign: 'left' }} />
        <Column field="content" header="Content" style={{ width: '50%', textAlign: 'left' }} />
        
      </DataTable>
    </div>
  );
}

export default PostTableComponent;
